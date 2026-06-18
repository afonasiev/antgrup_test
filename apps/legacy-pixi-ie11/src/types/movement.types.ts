import { Point } from './main.types';

export type MovementCurve = 'linear' | 'quadraticBezier';

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
