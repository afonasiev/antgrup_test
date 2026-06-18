import { describe, expect, it } from 'vitest';
import {
  buildBezierPath,
  buildLinearPath,
  buildMovementPath,
  clampActorPosition,
  resolveBezierPoint,
  resolveMovementPoint,
} from './movement';

describe('movement math', () => {
  it('clamps actor position inside the logical viewport', () => {
    expect(clampActorPosition({ x: -10, y: 900 }, { halfWidth: 200, halfHeight: 200 })).toEqual({
      x: 200,
      y: 400,
    });
  });

  it('builds a nonlinear bezier path', () => {
    const path = buildBezierPath({ x: 200, y: 200 }, { x: 800, y: 400 });

    expect(path.control).not.toEqual({ x: 500, y: 300 });
    expect(path.curve).toBe('quadraticBezier');
  });

  it('builds a linear path for short or axis-aligned movement', () => {
    const path = buildMovementPath({ x: 200, y: 200 }, { x: 420, y: 210 });

    expect(path.curve).toBe('linear');
    expect(resolveMovementPoint(path, 0.5)).toEqual({ x: 310, y: 205 });
  });

  it('builds a nonlinear path for distant diagonal movement', () => {
    expect(buildMovementPath({ x: 200, y: 200 }, { x: 800, y: 420 }).curve).toBe('quadraticBezier');
  });

  it('resolves linear endpoints', () => {
    const path = buildLinearPath({ x: 200, y: 200 }, { x: 800, y: 400 });

    expect(resolveMovementPoint(path, 0)).toEqual({ x: 200, y: 200 });
    expect(resolveMovementPoint(path, 1)).toEqual({ x: 800, y: 400 });
  });

  it('resolves bezier endpoints', () => {
    const path = buildBezierPath({ x: 200, y: 200 }, { x: 800, y: 400 });

    expect(resolveBezierPoint(path, 0)).toEqual({ x: 200, y: 200 });
    expect(resolveBezierPoint(path, 1)).toEqual({ x: 800, y: 400 });
  });
});
