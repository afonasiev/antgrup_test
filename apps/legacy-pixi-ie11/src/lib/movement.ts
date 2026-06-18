import { appConfig } from '@/config/app.config';
import { animationConfig } from '@/config/animation.config';
import { ActorBounds, MovementCurve, MovementPath, Point } from '@/types';

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function clampActorPosition(point: Point, bounds: ActorBounds): Point {
  return {
    x: clamp(point.x, bounds.halfWidth, appConfig.baseWidth - bounds.halfWidth),
    y: clamp(point.y, bounds.halfHeight, appConfig.baseHeight - bounds.halfHeight),
  };
}

export function buildBezierPath(from: Point, to: Point): MovementPath {
  var distanceX = to.x - from.x;
  var distanceY = to.y - from.y;
  var normalLength = Math.max(Math.sqrt(distanceX * distanceX + distanceY * distanceY), 1);
  var curveStrength = Math.min(180, normalLength * 0.28);

  return {
    from: from,
    to: to,
    curve: 'quadraticBezier',
    control: {
      x: (from.x + to.x) / 2 + (-distanceY / normalLength) * curveStrength,
      y: (from.y + to.y) / 2 + (distanceX / normalLength) * curveStrength,
    },
  };
}

export function buildLinearPath(from: Point, to: Point): MovementPath {
  return {
    from: from,
    to: to,
    control: null,
    curve: 'linear',
  };
}

export function chooseMovementCurve(from: Point, to: Point): MovementCurve {
  var distanceX = Math.abs(to.x - from.x);
  var distanceY = Math.abs(to.y - from.y);
  var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

  if (
    distance <= animationConfig.linearDistanceThreshold ||
    distanceX <= animationConfig.linearAxisTolerance ||
    distanceY <= animationConfig.linearAxisTolerance
  ) {
    return 'linear';
  }

  return 'quadraticBezier';
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

  var inverse = 1 - progress;

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
