import { CONFIG } from './config.js';

export const Score = {
  distance: 0,
  seeds: 0,
  
  get distanceScore() {
    return Math.floor(this.distance / 10);
  },

  get seedScore() {
    return this.seeds * (CONFIG.SEED_VALUE || 100);
  },

  get value() {
    // Net Skor = Genel Mesafe Skoru + Tohum Skoru
    return this.distanceScore + this.seedScore;
  },
  
  reset() {
    this.distance = 0;
    this.seeds = 0;
  },
  
  addDistance(px, isFly) {
    this.distance += isFly ? (px * 1.5) : px;
  },
  
  addSeed() {
    this.seeds++;
  }
};

