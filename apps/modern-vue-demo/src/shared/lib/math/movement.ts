import { viewportConfig } from '@/shared/config/viewport.config';
import { animationConfig } from '@/shared/config/animation.config';
import type { ActorBounds, MovementCurve, MovementPath, Point } from '@/shared/types';
import { clamp } from './clamp';

export function clampActorPosition(point: Point, bounds: ActorBounds): Point {
  return {
    x: clamp(point.x, bounds.halfWidth, viewportConfig.baseWidth - bounds.halfWidth),
    y: clamp(point.y, bounds.halfHeight, viewportConfig.baseHeight - bounds.halfHeight),
  };
}

export function buildBezierPath(from: Point, to: Point): MovementPath {
  const midX = (from.x + to.x) / 2;
  const distanceX = to.x - from.x;
  const distanceY = to.y - from.y;
  const normalLength = Math.max(Math.sqrt(distanceX * distanceX + distanceY * distanceY), 1);
  const curveStrength = Math.min(180, normalLength * 0.28);

  return {
    from,
    to,
    curve: 'quadraticBezier',
    control: {
      x: midX + (-distanceY / normalLength) * curveStrength,
      y: (from.y + to.y) / 2 + (distanceX / normalLength) * curveStrength,
    },
  };
}

export function buildLinearPath(from: Point, to: Point): MovementPath {
  return {
    from,
    to,
    control: null,
    curve: 'linear',
  };
}

export function chooseMovementCurve(from: Point, to: Point): MovementCurve {
  const distanceX = Math.abs(to.x - from.x);
  const distanceY = Math.abs(to.y - from.y);
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

  if (
    distance <= animationConfig.linearDistanceThreshold ||
    distanceX <= animationConfig.linearAxisTolerance ||
    distanceY <= animationConfig.linearAxisTolerance
  ) {
    return 'linear';
  }

  return animationConfig.movementCurve;
}

export function buildMovementPath(from: Point, to: Point): MovementPath {
  return chooseMovementCurve(from, to) === 'linear'
    ? buildLinearPath(from, to)
    : buildBezierPath(from, to);
}

export function resolveBezierPoint(path: MovementPath, progress: number): Point {
  if (!path.control) {
    return resolveLinearPoint(path, progress);
  }

  const inverse = 1 - progress;

  return {
    x:
      inverse * inverse * path.from.x +
      2 * inverse * progress * path.control.x +
      progress * progress * path.to.x,
    y:
      inverse * inverse * path.from.y +
      2 * inverse * progress * path.control.y +
      progress * progress * path.to.y,
  };
}

export function resolveLinearPoint(path: MovementPath, progress: number): Point {
  return {
    x: path.from.x + (path.to.x - path.from.x) * progress,
    y: path.from.y + (path.to.y - path.from.y) * progress,
  };
}

export function resolveMovementPoint(path: MovementPath, progress: number): Point {
  return path.curve === 'linear'
    ? resolveLinearPoint(path, progress)
    : resolveBezierPoint(path, progress);
}

export function easeMovement(progress: number): number {
  return progress * progress * progress * (progress * (progress * 6 - 15) + 10);
}
