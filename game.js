var __extends = this && this.__extends || function() {
 var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || {
   __proto__: []
  } instanceof Array && function(d, b) {
   d.__proto__ = b;
  } || function(d, b) {
   for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  };
  return extendStatics(d, b);
 };
 return function(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
   this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
 };
}();

var Actor = /** @class */ function() {
 function Actor(_a) {
  var _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c, _d = _a.vxMin, vxMin = _d === void 0 ? 0 : _d, _e = _a.vxMax, vxMax = _e === void 0 ? 1 : _e, _f = _a.vyMin, vyMin = _f === void 0 ? 0 : _f, _g = _a.vyMax, vyMax = _g === void 0 ? 1 : _g, w = _a.w, h = _a.h, _h = _a.sprite, sprite = _h === void 0 ? new Sprite({
   id: 0
  }) : _h, flip = _a.flip, _j = _a.behaviors, behaviors = _j === void 0 ? [] : _j;
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vxMin = vxMin;
  this.vxMax = vxMax;
  this.vy = 0;
  this.vyMin = vyMin;
  this.vyMax = vyMax;
  this.w = w;
  this.h = h;
  this.sprite = sprite;
  this.flip = flip;
  this.behaviors = behaviors;
 }
 Actor.prototype.update = function(game, scene) {
  var _this = this;
  this.behaviors.forEach(function(b) {
   return b.update(game, _this);
  });
  this.sprite.update(game, scene, this);
 };
 Actor.prototype.draw = function(game, scene) {
  this.sprite.draw(game, scene, this);
 };
 Object.defineProperty(Actor.prototype, "hitbox", {
  get: function() {
   var _a, _b;
   var w = (_a = this.w) !== null && _a !== void 0 ? _a : 1;
   var h = (_b = this.h) !== null && _b !== void 0 ? _b : 1;
   return [ this.x - w / 2, this.y - h / 2, w, h ];
  },
  enumerable: false,
  configurable: true
 });
 Object.defineProperty(Actor.prototype, "aabb", {
  get: function() {
   var _a, _b;
   var w = ((_a = this.w) !== null && _a !== void 0 ? _a : 1) / 2;
   var h = ((_b = this.h) !== null && _b !== void 0 ? _b : 1) / 2;
   return [ this.x - w, this.y - h, this.x + w, this.y + h ];
  },
  enumerable: false,
  configurable: true
 });
 return Actor;
}();

var PlayerBehavior = /** @class */ function() {
 function PlayerBehavior() {}
 PlayerBehavior.prototype.update = function(_game, actor) {
  if (btn(0)) actor.y--;
  if (btn(1)) actor.y++;
  if (btn(2)) actor.x--;
  if (btn(3)) actor.x++;
 };
 return PlayerBehavior;
}();

var FlipX = /** @class */ function() {
 function FlipX() {}
 FlipX.prototype.update = function(_game, actor) {
  if (btn(2)) actor.flip = 1;
  if (btn(3)) actor.flip = 0;
 };
 return FlipX;
}();

var Camera = /** @class */ function() {
 function Camera() {
  this.shaking = false;
  this.shakeCount = 0;
 }
 Camera.prototype.shake = function() {
  if (this.shaking && this.shakeCount > 0) {
   var d = 1;
   poke(16377, Math.floor(Math.random() * (d - -d + 1) + d));
   poke(16377 + 1, Math.floor(Math.random() * (d - -d + 1) + d));
   this.shakeCount--;
   if (this.shakeCount == 0) {
    memset(16377, 0, 2);
    this.shaking = false;
   }
  }
 };
 return Camera;
}();

var Game = /** @class */ function() {
 function Game() {
  this.scenes = [];
  this.t = 0;
  this.camera = new Camera();
  this.currentScene = 0;
  this.gameEnded = false;
 }
 Game.prototype.update = function() {
  if (this.gameEnded) return;
  this.scenes[this.currentScene].update(this);
 };
 Game.prototype.draw = function() {
  if (this.gameEnded) {
   cls();
   print("Game Over", 64, 84, 2, false, 2);
   return;
  }
  this.scenes[this.currentScene].draw(this);
  this.camera.shake();
 };
 Game.prototype.addScene = function(scene) {
  this.scenes.push(scene);
 };
 return Game;
}();

var Map = /** @class */ function() {
 function Map(_a) {
  var x = _a.x, y = _a.y, _b = _a.w, w = _b === void 0 ? 32 : _b, _c = _a.h, h = _c === void 0 ? 17 : _c, sx = _a.sx, sy = _a.sy, colorKey = _a.colorKey, scale = _a.scale, remap = _a.remap;
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
 Map.prototype.update = function(_game, _scene) {};
 Map.prototype.draw = function(_game, _scene) {
  map(this.x, this.y, this.w, this.h, this.sx, this.sy, this.colorKey, this.scale, this.remap);
 };
 return Map;
}();

var Sprite = /** @class */ function() {
 function Sprite(_a) {
  var _b = _a.id, id = _b === void 0 ? 0 : _b, _c = _a.x, x = _c === void 0 ? 0 : _c, _d = _a.y, y = _d === void 0 ? 0 : _d, _e = _a.ox, ox = _e === void 0 ? 0 : _e, _f = _a.oy, oy = _f === void 0 ? 0 : _f, w = _a.w, h = _a.h, colorKey = _a.colorKey, scale = _a.scale, flip = _a.flip, rotate = _a.rotate;
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
 Sprite.prototype.update = function(_game, _scene, actor) {
  this.flip = actor.flip;
 };
 Sprite.prototype.draw = function(_game, _scene, actor) {
  var _a, _b, _c;
  var x = actor.x + ((_a = this.x) !== null && _a !== void 0 ? _a : 0);
  var y = actor.y + ((_b = this.y) !== null && _b !== void 0 ? _b : 0);
  trace("colorKey: ".concat(this.colorKey));
  spr((_c = this.id) !== null && _c !== void 0 ? _c : 0, x, y, this.colorKey, this.scale, this.flip, this.rotate, this.w, this.h);
  print("spr x:".concat(this.x, " y:").concat(this.y, " flip:").concat(this.flip), this.x, this.y, 2);
 };
 return Sprite;
}();

var SpriteSet = /** @class */ function(_super) {
 __extends(SpriteSet, _super);
 function SpriteSet(_a) {
  var _b = _a.sprites, sprites = _b === void 0 ? [] : _b;
  var _this = _super.call(this, {}) || this;
  _this.sprites = sprites;
  return _this;
 }
 SpriteSet.prototype.update = function(game, scene, actor, parent) {
  var _this = this;
  var _a;
  this.ox = ((parent === null || parent === void 0 ? void 0 : parent.ox) || 0) + ((parent === null || parent === void 0 ? void 0 : parent.x) || 0);
  this.oy = ((parent === null || parent === void 0 ? void 0 : parent.oy) || 0) + ((parent === null || parent === void 0 ? void 0 : parent.y) || 0);
  (_a = this.sprites) === null || _a === void 0 ? void 0 : _a.forEach(function(s) {
   if (s instanceof SpriteSet) {
    s.update(game, scene, actor, _this);
   } else {
    s.update(game, scene, actor);
   }
  });
 };
 SpriteSet.prototype.draw = function(game, scene, actor, _parent) {
  var _this = this;
  var _a;
  (_a = this.sprites) === null || _a === void 0 ? void 0 : _a.forEach(function(s) {
   if (s instanceof SpriteSet) {
    s.draw(game, scene, actor, _this);
   } else {
    s.draw(game, scene, actor);
   }
  });
 };
 return SpriteSet;
}(Sprite);
/// <reference path="./Sprite.ts" />

var ModalActor = /** @class */ function(_super) {
 __extends(ModalActor, _super);
 function ModalActor(props) {
  var _this = _super.call(this, props) || this;
  _this.defaultMode = new Mode({
   frames: [ new Frame({
    hold: 12,
    sprites: [ new Sprite({
     id: 0
    }) ]
   }) ]
  });
  var _a = props.mode, mode = _a === void 0 ? "idle" : _a, _b = props.modes, modes = _b === void 0 ? {
   idle: _this.defaultMode
  } : _b;
  _this.mode = mode;
  _this.modes = modes;
  _this.frameCursor = 0;
  _this.frameNextTic = 0;
  return _this;
 }
 ModalActor.prototype.update = function(game, scene) {
  _super.prototype.update.call(this, game, scene);
  if (this.mode != this.previousMode) {
   this.frameCursor = 0;
  }
  var modeData = this.modes[this.mode];
  if (!modeData) {
   throw new Error("invalid mode ".concat(this.mode));
  }
  if (game.t >= this.frameNextTic || this.mode != this.previousMode) {
   this.frameCursor++;
   if (this.frameCursor > modeData.frames.length - 1) {
    this.frameCursor = 0;
    if (modeData.once) {
     this.mode = "idle";
    }
   }
   var frame = modeData.frames[this.frameCursor];
   this.sprite = frame;
   this.frameNextTic = game.t + frame.hold;
  }
  this.previousMode = this.mode;
 };
 return ModalActor;
}(Actor);

var Frame = /** @class */ function(_super) {
 __extends(Frame, _super);
 function Frame(_a) {
  var _b = _a.hold, hold = _b === void 0 ? 0 : _b, sprites = _a.sprites;
  var _this = _super.call(this, {
   sprites: sprites
  }) || this;
  _this.hold = hold;
  return _this;
 }
 return Frame;
}(SpriteSet);

var Mode = /** @class */ function() {
 function Mode(_a) {
  var frames = _a.frames, _b = _a.once, once = _b === void 0 ? false : _b;
  this.frames = frames;
  this.once = once;
 }
 return Mode;
}();

var Scene = /** @class */ function() {
 function Scene(_a) {
  var _b = _a.clsColor, clsColor = _b === void 0 ? 0 : _b, _c = _a.actors, actors = _c === void 0 ? [] : _c, _d = _a.maps, maps = _d === void 0 ? [] : _d;
  this.clsColor = clsColor;
  this.actors = actors;
  this.maps = maps;
 }
 Scene.prototype.update = function(game) {
  var _this = this;
  this.actors.forEach(function(a) {
   return a.update(game, _this);
  });
 };
 Scene.prototype.draw = function(game) {
  var _this = this;
  cls(this.clsColor);
  this.maps.forEach(function(m) {
   return m.draw(game, _this);
  });
  this.actors.forEach(function(a) {
   return a.draw(game, _this);
  });
  print("HELLO WORLD!", 84, 84);
 };
 Scene.prototype.isSolid = function(x, y) {
  return fget(mget(Math.floor(x / 8), Math.floor(y / 8)), 0);
 };
 Scene.prototype.hitWall = function(actor) {
  var _a = actor.aabb, x1 = _a[0], y1 = _a[1], x2 = _a[2], y2 = _a[3];
  var x = actor.flip == 1 ? x1 : x2;
  for (var y = y1; y < y2 - actor.vy; y++) {
   if (this.isSolid(x, y)) {
    return true;
   }
  }
  return false;
 };
 Scene.prototype.hitGround = function(actor) {
  var _a = actor.aabb, x1 = _a[0], _ = _a[1], x2 = _a[2], y2 = _a[3];
  for (var x = x1; x < x2; x++) {
   if (this.isSolid(x + actor.vx, y2 + actor.vy)) {
    return true;
   }
  }
  return false;
 };
 Scene.prototype.hitCeiling = function(actor) {
  var _a = actor.aabb, x1 = _a[0], y1 = _a[1], x2 = _a[2], _ = _a[3];
  for (var x = x1; x < x2; x++) {
   if (this.isSolid(x + actor.vx, y1 + actor.vy)) {
    return true;
   }
  }
  return false;
 };
 Scene.prototype.addActor = function(actor) {
  this.actors.push(actor);
 };
 Scene.prototype.addMap = function(map) {
  this.maps.push(map);
 };
 return Scene;
}();
// title:  game title
// author: game developer
// desc:   short description
// script: js
/// <reference path="./Game.ts" />

var game = new Game();

var BOOT = function() {
 var scene1 = new Scene({
  clsColor: 13
 });
 scene1.addActor(new ModalActor({
  x: 96,
  y: 24,
  modes: {
   idle: {
    frames: [ new Frame({
     hold: 12,
     sprites: [ new Sprite({
      id: 256,
      w: 2,
      h: 2
     }) ]
    }) ]
   },
   walk: {
    frames: [ new Frame({
     hold: 12,
     sprites: [ new Sprite({
      id: 258,
      colorKey: 0,
      w: 2,
      h: 2
     }), new Sprite({
      id: 260,
      colorKey: 0,
      w: 2,
      h: 2
     }) ]
    }) ]
   }
  },
  sprite: new Sprite({
   id: 256,
   w: 2,
   h: 2,
   scale: 3,
   colorKey: 0
  }),
  behaviors: [ new PlayerBehavior(), new FlipX() ]
 }));
 game.addScene(scene1);
};

function TIC() {
 game.update();
 game.draw();
 game.t++;
}
// <TILES>
// 001:eccccccccc888888caaaaaaaca888888cacccccccacc0ccccacc0ccccacc0ccc
// 002:ccccceee8888cceeaaaa0cee888a0ceeccca0ccc0cca0c0c0cca0c0c0cca0c0c
// 003:eccccccccc888888caaaaaaaca888888cacccccccacccccccacc0ccccacc0ccc
// 004:ccccceee8888cceeaaaa0cee888a0ceeccca0cccccca0c0c0cca0c0c0cca0c0c
// 017:cacccccccaaaaaaacaaacaaacaaaaccccaaaaaaac8888888cc000cccecccccec
// 018:ccca00ccaaaa0ccecaaa0ceeaaaa0ceeaaaa0cee8888ccee000cceeecccceeee
// 019:cacccccccaaaaaaacaaacaaacaaaaccccaaaaaaac8888888cc000cccecccccec
// 020:ccca00ccaaaa0ccecaaa0ceeaaaa0ceeaaaa0cee8888ccee000cceeecccceeee
// </TILES>

// <SPRITES>
// 000:55555ccc5555cddd555cdddd555cdd31555cd8315555cd335555ce33555ceeee
// 001:cc555555ddc55555dddc5555313c5555313c5555333c555533cc5555eeedc555
// 002:55555ccc5555cddd555cdddd555cdd31555cd8315555cd335555ce33555ceeee
// 003:cc555555ddc55555dddc5555313c5555313c5555333c555533cc5555eedc5555
// 004:55555ccc5555cddd555cdddd555cdd31555cd8315555cd335555cee35555ceee
// 005:cc555555ddc55555dddc5555313c5555313c5555333c555533cc5555eec55555
// 016:55ceeeee55ceecee55cffcdd555ccce95555ceee555ceeec55cfffcc55ccccc5
// 017:e9eedc5599ceec55ddcffc5599ccc5559ec55555eeec5555cfffc555ccccc555
// 018:55ceeeee55ceecee55cffcdd555cccee55cfeeee55cfeeec555cfccc555ccc55
// 019:e9ecc55599eefc55ddeefc5599ccc555eeecfc55ceeefc55ccefc5555cccc555
// 020:555ceeee555ceefe5555cefd5555ccee5555cfee5555cfee55555cff55555ccc
// 021:e9c5555599fc5555ddfc555599c55555e9c55555ecc55555fc555555cc555555
// </SPRITES>

// <WAVES>
// 000:00000000ffffffff00000000ffffffff
// 001:0123456789abcdeffedcba9876543210
// 002:0123456789abcdef0123456789abcdef
// </WAVES>

// <SFX>
// 000:000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000304000000000
// </SFX>

// <PALETTE>
// 000:1a1c2c5d275db13e53ef7d57ffcd75a7f07038b76425717929366f3b5dc941a6f673eff7f4f4f494b0c2566c86333c57
// </PALETTE>

