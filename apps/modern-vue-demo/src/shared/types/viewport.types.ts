import type { Size } from './main.types';

export type DeviceKind = 'desktop' | 'mobile';

export interface ViewportConfig {
  baseWidth: number;
  baseHeight: number;
  desktopMaxWidth: number;
  desktopMaxHeight: number;
  mobileBreakpoint: number;
}

export interface ScaleResult {
  scale: number;
  displayWidth: number;
  displayHeight: number;
  offsetX: number;
  offsetY: number;
}

export interface ScaleInput {
  available: Size;
  config: ViewportConfig;
  deviceKind: DeviceKind;
}
