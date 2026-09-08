/* WRBrain - Commander Authentication & Cloud Profile UI Renderer */

window.openAuthModal = function(tab = 'signin') {
  const modal = document.getElementById('auth-modal');
  if (!modal) return;
  toggleAuthTab(tab);
  modal.classList.remove('hidden');
};

window.closeAuthModal = function() {
  const modal = document.getElementById('auth-modal');
  if (modal) modal.classList.add('hidden');
};

window.toggleAuthTab = function(tab) {
  const signinForm = document.getElementById('auth-signin-form');
  const signupForm = document.getElementById('auth-signup-form');
  const signinBtn = document.getElementById('auth-tab-signin');
  const signupBtn = document.getElementById('auth-tab-signup');
  const title = document.getElementById('auth-modal-title');
  const errorBox = document.getElementById('auth-error-msg');

  if (errorBox) errorBox.classList.add('hidden');

  if (tab === 'signin') {
    if (signinForm) signinForm.classList.remove('hidden');
    if (signupForm) signupForm.classList.add('hidden');
    if (signinBtn) signinBtn.className = "flex-1 py-2 text-xs font-bold rounded-lg bg-amber-500 text-black shadow";
    if (signupBtn) signupBtn.className = "flex-1 py-2 text-xs font-bold rounded-lg text-gray-400 hover:text-white";
    if (title) title.innerText = "Commander Sign In";
  } else {
    if (signinForm) signinForm.classList.add('hidden');
    if (signupForm) signupForm.classList.remove('hidden');
    if (signinBtn) signinBtn.className = "flex-1 py-2 text-xs font-bold rounded-lg text-gray-400 hover:text-white";
    if (signupBtn) signupBtn.className = "flex-1 py-2 text-xs font-bold rounded-lg bg-amber-500 text-black shadow";
    if (title) title.innerText = "Create Commander Account";
  }
};

window.togglePasswordVisibility = function(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    if (icon) icon.innerText = '🙈';
  } else {
    input.type = 'password';
    if (icon) icon.innerText = '👁️';
  }
};

window.onPasswordInput = function(val) {
  const bar = document.getElementById('auth-password-strength-bar');
  const label = document.getElementById('auth-password-strength-label');
  if (!bar || !label) return;

  const result = CommanderAuth.evaluatePasswordStrength(val);
  label.innerText = result.label;
  label.className = `text-[10px] font-bold ${result.textClass}`;
  
  if (result.score === 0) bar.style.width = '0%';
  else if (result.score === 1) bar.style.width = '33%';
  else if (result.score === 2) bar.style.width = '66%';
  else bar.style.width = '100%';
  
  bar.className = `h-full rounded-full transition-all duration-300 ${result.color}`;
};

window.submitSignIn = async function(e) {
  e.preventDefault();
  const email = document.getElementById('auth-signin-email')?.value;
  const pass = document.getElementById('auth-signin-pass')?.value;
  const errBox = document.getElementById('auth-error-msg');
  const submitBtn = document.getElementById('auth-signin-submit');

  try {
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = "Authenticating...";
    }
    await CommanderAuth.signIn(email, pass);
    closeAuthModal();
    renderCommanderHeaderBadge();
    showAuthToast("Welcome back, Commander " + CommanderAuth.getCurrentUser().callsign + "!");
  } catch (err) {
    if (errBox) {
      errBox.innerText = err.message;
      errBox.classList.remove('hidden');
    }
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = "Sign In to Cloud Hangar";
    }
  }
};

window.submitSignUp = async function(e) {
  e.preventDefault();
  const callsign = document.getElementById('auth-signup-callsign')?.value;
  const email = document.getElementById('auth-signup-email')?.value;
  const pass = document.getElementById('auth-signup-pass')?.value;
  const errBox = document.getElementById('auth-error-msg');
  const submitBtn = document.getElementById('auth-signup-submit');

  try {
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = "Creating Secure Account...";
    }
    await CommanderAuth.signUp(callsign, email, pass);
    closeAuthModal();
    renderCommanderHeaderBadge();
    showAuthToast("Commander " + callsign + " registered & cloud sync enabled!");
  } catch (err) {
    if (errBox) {
      errBox.innerText = err.message;
      errBox.classList.remove('hidden');
    }
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = "Create Cloud Profile";
    }
  }
};

window.triggerManualCloudSync = function() {
  const success = CommanderAuth.syncHangarToCloud();
  if (success) {
    showAuthToast("✓ Hangars & Inventory Synced to Cloud!");
  } else {
    openAuthModal('signin');
  }
};

function showAuthToast(msg) {
  let toast = document.getElementById('auth-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'auth-toast';
    toast.className = 'fixed bottom-6 right-6 z-50 px-4 py-3 bg-[#111620] border border-amber-500/50 text-amber-300 font-bold text-xs rounded-xl shadow-2xl backdrop-blur-md transition-all animate-in fade-in duration-200';
    document.body.appendChild(toast);
  }
  toast.innerText = msg;
  toast.classList.remove('hidden');
  setTimeout(() => { toast.classList.add('hidden'); }, 3000);
}

window.renderCommanderHeaderBadge = function() {
  const container = document.getElementById('commander-auth-badge-container');
  if (!container) return;

  const user = CommanderAuth.getCurrentUser();
  if (user) {
    container.innerHTML = `
      <div class="relative group">
        <button class="px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 shadow transition-all">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>${user.avatar || '🤖'} ${user.callsign}</span>
          <span class="text-[10px] text-gray-400">▾</span>
        </button>
        <div class="absolute right-0 top-full mt-2 w-52 bg-[#111620] border border-[#263040] rounded-xl shadow-2xl p-2 hidden group-hover:block space-y-1 z-50">
          <div class="p-2 border-b border-[#263040] text-[11px]">
            <div class="font-bold text-white">${user.callsign}</div>
            <div class="text-gray-400 font-mono text-[10px] truncate">${user.email}</div>
            <div class="text-emerald-400 font-bold text-[9px] mt-0.5">☁️ Cloud Sync Active</div>
          </div>
          <button onclick="triggerManualCloudSync()" class="w-full text-left px-2.5 py-1.5 text-xs text-gray-200 hover:bg-[#1c2436] rounded-lg transition-all flex items-center gap-1.5">
            🔄 Force Cloud Sync
          </button>
          <button onclick="CommanderAuth.signOut()" class="w-full text-left px-2.5 py-1.5 text-xs text-red-400 hover:bg-red-500/20 rounded-lg transition-all flex items-center gap-1.5">
            🚪 Logout
          </button>
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <button onclick="openAuthModal('signin')" class="px-3 py-1.5 text-xs font-bold rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5 shadow transition-all">
        🔒 Commander Login
      </button>
    `;
  }
};

window.addEventListener('DOMContentLoaded', () => {
  renderCommanderHeaderBadge();
});
