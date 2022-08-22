import AmongusGame from '../game/AmongusGame';
import Screen from '../Screen';
import Text from '../attachments/Text';

export default class AmongusGameScreen extends Screen {
  public constructor(private game: AmongusGame) {
    super();
  }
  onAttach(elem: HTMLCanvasElement): void {
    this.addAttachment(
      new Text({
        position: { x: 0, y: 35 },
        maxWidth: 500,
        maxHeight: 30,
        original: `Code: ${this.game.getGameId()}`,
      })
    );
  }
  onRender(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
  onDetach(elem: HTMLCanvasElement): void {}
}
