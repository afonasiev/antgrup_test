import { Container, Sprite, Texture } from 'pixi.js';
import { animationConfig } from '@/shared/config/animation.config';
import { viewportConfig } from '@/shared/config/viewport.config';
import { MovementController } from '@/entities/movement-path/model/MovementController';
import { createBackgroundCanvas } from '@/shared/lib/assets';
import type { Point } from '@/shared/types';
import { AnimatedActor } from './AnimatedActor';

export class PixiScene {
  private readonly root = new Container();
  private readonly backgroundTexture: Texture;
  private readonly actor = new AnimatedActor();
  private readonly movement = new MovementController(animationConfig.initialPosition, {
    halfWidth: animationConfig.visualSize / 2,
    halfHeight: animationConfig.visualSize / 2,
  });

  public constructor() {
    this.backgroundTexture = Texture.from(
      createBackgroundCanvas({
        width: viewportConfig.baseWidth,
        height: viewportConfig.baseHeight,
      }),
    );
    const background = new Sprite(this.backgroundTexture);
    this.root.addChild(background);
    this.actor.setPosition(animationConfig.initialPosition);
    this.root.addChild(this.actor.getDisplayObject());
  }

  public getDisplayObject(): Container {
    return this.root;
  }

  public moveTo(point: Point): void {
    this.movement.moveTo(point);
  }

  public update(deltaMs: number): void {
    this.actor.setPosition(this.movement.update(deltaMs));
  }

  public destroy(): void {
    this.actor.destroy();
    this.backgroundTexture.destroy(true);
    this.root.destroy({ children: true });
  }
}
