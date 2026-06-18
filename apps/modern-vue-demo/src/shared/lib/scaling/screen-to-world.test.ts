import { describe, expect, it } from 'vitest';
import { screenToWorld } from './screen-to-world';

describe('screenToWorld', () => {
  it('converts display coordinates to logical viewport coordinates', () => {
    expect(
      screenToWorld(
        { x: 640, y: 384 },
        { scale: 1.28, displayWidth: 1280, displayHeight: 768, offsetX: 0, offsetY: 0 },
      ),
    ).toEqual({ x: 500, y: 300 });
  });
});
