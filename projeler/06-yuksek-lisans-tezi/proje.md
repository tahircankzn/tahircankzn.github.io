---
baslik: Hafif Platform Hava Araçları İçin Sistem Tanımlama Tabanlı Kontrol Tasarımı
alt_baslik: Yüksek lisans tezi — kendi ürettiğim RC uçağın uçuş verilerinden aerodinamik model kestirimi, MATLAB'da 6-DOF model ve bu model üzerinde kontrolcü tasarımı.
rol: Yüksek Lisans Tezi
tarih: 2026 –
durum: Devam ediyor
kategoriler: [Sistem Tanımlama, Uçuş Kontrol, Akademik]
teknolojiler: [MATLAB, Simulink, RC Uçak, LS, WLS, OEM]
ozet: Bir RC uçak üretip sistem tanımlama uçuşlarıyla veri toplayarak aerodinamik modelini kestirmeyi, bu modelle MATLAB'da 6-DOF bir uçuş modeli kurmayı ve model tabanlı bir uçuş kontrolcüsü tasarlamayı hedefleyen yüksek lisans tezim.
---

## Amaç

Tez başlığı: **Hafif Platform Hava Araçları İçin Sistem Tanımlama Tabanlı Model Tabanlı Kontrol Tasarımı ve Geliştirilmesi**

Amacım, hafif bir sabit kanatlı platformun aerodinamik modelini doğrudan uçuş verisinden elde etmek ve bu model üzerinde kontrolcü tasarlamak: uçağın üretiminden kontrolcüye kadar uçtan uca bir süreç.

## Planlanan iş akışı

1. **Platform:** Tez için bir RC uçak üretiyorum.
2. **Uçuş testleri:** Sorti bazlı sistem tanımlama uçuşlarında hedeflenen modları uyaran manevralarla veri toplanacak:
   - **Short period** (boylamsal)
   - **Bank-to-bank** (yalpa)
   - **Dutch roll** (yanal-yönsel)
3. **Sistem tanımlama:** Toplanan verilerden aerodinamik türevler ve katsayılar kestirilecek.
4. **6-DOF model:** Kestirilen aerodinamik modelle MATLAB/Simulink'te altı serbestlik dereceli bir uçuş modeli kurulacak.
5. **Kontrolcü tasarımı:** Bu model üzerinden model tabanlı uçuş kontrolcüsü tasarlanacak.

## Önceki çalışmalarla bağlantısı

- [TUSAŞ LIFT UP](../tusas-lift-up-sistem-tanimlama/) bitirme projesinde jet motorlu DEHA İHA'sının uçuş verileri üzerinde LS, WLS ve OEM ile sistem tanımlama zincirini kurdum. Tezde bu birikimi, verisini kendim topladığım bir platforma taşıyacağım.
- MATLAB'da 6-DOF sabit kanat modeli kurma çalışmamı [YouTube kanalımda](https://www.youtube.com/watch?v=dM2T-FMDbfk) paylaştım.

<!-- Tez ilerledikçe bu sayfayı güncelleyebilirsin: uçak görselleri, uçuş test videoları, kestirim sonuçları, kontrolcü simülasyonları. -->
