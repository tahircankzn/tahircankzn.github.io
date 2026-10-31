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

gorsel_aciklamalari:
  - 01-en-iyi-tasarim-odulu.jpg: TEKNOFEST 2025 Savaşan İHA Yarışması — En İyi Tasarım Ödülü
  - 02-takim-teknofest-2025.jpg: BTÜ-POYRAZ takımı, TEKNOFEST 2025
  - 03-anka-pistte.jpg: ANKA İHA'mız pistte
  - 04-ucus-testi-ucak.jpg: Uçuş testi öncesi hazırlık
  - 05-ucus-testi-yer-istasyonu.jpg: Uçuş testinde yer kontrol istasyonu başında
  - 06-btu-poyraz-standi.jpg: TEKNOFEST alanında BTÜ-POYRAZ standı
  - 07-teknofest-2024.jpg: TEKNOFEST 2024 Savaşan İHA yarışma alanı
  - 08-takim-2024.jpg: Takım, 2024

baglantilar:
  - Yer kontrol istasyonu: ../poyraz-yer-kontrol-istasyonu/
---

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
