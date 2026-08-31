(function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  const publicPages = new Set(['login.html','register.html','setup-required.html']);
  if (publicPages.has(page)) return;

  function goLogin() {
    const next = encodeURIComponent(location.pathname.split('/').pop() + location.search + location.hash);
    location.replace('login.html?next=' + next);
  }

  if (!window.PHALUAY_FIREBASE_READY || !window.phaluayAuth) {
    location.replace('setup-required.html');
    return;
  }

  document.documentElement.classList.add('auth-checking');
  window.phaluayAuth.onAuthStateChanged(async (user) => {
    if (!user) return goLogin();
    document.documentElement.classList.remove('auth-checking');
    document.documentElement.classList.add('auth-ready');
    document.querySelectorAll('[data-auth-user]').forEach(el => {
      el.textContent = user.displayName || user.email || user.phoneNumber || 'ACCOUNT';
    });
    document.querySelectorAll('[data-auth-photo]').forEach(el => {
      if (user.photoURL) { el.src = user.photoURL; el.hidden = false; }
    });
  });
})();
