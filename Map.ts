interface MapProps extends Size, Position, ColorKey, Scale {
  sx?: number;
  sy?: number;
  colorKey?: number | number[];
  scale?: number;
  remap?: ((tile: number, x: number, y: number) => number | void | [number, (number | undefined)?, (number | undefined)?]);
}

class Map implements MapProps {
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  sx?: number;
  sy?: number;
  colorKey?: number | number[];
  scale?: number;
  remap?: (
    tile: number,
    x: number,
    y: number,
  ) => [number, number?, number?] | number | void;

  constructor({
    x, y,
    w = 32,
    h = 17,
    sx, sy,
    colorKey,
    scale,
    remap,
  }: MapProps) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sx = sx;
    this.sy = sy;
    this.colorKey = colorKey;
    this.scale = scale;
    this.remap = remap;
  }

  update(_game: Game, _scene: Scene) {
  }

  draw(_game: Game, _scene: Scene) {
    map(this.x, this.y, this.w, this.h, this.sx, this.sy,
        this.colorKey, this.scale, this.remap);
  }
}
