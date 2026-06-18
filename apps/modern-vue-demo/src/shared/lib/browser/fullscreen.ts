import type { FullscreenDocument, FullscreenElement } from '@/shared/types';

export function isFullscreenActive(doc: FullscreenDocument = document): boolean {
  return Boolean(doc.fullscreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement);
}

export async function requestFullscreen(element: FullscreenElement): Promise<void> {
  if (isFullscreenActive()) {
    return;
  }

  if (element.requestFullscreen) {
    await element.requestFullscreen();
    return;
  }

  if (element.webkitRequestFullscreen) {
    await element.webkitRequestFullscreen();
    return;
  }

  if (element.msRequestFullscreen) {
    await element.msRequestFullscreen();
  }
}
