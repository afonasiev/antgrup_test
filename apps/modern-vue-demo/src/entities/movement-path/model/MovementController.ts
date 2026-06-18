import { animationConfig } from '@/shared/config/animation.config';
import {
  buildMovementPath,
  clampActorPosition,
  easeMovement,
  resolveMovementPoint,
} from '@/shared/lib/math/movement';
import type { ActorBounds, MovementPath, Point } from '@/shared/types';

export class MovementController {
  private path: MovementPath | null = null;
  private elapsedMs = 0;
  private current: Point;
  private readonly bounds: ActorBounds;

  public constructor(initialPosition: Point, bounds: ActorBounds) {
    this.current = initialPosition;
    this.bounds = bounds;
  }

  public moveTo(target: Point): void {
    const clampedTarget = clampActorPosition(target, this.bounds);
    this.path = buildMovementPath(this.current, clampedTarget);
    this.elapsedMs = 0;
  }

  public update(deltaMs: number): Point {
    if (!this.path) {
      return this.current;
    }

    this.elapsedMs += deltaMs;
    const progress = Math.min(this.elapsedMs / animationConfig.movementDurationMs, 1);
    const eased = easeMovement(progress);
    this.current = clampActorPosition(resolveMovementPoint(this.path, eased), this.bounds);

    if (progress >= 1) {
      this.current = this.path.to;
      this.path = null;
    }

    return this.current;
  }

  public getCurrent(): Point {
    return this.current;
  }
}
