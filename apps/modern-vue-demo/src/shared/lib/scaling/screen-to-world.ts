import type { Point, ScaleResult } from '@/shared/types';

export function screenToWorld(point: Point, scale: ScaleResult): Point {
  return {
    x: (point.x - scale.offsetX) / scale.scale,
    y: (point.y - scale.offsetY) / scale.scale,
  };
}
