import { getDeviceKind } from '@/shared/lib/browser/is-mobile-viewport';
import { isFullscreenActive, requestFullscreen } from '@/shared/lib/browser/fullscreen';
import type { FullscreenElement } from '@/shared/types';

export class FullscreenController {
  private readonly element: FullscreenElement;
  private gestureTarget: HTMLElement | null = null;
  private requestPending = false;
  private usesPointerEvents = false;

  public constructor(element: HTMLElement) {
    this.element = element as FullscreenElement;
  }

  public bindGestureListeners(target: HTMLElement = this.element): void {
    this.unbindGestureListeners();
    this.gestureTarget = target;
    this.usesPointerEvents = 'PointerEvent' in window;
    if (this.usesPointerEvents) {
      target.addEventListener('pointerdown', this.handleGesture);
    } else {
      target.addEventListener('touchstart', this.handleGesture, { passive: true });
      target.addEventListener('touchmove', this.handleGesture, { passive: true });
    }
  }

  public unbindGestureListeners(): void {
    if (!this.gestureTarget) {
      return;
    }

    if (this.usesPointerEvents) {
      this.gestureTarget.removeEventListener('pointerdown', this.handleGesture);
    } else {
      this.gestureTarget.removeEventListener('touchstart', this.handleGesture);
      this.gestureTarget.removeEventListener('touchmove', this.handleGesture);
    }
    this.gestureTarget = null;
  }

  public async requestOnGesture(): Promise<void> {
    if (
      getDeviceKind(window.innerWidth) !== 'mobile' ||
      isFullscreenActive() ||
      this.requestPending
    ) {
      return;
    }

    this.requestPending = true;
    try {
      await requestFullscreen(this.element);
    } catch {
      // Browsers are allowed to reject fullscreen. The next user gesture may try again.
    } finally {
      this.requestPending = false;
    }
  }

  private readonly handleGesture = (): void => {
    void this.requestOnGesture();
  };
}
