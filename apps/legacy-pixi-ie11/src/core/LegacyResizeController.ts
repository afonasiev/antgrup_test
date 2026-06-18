import { appConfig } from '@/config/app.config';
import { AppElements, Point } from '@/types';
import { isMobileViewport } from './LegacyFullscreenController';

export class LegacyResizeController {
  private elements: AppElements;
  private scale: number;

  public constructor(elements: AppElements) {
    this.elements = elements;
    this.scale = 1;
  }

  public apply(): void {
    var availableWidth = this.elements.root.clientWidth;
    var availableHeight = this.elements.root.clientHeight;
    var maxWidth = isMobileViewport()
      ? availableWidth
      : Math.min(availableWidth, appConfig.desktopMaxWidth);
    var maxHeight = isMobileViewport()
      ? availableHeight
      : Math.min(availableHeight, appConfig.desktopMaxHeight);
    var scale = Math.min(maxWidth / appConfig.baseWidth, maxHeight / appConfig.baseHeight);
    var displayWidth = Math.round(appConfig.baseWidth * scale);
    var displayHeight = Math.round(appConfig.baseHeight * scale);
    var offsetX = Math.round((availableWidth - displayWidth) / 2);
    var offsetY = Math.round((availableHeight - displayHeight) / 2);

    this.elements.shell.style.width = displayWidth + 'px';
    this.elements.shell.style.height = displayHeight + 'px';
    this.elements.shell.style.left = offsetX + 'px';
    this.elements.shell.style.top = offsetY + 'px';

    this.scale = scale;
  }

  public screenToWorld(clientX: number, clientY: number): Point {
    var rect = this.elements.shell.getBoundingClientRect();

    return {
      x: (clientX - rect.left) / this.scale,
      y: (clientY - rect.top) / this.scale,
    };
  }
}
