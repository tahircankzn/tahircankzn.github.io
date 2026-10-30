'use strict';
// Sayfa şablonları — EAGLEHEAD YKİ arayüz dilinden esinlenen tema.
// Tüm bağlantılar göreli yazılır; site hangi alt dizinde yayınlanırsa yayınlansın çalışır.

const { kacis: e } = require('./markdown');

const urlMi = s => /^https?:\/\//i.test(s);
const kaynak = (onEk, dosya) => (urlMi(dosya) ? dosya : onEk + encodeURIComponent(dosya));

const svg = (yol, ek = '') => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"${ek}>${yol}</svg>`;
const IKON = {
  ucak: svg('<path d="M12 2.5 14 9l7 3.5v2L14 13l-.6 5 2.6 2v1.5L12 20.5l-4 1V20l2.6-2-.6-5-7 1.5v-2L10 9z"/>'),
  hedef: svg('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5"/><path d="M12 1.5v4M12 18.5v4M1.5 12h4M18.5 12h4"/>'),
  kisi: svg('<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4.5 4.2-6.5 8-6.5s7 2 8 6.5"/>'),
  rota: svg('<circle cx="5" cy="18" r="2"/><circle cx="12" cy="7" r="2"/><circle cx="19" cy="15" r="2"/><path d="m6.3 16.4 4.4-7.8M13.7 8.3l4 5.4"/>'),
  cip: svg('<rect x="6" y="6" width="12" height="12" rx="1.5"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>'),
  anten: svg('<path d="M12 12v10M8 22h8"/><circle cx="12" cy="10" r="2"/><path d="M7.8 5.8a6 6 0 0 0 0 8.4M16.2 5.8a6 6 0 0 1 0 8.4M4.9 2.9a10 10 0 0 0 0 14.2M19.1 2.9a10 10 0 0 1 0 14.2"/>'),
  indir: svg('<path d="M12 3v12m0 0-5-5m5 5 5-5M5 21h14"/>', ' stroke-width="2"'),
  ok: svg('<path d="M5 12h14m-6-6 6 6-6 6"/>', ' stroke-width="2"'),
  geri: svg('<path d="M19 12H5m6-6-6 6 6 6"/>', ' stroke-width="2"'),
  dis: svg('<path d="M7 17 17 7M8 7h9v9"/>', ' stroke-width="2"'),
  posta: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
  belge: svg('<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/>'),
  yildiz: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="m12 2 3 6.6 7.2.8-5.4 4.9 1.5 7.1L12 17.8 5.7 21.4l1.5-7.1L1.8 9.4 9 8.6z"/></svg>',
  github: '<svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>',
  oynat: svg('<rect x="2.5" y="5" width="19" height="14" rx="3"/><path d="m10 9 5 3-5 3z" fill="currentColor"/>'),
  linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>',
};

const MENU = [
  { id: 'baslangic', ad: 'Uçuş', ikon: IKON.ucak },
  { id: 'projeler', ad: 'Projeler', ikon: IKON.hedef },
  { id: 'hakkimda', ad: 'Hakkımda', ikon: IKON.kisi },
  { id: 'deneyim', ad: 'Deneyim', ikon: IKON.rota },
  { id: 'yetenekler', ad: 'Yetenek', ikon: IKON.cip },
  { id: 'kanal', ad: 'Kanal', ikon: IKON.oynat, kosul: site => site.youtube && site.youtube.url },
  { id: 'iletisim', ad: 'İletişim', ikon: IKON.anten },
];

const FAVICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%23060606'/%3E%3Cpath d='M16 5 L27 22 L16 18 L5 22 Z' fill='%23ff2433'/%3E%3C/svg%3E";

// "Tahir Can Kozan" → ön ad beyaz, soyad kırmızı (EAGLE / HEAD gibi)
function ikiRenkAd(ad) {
  const parcalar = String(ad).trim().split(/\s+/);
  const soyad = parcalar.pop();
  return `${e(parcalar.join(' '))}${parcalar.length ? ' ' : ''}<i>${e(soyad)}</i>`;
}

// ---------------------------------------------------------------------------
// Ortak iskelet: üst durum çubuğu + sol ray (mobilde alt sekme çubuğu) + mesaj şeridi
// ---------------------------------------------------------------------------
function iskelet({ site, baslik, aciklama, kok, govde, canli, gorsel, yol = '', aktif = '', projeSayisi = 0 }) {
  const tamUrl = site.site_url ? site.site_url.replace(/\/?$/, '/') + yol : '';
  const ogGorsel = gorsel && (urlMi(gorsel) ? gorsel : tamUrl ? tamUrl + gorsel : '');
  return `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(baslik)}</title>
<meta name="description" content="${e(aciklama)}">
<meta name="author" content="${e(site.ad)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${e(baslik)}">
<meta property="og:description" content="${e(aciklama)}">
${tamUrl ? `<meta property="og:url" content="${e(tamUrl)}">\n<link rel="canonical" href="${e(tamUrl)}">` : ''}
${ogGorsel ? `<meta property="og:image" content="${e(ogGorsel)}">\n<meta name="twitter:card" content="summary_large_image">` : ''}
<meta name="theme-color" content="#060606">
<link rel="icon" href="${site.favicon ? `${kok}assets/${encodeURIComponent(site.favicon)}` : FAVICON}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap">
<link rel="stylesheet" href="${kok}assets/stil.css">
<script src="${kok}assets/site.js" defer></script>
</head>
<body>
<a class="atla" href="#icerik">İçeriğe geç</a>
${ustCubuk(site, kok, projeSayisi)}
${ray(site, kok, aktif)}
<div class="kabuk">
<main id="icerik">
${govde}
</main>
${mesajSeridi(site, projeSayisi)}
</div>
${canli ? '<script>new EventSource("/__canli").onmessage = () => location.reload();</script>' : ''}
</body>
</html>
`;
}

function ustCubuk(site, kok, projeSayisi) {
  const piller = (site.durum_pilleri || []).map(p =>
    `<div class="pil${p.durum ? ` ${e(p.durum)}` : ''}${p.vurgu ? ' vurgulu' : ''}">${p.durum ? '<span class="isik-nokta"></span>' : ''}<span class="k">${e(p.k)}</span><span class="v">${e(p.v)}</span></div>`);
  if (projeSayisi) piller.push(`<div class="pil"><span class="k">Proje</span><span class="v">${projeSayisi}</span></div>`);
  return `<header class="ust">
  <a class="marka" href="${kok || './'}" aria-label="${e(site.ad)} — ana sayfa">${site.logo ? `<img src="${kok}assets/${encodeURIComponent(site.logo)}" alt="" width="46" height="46">` : IKON.ucak}</a>
  <a class="marka-ad" href="${kok || './'}"><b>${ikiRenkAd(site.ad)}</b><span>${e(site.unvan)}</span></a>
  <div class="piller" aria-hidden="true">${piller.join('')}</div>
  <div class="ust-sag">
    ${site.cv ? `<a class="dugme kucuk hayalet" href="${kok}assets/${encodeURIComponent(site.cv)}" download>${IKON.indir}<span>CV</span></a>` : ''}
    <div class="saat" aria-hidden="true"><div class="v" id="saat-yerel">--:--:--</div><div class="k">Yerel saat · TRT</div></div>
  </div>
</header>`;
}

function ray(site, kok, aktif) {
  return `<nav class="ray" aria-label="Ana menü">
  ${MENU.filter(m => !m.kosul || m.kosul(site)).map(m => `<a href="${kok}#${m.id}" data-bolum="${m.id}"${m.id === aktif ? ' class="acik" aria-current="page"' : ''}>${m.ikon}<span>${e(m.ad)}</span></a>`).join('\n  ')}
</nav>`;
}

function mesajSeridi(site, projeSayisi) {
  return `<footer class="mesajlar">
  <span class="mesaj-k">Mesajlar</span>
  <span class="mesaj-v" id="mesaj"><span class="mono" id="mesaj-saat">--:--:--</span> <b>SİSTEM</b> Portfolyo yüklendi${projeSayisi ? ` · ${projeSayisi} proje senkronize` : ''}</span>
  <span class="mesaj-sag">© ${new Date().getFullYear()} ${e(site.ad)} · ${e(site.konum || '')}</span>
</footer>`;
}

function sosyal(site) {
  return [
    site.eposta && `<a class="dugme ikon" href="mailto:${e(site.eposta)}" aria-label="E-posta">${IKON.posta}</a>`,
    site.linkedin && `<a class="dugme ikon" href="${e(site.linkedin)}" target="_blank" rel="noopener" aria-label="LinkedIn">${IKON.linkedin}</a>`,
    site.github && `<a class="dugme ikon" href="${e(site.github)}" target="_blank" rel="noopener" aria-label="GitHub">${IKON.github}</a>`,
    site.youtube?.url && `<a class="dugme ikon" href="${e(site.youtube.url)}" target="_blank" rel="noopener" aria-label="YouTube">${IKON.youtube}</a>`,
  ].filter(Boolean).join('\n');
}

// Tanıtım videosundaki alt yazı stili: kırmızı dikey çizgi + büyük başlık + açıklama
const bolumBasi = (no, baslik, aciklama) => `<header class="bolum-bas">
  <span class="bolum-no">${no}</span>
  <div>
    <h2>${e(baslik)}</h2>
    ${aciklama ? `<p>${e(aciklama)}</p>` : ''}
  </div>
</header>`;

const cipler = (liste, sinif = '') => (liste.length
  ? `<ul class="cipler ${sinif}">${liste.map(x => `<li>${e(x)}</li>`).join('')}</ul>` : '');

// Görseli olmayan projeler için klasör adından türetilen, her projede farklı bir görev haritası
function kapakYok(p) {
  let h = 0;
  for (const c of p.slug) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const r = () => ((h = (h * 1103515245 + 12345) >>> 0) / 4294967296);
  const noktalar = [];
  for (let i = 0; i < 5; i++) noktalar.push([40 + i * 80 + (r() - 0.5) * 30, 50 + r() * 125]);
  const rota = noktalar.map(([x, y], i) => `${i ? 'L' : 'M'} ${x.toFixed(0)} ${y.toFixed(0)}`).join(' ');
  const rakip = `M 0 ${(30 + r() * 160).toFixed(0)} Q 200 ${(r() * 225).toFixed(0)} 400 ${(30 + r() * 160).toFixed(0)}`;
  return `<div class="kapak-yok" aria-hidden="true">
    <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid meet">
      <rect x="22" y="22" width="356" height="181" fill="none" stroke="rgba(255,255,255,.28)" stroke-dasharray="4 5"/>
      <path d="${rakip}" fill="none" stroke="rgba(255,181,71,.55)" stroke-width="1.4" stroke-dasharray="3 5"/>
      <path d="${rota}" fill="none" stroke="#ff2433" stroke-width="1.6"/>
      ${noktalar.map(([x, y], i) => `<g transform="translate(${x.toFixed(0)} ${y.toFixed(0)})"><circle r="9" fill="#141415" stroke="#ff2433" stroke-width="1.6"/><text y="3.5" text-anchor="middle" font-size="10" font-family="JetBrains Mono, monospace" fill="#f4f4f5">${i + 1}</text></g>`).join('')}
    </svg>
    <span class="mono">${e(p.kategoriler[0] || 'Proje')}</span>
  </div>`;
}

function projeKarti(p) {
  const href = `proje/${p.slug}/`;
  const gorsel = p.kapak ? `<img src="${kaynak(href, p.kapak)}" alt="" loading="lazy">` : kapakYok(p);
  return `<article class="kart${p.oneCikan ? ' kart-genis' : ''}" data-kategoriler="${e(p.kategoriler.join('|'))}">
  <a class="kart-baglanti" href="${href}">
    <div class="panel-bas"><span class="kare"></span><span>${e(p.kategoriler[0] || 'Proje')}</span><span class="bosluk"></span><span class="mono">${e(p.tarih)}</span></div>
    <div class="kart-icerik">
      <div class="kart-gorsel">${gorsel}${p.rozet ? `<span class="rozet">${IKON.yildiz}${e(p.rozet)}</span>` : ''}</div>
      <div class="kart-govde">
        <h3>${e(p.baslik)}</h3>
        ${p.ozet ? `<p>${e(p.ozet)}</p>` : ''}
        ${cipler(p.teknolojiler.slice(0, 6))}
        <span class="kart-ok">İncele ${IKON.ok}</span>
      </div>
    </div>
  </a>
</article>`;
}

// ---------------------------------------------------------------------------
// Ana sayfa
// ---------------------------------------------------------------------------
function anaSayfa({ site, projeler, canli }) {
  const sayac = {};
  for (const p of projeler) for (const k of p.kategoriler) sayac[k] = (sayac[k] || 0) + 1;
  // Filtre butonları: site.json'da "filtreler" verilmişse o liste, yoksa birden fazla projede geçen kategoriler.
  const sirali = Object.keys(sayac).sort((a, b) => sayac[b] - sayac[a] || a.localeCompare(b, 'tr'));
  let kategoriler = (site.filtreler || []).filter(k => sayac[k]);
  if (!kategoriler.length) kategoriler = sirali.filter(k => sayac[k] > 1);
  if (kategoriler.length < 3) kategoriler = sirali.slice(0, 6);

  const hero = `<section class="hero" id="baslangic">
  <div class="pusula" aria-hidden="true"><div class="pusula-serit" id="pusula"></div><span class="pusula-isaret"></span></div>
  <div class="kap hero-izgara">
    <div class="hero-metin">
      ${site.durum ? `<p class="hazir"><span class="isik-nokta"></span>${e(site.durum)}</p>` : ''}
      <h1>${ikiRenkAd(site.ad)}</h1>
      <p class="unvan">${e(site.unvan)}</p>
      <span class="kirmizi-cizgi"></span>
      <p class="slogan">${e(site.slogan)}</p>
      ${(site.etiket_satiri || []).length ? `<p class="etiket-satiri">${site.etiket_satiri.map(e).join('<span>·</span>')}</p>` : ''}
      <div class="butonlar">
        <a class="dugme kirmizi" href="#projeler">Projeleri incele ${IKON.ok}</a>
        ${site.cv ? `<a class="dugme" href="assets/${encodeURIComponent(site.cv)}" download>${IKON.indir}CV indir</a>` : ''}
        ${sosyal(site)}
      </div>
    </div>
    <figure class="panel hud" aria-label="Orantılı navigasyon güdüm simülasyonu">
      <div class="panel-bas"><span class="kare"></span><span>Güdüm · Orantılı navigasyon</span><span class="bosluk"></span><span class="senk">● sim canlı</span></div>
      <canvas id="gudum" aria-hidden="true"></canvas>
      <figcaption class="tizgara mono">
        <div><span class="k">Menzil</span><span class="v" id="t-r">—</span></div>
        <div><span class="k">LOS hızı <span class="sembol">λ̇</span></span><span class="v" id="t-l">—</span></div>
        <div><span class="k">Kapanma Vc</span><span class="v" id="t-vc">—</span></div>
        <div><span class="k">Kazanç N</span><span class="v kirmizi-v">3.0</span></div>
        <div><span class="k">Süre</span><span class="v" id="t-t">—</span></div>
        <div><span class="k">Durum</span><span class="v" id="t-d">TAKİP</span></div>
      </figcaption>
    </figure>
  </div>
</section>`;

  const rakamlar = (site.rakamlar || []).length ? `<section class="kap rakamlar" aria-label="Öne çıkanlar">
  <div class="tizgara buyuk">
    ${site.rakamlar.map(r => `<div><span class="k">${e(r.etiket)}</span><span class="v">${e(r.deger)}</span></div>`).join('\n    ')}
  </div>
</section>` : '';

  const projeBolumu = `<section class="bolum" id="projeler">
  <div class="kap">
    ${bolumBasi('01', 'Projeler', 'Yarışmalar, endüstri çalışmaları, akademik araştırmalar ve ders projeleri.')}
    ${kategoriler.length > 1 ? `<div class="filtre" role="group" aria-label="Kategoriye göre filtrele">
      <button type="button" aria-pressed="true" data-kategori="">Tümü<span>${projeler.length}</span></button>
      ${kategoriler.map(k => `<button type="button" aria-pressed="false" data-kategori="${e(k)}">${e(k)}<span>${sayac[k]}</span></button>`).join('\n      ')}
    </div>` : ''}
    ${projeler.length
    ? `<div class="kartlar">\n${projeler.map(projeKarti).join('\n')}\n</div>`
    : '<p class="bos-durum">Henüz proje yok. <code>projeler/</code> klasörüne yeni bir klasör ekleyerek başla.</p>'}
  </div>
</section>`;

  const hakkimda = `<section class="bolum" id="hakkimda">
  <div class="kap">
    ${bolumBasi('02', 'Hakkımda', site.hakkimda_baslik)}
    <div class="hakkimda-izgara">
      <div class="hakkimda-metin">
        ${site.profilFoto ? `<img class="profil-foto" src="assets/${encodeURIComponent(site.profilFoto)}" alt="${e(site.ad)}">` : ''}
        ${(site.hakkimda || []).map(p => `<p>${e(p)}</p>`).join('\n        ')}
      </div>
      <div class="panel">
        <div class="panel-bas"><span class="kare"></span><span>Eğitim</span></div>
        <div class="panel-govde egitim">
          ${(site.egitim || []).map(x => `<div class="egitim-oge">
            <span class="mono soluk">${e(x.tarih)}</span>
            <h3>${e(x.bolum)}</h3>
            <p>${e(x.okul)}</p>
            ${x.not ? `<p class="kirmizi-satir">${e(x.not)}</p>` : ''}
            ${x.aciklama ? `<p class="kucuk">${e(x.aciklama)}</p>` : ''}
          </div>`).join('\n          ')}
        </div>
      </div>
    </div>
  </div>
</section>`;

  const deneyim = `<section class="bolum" id="deneyim">
  <div class="kap">
    ${bolumBasi('03', 'Deneyim', 'Görev rotası — en güncelden geriye.')}
    <ol class="rota">
      ${(site.deneyim || []).map((d, i) => `<li>
        <span class="wp">${i + 1}</span>
        <div class="rota-kart">
          <div class="rota-ust"><h3>${e(d.rol)}</h3><span class="mono soluk">${e(d.tarih)}</span></div>
          <p class="kurum">${e(d.kurum)}</p>
          ${(d.maddeler || []).length ? `<ul>${d.maddeler.map(m => `<li>${e(m)}</li>`).join('')}</ul>` : ''}
        </div>
      </li>`).join('\n      ')}
    </ol>
  </div>
</section>`;

  const yetenekler = `<section class="bolum" id="yetenekler">
  <div class="kap">
    ${bolumBasi('04', 'Yetenekler', 'Teknik araç kutusu.')}
    <div class="yetenek-izgara">
      ${(site.yetenekler || []).map(y => `<div class="panel">
        <div class="panel-bas"><span class="kare"></span><span>${e(y.grup)}</span></div>
        <div class="panel-govde">${cipler(y.ogeler || [], 'yetenek-cip')}</div>
      </div>`).join('\n      ')}
    </div>
    ${(site.yayinlar || []).length ? `<div class="panel sertifika-panel" id="yayinlar">
      <div class="panel-bas"><span class="kare"></span><span>Yayınlar</span><span class="bosluk"></span><span class="mono">${site.yayinlar.length}</span></div>
      <ul class="yayin-liste">
        ${site.yayinlar.map(y => `<li>
          ${y.proje ? `<a href="proje/${encodeURIComponent(y.proje)}/">${e(y.baslik)}</a>` : `<strong>${e(y.baslik)}</strong>`}
          <span>${e(y.yer)}${y.yil ? ` · <span class="mono">${e(y.yil)}</span>` : ''}</span>
        </li>`).join('\n        ')}
      </ul>
    </div>` : ''}
    ${(site.sertifikalar || []).length ? `<div class="panel sertifika-panel" id="oduller">
      <div class="panel-bas"><span class="kare"></span><span>Ödüller & Sertifikalar</span><span class="bosluk"></span><span class="mono">${site.sertifikalar.length}</span></div>
      <table class="tablo-yki">
        <thead><tr><th>Belge</th><th>Yıl</th></tr></thead>
        <tbody>
          ${site.sertifikalar.map(s => `<tr${s.one_cikan ? ' class="one-cikan"' : ''}><td>${s.one_cikan ? IKON.yildiz : ''}${e(s.ad)}</td><td class="mono">${e(s.yil)}</td></tr>`).join('\n          ')}
        </tbody>
      </table>
    </div>` : ''}
  </div>
</section>`;

  const yt = site.youtube || {};
  const tarihYaz = t => (t ? new Date(t).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' }) : '');
  const kanal = yt.url ? `<section class="bolum" id="kanal">
  <div class="kap">
    ${bolumBasi('05', yt.ad || 'YouTube', yt.aciklama)}
    <div class="panel">
      <div class="panel-bas"><span class="kare"></span><span>YouTube · ${e(yt.ad || '')}</span><span class="bosluk"></span><span class="senk kirmizi-senk">● yayında</span></div>
      <div class="panel-govde kanal-govde">
        ${(site.youtubeVideolari || []).length ? `<div class="video-izgara">
          ${site.youtubeVideolari.map(v => `<a class="video-kart" href="https://www.youtube.com/watch?v=${e(v.id)}" target="_blank" rel="noopener">
            <div class="video-gorsel"><img src="https://i.ytimg.com/vi/${e(v.id)}/hqdefault.jpg" alt="" loading="lazy"><span class="oynat-dugme">${IKON.youtube}</span>${v.sabit ? '<span class="rozet">Öne çıkan</span>' : ''}</div>
            <h3>${e(v.baslik)}</h3>
            ${v.tarih ? `<span class="mono soluk">${e(tarihYaz(v.tarih))}</span>` : ''}
          </a>`).join('\n          ')}
        </div>` : ''}
        <div class="butonlar">
          <a class="dugme kirmizi" href="${e(yt.url)}?sub_confirmation=1" target="_blank" rel="noopener">${IKON.youtube}Kanala abone ol</a>
          <a class="dugme" href="${e(yt.url)}/videos" target="_blank" rel="noopener">Tüm videolar ${IKON.dis}</a>
        </div>
      </div>
    </div>
  </div>
</section>` : '';

  const iletisim = `<section class="bolum iletisim" id="iletisim">
  <div class="kap">
    ${bolumBasi(yt.url ? '06' : '05', site.iletisim_baslik || 'İletişim', site.iletisim_metni)}
    <div class="iletisim-panel panel">
      <div class="panel-bas"><span class="kare"></span><span>Bağlantı kur</span><span class="bosluk"></span><span class="senk">● çevrim içi</span></div>
      <div class="panel-govde">
        ${site.eposta ? `<a class="eposta-buyuk" href="mailto:${e(site.eposta)}">${e(site.eposta)}</a>` : ''}
        <div class="butonlar">
          ${site.eposta ? `<a class="dugme kirmizi" href="mailto:${e(site.eposta)}">${IKON.posta}E-posta gönder</a>` : ''}
          ${site.linkedin ? `<a class="dugme${site.eposta ? '' : ' kirmizi'}" href="${e(site.linkedin)}" target="_blank" rel="noopener">${IKON.linkedin}LinkedIn</a>` : ''}
          ${site.github ? `<a class="dugme" href="${e(site.github)}" target="_blank" rel="noopener">${IKON.github}GitHub</a>` : ''}
          ${yt.url ? `<a class="dugme" href="${e(yt.url)}" target="_blank" rel="noopener">${IKON.youtube}YouTube</a>` : ''}
          ${site.cv ? `<a class="dugme amber" href="assets/${encodeURIComponent(site.cv)}" download>${IKON.indir}CV indir</a>` : ''}
        </div>
      </div>
    </div>
  </div>
</section>`;

  return iskelet({
    site,
    baslik: `${site.ad} — ${site.unvan}`,
    aciklama: site.slogan || site.unvan,
    kok: '',
    canli,
    aktif: 'baslangic',
    projeSayisi: projeler.length,
    gorsel: site.profilFoto ? `assets/${encodeURIComponent(site.profilFoto)}` : '',
    govde: [hero, rakamlar, projeBolumu, hakkimda, deneyim, yetenekler, kanal, iletisim].join('\n\n'),
  });
}

// ---------------------------------------------------------------------------
// Proje detay sayfası
// ---------------------------------------------------------------------------
function videoHtml(v, baslik) {
  const cerceve = src => `<div class="video"><iframe src="${src}" title="${e(baslik)} — video" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`;
  if (v.tur === 'youtube') return cerceve(`https://www.youtube-nocookie.com/embed/${v.id}`);
  if (v.tur === 'vimeo') return cerceve(`https://player.vimeo.com/video/${v.id}`);
  if (v.tur === 'drive') return cerceve(`https://drive.google.com/file/d/${v.id}/preview`);
  if (v.tur === 'dosya') return `<div class="video"><video controls preload="metadata" src="${kaynak('', v.src)}"></video></div>`;
  return '';
}

const panel = (baslik, icerik, sag = '') => `<div class="panel">
  <div class="panel-bas"><span class="kare"></span><span>${baslik}</span>${sag ? `<span class="bosluk"></span><span class="mono">${sag}</span>` : ''}</div>
  <div class="panel-govde">${icerik}</div>
</div>`;

function projeSayfasi({ site, p, onceki, sonraki, canli, projeSayisi }) {
  const kok = '../../';
  const meta = [['Rol', p.rol], ['Tarih', p.tarih], ['Durum', p.durum]].filter(x => x[1]);
  const videolar = p.videolar.filter(v => v.tur !== 'baglanti');
  const ekBaglantilar = p.videolar.filter(v => v.tur === 'baglanti').map(v => ({ etiket: 'Video', href: v.src }));
  const baglantilar = [...p.baglantilar, ...ekBaglantilar];

  const yan = [
    p.teknolojiler.length && panel('Teknolojiler', cipler(p.teknolojiler), p.teknolojiler.length),
    baglantilar.length && panel('Bağlantılar', `<ul class="yan-liste">${baglantilar.map(b =>
      `<li><a href="${e(b.href)}" target="_blank" rel="noopener"><span>${e(b.etiket)}</span>${IKON.dis}</a></li>`).join('')}</ul>`),
    p.dokumanlar.length && panel('Dokümanlar', `<ul class="yan-liste">${p.dokumanlar.map(d =>
      `<li><a href="${encodeURIComponent(d.dosya)}" download><span>${IKON.belge}${e(d.ad)}</span><small>${e(d.boyut)}</small></a></li>`).join('')}</ul>`, p.dokumanlar.length),
  ].filter(Boolean).join('\n');

  const govde = `<article class="proje-sayfa">
  <header class="proje-bas">
    <div class="kap">
      <a class="geri" href="${kok}#projeler">${IKON.geri}Tüm projeler</a>
      ${cipler(p.kategoriler, 'cipler-kategori')}
      <h1>${e(p.baslik)}</h1>
      ${p.altBaslik ? `<p class="proje-alt">${e(p.altBaslik)}</p>` : ''}
      ${meta.length || p.rozet ? `<div class="proje-piller">
        ${meta.map(([k, v]) => `<div class="pil${k === 'Durum' ? ' uyari' : ''}">${k === 'Durum' ? '<span class="isik-nokta"></span>' : ''}<span class="k">${k}</span><span class="v">${e(v)}</span></div>`).join('\n        ')}
        ${p.rozet ? `<div class="pil vurgulu">${IKON.yildiz}<span class="v">${e(p.rozet)}</span></div>` : ''}
      </div>` : ''}
    </div>
  </header>
  ${p.kapak ? `<figure class="kap proje-kapak"><a href="${kaynak('', p.kapak)}" data-lightbox><img src="${kaynak('', p.kapak)}" alt="${e(p.baslik)}"></a></figure>` : ''}
  <div class="kap proje-izgara${yan ? '' : ' yansiz'}">
    <div class="yazi">
      ${p.ozet ? `<p class="giris">${e(p.ozet)}</p>` : ''}
      ${p.govdeHtml}
    </div>
    ${yan ? `<aside class="yan">\n${yan}\n</aside>` : ''}
  </div>
  ${videolar.length ? `<section class="kap medya">
    ${bolumBasi('▶', 'Videolar')}
    <div class="videolar">${videolar.map(v => videoHtml(v, p.baslik)).join('\n')}</div>
  </section>` : ''}
  ${p.galeri.length ? `<section class="kap medya">
    ${bolumBasi('▣', 'Galeri')}
    <div class="galeri">
      ${p.galeri.map(g => `<a class="galeri-oge" href="${kaynak('', g.src)}" data-lightbox data-aciklama="${e(g.aciklama)}">
        <img src="${kaynak('', g.src)}" alt="${e(g.aciklama || p.baslik)}" loading="lazy">${g.aciklama ? `<span>${e(g.aciklama)}</span>` : ''}
      </a>`).join('\n      ')}
    </div>
  </section>` : ''}
  <nav class="kap proje-gezinti" aria-label="Diğer projeler">
    ${onceki ? `<a class="onceki" href="${kok}proje/${onceki.slug}/"><span class="mono">← Önceki waypoint</span><strong>${e(onceki.baslik)}</strong></a>` : '<span></span>'}
    ${sonraki ? `<a class="sonraki" href="${kok}proje/${sonraki.slug}/"><span class="mono">Sonraki waypoint →</span><strong>${e(sonraki.baslik)}</strong></a>` : ''}
  </nav>
</article>`;

  return iskelet({
    site,
    baslik: `${p.baslik} — ${site.ad}`,
    aciklama: p.ozet || p.altBaslik || p.baslik,
    kok,
    canli,
    aktif: 'projeler',
    projeSayisi,
    yol: `proje/${p.slug}/`,
    gorsel: p.kapak ? kaynak('', p.kapak) : '',
    govde,
  });
}

function bulunamadi({ site, canli }) {
  // 404 sayfası her adreste açılabileceği için göreli yol yerine sitenin kök adresi kullanılır.
  const kok = site.site_url ? site.site_url.replace(/\/?$/, '/') : '/';
  return iskelet({
    site,
    baslik: `Sayfa bulunamadı — ${site.ad}`,
    aciklama: 'Aradığın sayfa bulunamadı.',
    kok,
    canli,
    govde: `<section class="bolum bulunamadi"><div class="kap">
      <p class="hazir"><span class="isik-nokta kirmizi"></span>Bağlantı kaybı · 404</p>
      <h1>Hedef <i>radarda yok</i></h1>
      <p>Bağlantı değişmiş ya da proje kaldırılmış olabilir. Eve dönüş (RTL) önerilir.</p>
      <a class="dugme kirmizi" href="${kok}">${IKON.geri}RTL — ana sayfa</a>
    </div></section>`,
  });
}

module.exports = { anaSayfa, projeSayfasi, bulunamadi };
