(() => {
  'use strict';

  // --- Yerel saat (üst çubuk) ve mesaj şeridi -----------------------------------
  const saatEl = document.getElementById('saat-yerel');
  const saatBicim = new Intl.DateTimeFormat('tr-TR', { timeZone: 'Europe/Istanbul', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const mesajSaat = document.getElementById('mesaj-saat');
  if (mesajSaat) mesajSaat.textContent = saatBicim.format(new Date());
  if (saatEl) {
    const tik = () => { saatEl.textContent = saatBicim.format(new Date()); };
    tik();
    setInterval(tik, 1000);
  }

  // --- Ray: ekrandaki bölümü işaretle ---------------------------------------------
  const rayLinkleri = [...document.querySelectorAll('.ray a[data-bolum]')];
  const bolumler = rayLinkleri.map(a => document.getElementById(a.dataset.bolum)).filter(Boolean);
  if (bolumler.length > 1) {
    const isaretle = id => {
      for (const a of rayLinkleri) {
        const acik = a.dataset.bolum === id;
        a.classList.toggle('acik', acik);
        if (acik) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      }
    };
    const gozlem = new IntersectionObserver(girdiler => {
      for (const g of girdiler) if (g.isIntersecting) isaretle(g.target.id);
    }, { rootMargin: '-45% 0px -50% 0px' });
    bolumler.forEach(b => gozlem.observe(b));
  }

  // --- Proje filtresi ----------------------------------------------------------
  const filtre = document.querySelector('.filtre');
  if (filtre) {
    filtre.addEventListener('click', e => {
      const secilen = e.target.closest('button');
      if (!secilen) return;
      for (const b of filtre.querySelectorAll('button')) b.setAttribute('aria-pressed', String(b === secilen));
      const k = secilen.dataset.kategori;
      for (const kart of document.querySelectorAll('.kart')) {
        kart.hidden = Boolean(k) && !kart.dataset.kategoriler.split('|').includes(k);
      }
    });
  }

  // --- Işık kutusu: galeri, kapak ve yazı içi görselleri büyütür -------------------
  for (const img of document.querySelectorAll('.yazi img')) {
    if (img.closest('a')) continue;
    const a = document.createElement('a');
    a.href = img.src;
    a.dataset.lightbox = '';
    a.dataset.aciklama = img.alt || '';
    img.replaceWith(a);
    a.appendChild(img);
  }
  const ogeler = [...document.querySelectorAll('[data-lightbox]')];
  if (ogeler.length) {
    const kutu = document.createElement('div');
    kutu.className = 'isik';
    kutu.hidden = true;
    kutu.setAttribute('role', 'dialog');
    kutu.setAttribute('aria-modal', 'true');
    kutu.setAttribute('aria-label', 'Görsel görüntüleyici');
    kutu.innerHTML = '<button class="isik-kapat" type="button" aria-label="Kapat">×</button>' +
      '<button class="isik-onceki" type="button" aria-label="Önceki görsel">‹</button>' +
      '<figure><img alt=""><figcaption></figcaption></figure>' +
      '<button class="isik-sonraki" type="button" aria-label="Sonraki görsel">›</button>';
    document.body.appendChild(kutu);
    const resim = kutu.querySelector('img');
    const yazi = kutu.querySelector('figcaption');
    const coklu = ogeler.length > 1;
    kutu.querySelector('.isik-onceki').hidden = !coklu;
    kutu.querySelector('.isik-sonraki').hidden = !coklu;
    let sira = 0;
    let oncekiOdak = null;

    const goster = i => {
      sira = (i + ogeler.length) % ogeler.length;
      const o = ogeler[sira];
      resim.src = o.getAttribute('href');
      resim.alt = o.dataset.aciklama || '';
      yazi.textContent = o.dataset.aciklama || '';
    };
    const ac = i => {
      oncekiOdak = document.activeElement;
      goster(i);
      kutu.hidden = false;
      document.body.style.overflow = 'hidden';
      kutu.querySelector('.isik-kapat').focus();
    };
    const kapat = () => {
      kutu.hidden = true;
      document.body.style.overflow = '';
      if (oncekiOdak) oncekiOdak.focus();
    };

    ogeler.forEach((o, i) => o.addEventListener('click', e => { e.preventDefault(); ac(i); }));
    kutu.addEventListener('click', e => {
      if (e.target.closest('.isik-onceki')) goster(sira - 1);
      else if (e.target.closest('.isik-sonraki')) goster(sira + 1);
      else if (e.target === kutu || e.target.closest('.isik-kapat')) kapat();
    });
    document.addEventListener('keydown', e => {
      if (kutu.hidden) return;
      if (e.key === 'Escape') kapat();
      else if (e.key === 'ArrowLeft' && coklu) goster(sira - 1);
      else if (e.key === 'ArrowRight' && coklu) goster(sira + 1);
    });
  }

  // --- Pusula şeridi (hero üstü) -------------------------------------------------
  // Şerit 3 tur (−360…720°) çizilir; ortadaki tur gösterilir, böylece 0/360 geçişinde boşluk olmaz.
  const DERECE_PX = 6;
  const pusula = document.getElementById('pusula');
  if (pusula) {
    const ad = { 0: 'N', 45: 'NE', 90: 'E', 135: 'SE', 180: 'S', 225: 'SW', 270: 'W', 315: 'NW' };
    let s = '';
    for (let d = -360; d <= 720; d += 5) {
      const x = d * DERECE_PX;
      const n = ((d % 360) + 360) % 360;
      const buyuk = n % 15 === 0;
      s += `<line x1="${x}" x2="${x}" y1="${buyuk ? 4 : 4}" y2="${buyuk ? 16 : 10}" stroke="rgba(255,255,255,${buyuk ? 0.55 : 0.25})"/>`;
      if (buyuk) {
        const etiket = ad[n] ?? String(n).padStart(3, '0');
        s += `<text x="${x}" y="34" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="12" fill="${ad[n] ? '#f4f4f5' : 'rgba(244,244,245,.55)'}"${ad[n] ? ' font-weight="600"' : ''}>${etiket}</text>`;
      }
    }
    pusula.innerHTML = `<svg width="1" height="46">${s}</svg>`;
  }
  const pusulaYon = derece => {
    if (pusula) pusula.style.transform = `translateX(${(-derece * DERECE_PX).toFixed(1)}px)`;
  };

  // --- Güdüm simülasyonu (hero) -------------------------------------------------
  // Hedef rastgele manevra yaparken önleyici, saf orantılı navigasyon (γ̇ = N·λ̇) ile onu yakalar.
  const tuval = document.getElementById('gudum');
  if (!tuval) return;
  const ctx = tuval.getContext('2d');
  const azHareket = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hucre = id => document.getElementById(id);
  const T = { r: hucre('t-r'), l: hucre('t-l'), vc: hucre('t-vc'), t: hucre('t-t'), d: hucre('t-d') };
  const N = 3;
  const OLCEK = 6; // 1 piksel ≈ 6 m (yalnızca gösterge için)
  const SINIR = 14.5; // kesikli uçuş alanı çizgisinin kenardan uzaklığı (px)
  const PAY = 55; // hedef sınıra bu kadar yaklaşınca merkeze doğru dönmeye başlar (px)
  const RENK = { onleyici: '#ff2433', hedef: '#ffb547', izgara: 'rgba(255,255,255,0.05)', los: 'rgba(244,244,245,0.25)' };
  let G = 0, Y = 0, hedef, onleyici, hedefIz, onleyiciIz, sure, vurus, sonGosterge = 0, lambdaNokta = 0, menzil = 0, kapanma = 0;

  function boyutla() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const k = tuval.getBoundingClientRect();
    G = k.width;
    Y = k.height;
    tuval.width = Math.round(G * dpr);
    tuval.height = Math.round(Y * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function sifirla() {
    const s = Math.min(G, Y);
    const soldan = Math.random() < 0.5;
    hedef = {
      x: soldan ? G * 0.08 : G * 0.92,
      y: Y * (0.18 + Math.random() * 0.22),
      psi: (soldan ? 0 : Math.PI) + (Math.random() - 0.5) * 0.5,
      v: s * 0.13,
      faz: Math.random() * 6.28,
    };
    onleyici = {
      x: G * (0.3 + Math.random() * 0.4),
      y: Y * 0.94,
      psi: -Math.PI / 2 + (Math.random() - 0.5) * 1.2,
      v: s * 0.27,
    };
    hedefIz = [];
    onleyiciIz = [];
    sure = 0;
    vurus = null;
  }

  function adim(dt) {
    sure += dt;
    if (vurus) {
      vurus.t += dt;
      if (vurus.t > 1.6) sifirla();
      return;
    }
    // Hedef manevrası: rastgele kıvrılma + uçuş alanı sınırına yaklaşınca merkeze doğru dönüş
    let hedefDonus = Math.sin(sure * 1.1 + hedef.faz) * 0.75;
    const kenar = Math.min(hedef.x - SINIR, G - SINIR - hedef.x, hedef.y - SINIR, Y - SINIR - hedef.y);
    if (kenar < PAY) {
      const merkezYon = Math.atan2(Y / 2 - hedef.y, G / 2 - hedef.x);
      const fark = Math.atan2(Math.sin(merkezYon - hedef.psi), Math.cos(merkezYon - hedef.psi));
      hedefDonus += fark * 4 * (1 - Math.max(kenar, 0) / PAY);
    }
    hedef.psi += Math.max(-2.4, Math.min(2.4, hedefDonus)) * dt;
    hedef.x = Math.min(G - SINIR, Math.max(SINIR, hedef.x + hedef.v * Math.cos(hedef.psi) * dt));
    hedef.y = Math.min(Y - SINIR, Math.max(SINIR, hedef.y + hedef.v * Math.sin(hedef.psi) * dt));

    const rx = hedef.x - onleyici.x;
    const ry = hedef.y - onleyici.y;
    menzil = Math.hypot(rx, ry);
    const vrx = hedef.v * Math.cos(hedef.psi) - onleyici.v * Math.cos(onleyici.psi);
    const vry = hedef.v * Math.sin(hedef.psi) - onleyici.v * Math.sin(onleyici.psi);
    lambdaNokta = (rx * vry - ry * vrx) / (menzil * menzil);
    kapanma = -(rx * vrx + ry * vry) / menzil;
    const donus = Math.max(-2.6, Math.min(2.6, N * lambdaNokta));
    onleyici.psi += donus * dt;
    onleyici.x += onleyici.v * Math.cos(onleyici.psi) * dt;
    onleyici.y += onleyici.v * Math.sin(onleyici.psi) * dt;

    hedefIz.push([hedef.x, hedef.y]);
    onleyiciIz.push([onleyici.x, onleyici.y]);
    if (hedefIz.length > 600) { hedefIz.shift(); onleyiciIz.shift(); }

    if (menzil < 5) vurus = { x: hedef.x, y: hedef.y, t: 0 };
    else if (sure > 16) sifirla();
  }

  function cizgi(noktalar) {
    if (noktalar.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(noktalar[0][0], noktalar[0][1]);
    for (let i = 1; i < noktalar.length; i++) ctx.lineTo(noktalar[i][0], noktalar[i][1]);
    ctx.stroke();
  }

  function ucak(x, y, psi, renk, boy) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(psi);
    ctx.fillStyle = renk;
    ctx.shadowColor = renk;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(boy, 0);
    ctx.lineTo(-boy * 0.7, boy * 0.65);
    ctx.lineTo(-boy * 0.35, 0);
    ctx.lineTo(-boy * 0.7, -boy * 0.65);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function ciz() {
    ctx.clearRect(0, 0, G, Y);

    // Izgara
    ctx.lineWidth = 1;
    ctx.strokeStyle = RENK.izgara;
    ctx.beginPath();
    for (let x = (G % 32) / 2; x < G; x += 32) { ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, Y); }
    for (let y = (Y % 32) / 2; y < Y; y += 32) { ctx.moveTo(0, y + 0.5); ctx.lineTo(G, y + 0.5); }
    ctx.stroke();

    // Uçuş alanı sınırı (YKİ'deki kesikli bölge çizgisi)
    ctx.setLineDash([5, 6]);
    ctx.strokeStyle = 'rgba(244,244,245,0.22)';
    ctx.strokeRect(14.5, 14.5, G - 29, Y - 29);

    // Hedef izi (kesikli amber)
    ctx.setLineDash([3, 5]);
    ctx.strokeStyle = 'rgba(255,181,71,0.6)';
    ctx.lineWidth = 1.4;
    cizgi(hedefIz);
    ctx.setLineDash([]);

    // Önleyici izi (kırmızı)
    ctx.strokeStyle = RENK.onleyici;
    ctx.lineWidth = 2;
    cizgi(onleyiciIz);

    if (!vurus) {
      // Görüş hattı (LOS)
      ctx.setLineDash([2, 6]);
      ctx.strokeStyle = RENK.los;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(onleyici.x, onleyici.y);
      ctx.lineTo(hedef.x, hedef.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Kilit kutusu
      const k = 12;
      ctx.strokeStyle = RENK.hedef;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
        ctx.moveTo(hedef.x + sx * k, hedef.y + sy * (k - 5));
        ctx.lineTo(hedef.x + sx * k, hedef.y + sy * k);
        ctx.lineTo(hedef.x + sx * (k - 5), hedef.y + sy * k);
      }
      ctx.stroke();
      ucak(hedef.x, hedef.y, hedef.psi, RENK.hedef, 6);
      ucak(onleyici.x, onleyici.y, onleyici.psi, RENK.onleyici, 8);
    } else {
      const a = 1 - vurus.t / 1.6;
      for (let i = 0; i < 3; i++) {
        const r = Math.max(0, vurus.t * 60 - i * 10);
        ctx.strokeStyle = `rgba(255,36,51,${Math.max(0, a - i * 0.2)})`;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(vurus.x, vurus.y, r, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  }

  function gosterge(simdi) {
    // Pusula her karede, sayısal hücreler saniyede ~8 kez güncellenir
    pusulaYon(((onleyici.psi * 180) / Math.PI + 90 + 720) % 360);
    if (simdi - sonGosterge < 120) return;
    sonGosterge = simdi;
    if (vurus) {
      T.r.textContent = '0 m';
      T.l.textContent = '—';
      T.vc.textContent = '—';
      T.d.textContent = 'ÖNLEME ✓';
      T.d.style.color = 'var(--yesil)';
    } else {
      T.r.textContent = `${Math.round(menzil * OLCEK)} m`;
      T.l.textContent = `${lambdaNokta >= 0 ? '+' : ''}${lambdaNokta.toFixed(3)} r/s`;
      T.vc.textContent = `${Math.round(kapanma * OLCEK)} m/s`;
      T.d.textContent = 'TAKİP';
      T.d.style.color = 'var(--amber)';
    }
    T.t.textContent = `${sure.toFixed(1)} s`;
  }

  boyutla();
  sifirla();

  if (azHareket) {
    // Hareket azaltıldıysa tek bir anlık görüntü çiz
    const anlik = () => { for (let i = 0; i < 160 && !vurus; i++) adim(1 / 60); ciz(); gosterge(Infinity); };
    anlik();
    new ResizeObserver(() => { boyutla(); sifirla(); anlik(); }).observe(tuval);
    return;
  }

  let gorunur = true;
  let son = performance.now();
  new IntersectionObserver(([g]) => { gorunur = g.isIntersecting; }).observe(tuval);
  new ResizeObserver(() => { const eskiG = G; boyutla(); if (Math.abs(eskiG - G) > 40) sifirla(); ciz(); }).observe(tuval);

  function dongu(simdi) {
    const dt = Math.min((simdi - son) / 1000, 0.05);
    son = simdi;
    if (gorunur && !document.hidden) {
      adim(dt);
      ciz();
      gosterge(simdi);
    }
    requestAnimationFrame(dongu);
  }
  requestAnimationFrame(dongu);
})();
