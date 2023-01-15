interface ActorProps extends Size, Position, Velocity, Acceleration, Flip {
  behaviors?: Behavior[];
  sprite?: Sprite;
}

class Actor implements ActorProps {
  x: number;
  y: number;
  vx: number;
  vy: number;
  vxMin: number;
  vxMax: number;
  vyMin: number;
  vyMax: number;
  ax: number;
  ay: number;
  w?: number;
  h?: number;
  sprite: Sprite;
  flip?: 0 | 1 | 2 | 3;
  behaviors: Behavior[];

  constructor({
    x = 0,
    y = 0,
    vxMin = 0,
    vxMax = 1,
    vyMin = 0,
    vyMax = 1,
    ax = 0.1,
    ay = 0.1,
    w,
    h,
    sprite = new Sprite({ id: 0 }),
    flip,
    behaviors = [],
  }: ActorProps) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vxMin = vxMin;
    this.vxMax = vxMax;
    this.vy = 0;
    this.vyMin = vyMin;
    this.vyMax = vyMax;
    this.ax = ax;
    this.ay = ay;
    this.w = w;
    this.h = h;
    this.sprite = sprite;
    this.flip = flip;
    this.behaviors = behaviors;
  }

  update(game: Game, scene: Scene) {
    this.behaviors.forEach((b) => b.update(game, this));
    this.sprite.update(game, scene, this);
  }

  draw(game: Game, scene: Scene) {
    this.sprite.draw(game, scene, this);
  }

  get hitbox(): number[] {
    const w = this.w ?? 1;
    const h = this.h ?? 1;
    return [ this.x - w / 2, this.y - h / 2, w, h ];
  }

  get aabb(): number[] {
    const w = (this.w ?? 1) / 2;
    const h = (this.h ?? 1) / 2;
    return [ this.x-w, this.y-h, this.x+w, this.y+h ];
  }
}
