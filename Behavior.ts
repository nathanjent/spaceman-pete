interface Behavior {
  update(game: Game, actor: Actor): void;
}

class PlayerBehavior implements Behavior {
  update(_game: Game, actor: Actor): void {
    const vx = actor.vx;
    if (actor.vx > -actor.vxMax && btn(2)) {
      actor.vx -= actor.ax; 
    }
    if (actor.vx < actor.vxMax && btn(3)) {
      actor.vx += actor.ax; 
    }
    if (vx == actor.vx) {
      if (actor.vx > 0.5) {
        actor.vx -= actor.ax;
      } else if (actor.vx < -0.5) {
        actor.vx += actor.ax;
      } else {
        actor.vx = 0;
      }
    }

    const vy = actor.vy;
    if (actor.vy > -actor.vyMax && btn(0)) {
      actor.vy -= actor.ay; 
    }
    if (actor.vy < actor.vyMax && btn(1)) {
      actor.vy += actor.ay; 
    }
    if (vy == actor.vy) {
      if (actor.vy > 0.5) {
        actor.vy -= actor.ay;
      } else if (actor.vy < -0.5) {
        actor.vy += actor.ay;
      } else {
        actor.vy = 0;
      }
    }

    actor.x += actor.vx;
    actor.y += actor.vy;
  }
}

class FlipXBehavior implements Behavior {
  update(_game: Game, actor: Actor): void {
    if (btn(2)) actor.flip = 1;
    if (btn(3)) actor.flip = 0;
  }
}

class ModalBehavior implements Behavior {
  update(_game: Game, actor: ModalActor): void {
    if (actor.mode == "idle" && (btn(0) || btn(1) || btn(2) || btn(3))) {
      actor.mode = "walk";
    }

    if (actor.vx == 0 && actor.vy == 0) {
      actor.mode = "idle";
    }
  }
}
