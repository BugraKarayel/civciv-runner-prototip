// Mock DOM for Node environment before importing obstacles.js
global.document = {
  createElement: () => ({
    width: 0,
    height: 0,
    getContext: () => ({
      imageSmoothingEnabled: false,
      fillStyle: '',
      font: '',
      fillRect() {},
      drawImage() {},
      fillText() {}
    })
  }),
  fonts: { ready: Promise.resolve() }
};

const { ObstacleManager } = await import('../js/obstacles.js');

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

console.log('--- Civciv Runner Ramp & Abyss Tests ---');

// 1. Initial State
ObstacleManager.init();
assert(ObstacleManager.missedRamp === false, 'Initial state: missedRamp is false');
assert(ObstacleManager.hasGroundAt(100) === true, 'No ramp: ground exists at player position');
assert(ObstacleManager.hasGroundAt(500) === true, 'No ramp: ground exists ahead');

// 2. Ramp Present
ObstacleManager.ramps = [{ x: 400, width: 64, markedForDeletion: false, triggered: false }];
assert(ObstacleManager.hasGroundAt(200) === true, 'Before ramp: ground exists');
assert(ObstacleManager.hasGroundAt(464) === true, 'On ramp end: ground exists');
assert(ObstacleManager.hasGroundAt(465) === false, 'Behind ramp: NO ground (abyss)!');
assert(ObstacleManager.hasGroundAt(800) === false, 'Far behind ramp: NO ground (abyss)!');

// 3. Ramp Missed (Player bypassed ramp)
ObstacleManager.missedRamp = true;
assert(ObstacleManager.hasGroundAt(100) === false, 'Missed ramp: NO ground at player position');
assert(ObstacleManager.hasGroundAt(50) === false, 'Missed ramp: NO ground anywhere');

// Ramp scrolled off screen (ramps = [])
ObstacleManager.ramps = [];
assert(ObstacleManager.hasGroundAt(100) === false, 'Ramp offscreen + missed: NO ground anywhere');

// 4. Landing from Sky Phase
ObstacleManager.clearSkyPhase();
assert(ObstacleManager.missedRamp === false, 'clearSkyPhase resets missedRamp');
assert(ObstacleManager.ramps.length === 0, 'clearSkyPhase clears ramps');
assert(ObstacleManager.hasGroundAt(100) === true, 'After landing: ground restored');

// 5. Reset Game
ObstacleManager.missedRamp = true;
ObstacleManager.init();
assert(ObstacleManager.missedRamp === false, 'init resets missedRamp');
assert(ObstacleManager.hasGroundAt(100) === true, 'init restores normal ground');

console.log(`\nResult: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
