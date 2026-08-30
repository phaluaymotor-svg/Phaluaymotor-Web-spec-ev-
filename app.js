(() => {
  const cars = window.PHALUAY_CARS || [];
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const unique = arr => [...new Set(arr)].sort((a,b)=>a.localeCompare(b));
  const state = { brand:'all', query:'', shown:8, compare:[] };

  const vehicleGrid = $('#vehicleGrid');
  const brandTabs = $('#brandTabs');
  const heroBrand = $('#heroBrand');
  const heroModel = $('#heroModel');
  const heroBody = $('#heroBody');
  const heroPrice = $('#heroPrice');
  const inventorySearch = $('#inventorySearch');
  const loadMoreBtn = $('#loadMoreBtn');
  const dialog = $('#vehicleDialog');
  const dialogContent = $('#dialogContent');
  const toast = $('#toast');

  function opt(value,label){ const o=document.createElement('option'); o.value=value; o.textContent=label; return o; }
  function populateFilters(){
    unique(cars.map(c=>c.brand)).forEach(v=>heroBrand.append(opt(v,v)));
    unique(cars.map(c=>c.model)).forEach(v=>heroModel.append(opt(v,v)));
    unique(cars.map(c=>c.body)).forEach(v=>heroBody.append(opt(v,v)));
    const tabs=['all',...unique(cars.map(c=>c.brand))];
    brandTabs.innerHTML=tabs.map(b=>`<button data-brand="${b}" class="${b==='all'?'active':''}">${b==='all'?'ALL VEHICLES':b.toUpperCase()}</button>`).join('');
    $('#brandLogoRow').innerHTML=unique(cars.map(c=>c.brand)).map(b=>`<span class="brand-logo">${b}</span>`).join('');
    $('#totalModels').textContent=cars.length+'+';
    $('#totalBrands').textContent=unique(cars.map(c=>c.brand)).length+'+';
    const lead=$('#leadModel'); lead.innerHTML='<option value="">เลือกรุ่นรถ</option>'+cars.map(c=>`<option>${c.brand} ${c.model}</option>`).join('');
    $$('.compareSelect').forEach((s,i)=>{s.innerHTML=`<option value="">เลือกรถคันที่ ${i+1}</option>`+cars.map(c=>`<option value="${c.id}">${c.brand} ${c.model}</option>`).join('')});
  }

  function matchesHero(c){
    const max=heroPrice.value==='all'?Infinity:Number(heroPrice.value);
    return (heroBrand.value==='all'||c.brand===heroBrand.value) &&
      (heroModel.value==='all'||c.model===heroModel.value) &&
      (heroBody.value==='all'||c.body===heroBody.value) &&
      (c.priceNumber==null || c.priceNumber<=max);
  }
  function filteredCars(){
    const q=state.query.trim().toLowerCase();
    return cars.filter(c => (state.brand==='all'||c.brand===state.brand) && (!q || [c.brand,c.model,c.body,c.energy,c.range,c.price,c.description].join(' ').toLowerCase().includes(q)));
  }
  function card(c){
    const selected=state.compare.includes(c.id);
    return `<article class="vehicle-card" data-id="${c.id}">
      <div class="vehicle-image">
        <span class="vehicle-badge">${c.year} • ${c.status}</span>
        <button class="compare-check ${selected?'selected':''}" data-action="compare">${selected?'✓ SELECTED':'+ COMPARE'}</button>
        <img src="${c.image}" alt="${c.brand} ${c.model}" loading="lazy" referrerpolicy="no-referrer" onerror="this.style.display='none';this.parentElement.style.background='linear-gradient(135deg,#dce8f1,#ffffff)'" />
      </div>
      <div class="vehicle-content">
        <span class="vehicle-brand">${c.brand.toUpperCase()} • ${c.energy}</span>
        <h3>${c.model}</h3>
        <div class="vehicle-spec-mini"><span>⚡ ${c.range}</span><span>◉ ${c.drive}</span><span>♙ ${c.seats} ที่นั่ง</span></div>
        <div class="vehicle-price">${c.price}</div>
        <div class="vehicle-actions"><a class="details-btn" href="detail.html?id=${encodeURIComponent(c.id)}">VIEW DETAILS →</a><button class="book-small" data-action="book">จอง / สอบถาม</button></div>
      </div>
    </article>`;
  }
  function renderCars(list=filteredCars()){
    const visible=list.slice(0,state.shown);
    vehicleGrid.innerHTML=visible.length?visible.map(card).join(''):'<div class="empty-state">ไม่พบรถตามเงื่อนไขที่ค้นหา</div>';
    loadMoreBtn.style.display=list.length>state.shown?'inline-flex':'none';
  }
  function showToast(msg){toast.textContent=msg;toast.classList.add('show');clearTimeout(showToast.t);showToast.t=setTimeout(()=>toast.classList.remove('show'),1800)}

  function toggleCompare(id){
    const ix=state.compare.indexOf(id);
    if(ix>=0) state.compare.splice(ix,1);
    else if(state.compare.length<3) state.compare.push(id);
    else return showToast('เปรียบเทียบได้สูงสุด 3 รุ่น');
    syncCompareUI(); renderCars(); renderCompare();
  }
  function syncCompareUI(){
    $$('.compareSelect').forEach((s,i)=>s.value=state.compare[i]||'');
    $('#dockCount').textContent=`${state.compare.length}/3`;
    $('#dockCars').innerHTML=state.compare.map(id=>{const c=cars.find(x=>x.id===id);return c?`<span class="dock-chip">${c.brand} ${c.model}</span>`:''}).join('');
    $('#compareDock').classList.toggle('show',state.compare.length>0);
  }
  function renderCompare(){
    const chosen=state.compare.map(id=>cars.find(c=>c.id===id)).filter(Boolean);
    const rows=[['ราคา','price'],['ระบบพลังงาน','energy'],['ตัวถัง','body'],['ระยะทาง','range'],['มาตรฐานระยะทาง','rangeCycle'],['แบตเตอรี่','battery'],['กำลังมอเตอร์','power'],['แรงบิด','torque'],['แรงม้า','horsepower'],['0–100 km/h','zeroTo100'],['ความเร็วสูงสุด','topSpeed'],['ระบบขับเคลื่อน','drive'],['ที่นั่ง','seats']];
    if(!chosen.length){$('#compareTable').innerHTML='<tbody><tr><td style="padding:25px">เลือกรถจากการ์ดหรือช่องด้านบนเพื่อเริ่มเปรียบเทียบ</td></tr></tbody>';return}
    $('#compareTable').innerHTML=`<thead><tr><th>สเป็ก</th>${chosen.map(c=>`<th>${c.brand} ${c.model}</th>`).join('')}</tr></thead><tbody>${rows.map(([label,key])=>`<tr><td>${label}</td>${chosen.map(c=>`<td>${c[key]||'—'}</td>`).join('')}</tr>`).join('')}</tbody>`;
  }
  function openDetails(c){
    dialogContent.innerHTML=`<div class="detail-hero"><img src="${c.image}" alt="${c.brand} ${c.model}" referrerpolicy="no-referrer" onerror="this.style.display='none'"/><div class="detail-hero-copy"><small>${c.brand.toUpperCase()} • ${c.energy} • ${c.year}</small><h2>${c.model}</h2><p>${c.description}</p><div class="detail-price">${c.price}</div></div></div>
    <div class="detail-grid">${[['ระยะทาง',c.range],['แบตเตอรี่',c.battery],['กำลัง',c.power],['แรงบิด',c.torque],['แรงม้า',c.horsepower],['0–100',c.zeroTo100],['ขับเคลื่อน',c.drive],['ที่นั่ง',c.seats]].map(([a,b])=>`<div><span>${a}</span><b>${b}</b></div>`).join('')}</div>
    <div class="detail-note">* ราคาและสเป็กบางรายการอาจแตกต่างตามรุ่นย่อย ปีผลิต และตลาด กรุณายืนยันข้อมูลล่าสุดกับฝ่ายขายก่อนสั่งจอง</div>
    <div class="detail-actions"><button class="btn btn-primary" data-dialog-book="${c.id}">จอง / ขอราคา</button><button class="btn btn-outline" data-dialog-compare="${c.id}">${state.compare.includes(c.id)?'นำออกจากการเทียบ':'เพิ่มไปเปรียบเทียบ'}</button></div>`;
    dialog.showModal();
  }
  function prefillBooking(c){$('#leadModel').value=`${c.brand} ${c.model}`;dialog.open&&dialog.close();location.hash='contact';setTimeout(()=>$('#leadForm input[name="name"]').focus(),350)}

  vehicleGrid.addEventListener('click',e=>{
    const btn=e.target.closest('button'); if(!btn)return;
    const el=e.target.closest('.vehicle-card'); const c=cars.find(x=>x.id===el?.dataset.id); if(!c)return;
    if(btn.dataset.action==='compare')toggleCompare(c.id);
    if(btn.dataset.action==='details')openDetails(c);
    if(btn.dataset.action==='book')prefillBooking(c);
  });
  brandTabs.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;state.brand=b.dataset.brand;state.shown=8;$$('button',brandTabs).forEach(x=>x.classList.toggle('active',x===b));renderCars()});
  inventorySearch.addEventListener('input',()=>{state.query=inventorySearch.value;state.shown=8;renderCars()});
  loadMoreBtn.addEventListener('click',()=>{state.shown+=8;renderCars()});
  $('#heroSearch').addEventListener('click',()=>{const list=cars.filter(matchesHero);state.brand='all';state.query='';state.shown=Math.max(8,list.length);vehicleGrid.innerHTML=list.length?list.map(card).join(''):'<div class="empty-state">ไม่พบรถตามตัวกรอง</div>';loadMoreBtn.style.display='none';location.hash='inventory'});
  $('#showAllBtn').addEventListener('click',()=>{state.brand='all';state.query='';state.shown=8;heroBrand.value=heroModel.value=heroBody.value=heroPrice.value='all';inventorySearch.value='';$$('button',brandTabs).forEach(x=>x.classList.toggle('active',x.dataset.brand==='all'));renderCars();location.hash='inventory'});
  heroBrand.addEventListener('change',()=>{const brand=heroBrand.value;heroModel.innerHTML='<option value="all">ทุกรุ่น</option>'+cars.filter(c=>brand==='all'||c.brand===brand).map(c=>`<option value="${c.model}">${c.model}</option>`).join('')});
  $$('.compareSelect').forEach((s,i)=>s.addEventListener('change',()=>{const val=s.value;const old=state.compare[i];if(old)state.compare=state.compare.filter(x=>x!==old);if(val&&!state.compare.includes(val)){if(state.compare.length<3)state.compare.splice(i,0,val)}state.compare=state.compare.filter(Boolean).slice(0,3);syncCompareUI();renderCompare();renderCars()}));
  $('#clearCompare').addEventListener('click',()=>{state.compare=[];syncCompareUI();renderCompare();renderCars()});
  $('#dialogClose').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();const b=e.target.closest('[data-dialog-book]');if(b){const c=cars.find(x=>x.id===b.dataset.dialogBook);if(c)prefillBooking(c)}const cp=e.target.closest('[data-dialog-compare]');if(cp){toggleCompare(cp.dataset.dialogCompare);dialog.close()}});
  $('#menuToggle').addEventListener('click',()=>$('#mainNav').classList.toggle('open'));
  $$('#mainNav a').forEach(a=>a.addEventListener('click',()=>$('#mainNav').classList.remove('open')));

  $('#leadForm').addEventListener('submit',e=>{
    e.preventDefault(); const data=Object.fromEntries(new FormData(e.currentTarget));
    const msg=`สวัสดี PHALUAY MOTOR\nชื่อ: ${data.name}\nเบอร์โทร: ${data.phone}\nรุ่นที่สนใจ: ${data.model}\nต้องการ: ${data.intent}\nรายละเอียด: ${data.note||'-'}`;
    const url='https://wa.me/8562092224844?text='+encodeURIComponent(msg);
    const result=$('#leadResult'); result.hidden=false;result.innerHTML=`<strong>ข้อความพร้อมส่งแล้ว</strong><pre>${msg}</pre><div class="result-actions"><a class="btn btn-whatsapp" target="_blank" rel="noopener" href="${url}">ส่ง WhatsApp</a><a class="btn btn-outline" href="tel:+8562092224844">โทร 92224844</a><button type="button" class="btn btn-light" id="copyLead">คัดลอกข้อความ</button></div>`;
    $('#copyLead').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(msg);showToast('คัดลอกข้อความแล้ว')}catch{showToast('กดค้างที่ข้อความเพื่อคัดลอก')}});
  });

  populateFilters(); renderCars(); renderCompare(); syncCompareUI();
})();
