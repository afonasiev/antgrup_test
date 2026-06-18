import { afterEach, describe, expect, it, vi } from 'vitest';
import { FullscreenController } from './FullscreenController';

function setBrowserGlobals(fullscreenElement: Element | null): void {
  Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    value: {
      userAgent: 'iPhone',
    },
  });
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: {
      innerWidth: 390,
    },
  });
  Object.defineProperty(globalThis, 'document', {
    configurable: true,
    value: {
      fullscreenElement,
    },
  });
}

describe('FullscreenController', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('allows a retry when fullscreen is not active', async () => {
    setBrowserGlobals(null);
    const requestFullscreen = vi.fn().mockResolvedValue(undefined);
    const controller = new FullscreenController({ requestFullscreen } as unknown as HTMLElement);

    await controller.requestOnGesture();
    await controller.requestOnGesture();

    expect(requestFullscreen).toHaveBeenCalledTimes(2);
  });

  it('does not request fullscreen when it is already active', async () => {
    const element = {} as HTMLElement;
    setBrowserGlobals(element);
    const requestFullscreen = vi.fn().mockResolvedValue(undefined);
    const controller = new FullscreenController({ requestFullscreen } as unknown as HTMLElement);

    await controller.requestOnGesture();

    expect(requestFullscreen).not.toHaveBeenCalled();
  });

  it('deduplicates concurrent fullscreen requests', async () => {
    setBrowserGlobals(null);
    let resolveRequest: (() => void) | undefined;
    const requestFullscreen = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveRequest = resolve;
        }),
    );
    const controller = new FullscreenController({ requestFullscreen } as unknown as HTMLElement);

    const first = controller.requestOnGesture();
    const second = controller.requestOnGesture();

    expect(requestFullscreen).toHaveBeenCalledTimes(1);
    resolveRequest?.();
    await Promise.all([first, second]);
  });
});
