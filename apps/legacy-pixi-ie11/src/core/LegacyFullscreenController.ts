import { LegacyFullscreenElement } from '@/types';

export function isMobileViewport(): boolean {
  return (
    /Android|iPhone|iPad|iPod|Mobile|IEMobile/i.test(navigator.userAgent) ||
    window.innerWidth <= 768
  );
}

function isFullscreenActive(): boolean {
  var doc = document as Document & {
    webkitFullscreenElement?: Element | null;
    msFullscreenElement?: Element | null;
  };

  return Boolean(doc.fullscreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement);
}

export class LegacyFullscreenController {
  private element: LegacyFullscreenElement;

  public constructor(element: HTMLElement) {
    this.element = element as LegacyFullscreenElement;
  }

  public requestOnGesture(): void {
    if (!isMobileViewport() || isFullscreenActive()) {
      return;
    }

    if (this.element.requestFullscreen) {
      var request = this.element.requestFullscreen();
      if (request && typeof request.catch === 'function') {
        request.catch(function () {
          // A later user gesture can retry the request.
        });
      }
      return;
    }

    if (this.element.webkitRequestFullscreen) {
      this.element.webkitRequestFullscreen();
      return;
    }

    if (this.element.msRequestFullscreen) {
      this.element.msRequestFullscreen();
    }
  }
}
