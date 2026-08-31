(function(){
  const $ = s=>document.querySelector(s);
  const out = $('#accountMessage');
  function show(m,type='info'){out.textContent=m;out.className='auth-message '+type;out.hidden=!m;}
  if (!window.PHALUAY_FIREBASE_READY || !window.phaluayAuth) return location.replace('setup-required.html');
  window.phaluayAuth.onAuthStateChanged(async user=>{
    if(!user) return location.replace('login.html?next=account.html');
    $('#profileName').value = user.displayName || '';
    $('#profileEmail').value = user.email || '';
    $('#profilePhone').value = user.phoneNumber || '';
    $('#profileUid').textContent = user.uid;
    $('#profileVerified').textContent = user.email ? (user.emailVerified ? 'Verified ✓':'Not verified') : 'Phone OTP';
    $('#profileProvider').textContent = user.providerData.map(p=>p.providerId).join(', ');
    if(user.photoURL){ $('#profilePhoto').src=user.photoURL; $('#profilePhoto').hidden=false; }
    try { const token=await user.getIdTokenResult(); if(token.claims.admin===true) $('#adminLink').hidden=false; } catch(e){}
  });
  $('#profileForm').addEventListener('submit',async e=>{
    e.preventDefault(); const user=window.phaluayAuth.currentUser;
    try{await user.updateProfile({displayName:$('#profileName').value.trim()});show('บันทึกโปรไฟล์แล้ว','success');}catch(err){show(err.message,'error');}
  });
  $('#verifyEmail').addEventListener('click',async()=>{
    const user=window.phaluayAuth.currentUser;
    if(!user.email) return show('บัญชีนี้เข้าสู่ระบบด้วยเบอร์โทร','error');
    try{await user.sendEmailVerification();show('ส่งอีเมลยืนยันแล้ว','success');}catch(err){show(err.message,'error');}
  });
  $('#changePassword').addEventListener('click',async()=>{
    const user=window.phaluayAuth.currentUser;
    if(!user.email) return show('บัญชี OTP ไม่มีรหัสผ่านอีเมล','error');
    try{await window.phaluayAuth.sendPasswordResetEmail(user.email);show('ส่งลิงก์ตั้งรหัสผ่านใหม่ไปที่อีเมลแล้ว','success');}catch(err){show(err.message,'error');}
  });
  $('#logoutBtn').addEventListener('click',async()=>{await window.phaluayAuth.signOut(); location.replace('login.html');});
})();
