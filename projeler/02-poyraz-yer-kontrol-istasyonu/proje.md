---
baslik: POYRAZ Yer Kontrol İstasyonu
alt_baslik: TEKNOFEST 2025 Savaşan İHA için sıfırdan geliştirdiğim, harita, uçuş göstergeleri, görev komutları ve kamera/HUD ekranından oluşan iki ekranlı yer kontrol istasyonu.
rol: Geliştirici · Yazılım Ekip Lideri
tarih: 2024 – 2025
kategoriler: [Yer Kontrol İstasyonu, GNC, Yarışma]
teknolojiler: [Python, PyQt5, DroneKit, MAVLink, ArduPilot, Leaflet, Flask, A*]
ozet: POYRAZ takımının yarışma YKİ'si. Yarışma sunucusu entegrasyonu, HSS bölgelerinden A* ile kaçış rotası, kamikaze görevi, uçuş göstergeleri ve hedef kilitlenmesini gösteren HUD'lu kamera ekranı tek bir uygulamada.
rozet: Savaşan İHA 2025
one_cikan: evet

gorsel_aciklamalari:
  - 01-ana-ekran-bolumleri.jpg: POYRAZ ana ekranı — 1 harita ve HSS bölgeleri, 2 uçuş göstergeleri, 3 telemetri, 4 komut paneli, 5 mesaj / komut satırı
  - 02-eagleeye-kamera-hud.jpg: EagleEye kamera ekranı — pusula şeridi, hız/irtifa bantları, yatış göstergesi ve hedef kilit kutusu
  - 03-eaglehead-ucus-ekrani.jpg: Yeni nesil EAGLEHEAD YKİ — uçuş ekranı (PFD, telemetri, mod ve görev komutları, rakip tablosu)
  - 04-eaglehead-gorev-planlama.jpg: Yeni nesil EAGLEHEAD YKİ — görev planlama ve yarışma alanı
---

## Neden kendi YKİ'mizi yazdık?

Savaşan İHA yarışması; yarışma sunucusuna sürekli telemetri göndermeyi, kilitlenme ve kamikaze bilgisini bildirmeyi, sunucudan gelen **HSS (hava savunma sistemi)** bölgelerinden kaçınmayı ve sunucu saatiyle senkron çalışmayı gerektiriyor. Bu akışları tek ekrandan, uçuş sırasında hızlıca yönetebilmek için POYRAZ YKİ'sini sıfırdan geliştirdim.

## İki ekran

**Ana ekran** (galerideki numaralı görsel):

1. **Harita:** Çevrimdışı `.mbtiles` uydu haritası üzerinde yarışma alanı sınırları, HSS bölgeleri, rota ve İHA konumu (Leaflet, PyQt5 WebEngine içinde).
2. **Uçuş göstergeleri:** Yapay ufuk, altimetre, hız, HSI, dikey hız ve dönüş koordinatörü.
3. **Telemetri:** Hava/yer hızı, irtifa, konum, yönelim açıları, batarya ve sinyal kalitesi.
4. **Komut paneli:** ARM / DISARM, kalkış, iniş, mod değiştirme, konuma git, rota gösterme/silme, kamikaze, HSS ve HSS rotası.
5. **Mesaj / komut satırı:** Sunucu cevapları, olay kaydı ve `!komut` ile metin komutları.

**EagleEye kamera ekranı:** İHA'dan gelen canlı görüntü üzerinde pusula şeridi, hız ve irtifa bantları ile yatış göstergesinden oluşan HUD; hedef kilit kutusu ve görev durumu (hedef ID, mesafe, kilit / takip durumu).

## Öne çıkan özellikler

- **Yarışma sunucusu entegrasyonu:** Giriş, telemetri gönderimi, kilitlenme ve kamikaze bildirimi, HSS koordinatlarının alınması, sunucu saati.
- **HSS kaçış rotası:** Yasak bölgeleri ızgara üzerinde işaretleyip **A\*** ile kaçış rotası üretme ve waypoint yumuşatma.
- **Kamikaze görevi:** Hedefe dalış ve yeniden irtifa kazanma rotası.
- **GPS saat senkronizasyonu:** Ayrı bir iş parçacığında GPS saatinin takibi.
- **Sesli uyarılar:** HSS, rakip ve ARM durumları için.
- **Gelişmiş ARM teşhisi:** Prearm kontrollerinin raporlanması, zorla ARM, parametre sıfırlama.
- **Flask telemetri sunucusu:** Telemetrinin diğer ekranlara / takım üyelerine yayını.

| Bileşen | Kapsam |
|---|---|
| Ana arayüz | ~2.550 satır Python (PyQt5) |
| Göstergeler | 6 analog uçuş göstergesi |
| Komutlar | 25+ komut butonu + metin komut satırı |
| Harita | Çevrimdışı `.mbtiles` (Gökçeada yarışma alanı dahil) |

## Yeni nesil: EAGLEHEAD YKİ (2026)

POYRAZ'da edindiğim deneyimle 2026'da YKİ'yi, yapay zekâ destekli geliştirme araçlarını (Claude Code) kullanarak **EAGLEHEAD** adıyla web tabanlı olarak baştan yazdım:

- **Mimari:** pymavlink köprüsü + FastAPI / WebSocket (10 Hz) + çevrimdışı Leaflet arayüzü; Python 3.10+ ile çalışmayan DroneKit kaldırıldı.
- **Ekranlar:** Uçuş (HUD, telemetri, modlar), Görev (sürükle-bırak waypoint, araçtan oku / araca yaz, HSS çakışma kontrolü ve kaçınma), Yarışma (rakip tablosu, takip, kamikaze dalış rotası), Analiz, Kurulum.
- **Çoklu pencere / monitör:** Her görünüm ayrı pencerede açılabiliyor, pencere düzeni kaydediliyor.
- **Güvenilirlik:** Tüm sunucu isteklerinde zaman aşımı (arayüz donmuyor), şifreler koddan çıkarıldı, sunucu–saat farkı ölçülüyor.
- **Test:** Sahte yarışma sunucusu, ArduPlane SITL ve X-Plane ile uçtan uca simülasyon.
