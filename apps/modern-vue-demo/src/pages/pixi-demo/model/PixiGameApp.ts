import { Application, Rectangle } from 'pixi.js';
import { FullscreenController } from '@/features/fullscreen-request/model/FullscreenController';
import { ScaleController } from '@/features/canvas-resize/model/ScaleController';
import { viewportConfig } from '@/shared/config/viewport.config';
import { PixiScene } from './PixiScene';

export class PixiGameApp {
  private readonly app = new Application();
  private readonly container: HTMLElement;
  private readonly scaleController = new ScaleController();
  private readonly fullscreenController: FullscreenController;
  private scene: PixiScene | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private initialized = false;
  private disposed = false;

  public constructor(container: HTMLElement) {
    this.container = container;
    this.fullscreenController = new FullscreenController(container);
  }

  public async init(): Promise<void> {
    await this.app.init({
      width: viewportConfig.baseWidth,
      height: viewportConfig.baseHeight,
      antialias: true,
      backgroundAlpha: 0,
    });
    this.initialized = true;

    if (this.disposed) {
      this.destroyInitializedApp();
      return;
    }

    this.app.canvas.className = 'pixi-demo__canvas';
    this.container.appendChild(this.app.canvas);

    this.scene = new PixiScene();
    this.app.stage.addChild(this.scene.getDisplayObject());
    this.app.stage.eventMode = 'static';
    this.app.stage.hitArea = new Rectangle(
      0,
      0,
      viewportConfig.baseWidth,
      viewportConfig.baseHeight,
    );
    this.app.stage.on('pointerdown', this.onPointerDown, this);
    this.app.ticker.add((ticker) => {
      this.scene?.update(ticker.deltaMS);
    });

    this.scaleController.apply(this.container, this.app.canvas);
    this.fullscreenController.bindGestureListeners(this.container);
    this.resizeObserver = new ResizeObserver(() => {
      this.scaleController.apply(this.container, this.app.canvas);
    });
    this.resizeObserver.observe(this.container);
  }

  public destroy(): void {
    this.disposed = true;

    if (!this.initialized) {
      return;
    }

    this.destroyInitializedApp();
  }

  private destroyInitializedApp(): void {
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    this.fullscreenController.unbindGestureListeners();
    this.app.stage.off('pointerdown', this.onPointerDown, this);
    this.scene?.destroy();
    this.scene = null;
    this.app.destroy({ removeView: true }, { children: true, texture: true, textureSource: true });
    this.initialized = false;
  }

  private onPointerDown(event: { global: { x: number; y: number }; originalEvent?: Event }): void {
    this.scene?.moveTo({ x: event.global.x, y: event.global.y });
  }
}
