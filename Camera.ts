class Camera {
  shaking: boolean;
  shakeCount: number;

  constructor() {
    this.shaking = false;
    this.shakeCount = 0;
  }

  shake() {
    if (this.shaking && this.shakeCount > 0) {
      const d = 1;
      poke(0x3FF9, Math.floor(Math.random() * (d - -d + 1) + d));
      poke(0x3FF9 + 1, Math.floor(Math.random() * (d - -d + 1) + d));
      this.shakeCount--;
      if (this.shakeCount == 0) {
        memset(0x3FF9, 0, 2);
        this.shaking=false;
      }
    }
  }
}
