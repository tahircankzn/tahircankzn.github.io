---
baslik: TEKNOFEST Savaşan İHA
alt_baslik: Rakip İHA'ları otonom olarak tespit edip takip eden sabit kanatlı İHA için görev yazılımı ve yer kontrol istasyonu.
rol: Yazılım Ekip Lideri & RC Pilot
tarih: 2024 – 2026
kategoriler: [GNC, Görüntü İşleme, Yarışma]
teknolojiler: [ArduPilot, MAVLink, Python, OpenCV, YOLO, Gazebo]
ozet: 7 kişilik yazılım ekibini yönettiğim TEKNOFEST takımında ArduPilot tabanlı otonom görev yazılımı, hedef takibi ve yer kontrol istasyonu geliştirdik. Takım 2025'te En İyi Tasarım Ödülü'nü kazandı.
rozet: En İyi Tasarım Ödülü · 2025
one_cikan: evet

videolar:
  # - https://www.youtube.com/watch?v=...

baglantilar:
  # - GitHub: https://github.com/tahircankzn/...
---

<!-- Bu klasöre yarışma fotoğrafları (kapak.jpg, 01-..., 02-...), kilitlenme videoları ve takım raporu PDF'ini ekleyebilirsin. -->

## Problem

TEKNOFEST Savaşan İHA yarışmasında İHA'nın görev süresince rakip İHA'ları görüntü işleme ile tespit etmesi, otonom olarak takip edip kilitlenmesi ve tüm bu süreci yer istasyonundan güvenli şekilde izlemek gerekiyor. Bu da algılama, güdüm, haberleşme ve arayüzü gerçek zamanlı çalışan tek bir sistemde birleştirmeyi gerektiriyor.

## Yaklaşım

- **Otonom görev yazılımı:** ArduPilot ve MAVLink üzerinde hedef takibi ve GNC algoritmaları geliştirdik.
- **Yer kontrol istasyonu:** Görüntü işleme, hedef takibi, kablosuz haberleşme ve arayüz modüllerini tek bir istasyonda entegre ettik. Detaylar: [POYRAZ Yer Kontrol İstasyonu](../poyraz-yer-kontrol-istasyonu/).
- **Simülasyonla doğrulama:** Algoritmaları sahaya çıkmadan önce Gazebo / SITL ortamında test ettik.

## Sonuçlar

- Takım 2025'te **En İyi Tasarım Ödülü**'nü kazandı.
- 2024 ve 2025'te TEKNOFEST Savaşan İHA başarı sertifikası alındı.

## Benim katkım

7 kişilik yazılım ekibinin liderliğini üstlendim: görev dağılımı, yazılım mimarisi ve entegrasyon. Ayrıca takımın RC pilotu olarak uçuş testlerinde görev aldım.
