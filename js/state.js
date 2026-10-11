export const States = {
  IDLE: 'IDLE',
  TUTORIAL: 'TUTORIAL',
  RUN: 'RUN',
  FLY: 'FLY',
  GAMEOVER: 'GAMEOVER',
  ENTER_NAME: 'ENTER_NAME'
};

export const StateMachine = {
  current: States.IDLE,
  timeInState: 0,
  lastInputTime: 0,
  
  change(newState) {
    this.current = newState;
    this.timeInState = 0;
  },
  
  update(dtMs) {
    this.timeInState += dtMs;
  },
  
  registerInput() {
    this.lastInputTime = performance.now();
  },
  
  checkIdleTimeout(now) {
    if (this.current !== States.IDLE && (now - this.lastInputTime > 30000)) {
      this.change(States.IDLE);
      return true;
    }
    return false;
  }
};
