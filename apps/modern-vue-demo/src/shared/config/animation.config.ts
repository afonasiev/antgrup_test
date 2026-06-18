import type { AnimationConfig } from '@/shared/types';

export const animationConfig: AnimationConfig = {
  visualSize: 400,
  frameCount: 24,
  frameRate: 18,
  initialPosition: { x: 500, y: 300 },
  movementDurationMs: 1800,
  movementCurve: 'quadraticBezier',
  linearDistanceThreshold: 260,
  linearAxisTolerance: 72,
};
