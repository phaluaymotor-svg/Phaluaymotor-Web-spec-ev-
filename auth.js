(function () {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const msg = $('#authMessage');
  const loginForm = $('#emailLoginForm');
  const registerForm = $('#emailRegisterForm');
  const phoneForm = $('#phoneForm');
  const otpForm = $('#otpForm');
  let confirmationResult = null;

  const langText = {
    th: { invalid:'กรุณาตรวจสอบข้อมูลอีกครั้ง', sent:'ส่งรหัส OTP แล้ว', reset:'ส่งลิงก์ตั้งรหัสผ่านใหม่แล้ว กรุณาตรวจอีเมล', google:'กำลังเปิด Google…' },
    lo: { invalid:'ກະລຸນາກວດຂໍ້ມູນອີກຄັ້ງ', sent:'ສົ່ງລະຫັດ OTP ແລ້ວ', reset:'ສົ່ງລິ້ງປ່ຽນລະຫັດຜ່ານແລ້ວ', google:'ກຳລັງເປີດ Google…' },
    en: { invalid:'Please check your information and try again.', sent:'OTP sent.', reset:'Password reset email sent.', google:'Opening Google…' }
  };
  const lang = () => localStorage.getItem('phaluay_lang') || 'th';
  const t = (k) => (langText[lang()] || langText.th)[k] || k;

  function setMsg(text, type='info') {
    if (!msg) return;
    msg.textContent = text;
    msg.className = 'auth-message ' + type;
    msg.hidden = !text;
  }
  function friendly(err) {
    const code = err && err.code || '';
    const map = {
      'auth/invalid-credential':'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
      'auth/email-already-in-use':'อีเมลนี้สมัครสมาชิกแล้ว',
      'auth/weak-password':'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร',
      'auth/invalid-email':'รูปแบบอีเมลไม่ถูกต้อง',
      'auth/too-many-requests':'ลองหลายครั้งเกินไป กรุณารอสักครู่แล้วลองใหม่',
      'auth/popup-closed-by-user':'ปิดหน้าต่าง Google ก่อนเข้าสู่ระบบเสร็จ',
      'auth/invalid-phone-number':'กรุณาใส่เบอร์โทรในรูปแบบสากล เช่น +8562092224844',
      'auth/invalid-verification-code':'รหัส OTP ไม่ถูกต้อง',
      'auth/code-expired':'รหัส OTP หมดอายุ กรุณาขอใหม่'
    };
    return map[code] || err.message || t('invalid');
  }
  function nextUrl() {
    const p = new URLSearchParams(location.search).get('next');
    if (!p || /^https?:/i.test(p) || p.startsWith('//')) return 'index.html';
    return p;
  }
  async function saveProfile(user, extra={}) {
    try {
      if (!firebase.firestore) return;
      const db = firebase.firestore();
      await db.collection('customers').doc(user.uid).set({
        uid:user.uid,
        email:user.email || null,
        phone:user.phoneNumber || null,
        displayName:user.displayName || extra.displayName || null,
        photoURL:user.photoURL || null,
        provider:(user.providerData[0] && user.providerData[0].providerId) || null,
        lastLoginAt: firebase.firestore.FieldValue.serverTimestamp(),
        createdAt: (user.metadata && user.metadata.creationTime) || null
      }, { merge:true });
    } catch(e) { console.warn('Profile save skipped', e); }
  }

  if (!window.PHALUAY_FIREBASE_READY || !window.phaluayAuth) {
    location.replace('setup-required.html');
    return;
  }

  window.phaluayAuth.onAuthStateChanged(user => {
    if (user && location.pathname.endsWith('login.html')) location.replace(nextUrl());
  });

  $$('.auth-tab').forEach(btn => btn.addEventListener('click', () => {
    $$('.auth-tab').forEach(b=>b.classList.toggle('active', b===btn));
    $$('.auth-panel').forEach(p=>p.hidden = p.id !== btn.dataset.panel);
    setMsg('');
  }));

  if (loginForm) loginForm.addEventListener('submit', async e => {
    e.preventDefault(); setMsg('');
    const fd = new FormData(loginForm);
    try {
      const cred = await window.phaluayAuth.signInWithEmailAndPassword(fd.get('email').trim(), fd.get('password'));
      await saveProfile(cred.user);
      location.replace(nextUrl());
    } catch(err){ setMsg(friendly(err),'error'); }
  });

  if (registerForm) registerForm.addEventListener('submit', async e => {
    e.preventDefault(); setMsg('');
    const fd = new FormData(registerForm);
    if (fd.get('password') !== fd.get('confirmPassword')) return setMsg('รหัสผ่านทั้งสองช่องไม่ตรงกัน','error');
    try {
      const cred = await window.phaluayAuth.createUserWithEmailAndPassword(fd.get('email').trim(), fd.get('password'));
      if (fd.get('displayName')) await cred.user.updateProfile({displayName:fd.get('displayName').trim()});
      await cred.user.sendEmailVerification().catch(()=>{});
      await saveProfile(cred.user,{displayName:fd.get('displayName')});
      location.replace('index.html');
    } catch(err){ setMsg(friendly(err),'error'); }
  });

  $$('.google-login').forEach(btn => btn.addEventListener('click', async () => {
    setMsg(t('google'));
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({prompt:'select_account'});
      const cred = await window.phaluayAuth.signInWithPopup(provider);
      await saveProfile(cred.user);
      location.replace(nextUrl());
    } catch(err){ setMsg(friendly(err),'error'); }
  }));

  async function ensureRecaptcha() {
    if (window.recaptchaVerifier) return window.recaptchaVerifier;
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {size:'normal'});
    await window.recaptchaVerifier.render();
    return window.recaptchaVerifier;
  }
  if (phoneForm) phoneForm.addEventListener('submit', async e => {
    e.preventDefault(); setMsg('');
    let phone = new FormData(phoneForm).get('phone').trim().replace(/\s+/g,'');
    if (/^20\d+/.test(phone)) phone = '+856' + phone;
    if (!phone.startsWith('+')) return setMsg('กรุณาใส่เบอร์ เช่น +8562092224844','error');
    try {
      const verifier = await ensureRecaptcha();
      confirmationResult = await window.phaluayAuth.signInWithPhoneNumber(phone, verifier);
      $('#otpPhoneLabel').textContent = phone;
      phoneForm.hidden = true; otpForm.hidden = false;
      setMsg(t('sent'),'success');
    } catch(err){
      if (window.recaptchaVerifier) { window.recaptchaVerifier.clear(); window.recaptchaVerifier=null; }
      setMsg(friendly(err),'error');
    }
  });
  if (otpForm) otpForm.addEventListener('submit', async e => {
    e.preventDefault(); setMsg('');
    try {
      const code = new FormData(otpForm).get('otp').trim();
      const cred = await confirmationResult.confirm(code);
      await saveProfile(cred.user);
      location.replace(nextUrl());
    } catch(err){ setMsg(friendly(err),'error'); }
  });

  const resetBtn = $('#forgotPassword');
  if (resetBtn) resetBtn.addEventListener('click', async e => {
    e.preventDefault();
    const email = ($('#loginEmail') && $('#loginEmail').value.trim()) || prompt('กรอกอีเมลที่ใช้สมัครสมาชิก');
    if (!email) return;
    try { await window.phaluayAuth.sendPasswordResetEmail(email); setMsg(t('reset'),'success'); }
    catch(err){ setMsg(friendly(err),'error'); }
  });

  $$('.auth-lang button').forEach(btn=>btn.addEventListener('click',()=>{
    localStorage.setItem('phaluay_lang',btn.dataset.lang);
    location.reload();
  }));
})();
