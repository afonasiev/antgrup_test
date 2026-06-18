import type { Point } from './main.types';

export type MovementCurve = 'linear' | 'quadraticBezier';

export interface MovementConfig {
  durationMs: number;
  curve: MovementCurve;
}

export interface MovementPath {
  from: Point;
  control: Point | null;
  to: Point;
  curve: MovementCurve;
}

export interface ActorBounds {
  halfWidth: number;
  halfHeight: number;
}
