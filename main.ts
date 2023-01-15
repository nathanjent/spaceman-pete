// title:  game title
// author: game developer
// desc:   short description
// script: js

/// <reference path="./Game.ts" />

const game = new Game();

const BOOT = () => {
  const scene1 = new Scene({
    clsColor: 13,
  });
  scene1.addActor(
    new ModalActor({
      x: 96,
      y: 24,
      modes: {
        idle: {
          frames: [
            new Frame({
              hold: 12,
              sprites: [
                new Sprite({
                  id: 256,
                  colorKey: 5,
                  w: 2,
                  h: 2,
                }),
              ],
            }),
          ],
        },
        walk: {
          frames: [
            new Frame({
              hold: 12,
              sprites: [
                new Sprite({
                  id: 258,
                  colorKey: 5,
                  w: 2,
                  h: 2,
                }),
              ],
            }),
            new Frame({
              hold: 12,
              sprites: [
                new Sprite({
                  id: 260,
                  colorKey: 5,
                  w: 2,
                  h: 2,
                }),
              ],
            }),
          ],
        },
      },
      sprite: new Sprite({
        id: 256,
        w: 2,
        h: 2,
        scale: 3,
        colorKey: 0,
      }),
      behaviors: [
        new PlayerBehavior(),
        new FlipXBehavior(),
        new ModalBehavior(),
      ],
    })
  );
  game.addScene(scene1);
};

function TIC() {
  game.update();
  game.draw();
  game.t++;
}
