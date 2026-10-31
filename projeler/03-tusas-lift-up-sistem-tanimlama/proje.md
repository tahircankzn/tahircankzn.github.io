---
baslik: Uçuş Verilerinden Aerodinamik Model Düzeltme
alt_baslik: TUSAŞ LIFT UP bitirme çalışması — jet motorlu DEHA İHA'sının gerçek uçuş verilerinden aerodinamik türev kestirimi ve model doğrulaması.
rol: Bitirme Çalışması · BTÜ-Poyraz R&D
tarih: 2025 – 2026
kategoriler: [Sistem Tanımlama, Uçuş Dinamiği, Akademik]
teknolojiler: [MATLAB, LS, WLS / FGLS, OEM, Quad-M]
ozet: Jet motorlu DEHA İHA'sının 18 manevralık uçuş test verisinden LS → WLS → OEM zinciriyle aerodinamik türevleri kestirdik; sonuçlar UHUK-2026'da bildiri olarak sunuldu.
rozet: UHUK-2026 Bildirisi
kapak: 01-tusas-deha-ziyareti.jpg

gorsel_aciklamalari:
  - 01-tusas-deha-ziyareti.jpg: TUSAŞ İstanbul Teknopark yerleşkesinde ara değerlendirme toplantısı ve DEHA İHA'nın yakından incelenmesi
  - 02-uhuk-2026-sunum.jpg: Bildirinin 11. Ulusal Havacılık ve Uzay Konferansı'nda (UHUK-2026) sunumu
  - 03-boylamsal-oem-uyumu.jpg: Boylamsal eksen — OEM model çıktısı ile uçuş verisinin karşılaştırması
  - 04-yanal-yonsel-oem-uyumu.jpg: Yanal-yönsel eksen — OEM model çıktısı ile uçuş verisinin karşılaştırması
---

## Problem

Uçuş kontrolcüsü ve simülasyon tasarımında kullanılan aerodinamik veritabanları genellikle HAD analizleri veya rüzgâr tüneli deneyleriyle oluşturulur; ancak gerçek uçuştaki jet akışı etkileşimleri, elastik deformasyonlar ve ölçüm zinciri etkilerini her zaman yansıtamaz. Bu çalışmada TUSAŞ'ın jet motorlu **DEHA** İHA'sının gerçek uçuş test verilerinden aerodinamik kararlılık ve kontrol türevlerini kestirip aynı platform için daha önce raporlanan değerlerle karşılaştırdık.

## Veri ve yöntem

- **Veri:** İki sistem tanımlama uçuşunda 18 manevra kaydı — short period, dutch roll ve bank-to-bank; 40 Hz örnekleme.
- **Metodoloji:** Jategaonkar'ın *Flight Vehicle System Identification* eserindeki **Quad-M** yaklaşımı.
- **Ardışık kestirim zinciri:** En Küçük Kareler (**LS**) → Ağırlıklı En Küçük Kareler (**WLS**, iki aşamalı FGLS) → Çıkış Hatası Yöntemi (**OEM**, maksimum olabilirlik).
- **Heteroskedastisite:** Manevra kaydı başına artık varyansının **31 kata** varan oranda değiştiği gösterildi; ağırlık oranı sınırlandırılmış FGLS ağırlıklandırmasıyla ele alındı.
- **Benim katkım:** MATLAB analiz akışının kurulması ve literatürde hazır uygulaması bulunmayan WLS/FGLS adımının bu akışa entegre edilmesi.

## Sonuçlar

**OEM model uyumu (WLS başlangıcı):**

| Eksen | Kanal | TIC | R² |
|---|---|---|---|
| Boylamsal | Hücum açısı (α) | 0,135 | 0,780 |
| Boylamsal | Dikey ivme (a_z) | 0,125 | 0,892 |
| Yanal-yönsel | Yalpa hızı (p) | 0,143 | 0,921 |
| Yanal-yönsel | Yatış açısı (φ) | 0,186 | 0,857 |

Yanal-yönsel eksende altı gözlem kanalının beşi TIC < 0,25 uyum eşiğini sağladı.

**Referans çalışmayla karşılaştırma** (aynı platform, [Özvarinli vd., 2025]):

| Türev | Bu çalışma (OEM) | Referans |
|---|---|---|
| C_Yβ | −0,427 | −0,439 |
| C_lp | −0,161 | −0,170 |
| C_nβ | 0,078 | 0,086 |

- Bu türevler referans değerlerle **%3–9** aralığında örtüştü.
- WLS, yalpa sönümü ve kanatçık etkinliği türevlerini referans değerlere yaklaştırdı ve OEM için fiziksel olarak daha makul başlangıç değerleri üretti.
- LS ve WLS başlangıçlarıyla çalıştırılan OEM birbirine örtüşen nihai çözümler üretti; bu, kestirim zincirinin başlangıç değerine duyarlı olmadığını gösterdi.

## Yayın

- **Başlık:** Sabit Kanatlı Hava Araçları İçin Uçuş Verilerinden Aerodinamik Veritabanı Düzeltmesi ve Model Doğrulaması
- **Konferans:** 11. Ulusal Havacılık ve Uzay Konferansı (UHUK-2026-076), 17–19 Eylül 2026, Eskişehir Osmangazi Üniversitesi
- **Yazarlar:** Alperen Burak Temiz, Emre Tunalı, Semih Dönmez, Tahir Can Kozan, Yiğit Altun, Doç. Dr. Mehmet Onur Genç
- Proje, TUSAŞ tarafından teşekkür belgesiyle tamamlandı.
