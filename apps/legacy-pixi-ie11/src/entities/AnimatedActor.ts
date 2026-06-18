import * as PIXI from 'pixi.js';
import { animationConfig } from '@/config/animation.config';
import { createActorFrameCanvas } from '@/lib/procedural-assets';
import { Point } from '@/types';

export class AnimatedActor {
  private sprite: PIXI.AnimatedSprite;
  private textures: PIXI.Texture[];

  public constructor() {
    this.textures = [];
    for (var i = 0; i < animationConfig.frameCount; i += 1) {
      this.textures.push(
        PIXI.Texture.from(
          createActorFrameCanvas(animationConfig.visualSize, i, animationConfig.frameCount),
        ),
      );
    }

    this.sprite = new PIXI.AnimatedSprite(this.textures);
    this.sprite.anchor.set(0.5);
    this.sprite.width = animationConfig.visualSize;
    this.sprite.height = animationConfig.visualSize;
    this.sprite.animationSpeed = animationConfig.frameRate / 60;
    this.sprite.play();
  }

  public getDisplayObject(): PIXI.AnimatedSprite {
    return this.sprite;
  }

  public setPosition(point: Point): void {
    this.sprite.position.set(point.x, point.y);
  }

  public getPosition(): Point {
    return {
      x: this.sprite.x,
      y: this.sprite.y,
    };
  }
}
