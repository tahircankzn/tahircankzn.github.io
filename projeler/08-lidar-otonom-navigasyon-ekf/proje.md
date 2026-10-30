---
baslik: LiDAR Tabanlı Otonom Navigasyon ve EKF Sensör Füzyonu
alt_baslik: 11 farklı robot modeliyle yol planlama, LiDAR simülasyonu ve Genişletilmiş Kalman Filtresi ile lokalizasyon.
rol: Mobil Robotlar Dersi — Ödev 1
tarih: 2026
kategoriler: [Ders Projesi, Robotik, Sensör Füzyonu]
teknolojiler: [Python, EKF, A*, RRT*, LiDAR]
ozet: 25 m × 25 m'lik bir depo ortamında LiDAR + IMU + enkoder verilerini EKF ile birleştiren, 9 farklı yol planlayıcıyı 11 robot modelinde karşılaştıran navigasyon simülatörü.
kapak: https://raw.githubusercontent.com/tahircankzn/Mobile-Robots-Assignment-1/main/outputs/rapor_20260519_132804/ozet_rapor.png

baglantilar:
  - GitHub: https://github.com/tahircankzn/Mobile-Robots-Assignment-1

gorseller:
  - https://raw.githubusercontent.com/tahircankzn/Mobile-Robots-Assignment-1/main/outputs/rapor_20260519_132804/diff__astar__euclidean__shortest/yol.png
  - https://raw.githubusercontent.com/tahircankzn/Mobile-Robots-Assignment-1/main/outputs/rapor_20260519_132804/diff__astar__euclidean__shortest/lidar.png
  - https://raw.githubusercontent.com/tahircankzn/Mobile-Robots-Assignment-1/main/outputs/rapor_20260519_132804/diff__astar__euclidean__shortest/lokalizasyon.png
---

## Senaryo

50 × 50 hücrelik (25 m × 25 m) bir fabrika/depo ortamında, 12 dikdörtgen engel arasında başlangıç noktası (1,0 m; 1,0 m) ile hedef (23,5 m; 23,5 m) arasında gürültülü sensörlerle otonom navigasyon.

## Yaklaşım

- **Robot modelleri:** Diferansiyel sürüş, Ackermann, sabit kanat, omni, mecanum, drone, VTOL, yürüyen robotlar dahil 11 kinematik model.
- **Yol planlayıcılar:** A\*, Dijkstra, D\* Lite, RRT, RRT\* ve reaktif yöntemler (Bug1, Bug2, Potential Fields, VFH).
- **LiDAR:** 360 ışın, 10 m menzil, σ = 0,05 m gürültü; medyan filtre ve Bresenham ile ray-casting.
- **EKF:** Durum vektörü `[x, y, θ]`; LiDAR konumu, IMU açısı ve enkoder odometrisinin füzyonu.

## Sonuçlar

| Robot | Planlayıcı | RMSE (m) | Yol (hücre) |
|---|---|---|---|
| Differential | A\* | **0,1309** | 54 |
| Drone | A\* | 0,1310 | 54 |
| Bipedal | A\* | 0,1316 | 54 |
| Mecanum | Dijkstra | 0,1318 | 99 |
| Fixed-wing | A\* | 0,1395 | 60 |

En düşük EKF konum hatası **diferansiyel sürüşlü robotta (0,1309 m RMSE)** elde edildi.
