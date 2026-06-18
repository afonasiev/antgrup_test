import { viewportConfig } from '@/shared/config/viewport.config';
import type { DeviceKind } from '@/shared/types';

export function getDeviceKind(width: number, userAgent: string = navigator.userAgent): DeviceKind {
  const isTouchLike = /Android|iPhone|iPad|iPod|Mobile|IEMobile/i.test(userAgent);
  return isTouchLike || width <= viewportConfig.mobileBreakpoint ? 'mobile' : 'desktop';
}
