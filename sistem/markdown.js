'use strict';
// Bağımlılıksız küçük ayrıştırıcılar: proje.md'nin üst bilgisi (--- arası) ve Markdown gövdesi.

const kacis = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// ---------------------------------------------------------------------------
// Üst bilgi (front matter). Desteklenen biçimler:
//   anahtar: değer
//   anahtar: [a, b, c]
//   anahtar:
//     - öğe
//     - Etiket: https://...
//   # yorum satırı
// ---------------------------------------------------------------------------
function deger(v) {
  v = v.trim();
  if (/^\[.*\]$/.test(v)) return v.slice(1, -1).split(',').map(x => tirnaksiz(x.trim())).filter(Boolean);
  return tirnaksiz(v);
}
function tirnaksiz(v) {
  const m = v.match(/^(["'])(.*)\1$/);
  return m ? m[2] : v;
}

function onBilgi(kaynak) {
  kaynak = kaynak.replace(/^﻿/, '').replace(/\r\n?/g, '\n');
  const m = kaynak.match(/^---\n([\s\S]*?)\n---[ \t]*(?:\n|$)([\s\S]*)$/);
  if (!m) return { veri: {}, govde: kaynak };
  const veri = {};
  let anahtar = null;
  for (const ham of m[1].split('\n')) {
    if (/^\s*#/.test(ham)) continue;
    const satir = ham.replace(/\s+#\s.*$/, '');
    if (!satir.trim()) continue;
    const oge = satir.match(/^\s*-\s+(.*)$/);
    if (oge && anahtar) {
      if (!Array.isArray(veri[anahtar])) veri[anahtar] = veri[anahtar] ? [veri[anahtar]] : [];
      veri[anahtar].push(tirnaksiz(oge[1].trim()));
      continue;
    }
    const kv = satir.match(/^([\wçğıöşüÇĞİÖŞÜ]+)\s*:\s*(.*)$/);
    if (kv) {
      anahtar = kv[1].toLowerCase();
      veri[anahtar] = kv[2].trim() === '' ? [] : deger(kv[2]);
    }
  }
  return { veri, govde: m[2] };
}

// ---------------------------------------------------------------------------
// Markdown → HTML (başlık, paragraf, liste, alıntı, kod, görsel, bağlantı, kalın/italik)
// ---------------------------------------------------------------------------
function satirIci(s) {
  const kodlar = [];
  s = s.replace(/`([^`]+)`/g, (_, k) => `\u0000${kodlar.push(k) - 1}\u0000`);
  s = s.replace(/\\([\\*_`[\]#|()!])/g, (_, c) => `\u0001${c.charCodeAt(0)}\u0001`);
  s = kacis(s);
  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_, alt, src) => `<img src="${src}" alt="${alt}" loading="lazy">`);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, metin, href) =>
    `<a href="${href}"${/^https?:/.test(href) ? ' target="_blank" rel="noopener"' : ''}>${metin}</a>`);
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?!\w)/g, '$1<em>$2</em>');
  s = s.replace(/(^|[^\w])_([^_\s][^_]*?)_(?!\w)/g, '$1<em>$2</em>');
  return s
    .replace(/\u0001(\d+)\u0001/g, (_, n) => kacis(String.fromCharCode(n)))
    .replace(/\u0000(\d+)\u0000/g, (_, n) => `<code>${kacis(kodlar[n])}</code>`);
}

const BLOK = /^(#{1,6}\s|```|>\s?|\s*[-*+]\s+|\s*\d+[.)]\s+|\s*\||(-{3,}|\*{3,})\s*$)/;

function markdown(kaynak) {
  const satirlar = String(kaynak || '').replace(/\r\n?/g, '\n').replace(/<!--[\s\S]*?-->/g, '').split('\n');
  const cikti = [];
  let i = 0;
  const topla = (desen, temizle) => {
    const tampon = [];
    while (i < satirlar.length && desen.test(satirlar[i])) tampon.push(satirlar[i++].replace(temizle, ''));
    return tampon;
  };
  while (i < satirlar.length) {
    const s = satirlar[i];
    if (!s.trim()) { i++; continue; }
    if (/^```/.test(s)) {
      const tampon = [];
      i++;
      while (i < satirlar.length && !/^```/.test(satirlar[i])) tampon.push(satirlar[i++]);
      i++;
      cikti.push(`<pre><code>${kacis(tampon.join('\n'))}</code></pre>`);
      continue;
    }
    const b = s.match(/^(#{1,6})\s+(.*)$/);
    if (b) {
      const d = Math.min(Math.max(b[1].length, 2), 4);
      cikti.push(`<h${d}>${satirIci(b[2])}</h${d}>`);
      i++;
      continue;
    }
    if (/^(-{3,}|\*{3,})\s*$/.test(s)) { cikti.push('<hr>'); i++; continue; }
    if (/^>\s?/.test(s)) {
      cikti.push(`<blockquote>${markdown(topla(/^>\s?/, /^>\s?/).join('\n'))}</blockquote>`);
      continue;
    }
    if (/^\s*[-*+]\s+/.test(s)) {
      cikti.push('<ul>' + topla(/^\s*[-*+]\s+/, /^\s*[-*+]\s+/).map(x => `<li>${satirIci(x)}</li>`).join('') + '</ul>');
      continue;
    }
    if (/^\s*\|.*\|\s*$/.test(s) && /^\s*\|?[\s:|-]+\|?\s*$/.test(satirlar[i + 1] || '') && /-/.test(satirlar[i + 1])) {
      const hucreler = x => x.trim().replace(/^\||\|$/g, '').split('|').map(h => satirIci(h.trim()));
      const bas = hucreler(s);
      i += 2;
      const govde = topla(/^\s*\|.*\|\s*$/, /$^/).map(hucreler);
      cikti.push('<div class="tablo"><table><thead><tr>' + bas.map(h => `<th>${h}</th>`).join('') + '</tr></thead><tbody>' +
        govde.map(r => '<tr>' + r.map(h => `<td>${h}</td>`).join('') + '</tr>').join('') + '</tbody></table></div>');
      continue;
    }
    if (/^\s*\d+[.)]\s+/.test(s)) {
      cikti.push('<ol>' + topla(/^\s*\d+[.)]\s+/, /^\s*\d+[.)]\s+/).map(x => `<li>${satirIci(x)}</li>`).join('') + '</ol>');
      continue;
    }
    const tampon = [];
    while (i < satirlar.length && satirlar[i].trim() && !BLOK.test(satirlar[i])) tampon.push(satirlar[i++].trim());
    cikti.push(`<p>${satirIci(tampon.join(' '))}</p>`);
  }
  return cikti.join('\n');
}

module.exports = { onBilgi, markdown, satirIci, kacis };
