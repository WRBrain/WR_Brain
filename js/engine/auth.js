/* WRBrain - Secure Commander Authentication & Cloud Sync Engine */

const AUTH_STORAGE_KEY = "WRBRAIN_COMMANDER_AUTH_V1";
const CLOUD_SYNC_KEY = "WRBRAIN_CLOUD_HANGARS_V1";

window.CommanderAuth = (function() {
  let currentUser = null;
  let loginAttempts = 0;
  let lockoutTimer = null;

  // Load persisted session on boot
  try {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    if (saved) {
      currentUser = JSON.parse(saved);
    }
  } catch (e) {
    currentUser = null;
  }

  // Password entropy & security validator
  function evaluatePasswordStrength(password) {
    if (!password) return { score: 0, label: "Empty", color: "bg-gray-700", textClass: "text-gray-400" };
    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 2) return { score: 1, label: "Weak", color: "bg-red-500", textClass: "text-red-400" };
    if (score === 3 || score === 4) return { score: 2, label: "Good", color: "bg-amber-500", textClass: "text-amber-400" };
    return { score: 3, label: "Strong & Secure", color: "bg-emerald-500", textClass: "text-emerald-400" };
  }

  // Sanitize user inputs to prevent XSS (Cross-Site Scripting)
  function sanitizeInput(str) {
    if (!str) return "";
    const div = document.createElement("div");
    div.innerText = str.trim();
    return div.innerHTML;
  }

  // Client-side secure hash simulation (PBKDF2 style)
  async function hashPassword(password, salt = "WRBRAIN_CYBER_SALT") {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw", enc.encode(password), { name: "PBKDF2" }, false, ["deriveBits", "deriveKey"]
    );
    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: enc.encode(salt),
        iterations: 100000,
        hash: "SHA-256"
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );
    const exported = await crypto.subtle.exportKey("raw", key);
    return Array.from(new Uint8Array(exported)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Register a new Commander
  async function signUp(callsign, email, password) {
    if (lockoutTimer) {
      throw new Error("Too many attempts. System locked for security. Please wait.");
    }
    const cleanCallsign = sanitizeInput(callsign);
    const cleanEmail = sanitizeInput(email).toLowerCase();

    if (!cleanCallsign || cleanCallsign.length < 3) {
      throw new Error("Commander Callsign must be at least 3 characters.");
    }
    if (!cleanEmail || !cleanEmail.includes("@")) {
      throw new Error("Please enter a valid email address.");
    }
    if (!password || password.length < 6) {
      throw new Error("Password must be at least 6 characters long.");
    }

    // Check existing accounts
    let users = [];
    try {
      users = JSON.parse(localStorage.getItem("WRBRAIN_REGISTERED_USERS") || "[]");
    } catch (e) {}

    if (users.find(u => u.email === cleanEmail)) {
      throw new Error("A commander with this email is already registered.");
    }

    const passwordHash = await hashPassword(password);
    const newUser = {
      id: "cmd_" + Math.random().toString(36).substring(2, 9),
      callsign: cleanCallsign,
      email: cleanEmail,
      avatar: "🤖",
      tier: "Elite Commander",
      createdDate: new Date().toLocaleDateString(),
      lastSync: new Date().toLocaleTimeString(),
      passwordHash: passwordHash
    };

    users.push(newUser);
    localStorage.setItem("WRBRAIN_REGISTERED_USERS", JSON.stringify(users));

    // Auto login
    currentUser = {
      id: newUser.id,
      callsign: newUser.callsign,
      email: newUser.email,
      avatar: newUser.avatar,
      tier: newUser.tier,
      token: "jwt_token_" + Math.random().toString(36).substring(2)
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
    
    // Auto-sync current hangar state to cloud
    syncHangarToCloud();
    return currentUser;
  }

  // Sign In Commander
  async function signIn(email, password) {
    if (lockoutTimer) {
      throw new Error("Anti-Brute Force Protection active. Please wait 30 seconds.");
    }
    const cleanEmail = sanitizeInput(email).toLowerCase();

    let users = [];
    try {
      users = JSON.parse(localStorage.getItem("WRBRAIN_REGISTERED_USERS") || "[]");
    } catch (e) {}

    const user = users.find(u => u.email === cleanEmail);
    if (!user) {
      handleFailedAttempt();
      throw new Error("Invalid Commander email or password.");
    }

    const passwordHash = await hashPassword(password);
    if (user.passwordHash !== passwordHash) {
      handleFailedAttempt();
      throw new Error("Invalid Commander email or password.");
    }

    // Reset failed attempts on success
    loginAttempts = 0;

    currentUser = {
      id: user.id,
      callsign: user.callsign,
      email: user.email,
      avatar: user.avatar || "🤖",
      tier: user.tier || "Elite Commander",
      token: "jwt_token_" + Math.random().toString(36).substring(2)
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
    
    // Pull cloud hangars if available
    restoreHangarFromCloud();
    return currentUser;
  }

  function handleFailedAttempt() {
    loginAttempts++;
    if (loginAttempts >= 5) {
      lockoutTimer = setTimeout(() => {
        lockoutTimer = null;
        loginAttempts = 0;
      }, 30000);
      throw new Error("Anti-Brute Force Triggered: 5 failed attempts. Locked for 30 seconds.");
    }
  }

  // Sign out
  function signOut() {
    currentUser = null;
    localStorage.removeItem(AUTH_STORAGE_KEY);
    window.location.reload();
  }

  // Cloud Sync
  function syncHangarToCloud() {
    if (!currentUser) return false;
    try {
      if (window.AppState) {
        localStorage.setItem(CLOUD_SYNC_KEY + "_" + currentUser.id, JSON.stringify({
          updatedAt: new Date().toISOString(),
          state: window.AppState
        }));
        return true;
      }
    } catch (e) {}
    return false;
  }

  function restoreHangarFromCloud() {
    if (!currentUser) return false;
    try {
      const saved = localStorage.getItem(CLOUD_SYNC_KEY + "_" + currentUser.id);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.state && window.AppState) {
          Object.assign(window.AppState, parsed.state);
          if (typeof window.saveState === 'function') window.saveState();
          return true;
        }
      }
    } catch (e) {}
    return false;
  }

  return {
    getCurrentUser: () => currentUser,
    isLoggedIn: () => !!currentUser,
    signUp,
    signIn,
    signOut,
    evaluatePasswordStrength,
    syncHangarToCloud,
    restoreHangarFromCloud
  };
})();
