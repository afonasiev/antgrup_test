import type { Point } from './main.types';
import type { MovementCurve } from './movement.types';

export interface AnimationConfig {
  visualSize: number;
  frameCount: number;
  frameRate: number;
  initialPosition: Point;
  movementDurationMs: number;
  movementCurve: MovementCurve;
  linearDistanceThreshold: number;
  linearAxisTolerance: number;
}
