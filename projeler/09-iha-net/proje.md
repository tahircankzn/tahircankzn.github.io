---
baslik: "İHA-NET: Hayat Kurtaran Ağ"
alt_baslik: Afet sonrası iletişimin koptuğu bölgelerde İHA'larla WiFi hotspot ağı kuran ve vatandaş bildirimlerini önceliklendiren sistem.
rol: LODOS Takımı · Hackathon projesi
tarih: Mayıs 2025
kategoriler: [Yarışma, Yapay Zekâ]
teknolojiler: [Python, Flask, MAVLink, Scikit-learn]
ozet: 11 takım ve 40 öğrencinin katıldığı, 32 saat süren Dijital Deprem Çözümleri Hackathonu'nda geliştirdiğimiz ve 3.lük ödülü alan afet iletişim sistemi.
rozet: Hackathon 3.lüğü · 2025

baglantilar:
  - BTÜ haberi: https://btu.edu.tr/tr/haber/detay/7352/dijital-deprem-%C3%A7%C3%B6z%C3%BCmleri-hackathonu-ger%C3%A7ekle%C5%9Ftirildi
---

## Yarışma

Bursa Teknik Üniversitesi Endüstri ve Dijital Dönüşüm Topluluğu'nun, Gençlik ve Spor Bakanlığı ÜNİDES desteğiyle Mimar Sinan Yerleşkesi'nde düzenlediği **Dijital Deprem Çözümleri Hackathonu**'nda **11 takımdan 40 üniversite öğrencisi**, **32 saat** boyunca deprem öncesi hazırlık, anlık müdahale ve sonrası iyileştirme süreçlerine yönelik çözümler geliştirdi. Takımımız LODOS, BTÜ Uzay Havacılık ve Savunma Sanayi Topluluğu bünyesinde yarıştı ve **üçüncülük ödülü** aldı.

## Problem

Deprem gibi afetlerden sonra bölgedeki iletişim altyapısı çökebiliyor; vatandaşlar durumlarını ve konumlarını bildiremiyor, arama-kurtarma ekipleri de neye öncelik vereceğini bilemiyor.

## Çözüm

- Yer kontrol istasyonundan fırlatılan **RocketM5 donanımlı İHA'lar** bölgede **WiFi hotspot ağı** kuruyor.
- Vatandaşlar internet bağlantısı gerektirmeyen bir **web portalı** üzerinden durumlarını ve konumlarını bildiriyor.
- **Yapay zekâ destekli önceliklendirme** bu bildirimleri önem derecesine göre sıralayıp yetkililere iletiyor.
- Arama-kurtarma ekipleri gerçek zamanlı ve önceliklendirilmiş verilere göre organize oluyor.

## Sonuçlar

- Hotspot sistemi yarışmada canlı olarak çalıştırıldı; jüri üyeleri sistemi bizzat denedi.
- Yapay zekâ önceliklendirme modeli **%73 doğruluk** verdi.
- Gerçek zamanlı İHA telemetri entegrasyonu ve çevrimdışı çalışan web portalı tamamlandı.
- Proje **3.lük ödülü** aldı.

Python Flask backend, MAVLink ile İHA kontrolü ve Scikit-learn modeli dahil tüm bileşenler yarışma süresince kodlandı.

**Takım (LODOS):** Canan Bora, Alperen Burak Temiz, Ahmet Güldaş, Tahir Can Kozan, Durmuş Tayyip Üzer
