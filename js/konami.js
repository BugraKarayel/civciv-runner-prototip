// Klasik Konami Kodu easter egg'i: ↑ ↑ ↓ ↓ ← → ← → B A
// Menü ekranında girilir; açılınca civciv gökkuşağı izi bırakır. Tekrar girilirse kapanır.
// Tamamen kozmetiktir, skoru etkilemez.
const SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

export const Konami = {
  progress: 0,
  active: false,
  flashUntil: 0,
  onActivate: null,

  onKey(key) {
    const k = key.length === 1 ? key.toLowerCase() : key;
    if (k === SEQUENCE[this.progress]) {
      this.progress++;
      if (this.progress === SEQUENCE.length) {
        this.progress = 0;
        this.active = !this.active;
        this.flashUntil = performance.now() + 3000;
        if (this.onActivate) this.onActivate(this.active);
      }
    } else {
      this.progress = (k === SEQUENCE[0]) ? 1 : 0;
    }
  },

  isFlashing(now) {
    return now < this.flashUntil;
  }
};
