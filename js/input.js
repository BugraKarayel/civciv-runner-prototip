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
      // Her tuş (isim yazarken harfler dahil) boşta kalma sayacını sıfırlar
      StateMachine.registerInput();
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

    // Pointer olayları fare ve dokunmayı tek seferde karşılar; touchstart + taklit mousedown
    // ile bir dokunuşun iki kez (çift zıplama / çift kanat çırpma) algılanmasını önler.
    window.addEventListener('pointerdown', handleDown);
    window.addEventListener('pointerup', handleUp);
    window.addEventListener('pointercancel', handleUp);
  },
  
  update() {
    this.actionJustPressed = false;
  }
};
