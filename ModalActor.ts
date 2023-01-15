/// <reference path="./Sprite.ts" />

interface ModalActorProps extends ActorProps {
  mode?: string,
  modes?: Record<string, Mode>,
}

class ModalActor extends Actor {
  mode: string;
  private modes: Record<string, Mode>;
  private previousMode?: string;
  private frameCursor: number;
  private frameNextTic: number;

  private defaultMode = new Mode({
    frames: [
      new Frame({
        hold: 12,
        sprites: [
          new Sprite({
            id: 0,
          }),
        ]
      }),
    ],
  });

  constructor(props: ModalActorProps) {
    super(props);

    const {
      mode = 'idle',
      modes = {
        idle: this.defaultMode,
      },
    } = props;
    this.mode = mode;
    this.modes = modes;
    this.frameCursor = 0;
    this.frameNextTic = 0;
  }

  update(game: Game, scene: Scene): void {
    super.update(game, scene);
    if (this.mode != this.previousMode) {
      this.frameCursor = 0;
    }

    const modeData = this.modes[this.mode];
    if (!modeData) {
      throw new Error(`invalid mode ${this.mode}`);
    }

    if (game.t >= this.frameNextTic || this.mode != this.previousMode) {
      this.frameCursor++;
      if (this.frameCursor > modeData.frames.length - 1) {
        this.frameCursor = 0;
        if (modeData.once) {
          this.mode = 'idle';
        }
      }
      const frame = modeData.frames[this.frameCursor];
      this.sprite = frame;
      this.frameNextTic = game.t + frame.hold;
    }

    this.previousMode = this.mode;
  }
}

class Frame extends SpriteSet {
  hold: number;
  constructor({
    hold = 0,
    sprites,
  }: {
    hold?: number,
    sprites?: Sprite[],
  }) {
    super({ sprites });
    this.hold = hold;
  }
}

class Mode {
  frames: Frame[];

  // Non-looping mode when true
  once?: boolean;

  constructor({
    frames,
    once = false,
  }: {
    frames: Frame[],
    once?: boolean,
  }) {
    this.frames = frames;
    this.once = once;
  }
}
