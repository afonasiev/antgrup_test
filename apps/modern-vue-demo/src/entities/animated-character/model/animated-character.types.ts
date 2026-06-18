import type { Point } from '@/shared/types';

export interface AnimatedCharacter {
  setPosition(point: Point): void;
  update(deltaMs: number): void;
  destroy(): void;
}
