import type { ScaleInput, ScaleResult } from '@/shared/types';

export function calculateScale(input: ScaleInput): ScaleResult {
  const maxWidth =
    input.deviceKind === 'desktop'
      ? Math.min(input.available.width, input.config.desktopMaxWidth)
      : input.available.width;
  const maxHeight =
    input.deviceKind === 'desktop'
      ? Math.min(input.available.height, input.config.desktopMaxHeight)
      : input.available.height;

  const scale = Math.min(maxWidth / input.config.baseWidth, maxHeight / input.config.baseHeight);
  const displayWidth = Math.round(input.config.baseWidth * scale);
  const displayHeight = Math.round(input.config.baseHeight * scale);

  return {
    scale,
    displayWidth,
    displayHeight,
    offsetX: Math.round((input.available.width - displayWidth) / 2),
    offsetY: Math.round((input.available.height - displayHeight) / 2),
  };
}
