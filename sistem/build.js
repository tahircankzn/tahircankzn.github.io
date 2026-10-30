#!/usr/bin/env node
'use strict';
// Portfolyo derleyici: projeler/ ve icerik/ klasörlerini okuyup dist/ altına statik site üretir.
//   node sistem/build.js          → siteyi dist/ klasörüne derler
//   node sistem/build.js --sun    → derler, yerel önizleme sunucusu açar, değişiklikte yeniler
//   node sistem/build.js --sun --ac → ayrıca tarayıcıyı açar

const fs = require('fs');
const path = require('path');
const http = require('http');

const KOK = path.resolve(__dirname, '..');
const DIZIN = {
  projeler: path.join(KOK, 'projeler'),
  icerik: path.join(KOK, 'icerik'),
  sistem: __dirname,
  cikti: path.join(KOK, 'dist'),
};

const UZANTI = {
  gorsel: ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.svg'],
  video: ['.mp4', '.webm', '.mov'],
  dokuman: ['.pdf', '.zip', '.rar', '.stl', '.step', '.stp', '.slx', '.m', '.ipynb', '.pptx', '.docx'],
};
const dosyaTuru = f => Object.keys(UZANTI).find(k => UZANTI[k].includes(path.extname(f).toLowerCase()));

// Şablon ve markdown modülleri her derlemede tazelenir; böylece --sun modunda tasarım değişiklikleri de anında görünür.
function modul(ad) {
  const yol = require.resolve(`./${ad}`);
  delete require.cache[yol];
  return require(yol);
}

// ---------------------------------------------------------------------------
// Yardımcılar
// ---------------------------------------------------------------------------
const TR = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', Ç: 'c', Ğ: 'g', İ: 'i', Ö: 'o', Ş: 's', Ü: 'u' };
const slugla = s => String(s)
  .replace(/^\d+[-_. ]+/, '')
  .replace(/[çğıöşüÇĞİÖŞÜ]/g, c => TR[c])
  .normalize('NFKD').replace(/[̀-ͯ]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'proje';

const metin = v => (Array.isArray(v) ? v.join(', ') : v == null ? '' : String(v)).trim();
const liste = v => (Array.isArray(v) ? v : typeof v === 'string' && v ? v.split(',') : []).map(x => String(x).trim()).filter(Boolean);
const evetMi = v => /^(evet|true|yes|1|e)$/i.test(metin(v));
const dogalSira = (a, b) => a.localeCompare(b, 'tr', { numeric: true, sensitivity: 'base' });
const urlMi = s => /^https?:\/\//i.test(s);

function boyutYaz(bayt) {
  if (bayt < 1024) return `${bayt} B`;
  if (bayt < 1024 ** 2) return `${(bayt / 1024).toFixed(0)} KB`;
  return `${(bayt / 1024 ** 2).toFixed(1)} MB`;
}

// "Etiket: https://..." ya da yalnızca "https://..."
function etiketliBaglanti(oge) {
  const m = oge.match(/^(.+?):\s+(\S+)$/);
  if (m) return { etiket: m[1].trim(), href: m[2] };
  let etiket = 'Bağlantı';
  if (/github\.com/i.test(oge)) etiket = 'GitHub';
  else if (/youtu/i.test(oge)) etiket = 'YouTube';
  else if (/linkedin/i.test(oge)) etiket = 'LinkedIn';
  else if (/\.pdf($|\?)/i.test(oge)) etiket = 'PDF';
  return { etiket, href: oge };
}

// "dosya.jpg: açıklama" listesini sözlüğe çevirir
function sozluk(v) {
  const s = {};
  for (const oge of liste(v)) {
    const m = oge.match(/^(.+?):\s+(.*)$/);
    if (m) s[m[1].trim()] = m[2].trim();
  }
  return s;
}

function videoCoz(adres) {
  let m = adres.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
  if (m) return { tur: 'youtube', id: m[1] };
  m = adres.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (m) return { tur: 'vimeo', id: m[1] };
  m = adres.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
  if (m) return { tur: 'drive', id: m[1] };
  if (/\.(mp4|webm|mov)(\?|$)/i.test(adres)) return { tur: 'dosya', src: adres };
  return { tur: 'baglanti', src: adres };
}

// ---------------------------------------------------------------------------
// İçerik okuma
// ---------------------------------------------------------------------------
function siteOku(uyarilar) {
  const yol = path.join(DIZIN.icerik, 'site.json');
  let site;
  try {
    site = JSON.parse(fs.readFileSync(yol, 'utf8').replace(/^﻿/, ''));
  } catch (h) {
    throw new Error(`icerik/site.json okunamadı: ${h.message}\n  (Virgül veya tırnak eksik olabilir — https://jsonlint.com ile kontrol edebilirsin.)`);
  }
  const dosyalar = fs.readdirSync(DIZIN.icerik);
  site.profilFoto = dosyalar.find(f => /^profil\.(jpe?g|png|webp|avif)$/i.test(f)) || null;
  for (const [alan, ad] of [['cv', 'CV dosyası'], ['logo', 'Logo'], ['favicon', 'Favicon']]) {
    if (site[alan] && !dosyalar.includes(site[alan])) {
      uyarilar.push(`site.json'daki ${ad} (${site[alan]}) icerik/ klasöründe yok; kullanılmadı.`);
      site[alan] = null;
    }
  }
  return site;
}

function projeleriOku(uyarilar) {
  const { onBilgi, markdown } = modul('markdown');
  if (!fs.existsSync(DIZIN.projeler)) return [];
  const klasorler = fs.readdirSync(DIZIN.projeler, { withFileTypes: true })
    .filter(d => d.isDirectory() && !/^[_.]/.test(d.name))
    .sort((a, b) => dogalSira(a.name, b.name));

  const projeler = [];
  const sluglar = new Set();
  for (const d of klasorler) {
    const klasor = path.join(DIZIN.projeler, d.name);
    const dosyalar = fs.readdirSync(klasor).filter(f => fs.statSync(path.join(klasor, f)).isFile()).sort(dogalSira);
    const mdAdi = dosyalar.find(f => /^(proje|readme)\.md$/i.test(f));
    if (!mdAdi) {
      uyarilar.push(`projeler/${d.name}: proje.md bulunamadı, klasör atlandı.`);
      continue;
    }
    const { veri, govde } = onBilgi(fs.readFileSync(path.join(klasor, mdAdi), 'utf8'));
    if (evetMi(veri.gizli) || evetMi(veri.taslak)) continue;

    let slug = slugla(metin(veri.adres) || d.name);
    for (let n = 2; sluglar.has(slug); n++) slug = `${slugla(metin(veri.adres) || d.name)}-${n}`;
    sluglar.add(slug);

    const aciklamalar = sozluk(veri.gorsel_aciklamalari);
    const yerelGorseller = dosyalar.filter(f => dosyaTuru(f) === 'gorsel');
    const uzakGorseller = liste(veri.gorseller).filter(urlMi);

    let kapak = metin(veri.kapak);
    if (kapak && !urlMi(kapak) && !yerelGorseller.includes(kapak)) {
      uyarilar.push(`projeler/${d.name}: kapak olarak yazılan "${kapak}" klasörde yok.`);
      kapak = '';
    }
    kapak = kapak || yerelGorseller.find(f => /^(kapak|cover)\./i.test(f)) || yerelGorseller[0] || uzakGorseller[0] || null;

    const galeri = [...yerelGorseller, ...uzakGorseller]
      .filter(f => f !== kapak && !/^(kapak|cover)\./i.test(f))
      .map(f => ({ src: f, aciklama: aciklamalar[f] || '' }));

    const videolar = [
      ...liste(veri.videolar).map(videoCoz),
      ...dosyalar.filter(f => dosyaTuru(f) === 'video').map(f => ({ tur: 'dosya', src: f })),
    ];

    const dokumanlar = dosyalar.filter(f => dosyaTuru(f) === 'dokuman').map(f => ({
      dosya: f,
      ad: aciklamalar[f] || f,
      boyut: boyutYaz(fs.statSync(path.join(klasor, f)).size),
    }));

    const buyukler = dosyalar.filter(f => dosyaTuru(f) === 'gorsel' && fs.statSync(path.join(klasor, f)).size > 1.5 * 1024 ** 2);
    if (buyukler.length) uyarilar.push(`projeler/${d.name}: ${buyukler.join(', ')} 1,5 MB'tan büyük — sayfa yavaş açılabilir (README'deki "Görselleri küçültme" kısmına bak).`);

    const onEk = d.name.match(/^(\d+)[-_. ]/);
    const sira = veri.sira !== undefined && metin(veri.sira) !== '' ? Number(metin(veri.sira)) : onEk ? Number(onEk[1]) : null;
    const yillar = metin(veri.tarih).match(/\d{4}/g);

    projeler.push({
      slug,
      klasor,
      klasorAdi: d.name,
      kopyalanacak: dosyalar.filter(dosyaTuru),
      baslik: metin(veri.baslik) || d.name.replace(/^\d+[-_. ]+/, ''),
      altBaslik: metin(veri.alt_baslik),
      rol: metin(veri.rol),
      tarih: metin(veri.tarih),
      durum: metin(veri.durum),
      kategoriler: liste(veri.kategoriler),
      teknolojiler: liste(veri.teknolojiler),
      ozet: metin(veri.ozet),
      rozet: metin(veri.rozet),
      oneCikan: evetMi(veri.one_cikan),
      kapak,
      galeri,
      videolar,
      dokumanlar,
      baglantilar: liste(veri.baglantilar).map(etiketliBaglanti),
      govdeHtml: markdown(govde),
      sira: Number.isFinite(sira) ? sira : null,
      yil: yillar ? Number(yillar[yillar.length - 1]) : 0,
    });
  }

  // Önce sıra numarası (klasör ön eki ya da "sira:"), sonra en yeni yıl.
  return projeler.sort((a, b) =>
    (a.sira ?? 1e9) - (b.sira ?? 1e9) || b.yil - a.yil || a.baslik.localeCompare(b.baslik, 'tr'));
}

// ---------------------------------------------------------------------------
// YouTube: kanalın son videoları RSS akışından çekilir (API anahtarı gerekmez).
// İnternet yoksa son başarılı sonuç .onbellek/youtube.json'dan kullanılır.
// ---------------------------------------------------------------------------
const ONBELLEK = path.join(KOK, '.onbellek', 'youtube.json');
const xmlCoz = s => s.replace(/&(amp|lt|gt|quot|#39|apos);/g, (_, k) => ({ amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", apos: "'" }[k]));
const baslikTemizle = s => s.replace(/\s*#[\p{L}\p{N}_]+/gu, '').trim();

async function youtubeHazirla() {
  let yt;
  try {
    yt = JSON.parse(fs.readFileSync(path.join(DIZIN.icerik, 'site.json'), 'utf8').replace(/^﻿/, '')).youtube;
  } catch {
    return [];
  }
  if (!yt || !yt.kanal_id) return [];
  try {
    const yanit = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(yt.kanal_id)}`, { signal: AbortSignal.timeout(8000) });
    if (!yanit.ok) throw new Error(`HTTP ${yanit.status}`);
    const xml = await yanit.text();
    const akis = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, g]) => ({
      id: (g.match(/<yt:videoId>([^<]+)/) || [])[1],
      baslik: baslikTemizle(xmlCoz((g.match(/<title>([^<]*)/) || [])[1] || '')),
      tarih: ((g.match(/<published>([^<]+)/) || [])[1] || '').slice(0, 10),
    })).filter(v => v.id);

    const sabitler = [];
    for (const id of yt.sabit_videolar || []) {
      let v = akis.find(x => x.id === id);
      if (!v) {
        const o = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`, { signal: AbortSignal.timeout(8000) })
          .then(r => (r.ok ? r.json() : null)).catch(() => null);
        v = { id, baslik: baslikTemizle(o?.title || ''), tarih: '' };
      }
      sabitler.push({ ...v, sabit: true });
    }
    const liste = [...sabitler, ...akis.filter(v => !sabitler.some(s => s.id === v.id))].slice(0, Number(yt.adet) || 4);
    fs.mkdirSync(path.dirname(ONBELLEK), { recursive: true });
    fs.writeFileSync(ONBELLEK, JSON.stringify(liste, null, 2));
    return liste;
  } catch (h) {
    const eski = fs.existsSync(ONBELLEK) ? JSON.parse(fs.readFileSync(ONBELLEK, 'utf8')) : [];
    console.log(`  ⚠ YouTube videoları alınamadı (${h.message}); ${eski.length ? 'önbellekteki liste kullanıldı' : 'video listesi boş'}.`);
    return eski;
  }
}

// ---------------------------------------------------------------------------
// Derleme
// ---------------------------------------------------------------------------
function kopyala(kaynak, hedef) {
  fs.mkdirSync(path.dirname(hedef), { recursive: true });
  fs.copyFileSync(kaynak, hedef);
}

function derle({ canli = false, youtube = [] } = {}) {
  const t0 = Date.now();
  const uyarilar = [];
  const sablon = modul('sablonlar');
  const site = siteOku(uyarilar);
  site.youtubeVideolari = youtube;
  const projeler = projeleriOku(uyarilar);

  fs.rmSync(DIZIN.cikti, { recursive: true, force: true });
  fs.mkdirSync(path.join(DIZIN.cikti, 'assets'), { recursive: true });

  for (const f of ['stil.css', 'site.js']) kopyala(path.join(DIZIN.sistem, f), path.join(DIZIN.cikti, 'assets', f));
  for (const f of fs.readdirSync(DIZIN.icerik)) {
    if (f === 'site.json' || f.startsWith('.')) continue;
    const yol = path.join(DIZIN.icerik, f);
    if (fs.statSync(yol).isFile()) kopyala(yol, path.join(DIZIN.cikti, 'assets', f));
  }

  fs.writeFileSync(path.join(DIZIN.cikti, 'index.html'), sablon.anaSayfa({ site, projeler, canli }));
  fs.writeFileSync(path.join(DIZIN.cikti, '404.html'), sablon.bulunamadi({ site, canli }));

  projeler.forEach((p, i) => {
    const hedef = path.join(DIZIN.cikti, 'proje', p.slug);
    fs.mkdirSync(hedef, { recursive: true });
    for (const f of p.kopyalanacak) kopyala(path.join(p.klasor, f), path.join(hedef, f));
    const html = sablon.projeSayfasi({ site, p, onceki: projeler[i - 1], sonraki: projeler[i + 1], canli, projeSayisi: projeler.length });
    fs.writeFileSync(path.join(hedef, 'index.html'), html);
  });

  if (site.site_url) {
    const kok = site.site_url.replace(/\/?$/, '/');
    const adresler = [kok, ...projeler.map(p => `${kok}proje/${p.slug}/`)];
    fs.writeFileSync(path.join(DIZIN.cikti, 'sitemap.xml'),
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${adresler.map(a => `  <url><loc>${a}</loc></url>`).join('\n')}\n</urlset>\n`);
  }

  console.log(`✓ ${projeler.length} proje derlendi (${Date.now() - t0} ms) → dist/`);
  for (const u of uyarilar) console.log(`  ⚠ ${u}`);
}

// ---------------------------------------------------------------------------
// Önizleme sunucusu
// ---------------------------------------------------------------------------
const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.gif': 'image/gif', '.avif': 'image/avif', '.pdf': 'application/pdf',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.mov': 'video/quicktime', '.xml': 'application/xml',
};

async function sun(port, tarayiciAc) {
  const istemciler = new Set();
  const youtube = await youtubeHazirla();
  const guvenliDerle = () => {
    try {
      derle({ canli: true, youtube });
      return true;
    } catch (h) {
      console.error(`✗ Derleme hatası: ${h.message}`);
      return false;
    }
  };
  guvenliDerle();

  let zamanlayici;
  const degisti = () => {
    clearTimeout(zamanlayici);
    zamanlayici = setTimeout(() => {
      if (guvenliDerle()) for (const r of istemciler) r.write('data: yenile\n\n');
    }, 200);
  };
  for (const d of [DIZIN.projeler, DIZIN.icerik, DIZIN.sistem]) {
    if (fs.existsSync(d)) fs.watch(d, { recursive: true }, degisti);
  }

  const sunucu = http.createServer((istek, yanit) => {
    const adres = decodeURIComponent(istek.url.split('?')[0]);
    if (adres === '/__canli') {
      yanit.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
      yanit.write('\n');
      istemciler.add(yanit);
      istek.on('close', () => istemciler.delete(yanit));
      return;
    }
    let dosya = path.join(DIZIN.cikti, adres);
    if (!dosya.startsWith(DIZIN.cikti)) {
      yanit.writeHead(403);
      return yanit.end();
    }
    if (fs.existsSync(dosya) && fs.statSync(dosya).isDirectory()) {
      if (!adres.endsWith('/')) {
        yanit.writeHead(301, { Location: `${encodeURI(adres)}/` });
        return yanit.end();
      }
      dosya = path.join(dosya, 'index.html');
    }
    if (!fs.existsSync(dosya)) {
      yanit.writeHead(404, { 'Content-Type': MIME['.html'] });
      const bulunamadi = path.join(DIZIN.cikti, '404.html');
      return yanit.end(fs.existsSync(bulunamadi) ? fs.readFileSync(bulunamadi) : 'Bulunamadı');
    }
    const boyut = fs.statSync(dosya).size;
    const tur = MIME[path.extname(dosya).toLowerCase()] || 'application/octet-stream';
    const aralik = istek.headers.range && istek.headers.range.match(/bytes=(\d*)-(\d*)/);
    if (aralik) {
      const bas = aralik[1] ? Number(aralik[1]) : 0;
      const son = aralik[2] ? Number(aralik[2]) : boyut - 1;
      yanit.writeHead(206, { 'Content-Type': tur, 'Content-Range': `bytes ${bas}-${son}/${boyut}`, 'Accept-Ranges': 'bytes', 'Content-Length': son - bas + 1 });
      return fs.createReadStream(dosya, { start: bas, end: son }).pipe(yanit);
    }
    yanit.writeHead(200, { 'Content-Type': tur, 'Content-Length': boyut, 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-store' });
    fs.createReadStream(dosya).pipe(yanit);
  });

  sunucu.on('error', h => {
    if (h.code === 'EADDRINUSE') sunucu.listen(++port);
    else throw h;
  });
  sunucu.on('listening', () => {
    const url = `http://localhost:${port}`;
    console.log(`\n  Önizleme: ${url}\n  projeler/ veya icerik/ içinde bir şey değiştirdiğinde sayfa kendiliğinden yenilenir. Kapatmak için Ctrl+C.\n`);
    if (tarayiciAc) {
      const komut = process.platform === 'win32' ? `start "" "${url}"` : process.platform === 'darwin' ? `open ${url}` : `xdg-open ${url}`;
      require('child_process').exec(komut);
    }
  });
  sunucu.listen(port);
}

// ---------------------------------------------------------------------------
const argumanlar = process.argv.slice(2);
if (argumanlar.includes('--sun')) {
  sun(Number(process.env.PORT) || 8080, argumanlar.includes('--ac'));
} else {
  youtubeHazirla().then(youtube => {
    try {
      derle({ youtube });
    } catch (h) {
      console.error(`✗ Derleme hatası: ${h.message}`);
      process.exit(1);
    }
  });
}
