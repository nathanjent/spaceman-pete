class Game {
  scenes: Scene[] = [];
  t: number = 0;
  camera: Camera = new Camera();
  currentScene: number = 0;
  gameEnded: boolean = false;

  update() {
    if (this.gameEnded) return;
    this.scenes[this.currentScene].update(this);
  }

  draw() {
    if (this.gameEnded) {
      cls();
      print("Game Over", 64, 84, 2, false, 2);
      return;
    }

    this.scenes[this.currentScene].draw(this);
    this.camera.shake();
  }

  addScene(scene: Scene) {
    this.scenes.push(scene);
  }
}

interface Size {
  w?: number;
  h?: number;
}

interface Scale {
  scale?: number;
}

interface Position {
  x?: number;
  y?: number;
}

interface Origin {
  ox?: number;
  oy?: number;
}

interface Velocity {
  vx?: number;
  vy?: number;
  vxMin?: number;
  vxMax?: number;
  vyMin?: number;
  vyMax?: number;
}

interface Acceleration {
  ax?: number;
  ay?: number;
}

interface Flip {
  flip?: 0 | 1 | 2 | 3;
}

interface Rotate {
  rotate?: 0 | 1 | 2 | 3;
}

interface ColorKey {
  colorKey?: number | number[];
}
