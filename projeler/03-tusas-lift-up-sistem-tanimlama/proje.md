---
baslik: Uçuş Verilerinden Aerodinamik Model Düzeltme
alt_baslik: TUSAŞ LIFT UP bitirme çalışması — İHA'lar için aerodinamik veritabanı düzeltmesi ve model doğrulaması.
rol: Bitirme Çalışması
tarih: 2025 – 2026
kategoriler: [Sistem Tanımlama, Uçuş Dinamiği, Akademik]
teknolojiler: [MATLAB, LS, WLS, OEM]
ozet: RC İHA uçuş ve sensör verileriyle LS, WLS ve OEM yöntemlerini kullanarak sistem tanımlama ve parametre kestirimi yaptım; kestirilen aerodinamik modeli uçuş verisine karşı doğruladım.
rozet: UHUK-2026 Bildirisi
---

<!-- Kestirim sonuç grafiklerini (ör. 01-ls-sonuc.png, 02-oem-dogrulama.png) ve sunum/rapor PDF'ini bu klasöre ekleyebilirsin. -->

## Problem

Rüzgar tüneli veya hesaplamalı yöntemlerle elde edilen aerodinamik veritabanları, gerçek uçuştaki davranışı her zaman doğru yansıtmaz. Bu çalışmanın amacı, gerçek uçuş verisini kullanarak aerodinamik katsayıları kestirmek ve mevcut modeli düzeltmekti.

## Yaklaşım

- Ravindra V. Jategaonkar'ın *Flight Vehicle System Identification* eserindeki zaman tanım kümesi yöntemleri temel alındı.
- DEHA (RC test platformu) uçuş ve sensör verileri üzerinde **en küçük kareler (LS)**, **ağırlıklı en küçük kareler (WLS)** ve **çıktı hatası (OEM)** yöntemleriyle parametre kestirimi.
- TUSAŞ veri seti için uçtan uca bir **MATLAB analiz akışı** kuruldu.
- Literatürde hazır uygulaması bulunmayan **WLS yöntemi** bu akışa entegre edildi.

## Sonuçlar

- Kestirilen aerodinamik model, uçuş verisine karşı doğrulandı.
- Çalışma, **11. Ulusal Havacılık ve Uzay Konferansı'nda (UHUK-2026)** bildiri olarak sunuldu.
- Proje, TUSAŞ tarafından **teşekkür belgesiyle** tamamlandı.

## Yayın

- **Başlık:** İnsansız Hava Araçları İçin Uçuş Verilerinden Aerodinamik Veritabanı Düzeltmesi ve Model Doğrulaması
- **Konferans:** 11. Ulusal Havacılık ve Uzay Konferansı (UHUK-2026)
- **Ortak yazarlar:** Emre Tunalı, Semih Dönmez, Alperen Burak Temiz, Yiğit Altun
- **Akademik danışman:** Doç. Dr. Mehmet Onur Genç

<!-- Buraya sayısal sonuçları ekle: ör. katsayı hataları, uyum (fit) yüzdesi, LS / WLS / OEM karşılaştırma tablosu. -->
