import { Score } from '../js/score.js';
import { CONFIG } from '../js/config.js';
import { Konami } from '../js/konami.js';
import { ProfanityFilter } from '../js/filter.js';

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

console.log('--- Civciv Runner Score / Timer / Konami Tests ---');

// Baslangic
Score.reset();
assert(Score.value === 0 && Score.multiplier === 1, 'reset: score 0, multiplier 1');

// Carpan = 1x (baslangic hizi)
Score.setSpeed(CONFIG.INITIAL_SPEED);
assert(Score.multiplier === 1, 'initial speed -> x1.0');
Score.addDistance(1000, false);
assert(Score.distanceScore === 100 && Score.meters === 100, '1000px at x1 = 100 pts');
Score.addSeed(); Score.addSeed(); Score.addSeed();
assert(Score.seedScore === 45, '3 seeds at x1 = 45 pts');
assert(Score.value === 145, 'net = 100 + 45');

// Carpan = 2x (maksimum hiz)
Score.reset();
Score.setSpeed(CONFIG.MAX_SPEED);
assert(Score.multiplier === 2, 'max speed -> x2.0');
Score.addDistance(1000, false);
Score.addSeed();
assert(Score.distanceScore === 200, '1000px at x2 = 200 pts');
assert(Score.seedScore === CONFIG.SEED_VALUE * 2, 'seed at x2 = 30 pts');
assert(Score.value === 230, 'net = 200 + 30');

// Ara carpan (orta hiz) ve sinirlama
Score.reset();
Score.setSpeed((CONFIG.INITIAL_SPEED + CONFIG.MAX_SPEED) / 2);
assert(Math.abs(Score.multiplier - 1.5) < 1e-9, 'mid speed -> x1.5');
Score.setSpeed(100);
assert(Score.multiplier === 2, 'multiplier is capped at x2.0');

// Ucus modunda mesafe 1.5 kat
Score.reset();
Score.setSpeed(CONFIG.INITIAL_SPEED);
Score.addDistance(500, true);
assert(Score.distanceScore === 75, 'fly distance x1.5 (500px -> 75 pts)');

// Sure sayaci
Score.reset();
Score.addTime(65000);
assert(Score.timeSeconds === 65 && Score.formatTime() === '01:05', 'timer formats as 01:05');

// Konami kodu
let toggles = 0;
Konami.onActivate = () => toggles++;
const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
code.forEach(k => Konami.onKey(k));
assert(Konami.active === true && toggles === 1, 'konami code activates');
['ArrowUp', 'ArrowDown', 'x'].forEach(k => Konami.onKey(k));
assert(Konami.active === true, 'wrong keys do not toggle');
code.forEach(k => Konami.onKey(k));
assert(Konami.active === false && toggles === 2, 'konami code toggles off');

// Genisletilmis kufur listesi
['shit', 'siktir', 'gerizekali', 'motherfucker', 'serefsiz'].forEach(w => {
  assert(ProfanityFilter.isProfane(w), `"${w}" is filtered`);
});
['Ahmet', 'Animal', 'Kemal', 'Aslan', 'Grape', 'Document'].forEach(w => {
  assert(!ProfanityFilter.isProfane(w), `"${w}" is NOT filtered`);
});

console.log(`\nResult: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
