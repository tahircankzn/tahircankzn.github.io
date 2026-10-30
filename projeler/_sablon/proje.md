---
# ============================================================================
#  YENİ PROJE ŞABLONU
#  1) Bu "_sablon" klasörünü kopyala, adını değiştir. Örnek: "07-robot-kol"
#     - Baştaki sayı sıralamayı belirler (küçük olan önce gelir).
#     - "_" ile başlayan klasörler sitede GÖRÜNMEZ (bu şablon gibi).
#  2) Bu dosyadaki alanları doldur. Boş bıraktığın alan sitede görünmez.
#  3) Klasöre fotoğraf, video (.mp4), PDF, STL, STEP vb. at — hepsi otomatik eklenir:
#     - "kapak.jpg" adlı görsel kapak olur (yoksa ilk görsel kapak olur).
#     - Diğer görseller "Galeri"ye, PDF/STL/STEP vb. "Dokümanlar"a girer.
#     - Görseller dosya adına göre sıralanır: 01-..., 02-... diye adlandırabilirsin.
#  "#" ile başlayan satırlar yorumdur, sitede görünmez.
# ============================================================================

baslik: Projenin Adı
alt_baslik: Tek cümlelik açıklama — ne yaptın, neden önemli?
rol: Projedeki rolün (ör. Yazılım Sorumlusu)
tarih: 2025
durum:                     # ör. Devam ediyor / Tamamlandı (istersen boş bırak)
kategoriler: [GNC, Ders Projesi]      # filtre butonlarında görünür
teknolojiler: [Python, MATLAB, ROS 2]
ozet: Kartta ve sayfanın başında görünen 1-2 cümlelik özet.
rozet:                     # ör. Birincilik Ödülü · 2025 (kartın köşesinde rozet olarak görünür)
one_cikan: hayir           # evet → ana sayfada geniş kart olarak gösterilir
gizli: hayir               # evet → siteden gizlenir (taslak için)

videolar:
  # - https://www.youtube.com/watch?v=XXXXXXXXXXX
  # - https://youtu.be/XXXXXXXXXXX
  # (Klasöre koyduğun .mp4 dosyaları da otomatik eklenir.)

baglantilar:
  # - GitHub: https://github.com/tahircankzn/repo-adi
  # - Rapor: https://...

gorsel_aciklamalari:
  # - 01-test-ucusu.jpg: İlk test uçuşundan bir kare
  # - rapor.pdf: Proje final raporu

gorseller:
  # İnternetteki görselleri de ekleyebilirsin (ör. GitHub'daki grafikler):
  # - https://raw.githubusercontent.com/kullanici/repo/main/sonuc.png
---

## Problem

Hangi problemi çözmeye çalıştın? Neden zordu / önemliydi?

## Yaklaşım

- Hangi yöntemleri, algoritmaları kullandın?
- Sistem mimarisi nasıldı?

Metnin arasına görsel de koyabilirsin:
![Açıklama](01-test-ucusu.jpg)

## Sonuçlar

Ölçülebilir sonuçlar yaz: doğruluk, süre, hata oranı, aldığınız derece...

| Metrik | Değer |
|---|---|
| Örnek | 0,13 m |

## Benim katkım

Ekip projesiyse özellikle senin yaptıklarını yaz.
