# Portfolyo Sitesi

Klasör tabanlı kişisel portfolyo. `projeler/` altına açtığın her klasör, sitede otomatik olarak bir proje kartına ve detay sayfasına dönüşür. Kod yazman gerekmez.

```
Portfolyo Sitesi/
├── projeler/                ← PROJELER (en çok burayla uğraşacaksın)
│   ├── _sablon/proje.md     ← yeni proje için kopyalanacak şablon ("_" ile başlayanlar görünmez)
│   ├── 01-teknofest-savasan-iha/
│   │   ├── proje.md         ← başlık, özet, etiketler + yazı
│   │   ├── kapak.jpg        ← (isteğe bağlı) kapak görseli
│   │   ├── 01-ucus.jpg      ← diğer görseller → Galeri
│   │   ├── demo.mp4         ← videolar → Videolar
│   │   └── rapor.pdf        ← PDF/STL/STEP/ZIP → Dokümanlar
│   └── ...
├── icerik/
│   ├── site.json            ← ad, unvan, hakkımda, deneyim, yetenekler, sertifikalar, YouTube
│   ├── logo.png, favicon.png
│   └── profil.jpg           ← (isteğe bağlı) profil fotoğrafı — koyarsan otomatik görünür
│                              (CV indirme butonu için PDF'i buraya koyup site.json'a "cv": "dosya.pdf" ekle)
├── sistem/                  ← sitenin motoru ve tasarımı (normalde dokunmana gerek yok)
├── onizle.bat               ← çift tıkla → siteyi bilgisayarında aç
└── dist/                    ← üretilen site (otomatik oluşur, elle düzenleme)
```

## Yeni proje ekleme

1. `projeler/_sablon` klasörünü kopyala ve yeniden adlandır, ör. `07-robot-kol`.
   - Baştaki sayı sıralamayı belirler (küçük olan önce gelir).
   - Klasör adı aynı zamanda sayfa adresi olur: `.../proje/robot-kol/`
2. `proje.md` içindeki alanları doldur ve altına projeyi anlat (Problem → Yaklaşım → Sonuçlar → Katkım).
3. Fotoğrafları, videoları ve PDF'leri klasöre at. Hepsi otomatik eklenir:
   | Dosya | Nereye gider |
   |---|---|
   | `kapak.jpg` / `kapak.png` | Kart ve sayfa kapağı (yoksa ilk görsel kullanılır) |
   | Diğer `.jpg .png .webp .gif .svg` | Galeri (dosya adına göre sıralı) |
   | `.mp4 .webm` | Videolar |
   | `.pdf .stl .step .zip .slx .m .ipynb ...` | Dokümanlar (indirilebilir) |
4. YouTube videosu için dosya koymana gerek yok; `proje.md` içinde `videolar:` altına linki yaz.
5. Bir projeyi geçici olarak gizlemek için `gizli: evet` yaz ya da klasör adının başına `_` koy.

### `proje.md` alanları

| Alan | Açıklama |
|---|---|
| `baslik`, `alt_baslik` | Proje adı ve tek cümlelik açıklama |
| `rol`, `tarih`, `durum` | Sayfanın üstündeki bilgi satırı |
| `kategoriler` | Filtre butonları ve kart etiketi, ör. `[GNC, Yarışma]` |
| `teknolojiler` | Kullanılan araçlar, ör. `[Python, ArduPilot]` |
| `ozet` | Kartta ve sayfa başında görünen kısa özet |
| `rozet` | Kartın köşesindeki ödül rozeti, ör. `Birincilik · 2025` |
| `one_cikan` | `evet` → ana sayfada geniş kart |
| `kapak` | Kapak dosyasının adı **veya** internetteki bir görselin linki |
| `videolar` | YouTube / Vimeo / Google Drive linkleri (liste) |
| `baglantilar` | `- GitHub: https://...` biçiminde liste |
| `gorseller` | İnternetteki görsel linkleri (ör. GitHub'daki grafikler) |
| `gorsel_aciklamalari` | `- 01-ucus.jpg: Açıklama` → galeride alt yazı |

Yazı kısmında Markdown kullanabilirsin: `## Başlık`, `- madde`, `**kalın**`, `[link](https://...)`, `![görsel](01-ucus.jpg)`, tablolar ve kod blokları.

## Bilgisayarında önizleme

`onizle.bat` dosyasına çift tıkla ya da terminalde:

```bash
npm run dev
```

Tarayıcıda `http://localhost:8080` açılır. `projeler/` veya `icerik/` içinde bir dosyayı kaydettiğin an sayfa kendiliğinden yenilenir. Bir uyarı varsa (ör. eksik `proje.md`, çok büyük görsel) terminalde `⚠` ile yazılır.

Sadece Node.js gerekir (v18+); başka hiçbir paket kurulmaz.

## İnternette yayınlama (GitHub Pages — ücretsiz, otomatik)

İlk kurulum (bir kere):

1. GitHub'da yeni bir repo oluştur (ör. `portfolyo`, ya da adresin `tahircankzn.github.io` olsun istersen repo adını `tahircankzn.github.io` yap).
2. Bu klasörü o repoya yükle (`dist/` klasörü yüklenmez, gerek yok).
3. Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions** seç.
4. `icerik/site.json` içindeki `site_url` alanına sitenin adresini yaz (ör. `https://tahircankzn.github.io/portfolyo/`). Bu, paylaşım önizlemeleri ve sitemap için kullanılır.

Bundan sonra: yeni proje klasörünü ekleyip GitHub'a gönderdiğinde (push ya da GitHub sitesinden "Add file → Upload files") site 1-2 dakika içinde kendiliğinden güncellenir.

Kendi alan adını (ör. `tahircankozan.com`) kullanmak istersen Settings → Pages → Custom domain kısmından ekleyebilirsin.

## Görselleri küçültme

Telefon fotoğrafları 4-8 MB olabilir ve siteyi yavaşlatır. Yüklemeden önce genişliği ~1600 px'e indirip JPG/WebP olarak kaydet (ör. [squoosh.app](https://squoosh.app)). Derleyici 1,5 MB'tan büyük görseller için uyarı verir. Büyük videoları klasöre koymak yerine YouTube'a yükleyip linkini eklemek daha iyidir.
