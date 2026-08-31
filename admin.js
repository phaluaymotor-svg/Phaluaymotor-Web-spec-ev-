(function(){
  const $=s=>document.querySelector(s); const tbody=$('#usersTableBody'); const msg=$('#adminMessage');
  function show(m,type='info'){msg.textContent=m;msg.className='auth-message '+type;msg.hidden=!m;}
  if(!window.PHALUAY_FIREBASE_READY || !window.phaluayAuth || !window.phaluayFunctions) return location.replace('setup-required.html');
  window.phaluayAuth.onAuthStateChanged(async user=>{
    if(!user) return location.replace('login.html?next=admin.html');
    const token=await user.getIdTokenResult(true);
    if(token.claims.admin!==true){ $('#adminApp').hidden=true; $('#notAdmin').hidden=false; return; }
    loadUsers();
  });
  async function loadUsers(){
    show('กำลังโหลดบัญชีลูกค้า…');
    try{
      const fn=window.phaluayFunctions.httpsCallable('listUsers'); const res=await fn({maxResults:500});
      tbody.innerHTML='';
      res.data.users.forEach(u=>{
        const tr=document.createElement('tr');
        tr.innerHTML=`<td>${escapeHtml(u.displayName||'—')}</td><td>${escapeHtml(u.email||'—')}</td><td>${escapeHtml(u.phoneNumber||'—')}</td><td>${u.disabled?'ปิดใช้งาน':'ใช้งาน'}</td><td><button data-disable="${u.uid}" data-state="${!u.disabled}">${u.disabled?'เปิด':'ปิด'}บัญชี</button> <button class="danger" data-delete="${u.uid}">ลบ</button></td>`;
        tbody.appendChild(tr);
      });
      show(`พบ ${res.data.users.length} บัญชี`,'success');
    }catch(e){show(e.message,'error');}
  }
  function escapeHtml(s){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
  tbody.addEventListener('click',async e=>{
    const d=e.target.closest('[data-disable]'); const x=e.target.closest('[data-delete]');
    try{
      if(d){ const fn=window.phaluayFunctions.httpsCallable('setUserDisabled'); await fn({uid:d.dataset.disable,disabled:d.dataset.state==='true'}); await loadUsers(); }
      if(x && confirm('ยืนยันลบบัญชีนี้?')){ const fn=window.phaluayFunctions.httpsCallable('deleteUser'); await fn({uid:x.dataset.delete}); await loadUsers(); }
    }catch(err){show(err.message,'error');}
  });
  $('#refreshUsers').addEventListener('click',loadUsers);
})();
