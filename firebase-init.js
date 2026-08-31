(function () {
  const cfg = window.PHALUAY_FIREBASE_CONFIG || {};
  const bad = !cfg.apiKey || String(cfg.apiKey).includes('PASTE_') || !cfg.projectId || String(cfg.projectId).includes('PASTE_');
  window.PHALUAY_FIREBASE_READY = !bad;
  if (bad) return;
  if (!window.firebase) throw new Error('Firebase SDK was not loaded.');
  if (!firebase.apps.length) firebase.initializeApp(cfg);
  window.phaluayAuth = firebase.auth();
  window.phaluayAuth.languageCode = localStorage.getItem('phaluay_lang') || 'th';
  window.phaluayFunctions = firebase.functions ? firebase.functions() : null;
})();
