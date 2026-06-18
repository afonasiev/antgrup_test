import { describe, expect, it } from 'vitest';
import { MovementController } from './MovementController';

describe('MovementController', () => {
  it('keeps a bezier movement inside actor bounds', () => {
    const controller = new MovementController(
      { x: 800, y: 200 },
      { halfWidth: 200, halfHeight: 200 },
    );

    controller.moveTo({ x: 200, y: 200 });

    for (let index = 0; index < 120; index += 1) {
      const point = controller.update(16);
      expect(point.x).toBeGreaterThanOrEqual(200);
      expect(point.x).toBeLessThanOrEqual(800);
      expect(point.y).toBeGreaterThanOrEqual(200);
      expect(point.y).toBeLessThanOrEqual(400);
    }
  });
});
