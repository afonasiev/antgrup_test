import { AnimatedSprite, Texture } from 'pixi.js';
import { animationConfig } from '@/shared/config/animation.config';
import { createActorFrameCanvas } from '@/shared/lib/assets';
import type { Point } from '@/shared/types';

export class AnimatedActor {
  private readonly sprite: AnimatedSprite;
  private readonly textures: Texture[];

  public constructor() {
    this.textures = Array.from({ length: animationConfig.frameCount }, (_, index) =>
      Texture.from(
        createActorFrameCanvas(animationConfig.visualSize, index, animationConfig.frameCount),
      ),
    );
    this.sprite = new AnimatedSprite(this.textures);
    this.sprite.anchor.set(0.5);
    this.sprite.width = animationConfig.visualSize;
    this.sprite.height = animationConfig.visualSize;
    this.sprite.animationSpeed = animationConfig.frameRate / 60;
    this.sprite.play();
  }

  public getDisplayObject(): AnimatedSprite {
    return this.sprite;
  }

  public setPosition(point: Point): void {
    this.sprite.position.set(point.x, point.y);
  }

  public destroy(): void {
    this.sprite.destroy();
    this.textures.forEach((texture) => texture.destroy(true));
  }
}
