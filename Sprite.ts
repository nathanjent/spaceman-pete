interface SpriteProps extends Origin, Position, Size, Scale, Flip, Rotate, ColorKey {
  id?: number;
}

class Sprite implements SpriteProps {
  id?: number;
  x?: number;
  y?: number;
  ox?: number;
  oy?: number;
  w?: number;
  h?: number;
  colorKey?: number | number[];
  scale?: number;
  flip?: 0 | 1 | 2 | 3;
  rotate?: 0 | 1 | 2 | 3;

  constructor({
    id = 0,
    x = 0,
    y = 0,
    ox = 0,
    oy = 0,
    w,
    h,
    colorKey,
    scale,
    flip,
    rotate,
  }: SpriteProps) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.ox = ox;
    this.oy = oy;
    this.w = w;
    this.h = h;
    this.colorKey = colorKey;
    this.scale = scale;
    this.flip = flip;
    this.rotate = rotate;
  }

  update(_game: Game, _scene: Scene, actor: Actor, _parent?: SpriteSet) {
    this.flip = actor.flip;
  }

  draw(_game: Game, _scene: Scene, actor: Actor, _parent?: SpriteSet) {
    const x = actor.x + (this.x ?? 0);
    const y = actor.y + (this.y ?? 0);
    spr(this.id ?? 0, x, y, this.colorKey,
        this.scale, this.flip, this.rotate,
        this.w, this.h);
    print(`spr x:${Math.floor(x)} y:${Math.floor(y)} flip:${this.flip}`,
         x, y - 7, 2);
    if (actor instanceof ModalActor) {
      print(`mode ${actor.mode}`,x, y - 14, 2);
    }
  }
}

class SpriteSet extends Sprite {
  sprites?: Sprite[];

  constructor({ sprites = [] }: { sprites?: Sprite[] }) {
    super({});
    this.sprites = sprites;
  }

  update(game: Game, scene: Scene, actor: Actor, parent?: SpriteSet) {
    this.ox = (parent?.ox || 0) + (parent?.x || 0);
    this.oy = (parent?.oy || 0) + (parent?.y || 0);
     
    this.sprites?.forEach(s => s.update(game, scene, actor, this));
  }

  draw(game: Game, scene: Scene, actor: Actor, _parent?: SpriteSet) {
    this.sprites?.forEach(s => s.draw(game, scene, actor, this));
  }
}
