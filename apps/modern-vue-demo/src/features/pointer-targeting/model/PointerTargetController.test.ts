import { describe, expect, it } from 'vitest';
import { PointerTargetController } from './PointerTargetController';

describe('PointerTargetController', () => {
  it('converts client coordinates relative to the actual canvas rect without double offset', () => {
    const controller = new PointerTargetController();
    const canvas = {
      getBoundingClientRect: () => ({ left: 120, top: 80 }),
    } as HTMLElement;
    const event = {
      clientX: 320,
      clientY: 200,
    } as PointerEvent;

    expect(
      controller.toWorldPoint(event, canvas, {
        scale: 0.5,
        displayWidth: 500,
        displayHeight: 300,
        offsetX: 100,
        offsetY: 40,
      }),
    ).toEqual({ x: 400, y: 240 });
  });
});
