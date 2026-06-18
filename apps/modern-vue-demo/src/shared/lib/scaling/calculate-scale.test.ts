import { describe, expect, it } from 'vitest';
import { viewportConfig } from '@/shared/config/viewport.config';
import { calculateScale } from './calculate-scale';

describe('calculateScale', () => {
  it('limits desktop size to 1280x768 and scales by the smaller side', () => {
    const result = calculateScale({
      available: { width: 1600, height: 900 },
      config: viewportConfig,
      deviceKind: 'desktop',
    });

    expect(result.displayWidth).toBe(1280);
    expect(result.displayHeight).toBe(768);
  });

  it('uses maximum available mobile size', () => {
    const result = calculateScale({
      available: { width: 390, height: 844 },
      config: viewportConfig,
      deviceKind: 'mobile',
    });

    expect(result.displayWidth).toBe(390);
    expect(result.displayHeight).toBe(234);
  });
});
