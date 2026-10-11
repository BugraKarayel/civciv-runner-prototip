# 🐥 Civciv Runner (Prototype)

[English](#english) | [Türkçe](#türkçe)

---

<a name="english"></a>
## English

A retro pixel-art endless runner game developed for **GDG on Campus Bolu Abant Izzet Baysal University**. It combines classic Google Chrome Dino mechanics with Flappy Bird aerial gameplay.

### 🎮 Features
- **Dual Gameplay Modes:**
  - **Ground Mode (Dino Style):** Jump over rocks and cacti while grabbing seeds placed atop obstacles.
  - **Flight Mode (Flappy Style):** Launch off ramps into the air and glide through branded pipes with flap physics.
- **Ramp & Pit Mechanic:** Hitting the ramp launches you into the air. If you avoid or miss the ramp, you fall into the void and game over.
- **Scoring & Seed Balance:** `Net Score = Distance Score + Seed Score` (+15 points per collected seed, indicated by a floating retro gold `+15` animation).
- **Google Dino Acceleration:** Continuous smooth speed ramp (`ACCELERATION = 0.0018`) and celebratory 100m milestones (chime sound, sparks, flashing distance display).
- **Daily Leaderboard & Moderation:** LocalStorage-based Daily Top 10 leaderboard with automatic leetspeak/profanity filtering (`Civciv#XXX`) and hidden admin tools (`Ctrl + Shift + A`).
- **Display Optimization:** VSync-quantized delta timing and integer pixel snapping for stutter-free 60Hz and high-refresh-rate displays.

---

### 🚀 How to Run Locally

Because the game uses modern ES modules (`import`/`export`), it must be served over a local HTTP server rather than opened directly via `file://`.

#### Option 1: Using Python (Recommended)
1. Clone the repository:
   ```bash
   git clone https://github.com/BugraKarayel/civciv-runner-prototip.git
   cd civciv-runner-prototip
   ```
2. Start a local server:
   ```bash
   python -m http.server 8000
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

#### Option 2: Using Node.js / npx
```bash
npx serve .
```
Then visit the URL displayed in the terminal (usually `http://localhost:3000`).

#### Option 3: VS Code Live Server
- Open the project folder in **VS Code**.
- Install the **Live Server** extension.
- Right-click `index.html` and click **"Open with Live Server"**.

### ⌨️ Controls
- **Space** or **Click / Tap:** Jump (Ground Mode) / Flap (Flight Mode) / Start Game
- **Ctrl + Shift + A:** Open Admin Panel (Daily reset, remove score, export JSON/CSV)

---

<a name="türkçe"></a>
## Türkçe

**GDG on Campus Bolu Abant İzzet Baysal Üniversitesi** için geliştirilmiş retro piksel temalı sonsuz koşu (endless runner) prototip oyunu. Klasik Google Dino koşu mekaniği ile Flappy Bird uçuş dinamiğini bir araya getirir.

### 🎮 Özellikler
- **İki Farklı Oyun Modu:**
  - **Kara Modu (Dino Stili):** Kaya ve kaktüs engellerinin üzerinden zıplayarak ilerleyin, engellerin tepesindeki tohumları toplayın.
  - **Uçuş Modu (Flappy Stili):** Rampadan havalanarak logolu kuleler/borular arasından flap mekaniğiyle süzülün.
- **Rampa & Boşluk Mekaniği:** Rampaya çarpmak sizi havaya fırlatır. Rampayı es geçen veya atlayamayan oyuncu boşluğa düşerek elenir.
- **Skor & Tohum Dengesi:** `Net Skor = Mesafe Skoru + Tohum Skoru` (Tohum başı +15 net puan ve yukarı süzülen altın sarısı `+15` efekti).
- **Google Dino Hız Modeli:** Sürekli yumuşak ivmelenme (`ACCELERATION = 0.0018`) ve her 100 metrede bir faz (milestone) kutlaması (çan sesi, kıvılcımlar, gösterge parlaması).
- **Günlük Liderlik Tablosu & Güvenlik:** LocalStorage tabanlı Günün Top 10 sıralaması, leetspeak korumalı küfür filtresi (`Civciv#XXX`) ve gizli admin paneli (`Ctrl + Shift + A`).
- **Ekran Optimizasyonu:** 60Hz ve yüksek yenileme hızlı monitörlerde takılmaları sıfırlayan VSync-quantized delta ve piksel hizalama.

---

### 🚀 Bilgisayarda Nasıl Çalıştırılır?

Oyun modern JavaScript ES modüllerini (`import`/`export`) kullandığı için doğrudan `file://` ile çift tıklayarak açmak yerine yerel bir HTTP sunucusu üzerinden çalıştırılmalıdır.

#### 1. Yöntem: Python ile Çalıştırma (Önerilen)
1. Depoyu klonlayın:
   ```bash
   git clone https://github.com/BugraKarayel/civciv-runner-prototip.git
   cd civciv-runner-prototip
   ```
2. Yerel sunucuyu başlatın:
   ```bash
   python -m http.server 8000
   ```
3. Tarayıcınızdan şu adrese gidin:
   ```
   http://localhost:8000
   ```

#### 2. Yöntem: Node.js / npx ile Çalıştırma
```bash
npx serve .
```
Ardından terminalde belirtilen adresi açın (genellikle `http://localhost:3000`).

#### 3. Yöntem: VS Code Live Server ile
- Proje klasörünü **VS Code** ile açın.
- **Live Server** eklentisini yükleyin.
- `index.html` dosyasına sağ tıklayıp **"Open with Live Server"** seçeneğini seçin.

### ⌨️ Kontroller
- **Space** veya **Tıklama / Dokunma:** Zıpla (Kara Modu) / Kanat Çırp (Uçuş Modu) / Oyunu Başlat
- **Ctrl + Shift + A:** Admin Paneli (Günü sıfırla, kullanıcı skoru sil, JSON/CSV dışa aktar)
