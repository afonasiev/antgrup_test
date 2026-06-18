import { screenToWorld } from '@/shared/lib/scaling/screen-to-world';
import type { Point, ScaleResult } from '@/shared/types';

export class PointerTargetController {
  public toWorldPoint(event: PointerEvent, canvas: HTMLElement, scale: ScaleResult): Point {
    const rect = canvas.getBoundingClientRect();

    return screenToWorld(
      {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      },
      {
        ...scale,
        offsetX: 0,
        offsetY: 0,
      },
    );
  }
}
