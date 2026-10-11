import { StateMachine } from './state.js';

export const Input = {
  actionPressed: false,
  actionJustPressed: false,
  keys: {},
  
  init() {
    const handleDown = () => {
      StateMachine.registerInput();
      if (!this.actionPressed) this.actionJustPressed = true;
      this.actionPressed = true;
    };
    
    const handleUp = () => {
      this.actionPressed = false;
    };

    window.addEventListener('keydown', (e) => {
      this.keys[e.key] = true;
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        handleDown();
      }
    });
    
    window.addEventListener('keyup', (e) => {
      this.keys[e.key] = false;
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        handleUp();
      }
    });

    window.addEventListener('mousedown', handleDown);
    window.addEventListener('touchstart', (e) => {
      // e.preventDefault(); // allow default to not break kiosk if needed, but usually we prevent
      handleDown();
    }, {passive: false});
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchend', handleUp);
  },
  
  update() {
    this.actionJustPressed = false;
  }
};
