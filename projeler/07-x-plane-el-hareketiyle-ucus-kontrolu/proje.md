---
baslik: El Hareketleriyle X-Plane Uçuş Kontrolü
alt_baslik: MediaPipe ile algılanan el hareketlerini gerçek zamanlı uçuş komutlarına çeviren görüntü tabanlı kontrolcü.
rol: Kişisel Proje
tarih: 2025
kategoriler: [Görüntü İşleme, Simülasyon, Kişisel Proje]
teknolojiler: [Python, MediaPipe, OpenCV, X-Plane 11, XPC]
ozet: Kameradan algılanan iki elin 21 eklem noktası ile X-Plane 11'i gerçek zamanlı kontrol eden sistem — sağ el gaz ve kalkış, sol el yunuslama (pitch) ve yatış (roll).
kapak: https://img.youtube.com/vi/mk37UO0KcNg/maxresdefault.jpg

videolar:
  - https://youtu.be/mk37UO0KcNg

baglantilar:
  - GitHub: https://github.com/tahircankzn/X-Plane11-Vision-Based-Controller
---

## Fikir

Joystick yerine sadece bir kamera ve iki elle uçak uçurmak. Proje, ileride farklı bilgisayarlı görü girdileriyle genişletilebilecek şekilde tasarlandı.

## Sistem mimarisi

1. MediaPipe ile her iki elin **21 landmark** noktası her karede alınır ve piksel koordinatlarına çevrilir.
2. **Sağ elde yumruk** algılandığında uçuş başlatılır: orta parmak ucunun bileğe uzaklığı, orta parmak alt boğumunun bileğe uzaklığından küçükse yumruk sayılır.
3. **Throttle**, sağ elin orta parmağı ile bilek arasındaki mesafeden hesaplanır.
4. **Pitch ve roll**, sol elin orta parmak boğumunun konumundan hesaplanır.
5. Komutlar **XPC (X-Plane Connect)** üzerinden UDP ile X-Plane 11'e gönderilir.

## Kullanılan araçlar

| Bileşen | Görev |
|---|---|
| `mediapipe` | El eklem noktalarının tespiti |
| `cv2` (OpenCV) | Kamera akışı ve görüntü işleme |
| `xpc` | X-Plane 11 ile Python üzerinden haberleşme |
