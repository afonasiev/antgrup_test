import { animationConfig } from '@/config/animation.config';
import {
  buildMovementPath,
  clampActorPosition,
  easeMovement,
  resolveMovementPoint,
} from '@/lib/movement';
import { ActorBounds, MovementPath, Point } from '@/types';

export class MovementSystem {
  private path: MovementPath | null;
  private elapsedMs: number;
  private current: Point;
  private bounds: ActorBounds;

  public constructor(initialPosition: Point, bounds: ActorBounds) {
    this.path = null;
    this.elapsedMs = 0;
    this.current = initialPosition;
    this.bounds = bounds;
  }

  public moveTo(target: Point): void {
    this.path = buildMovementPath(this.current, clampActorPosition(target, this.bounds));
    this.elapsedMs = 0;
  }

  public update(deltaMs: number): Point {
    if (!this.path) {
      return this.current;
    }

    this.elapsedMs += deltaMs;
    var progress = Math.min(this.elapsedMs / animationConfig.movementDurationMs, 1);
    var eased = easeMovement(progress);
    this.current = clampActorPosition(resolveMovementPoint(this.path, eased), this.bounds);

    if (progress >= 1) {
      this.current = this.path.to;
      this.path = null;
    }

    return this.current;
  }
}
