import { viewportConfig } from '@/shared/config/viewport.config';
import { getDeviceKind } from '@/shared/lib/browser/is-mobile-viewport';
import { calculateScale } from '@/shared/lib/scaling/calculate-scale';
import type { ScaleResult } from '@/shared/types';

export class ScaleController {
  private current: ScaleResult = {
    scale: 1,
    displayWidth: viewportConfig.baseWidth,
    displayHeight: viewportConfig.baseHeight,
    offsetX: 0,
    offsetY: 0,
  };

  public apply(container: HTMLElement, canvas: HTMLElement): ScaleResult {
    const available = {
      width: container.clientWidth,
      height: container.clientHeight,
    };
    const result = calculateScale({
      available,
      config: viewportConfig,
      deviceKind: getDeviceKind(available.width),
    });

    canvas.style.width = result.displayWidth + 'px';
    canvas.style.height = result.displayHeight + 'px';
    canvas.style.position = 'absolute';
    canvas.style.left = result.offsetX + 'px';
    canvas.style.top = result.offsetY + 'px';

    this.current = result;
    return result;
  }

  public getScale(): ScaleResult {
    return this.current;
  }
}
