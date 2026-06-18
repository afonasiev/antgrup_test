import Phaser from 'phaser';
import { animationConfig } from '@/shared/config/animation.config';
import { viewportConfig } from '@/shared/config/viewport.config';
import { createBackgroundCanvas } from '@/shared/lib/assets';
import { clampActorPosition } from '@/shared/lib/math/movement';
import type { Point } from '@/shared/types';
import { PhaserAnimatedActor } from './PhaserAnimatedActor';

export class MainScene extends Phaser.Scene {
  private actor: PhaserAnimatedActor | null = null;

  public constructor() {
    super('MainScene');
  }

  public create(): void {
    this.textures.addCanvas(
      'generated-background',
      createBackgroundCanvas({
        width: viewportConfig.baseWidth,
        height: viewportConfig.baseHeight,
      }),
    );
    this.add.image(0, 0, 'generated-background').setOrigin(0);
    this.actor = new PhaserAnimatedActor(this);

    this.input.on('pointerdown', this.handlePointerDown, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.cleanup, this);
  }

  private handlePointerDown(pointer: Phaser.Input.Pointer): void {
    const target: Point = clampActorPosition(
      { x: pointer.x, y: pointer.y },
      {
        halfWidth: animationConfig.visualSize / 2,
        halfHeight: animationConfig.visualSize / 2,
      },
    );
    this.actor?.moveTo(target, this);
  }

  private cleanup(): void {
    this.input.off('pointerdown', this.handlePointerDown, this);
    this.actor = null;
  }
}
