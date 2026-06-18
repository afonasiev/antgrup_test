import Phaser from 'phaser';
import { viewportConfig } from '@/shared/config/viewport.config';
import { MainScene } from './MainScene';

export class PhaserGameFactory {
  public create(parent: HTMLElement): Phaser.Game {
    return new Phaser.Game({
      type: Phaser.AUTO,
      parent,
      backgroundColor: '#171717',
      width: viewportConfig.baseWidth,
      height: viewportConfig.baseHeight,
      scale: {
        parent,
        mode: Phaser.Scale.NONE,
        autoCenter: Phaser.Scale.NO_CENTER,
        width: viewportConfig.baseWidth,
        height: viewportConfig.baseHeight,
        expandParent: false,
      },
      scene: [MainScene],
    });
  }

  public destroy(game: Phaser.Game): void {
    game.destroy(true);
  }
}
