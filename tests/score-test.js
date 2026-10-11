import { Score } from '../js/score.js';
import { CONFIG } from '../js/config.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failed++;
  }
}

console.log('--- Civciv Runner Skor & Tohum Test Suite ---');

Score.reset();
assert(Score.distance === 0 && Score.seeds === 0, 'Score reset sıfırlamalı');
assert(Score.distanceScore === 0, 'Başlangıç mesafe skoru 0 olmalı');
assert(Score.seedScore === 0, 'Başlangıç tohum skoru 0 olmalı');
assert(Score.value === 0, 'Başlangıç net skoru 0 olmalı');

// 1000px koşuldu (karada) -> 100 mesafe skoru
Score.addDistance(1000, false);
assert(Score.distanceScore === 100, '1000px koşu = 100 mesafe skoru');
assert(Score.value === 100, 'Tohumsuz net skor sadece mesafeye eşit olmalı');

// 3 tohum toplandı (her tohum 15 puan)
Score.addSeed();
Score.addSeed();
Score.addSeed();
assert(Score.seeds === 3, '3 tohum toplanmış olmalı');
assert(Score.seedScore === 45, '3 tohum = 45 tohum skoru olmalı (15 puan/tohum)');
assert(Score.value === 145, 'Net Skor = 100 (mesafe) + 45 (tohum) = 145 olmalı');

// Uçuş modunda mesafe 1.5 katı eklenir (500px * 1.5 = 750px)
Score.addDistance(500, true);
assert(Score.distanceScore === 175, 'Uçuş mesafesi katsayısıyla mesafe skoru 175 olmalı');
assert(Score.value === 220, 'Yeni Net Skor = 175 + 45 = 220 olmalı');

console.log(`\nTest Sonucu: ${passed} Başarılı, ${failed} Hatalı`);
if (failed > 0) process.exit(1);
