import ScreenAttachment from '../ScreenAttachment';
import Text from './Text';
import Position from '../Position';

export interface ButtonOptions {
  text?: string;
  position: Position;
  width: number;
  height: number;
  padding?: number;
  color: string;
  op?: () => void;
}

export default class Button extends ScreenAttachment {
  private text: Text;
  private color: string;
  private position: Position;
  private width: number;
  private height: number;
  private padding: number;
  private btnText: string;
  private operation: () => void;

  private onMouseClick = (evt: MouseEvent) => {
    if (
      evt.offsetX >= this.position.x &&
      evt.offsetY >= this.position.y &&
      evt.offsetX <= this.position.x + this.width &&
      evt.offsetY <= this.position.y + this.height
    )
      this.operation();
  };
  public constructor(options: ButtonOptions) {
    super();
    this.color = options.color;
    this.position = options.position;
    this.width = options.width;
    this.height = options.height;
    this.padding = options.padding ?? 0;
    this.btnText = options.text ?? '';
    this.operation = options.op ?? (() => {});
    this.text = new Text({
      position: { x: this.position.x + this.width / 2, y: this.position.y + this.height - this.padding },
      maxHeight: this.height - this.padding * 2,
      maxWidth: this.width - this.padding * 2,
      original: this.btnText,
      textAlign: 'center',
    });
  }

  onAttach(elem: HTMLCanvasElement): void {
    this.addAttachment(this.text);

    elem.addEventListener('click', this.onMouseClick);
  }

  onRender(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  onDetach(elem: HTMLCanvasElement): void {
    if (!this.onMouseClick) return;
    elem.removeEventListener('click', this.onMouseClick);
  }
}
