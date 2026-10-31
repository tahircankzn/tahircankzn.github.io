---
baslik: Pekiştirmeli Öğrenme ile Sabit Kanatlı İHA Navigasyonu
alt_baslik: Global yol planlama ve reaktif kontrolü ayıran, ArduPilot ile canlı çalışan iki katmanlı pekiştirmeli öğrenme mimarisi.
rol: Pekiştirmeli Öğrenmeye Giriş dersi projesi
tarih: 2026
kategoriler: [GNC, Ders Projesi, Yapay Zekâ]
teknolojiler: [Python, Q-Learning, SARSA, Double DQN, ArduPilot, MAVLink]
ozet: Sabit kanatlı bir İHA'nın otonom navigasyonu için iki katmanlı bir pekiştirmeli öğrenme mimarisi geliştirdim; üretilen rota ArduPilot'a görev olarak yüklendi, reaktif katman MAVLink üzerinden canlı roll komutları verdi.

gorsel_aciklamalari:
  - 01-egitim-ilk-asama.jpg: Double DQN eğitiminin ilk aşaması — ödül, kayıp, keşif oranı ve bölüm sonuçları
---

## Yaklaşım

**1. Katman — Global yol planlama**

- Q-Learning, SARSA, Monte Carlo ve TD(λ) algoritmalarıyla global rota üretildi.
- Elde edilen rota waypoint listesi olarak ArduPilot'a görev dosyası şeklinde yüklendi; araç AUTO modunda rotayı otonom olarak takip etti.

**2. Katman — Reaktif kontrol**

- Double Deep Q-Network (Double DQN) ile aracın gerçek zamanlı olarak hedefe yönelmesi ve engellerden kaçınması sağlandı.
- Ayrık aksiyon uzayı nedeniyle kontrol, belirli roll komutları üzerinden yapıldı.

## Eğitim stratejisi

**Curriculum Learning** ile ajan önce hedefe ulaşmayı, ardından engellerden kaçınmayı öğrendi. MAVLink üzerinden ArduPilot ile canlı haberleşme kurularak reaktif uçuş kontrolü gerçekleştirildi.

## Sonuçlar

Kapak görselindeki son eğitim oturumunun (187 bölüm) sonunda, son 10 bölümlük pencerede:

| Metrik | Değer |
|---|---|
| Başarı oranı (hedefe ulaşma) | %94,5 |
| Çarpışma oranı | %2,8 |
| Sınır dışına çıkma oranı | %1,5 |

İlk aşamada (galerideki grafik) çarpışma oranı %57 seviyesindeydi; eğitim ilerledikçe ajan engellerden kaçınmayı öğrendi.
