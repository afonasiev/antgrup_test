import { Point } from './main.types';

export interface AnimationConfig {
  visualSize: number;
  frameCount: number;
  frameRate: number;
  initialPosition: Point;
  movementDurationMs: number;
  linearDistanceThreshold: number;
  linearAxisTolerance: number;
}
