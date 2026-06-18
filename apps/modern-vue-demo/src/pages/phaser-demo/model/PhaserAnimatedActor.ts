import Phaser from 'phaser';
import { animationConfig } from '@/shared/config/animation.config';
import { createActorFrameCanvas } from '@/shared/lib/assets';
import {
  buildMovementPath,
  clampActorPosition,
  easeMovement,
  resolveMovementPoint,
} from '@/shared/lib/math/movement';
import type { Point } from '@/shared/types';

export class PhaserAnimatedActor {
  private readonly sprite: Phaser.GameObjects.Sprite;
  private activeTween: Phaser.Tweens.Tween | null = null;

  public constructor(scene: Phaser.Scene) {
    const frameKeys = Array.from({ length: animationConfig.frameCount }, (_, index) => {
      const key = 'actor-frame-' + index;
      scene.textures.addCanvas(
        key,
        createActorFrameCanvas(animationConfig.visualSize, index, animationConfig.frameCount),
      );
      return key;
    });

    scene.anims.create({
      key: 'actor-pulse',
      frames: frameKeys.map((key) => ({ key })),
      frameRate: animationConfig.frameRate,
      repeat: -1,
    });

    this.sprite = scene.add.sprite(
      animationConfig.initialPosition.x,
      animationConfig.initialPosition.y,
      frameKeys[0],
    );
    this.sprite.setDisplaySize(animationConfig.visualSize, animationConfig.visualSize);
    this.sprite.play('actor-pulse');
  }

  public getSprite(): Phaser.GameObjects.Sprite {
    return this.sprite;
  }

  public moveTo(point: Point, scene: Phaser.Scene): void {
    this.activeTween?.stop();
    this.activeTween?.remove();

    const progressState = { value: 0 };
    const path = buildMovementPath({ x: this.sprite.x, y: this.sprite.y }, point);

    this.activeTween = scene.tweens.add({
      targets: progressState,
      value: 1,
      duration: animationConfig.movementDurationMs,
      ease: 'Linear',
      onUpdate: () => {
        const nextPoint = clampActorPosition(
          resolveMovementPoint(path, easeMovement(progressState.value)),
          {
            halfWidth: animationConfig.visualSize / 2,
            halfHeight: animationConfig.visualSize / 2,
          },
        );
        this.sprite.setPosition(nextPoint.x, nextPoint.y);
      },
      onComplete: () => {
        this.sprite.setPosition(point.x, point.y);
        this.activeTween = null;
      },
    });
  }
}
