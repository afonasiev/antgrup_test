import * as PIXI from 'pixi.js';
import { animationConfig } from '@/config/animation.config';
import { appConfig } from '@/config/app.config';
import { AnimatedActor } from '@/entities/AnimatedActor';
import { createBackgroundCanvas } from '@/lib/procedural-assets';
import { MovementSystem } from '@/systems/MovementSystem';
import { PointerInputSystem } from '@/systems/PointerInputSystem';
import { AppElements, Point } from '@/types';
import { LegacyFullscreenController } from './LegacyFullscreenController';
import { LegacyResizeController } from './LegacyResizeController';

export class LegacyPixiApplication {
  private app: PIXI.Application;
  private actor: AnimatedActor;
  private movement: MovementSystem;
  private resizeController: LegacyResizeController;
  private pointerSystem: PointerInputSystem;

  public constructor(elements: AppElements) {
    this.app = new PIXI.Application({
      width: appConfig.baseWidth,
      height: appConfig.baseHeight,
      view: elements.canvas,
      backgroundColor: 0x171717,
      antialias: true,
    });
    this.actor = new AnimatedActor();
    this.movement = new MovementSystem(animationConfig.initialPosition, {
      halfWidth: animationConfig.visualSize / 2,
      halfHeight: animationConfig.visualSize / 2,
    });
    this.resizeController = new LegacyResizeController(elements);
    this.pointerSystem = new PointerInputSystem(
      elements.shell,
      this.resizeController,
      new LegacyFullscreenController(elements.root),
      this.moveTo,
    );
  }

  public start(): void {
    var background = new PIXI.Sprite(
      PIXI.Texture.from(createBackgroundCanvas(appConfig.baseWidth, appConfig.baseHeight)),
    );
    this.app.stage.addChild(background);
    this.actor.setPosition(animationConfig.initialPosition);
    this.app.stage.addChild(this.actor.getDisplayObject());
    this.app.ticker.add(this.update);
    this.resizeController.apply();
    this.pointerSystem.bind();
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('orientationchange', this.handleResize);
  }

  public destroy(): void {
    this.pointerSystem.unbind();
    this.app.ticker.remove(this.update);
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('orientationchange', this.handleResize);
    this.app.destroy(true, { children: true, texture: true, baseTexture: true });
  }

  private moveTo = (point: Point): void => {
    this.movement.moveTo(point);
  };

  private update = (deltaFrames: number): void => {
    var deltaMs = deltaFrames * (1000 / 60);
    this.actor.setPosition(this.movement.update(deltaMs));
  };

  private handleResize = (): void => {
    this.resizeController.apply();
  };
}
