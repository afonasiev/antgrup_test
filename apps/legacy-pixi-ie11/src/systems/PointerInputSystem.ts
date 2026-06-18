import { browserConfig } from '@/config/browser.config';
import { LegacyFullscreenController } from '@/core/LegacyFullscreenController';
import { LegacyResizeController } from '@/core/LegacyResizeController';
import { Point } from '@/types';

export class PointerInputSystem {
  private shell: HTMLElement;
  private resizeController: LegacyResizeController;
  private fullscreenController: LegacyFullscreenController;
  private onTarget: (point: Point) => void;
  private supportsPointerEvents: boolean;
  private ignoreMouseUntil: number;

  public constructor(
    shell: HTMLElement,
    resizeController: LegacyResizeController,
    fullscreenController: LegacyFullscreenController,
    onTarget: (point: Point) => void,
  ) {
    this.shell = shell;
    this.resizeController = resizeController;
    this.fullscreenController = fullscreenController;
    this.onTarget = onTarget;
    this.supportsPointerEvents = 'PointerEvent' in window;
    this.ignoreMouseUntil = 0;
  }

  public bind(): void {
    if (this.supportsPointerEvents) {
      this.shell.addEventListener(
        browserConfig.pointerEventName,
        this.handleMouseEvent as EventListener,
      );
    } else {
      this.shell.addEventListener('mousedown', this.handleMouseEvent as EventListener);
      this.shell.addEventListener('touchstart', this.handleTouchEvent);
      this.shell.addEventListener('touchmove', this.handleTouchEvent);
    }
  }

  public unbind(): void {
    if (this.supportsPointerEvents) {
      this.shell.removeEventListener(
        browserConfig.pointerEventName,
        this.handleMouseEvent as EventListener,
      );
    } else {
      this.shell.removeEventListener('mousedown', this.handleMouseEvent as EventListener);
      this.shell.removeEventListener('touchstart', this.handleTouchEvent);
      this.shell.removeEventListener('touchmove', this.handleTouchEvent);
    }
  }

  private handleMouseEvent = (event: MouseEvent): void => {
    if (Date.now() < this.ignoreMouseUntil) {
      return;
    }

    this.fullscreenController.requestOnGesture();
    this.onTarget(this.resizeController.screenToWorld(event.clientX, event.clientY));
  };

  private handleTouchEvent = (event: TouchEvent): void => {
    if (!event.touches.length) {
      return;
    }

    this.ignoreMouseUntil = Date.now() + 750;
    this.fullscreenController.requestOnGesture();
    this.onTarget(
      this.resizeController.screenToWorld(event.touches[0].clientX, event.touches[0].clientY),
    );
  };
}
