export const Leaderboard = {
  key: 'gdg_civciv_runner_lb_v2',
  
  get() {
    try {
      const raw = localStorage.getItem(this.key);
      if (raw) return JSON.parse(raw);
    } catch(e) {}
    return [];
  },
  
  save(list) {
    try {
      localStorage.setItem(this.key, JSON.stringify(list));
      this.clearCache();
    } catch(e) {}
  },
  
  cachedDailyTop10: null,
  cachedFormattedTop10: null,
  
  getDailyTop10() {
    if (this.cachedDailyTop10) return this.cachedDailyTop10;
    const list = this.get();
    const today = new Date().toISOString().split('T')[0];
    this.cachedDailyTop10 = list.filter(r => r.date === today)
               .sort((a, b) => b.score - a.score)
               .slice(0, 10);
    return this.cachedDailyTop10;
  },

  getFormattedDailyTop10() {
    if (this.cachedFormattedTop10) return this.cachedFormattedTop10;
    const top10 = this.getDailyTop10();
    this.cachedFormattedTop10 = [];
    for (let i = 0; i < top10.length; i++) {
      const r = top10[i];
      const rank = String(i + 1).padStart(2, ' ');
      const score = String(r.score).padStart(5, '0');
      this.cachedFormattedTop10.push(`${rank}. ${r.name.padEnd(20, ' ')} ${score}`);
    }
    return this.cachedFormattedTop10;
  },
  
  clearCache() {
    this.cachedDailyTop10 = null;
    this.cachedFormattedTop10 = null;
  },
  
  isTop10(score) {
    const top10 = this.getDailyTop10();
    if (top10.length < 10) return true;
    return score > top10[top10.length - 1].score;
  },
  
  addRecord(name, score) {
    const list = this.get();
    const today = new Date().toISOString().split('T')[0];
    list.push({ name, score, date: today, ts: Date.now() });
    this.save(list);
  },
  
  initAdmin() {
    const keys = {};
    window.addEventListener('keydown', (e) => {
      keys[e.code] = true;
      
      // PDF'te belirtilen: Ctrl + Shift + A 
      // Kullanıcının belirttiği alternatif: Ctrl + A + D
      const isPdfShortcut = e.ctrlKey && e.shiftKey && e.code === 'KeyA';
      const isUserShortcut = e.ctrlKey && keys['KeyA'] && keys['KeyD'];

      if (isPdfShortcut || isUserShortcut) {
        e.preventDefault();
        
        let list = this.get();
        const action = prompt('Admin paneli:\n1 - Günü sıfırla\n2 - Kayıt Sil (Belirli bir kullanıcı)\n3 - JSON/CSV Dışa Aktar (Konsola)');
        
        if (action === '1') {
          if (confirm('Emin misiniz? Tüm skorlar silinecek.')) {
            localStorage.removeItem(this.key);
            this.clearCache();
            alert('Tüm günün kayıtları sıfırlandı.');
          }
        } else if (action === '2') {
          const nameToDel = prompt('Silmek istediğiniz oyuncunun tam ismini girin:');
          if (nameToDel) {
            const initialLength = list.length;
            list = list.filter(r => r.name.toLowerCase() !== nameToDel.toLowerCase());
            if (list.length < initialLength) {
              this.save(list);
              alert(`"${nameToDel}" isimli oyuncunun kaydı silindi.`);
            } else {
              alert('Böyle bir kullanıcı bulunamadı.');
            }
          }
        } else if (action === '3') {
          console.log("=== JSON ===");
          console.log(JSON.stringify(list, null, 2));
          console.log("=== CSV ===");
          console.log("isim,skor,tarih\n" + list.map(r => `${r.name},${r.score},${r.date}`).join("\n"));
          alert('Kayıtlar tarayıcı konsoluna yazdırıldı (F12 ile açabilirsiniz).');
        }
        
        // Tuş durumlarını temizle ki tekrar tekrar tetiklenmesin
        keys['KeyA'] = false;
        keys['KeyD'] = false;
      }
    });

    window.addEventListener('keyup', (e) => {
      keys[e.code] = false;
    });
  }
};
