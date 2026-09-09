/* WRBrain - Ad & Sponsorship Management Engine */

/**
 * GOOGLE ADSENSE SETUP (100% Free):
 * 1. Sign up for free at https://adsense.google.com/
 * 2. Paste your Publisher Client ID below (e.g. "ca-pub-1234567890123456").
 * 3. Set ADSENSE_ENABLED to true.
 * 4. Google AdSense will automatically serve real ads in all designated slots!
 */
window.WRBrainAdsConfig = {
  ADSENSE_ENABLED: false,             // Set to true once approved by Google AdSense
  ADSENSE_CLIENT_ID: "ca-pub-XXXXXXXXXXXXXXXX", // Your free Google AdSense Publisher ID
  ADSENSE_SLOT_TOP: "1234567890",    // Optional specific AdSense slot IDs
  ADSENSE_SLOT_BOTTOM: "0987654321"
};

function initWRBrainAds() {
  if (window.WRBrainAdsConfig.ADSENSE_ENABLED && window.WRBrainAdsConfig.ADSENSE_CLIENT_ID !== "ca-pub-XXXXXXXXXXXXXXXX") {
    // Load official Google AdSense script
    const adSenseScript = document.createElement('script');
    adSenseScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${window.WRBrainAdsConfig.ADSENSE_CLIENT_ID}`;
    adSenseScript.async = true;
    adSenseScript.crossOrigin = "anonymous";
    document.head.appendChild(adSenseScript);

    // Replace ad placeholders with real Google Ad units
    document.querySelectorAll('.wrbrain-ad-slot').forEach(slot => {
      slot.innerHTML = `
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="${window.WRBrainAdsConfig.ADSENSE_CLIENT_ID}"
             data-ad-slot="${slot.dataset.adSlot || window.WRBrainAdsConfig.ADSENSE_SLOT_TOP}"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      `;
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    });
  }
}

window.dismissAdBanner = function(bannerId) {
  const el = document.getElementById(bannerId);
  if (el) {
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 250);
  }
};

window.addEventListener('DOMContentLoaded', () => {
  initWRBrainAds();
});
