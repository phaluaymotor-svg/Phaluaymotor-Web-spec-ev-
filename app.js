(() => {
  const cars = window.PHALUAY_CARS || [];
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const unique = arr => [...new Set(arr)].sort((a,b)=>a.localeCompare(b));
  const state = { brand:'all', query:'', shown:12, compare:[] };

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
  const inventoryMeta = $('#inventoryMeta');

  function opt(value,label){ const o=document.createElement('option'); o.value=value; o.textContent=label; return o; }
  function populateFilters(){
    unique(cars.map(c=>c.brand)).forEach(v=>heroBrand.append(opt(v,v)));
    unique(cars.map(c=>c.model)).forEach(v=>heroModel.append(opt(v,v)));
    unique(cars.map(c=>c.body)).forEach(v=>heroBody.append(opt(v,v)));
    const tabs=['all',...unique(cars.map(c=>c.brand))];
    brandTabs.innerHTML=tabs.map(b=>`<button data-brand="${b}" class="${b==='all'?'active':''}">${b==='all'?'ALL VEHICLES':b.toUpperCase()}</button>`).join('');
    $('#brandLogoRow').innerHTML=unique(cars.map(c=>c.brand)).map(b=>`<span class="brand-logo">${b}</span>`).join('');
    $('#totalModels').dataset.count=cars.length;
    $('#totalBrands').dataset.count=unique(cars.map(c=>c.brand)).length;
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
    return cars.filter(c => (state.brand==='all'||c.brand===state.brand) && (!q || [c.brand,c.model,c.body,c.energy,c.range,c.price,c.description,c.status].join(' ').toLowerCase().includes(q)));
  }
  function card(c){
    const selected=state.compare.includes(c.id);
    const sourceBadge=c.sourceUrl?'<span class="verified-chip">✓ VERIFIED SOURCE</span>':'';
    return `<article class="vehicle-card reveal-card" data-id="${c.id}" tabindex="0">
      <div class="vehicle-image">
        <div class="vehicle-fallback"><b>${c.brand}</b><strong>${c.model}</strong><span>PHALUAY MOTOR</span></div>
        <span class="vehicle-badge">${c.year} • ${c.status}</span>
        ${sourceBadge}
        <span class="spin-chip">360°</span>
        <button class="compare-check ${selected?'selected':''}" data-action="compare">${selected?'✓ SELECTED':'+ COMPARE'}</button>
        <img src="${c.image}" alt="${c.brand} ${c.model}" loading="lazy" referrerpolicy="no-referrer" onerror="this.style.display='none';this.parentElement.classList.add('image-failed')" />
      </div>
      <div class="vehicle-content">
        <span class="vehicle-brand">${c.brand.toUpperCase()} • ${c.energy}</span>
        <h3>${c.model}</h3>
        <div class="vehicle-spec-mini"><span>⚡ ${c.range}</span><span>◉ ${c.drive}</span><span>♙ ${c.seats} ที่นั่ง</span></div>
        <div class="vehicle-price">${c.price}</div>
        <div class="vehicle-actions"><a class="details-btn ripple-target" href="detail.html?id=${encodeURIComponent(c.id)}">VIEW DETAILS →</a><button class="book-small ripple-target" data-action="book">จอง / สอบถาม</button></div>
      </div>
    </article>`;
  }
  function renderCars(list=filteredCars()){
    const visible=list.slice(0,state.shown);
    vehicleGrid.innerHTML=visible.length?visible.map(card).join(''):'<div class="empty-state">ไม่พบรถตามเงื่อนไขที่ค้นหา</div>';
    loadMoreBtn.style.display=list.length>state.shown?'inline-flex':'none';
    if(inventoryMeta) inventoryMeta.innerHTML=`แสดง <strong>${visible.length}</strong> จาก <strong>${list.length}</strong> รุ่น • ฐานข้อมูลรวม <strong>${cars.length}</strong> รุ่น`;
    requestAnimationFrame(()=>{setupReveal(vehicleGrid);setupTilt(vehicleGrid);});
  }
  function showToast(msg){toast.textContent=msg;toast.classList.add('show');clearTimeout(showToast.t);showToast.t=setTimeout(()=>toast.classList.remove('show'),1900)}

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
    const rows=[
      {label:'ราคา',key:'price',compare:'priceMin'},
      {label:'ระบบพลังงาน',key:'energy'},
      {label:'ตัวถัง',key:'body'},
      {label:'ระยะทาง',key:'range',compare:'rangeMax'},
      {label:'มาตรฐานระยะทาง',key:'rangeCycle'},
      {label:'แบตเตอรี่',key:'battery'},
      {label:'อัตราสิ้นเปลืองไฟ',key:'consumption',compare:'consumptionMin'},
      {label:'กำลังมอเตอร์',key:'power',compare:'max'},
      {label:'แรงบิด',key:'torque',compare:'max'},
      {label:'แรงม้า',key:'horsepower',compare:'max'},
      {label:'0–100 km/h',key:'zeroTo100',compare:'min'},
      {label:'ความเร็วสูงสุด',key:'topSpeed',compare:'max'},
      {label:'ระบบขับเคลื่อน',key:'drive'},
      {label:'ที่นั่ง',key:'seats'},
      {label:'ขนาดตัวรถ (ยาว × กว้าง × สูง)',key:'dimensions'},
      {label:'ฐานล้อ',key:'wheelbase'},
      {label:'ระยะใต้ท้องรถ',key:'groundClearance',compare:'max'},
      {label:'พื้นที่เก็บสัมภาระ',key:'cargo',compare:'max'},
      {label:'ชาร์จ AC',key:'chargeAC'},
      {label:'ชาร์จ DC / Fast Charge',key:'chargeDC'},
      {label:'ระดับระบบช่วยขับ',key:'adasLevel'},
      {label:'กล้อง 360°',key:'camera360',compare:'feature'},
      {label:'ACC ครูซคอนโทรลแปรผัน',key:'acc',compare:'feature'},
      {label:'AEB เบรกฉุกเฉินอัตโนมัติ',key:'aeb',compare:'feature'},
      {label:'LKA ช่วยควบคุมรถในเลน',key:'lka',compare:'feature'},
      {label:'BSD เตือนมุมอับสายตา',key:'bsd',compare:'feature'},
      {label:'Auto Parking',key:'autoPark',compare:'feature'},
      {label:'LiDAR',key:'lidar',compare:'feature'}
    ];

    if(!chosen.length){
      $('#compareTable').innerHTML='<tbody><tr><td class="compare-empty">เลือกรถจากการ์ดหรือช่องด้านบนเพื่อเริ่มเปรียบเทียบ</td></tr></tbody>';
      return;
    }

    const cleanText=v=>String(v??'').trim();
    const hasUnknown=v=>{
      const s=cleanText(v).toLowerCase();
      return !s || s==='—' || /สอบถาม|ยืนยัน|ขึ้นกับ|n\/a|unknown|รุ่นย่อย/.test(s);
    };
    const numberOf=v=>{
      if(hasUnknown(v)) return null;
      const m=cleanText(v).replace(/,/g,'').match(/-?\d+(?:\.\d+)?/);
      return m ? Number(m[0]) : null;
    };
    const featureOf=v=>{
      if(hasUnknown(v)) return null;
      const s=cleanText(v).toLowerCase();
      if(/ไม่มี|ไม่รองรับ|\bno\b|none|not available/.test(s)) return 0;
      if(/มี|มาตรฐาน|standard|yes|available|✓|camera|กล้อง|lidar|เรดาร์/.test(s)) return 1;
      return null;
    };
    const sameRangeBasis=()=>{
      if(chosen.length<2) return false;
      const energies=[...new Set(chosen.map(c=>cleanText(c.energy).toUpperCase()))];
      const cycles=[...new Set(chosen.map(c=>cleanText(c.rangeCycle).toUpperCase().replace(/\s+/g,' ')).filter(s=>s&&s!=='—'))];
      return energies.length===1 && cycles.length===1;
    };
    const sameEnergy=()=>[...new Set(chosen.map(c=>cleanText(c.energy).toUpperCase()))].length===1;
    const exactPrice=c=>c.priceNumber!=null && !/[xX*]|สอบถาม|ประมาณ/.test(cleanText(c.price));

    function bestIndexes(row){
      if(!row.compare || chosen.length<2) return new Set();
      let values=[];
      if(row.compare==='feature'){
        values=chosen.map((c,i)=>({i,v:featureOf(c[row.key])})).filter(x=>x.v!=null);
      } else if(row.compare==='priceMin'){
        values=chosen.map((c,i)=>({i,v:exactPrice(c)?Number(c.priceNumber):null})).filter(x=>x.v!=null);
      } else {
        if(row.compare==='rangeMax' && !sameRangeBasis()) return new Set();
        if(row.compare==='consumptionMin' && !sameEnergy()) return new Set();
        values=chosen.map((c,i)=>({i,v:numberOf(c[row.key])})).filter(x=>x.v!=null);
      }
      if(values.length<2) return new Set();
      const nums=values.map(x=>x.v);
      if(Math.max(...nums)===Math.min(...nums)) return new Set();
      const direction = ['min','priceMin','consumptionMin'].includes(row.compare) ? 'min' : 'max';
      const best = direction==='min' ? Math.min(...nums) : Math.max(...nums);
      return new Set(values.filter(x=>x.v===best).map(x=>x.i));
    }

    const header = `<thead><tr><th class="compare-spec-head">สเป็ก</th>${chosen.map(c=>`
      <th class="compare-car-head">
        <a href="detail.html?id=${encodeURIComponent(c.id)}">
          <span class="compare-car-photo"><img src="${c.image}" alt="${c.brand} ${c.model}" referrerpolicy="no-referrer" onerror="this.style.display='none'"></span>
          <small>${c.brand}</small>
          <strong>${c.model}</strong>
          <em>${c.price||'—'}</em>
        </a>
      </th>`).join('')}</tr></thead>`;

    const body = `<tbody>${rows.map(row=>{
      const best=bestIndexes(row);
      return `<tr><td>${row.label}</td>${chosen.map((c,i)=>{
        const raw=c[row.key]||'—';
        const win=best.has(i);
        return `<td class="${win?'compare-best':''}"><span class="compare-value">${raw}</span>${win?'<span class="best-badge">BEST</span>':''}</td>`;
      }).join('')}</tr>`;
    }).join('')}</tbody>`;

    $('#compareTable').innerHTML=header+body;
  }
  function openDetails(c){
    dialogContent.innerHTML=`<div class="detail-hero"><img src="${c.image}" alt="${c.brand} ${c.model}" referrerpolicy="no-referrer" onerror="this.style.display='none'"/><div class="detail-hero-copy"><small>${c.brand.toUpperCase()} • ${c.energy} • ${c.year}</small><h2>${c.model}</h2><p>${window.PM_I18N?.carDescription(c)||c.description}</p><div class="detail-price">${c.price}</div></div></div>
    <div class="detail-grid">${[['ระยะทาง',c.range],['แบตเตอรี่',c.battery],['กำลัง',c.power],['แรงบิด',c.torque],['แรงม้า',c.horsepower],['0–100',c.zeroTo100],['ขับเคลื่อน',c.drive],['ที่นั่ง',c.seats]].map(([a,b])=>`<div><span>${a}</span><b>${b}</b></div>`).join('')}</div>
    <div class="detail-note">* ราคาและสเป็กบางรายการอาจแตกต่างตามรุ่นย่อย ปีผลิต และตลาด กรุณายืนยันข้อมูลล่าสุดกับฝ่ายขายก่อนสั่งจอง</div>
    <div class="detail-actions"><a class="btn btn-primary" href="detail.html?id=${encodeURIComponent(c.id)}">ดูหน้าสเป็กเต็ม</a><button class="btn btn-outline" data-dialog-compare="${c.id}">${state.compare.includes(c.id)?'นำออกจากการเทียบ':'เพิ่มไปเปรียบเทียบ'}</button></div>`;
    dialog.showModal();
  }
  function prefillBooking(c){$('#leadModel').value=`${c.brand} ${c.model}`;dialog?.open&&dialog.close();location.hash='contact';setTimeout(()=>$('#leadForm input[name="name"]').focus(),350)}

  vehicleGrid.addEventListener('click',e=>{
    const btn=e.target.closest('button'); if(!btn)return;
    const el=e.target.closest('.vehicle-card'); const c=cars.find(x=>x.id===el?.dataset.id); if(!c)return;
    if(btn.dataset.action==='compare')toggleCompare(c.id);
    if(btn.dataset.action==='details')openDetails(c);
    if(btn.dataset.action==='book')prefillBooking(c);
  });
  brandTabs.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;state.brand=b.dataset.brand;state.shown=12;$$('button',brandTabs).forEach(x=>x.classList.toggle('active',x===b));renderCars()});
  inventorySearch.addEventListener('input',()=>{state.query=inventorySearch.value;state.shown=12;renderCars()});
  loadMoreBtn.addEventListener('click',()=>{state.shown+=12;renderCars();showToast('โหลดรถเพิ่มแล้ว')});
  $('#heroSearch').addEventListener('click',()=>{const list=cars.filter(matchesHero);state.brand='all';state.query='';state.shown=Math.max(12,list.length);vehicleGrid.innerHTML=list.length?list.map(card).join(''):'<div class="empty-state">ไม่พบรถตามตัวกรอง</div>';if(inventoryMeta)inventoryMeta.innerHTML=`ผลการค้นหา <strong>${list.length}</strong> รุ่น`;loadMoreBtn.style.display='none';setupReveal(vehicleGrid);setupTilt(vehicleGrid);location.hash='inventory'});
  $('#showAllBtn').addEventListener('click',()=>{state.brand='all';state.query='';state.shown=12;heroBrand.value=heroModel.value=heroBody.value=heroPrice.value='all';inventorySearch.value='';$$('button',brandTabs).forEach(x=>x.classList.toggle('active',x.dataset.brand==='all'));renderCars();location.hash='inventory'});
  heroBrand.addEventListener('change',()=>{const brand=heroBrand.value;heroModel.innerHTML='<option value="all">ทุกรุ่น</option>'+cars.filter(c=>brand==='all'||c.brand===brand).map(c=>`<option value="${c.model}">${c.model}</option>`).join('')});
  $$('.compareSelect').forEach((s,i)=>s.addEventListener('change',()=>{const val=s.value;const old=state.compare[i];if(old)state.compare=state.compare.filter(x=>x!==old);if(val&&!state.compare.includes(val)){if(state.compare.length<3)state.compare.splice(i,0,val)}state.compare=state.compare.filter(Boolean).slice(0,3);syncCompareUI();renderCompare();renderCars()}));
  $('#clearCompare').addEventListener('click',()=>{state.compare=[];syncCompareUI();renderCompare();renderCars()});
  $('#dialogClose').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();const cp=e.target.closest('[data-dialog-compare]');if(cp){toggleCompare(cp.dataset.dialogCompare);dialog.close()}});
  $('#menuToggle').addEventListener('click',()=>$('#mainNav').classList.toggle('open'));
  $$('#mainNav a').forEach(a=>a.addEventListener('click',()=>$('#mainNav').classList.remove('open')));

  document.addEventListener('click',e=>{
    const serviceLink=e.target.closest('[data-service],[data-service-book]');
    if(!serviceLink)return;
    const intent=$('#leadForm select[name="intent"]');
    const note=$('#leadForm textarea[name="note"]');
    if(intent){
      const opt=[...intent.options].find(o=>o.textContent.includes('Service'));
      if(opt) intent.value=opt.value;
    }
    if(note && serviceLink.dataset.service){
      note.value=`ต้องการสอบถาม Service: ${serviceLink.dataset.service}`;
    }
  });

  $('#leadForm').addEventListener('submit',e=>{
    e.preventDefault(); const data=Object.fromEntries(new FormData(e.currentTarget));
    const msg=`สวัสดี PHALUAY MOTOR\nชื่อ: ${data.name}\nเบอร์โทร: ${data.phone}\nรุ่นที่สนใจ: ${data.model}\nต้องการ: ${data.intent}\nรายละเอียด: ${data.note||'-'}`;
    const url='https://wa.me/8562092224844?text='+encodeURIComponent(msg);
    const result=$('#leadResult'); result.hidden=false;result.innerHTML=`<strong>ข้อความพร้อมส่งแล้ว</strong><pre>${msg}</pre><div class="result-actions"><a class="btn btn-whatsapp ripple-target" target="_blank" rel="noopener" href="${url}">ส่ง WhatsApp</a><a class="btn btn-outline ripple-target" href="tel:+8562092224844">โทร 92224844</a><button type="button" class="btn btn-light ripple-target" id="copyLead">คัดลอกข้อความ</button></div>`;
    $('#copyLead').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(msg);showToast('คัดลอกข้อความแล้ว')}catch{showToast('กดค้างที่ข้อความเพื่อคัดลอก')}});
  });

  /* ---------- premium interaction effects ---------- */
  let revealObserver;
  function setupReveal(root=document){
    const targets=$$('.reveal-card, .section-heading, .special-grid article, .service-grid article, .promo-card, .trust-grid article, .about-grid > *, .contact-card > *', root).filter(el=>!el.dataset.revealBound);
    if(!('IntersectionObserver' in window)){targets.forEach(el=>el.classList.add('is-visible'));return}
    revealObserver ||= new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -35px'});
    targets.forEach((el,i)=>{el.dataset.revealBound='1';el.style.setProperty('--reveal-delay',`${Math.min(i%8,6)*45}ms`);revealObserver.observe(el)});
  }

  function setupTilt(root=document){
    if(!matchMedia('(hover:hover) and (pointer:fine)').matches)return;
    $$('.vehicle-card',root).forEach(card=>{
      if(card.dataset.tiltBound)return; card.dataset.tiltBound='1';
      card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;card.style.setProperty('--rx',`${(-y*5).toFixed(2)}deg`);card.style.setProperty('--ry',`${(x*7).toFixed(2)}deg`);card.style.setProperty('--mx',`${((x+.5)*100).toFixed(0)}%`);card.style.setProperty('--my',`${((y+.5)*100).toFixed(0)}%`)});
      card.addEventListener('pointerleave',()=>{card.style.setProperty('--rx','0deg');card.style.setProperty('--ry','0deg')});
    });
  }

  function setupRipple(){
    document.addEventListener('pointerdown',e=>{const el=e.target.closest('.btn,.details-btn,.book-small,.brand-tabs button');if(!el)return;const r=el.getBoundingClientRect();const dot=document.createElement('i');dot.className='ripple-dot';dot.style.left=(e.clientX-r.left)+'px';dot.style.top=(e.clientY-r.top)+'px';el.append(dot);setTimeout(()=>dot.remove(),650)});
  }

  function setupScrollEffects(){
    const progress=$('#scrollProgress');
    const header=$('.site-header');
    const heroImg=$('.hero-car img');
    const onScroll=()=>{const max=document.documentElement.scrollHeight-innerHeight;const p=max>0?scrollY/max:0;if(progress)progress.style.transform=`scaleX(${p})`;header?.classList.toggle('scrolled',scrollY>24);if(heroImg && matchMedia('(min-width:861px)').matches)heroImg.style.transform=`translate3d(0,${Math.min(scrollY*.055,22)}px,0) scale(${1+Math.min(scrollY/12000,.025)})`};
    addEventListener('scroll',onScroll,{passive:true});onScroll();
    const hero=$('.hero');
    if(hero && matchMedia('(hover:hover)').matches){hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;hero.style.setProperty('--parallax-x',`${x*18}px`);hero.style.setProperty('--parallax-y',`${y*12}px`)})}
  }

  function animateCounter(el){
    const target=Number(el.dataset.count||0);if(!target)return;let start=0;const dur=850;const t0=performance.now();
    const step=t=>{const p=Math.min((t-t0)/dur,1);const eased=1-Math.pow(1-p,3);el.textContent=Math.round(start+(target-start)*eased)+'+';if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step);
  }
  function setupCounters(){
    const els=[$('#totalModels'),$('#totalBrands')].filter(Boolean);if(!('IntersectionObserver'in window)){els.forEach(animateCounter);return}
    const io=new IntersectionObserver(entries=>entries.forEach(x=>{if(x.isIntersecting){animateCounter(x.target);io.unobserve(x.target)}}),{threshold:.5});els.forEach(el=>io.observe(el));
  }
  function setupPreloader(){const p=$('#sitePreloader');if(!p)return;requestAnimationFrame(()=>setTimeout(()=>{p.classList.add('hide');setTimeout(()=>p.remove(),650)},380))}

  populateFilters(); renderCars(); renderCompare(); syncCompareUI();
  setupReveal(); setupTilt(); setupRipple(); setupScrollEffects(); setupCounters(); setupPreloader();
})();
