interface SceneProps {
  clsColor?: number,
  actors?: Actor[],
  maps?: Map[],
}

class Scene {
  actors: Actor[];
  clsColor: number;
  maps: Map[];

  constructor({
    clsColor = 0,
    actors = [],
    maps = [],
  }: SceneProps) {
    this.clsColor = clsColor;
    this.actors = actors;
    this.maps = maps;
  }

  update(game: Game) {
    this.actors.forEach((a) => a.update(game, this));
  }

  draw(game: Game) {
    cls(this.clsColor);
    this.maps.forEach((m) => m.draw(game, this));
    this.actors.forEach((a) => a.draw(game, this));
    print("HELLO WORLD!", 84, 84);
  }

  isSolid(x: number, y: number): boolean {
    return fget(mget(Math.floor(x/8), Math.floor(y/8)), 0);
  }

  hitWall(actor: Actor): boolean {
    const [x1, y1, x2, y2] = actor.aabb;
    const x = actor.flip == 1 ? x1 : x2;
    for (let y = y1; y < y2 - actor.vy; y++) {
      if (this.isSolid(x, y)) {
        return true
      }
    }

    return false;
  }

  hitGround(actor: Actor): boolean {
    const [x1, _, x2, y2] = actor.aabb;
    for (let x = x1; x < x2; x++) {
      if (this.isSolid(x + actor.vx, y2 + actor.vy)) {
        return true
      }
    }

    return false
  }

  hitCeiling(actor: Actor): boolean {
    const [x1, y1, x2, _] = actor.aabb;
    for (let x = x1; x < x2; x++) {
      if (this.isSolid(x + actor.vx, y1 + actor.vy)) {
        return true
      }
    }

    return false
  }

  addActor(actor: Actor) {
    this.actors.push(actor);
  }

  addMap(map: Map) {
    this.maps.push(map);
  }
}
