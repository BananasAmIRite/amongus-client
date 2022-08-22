import ScreenAttachment from '../ScreenAttachment';
import Text from './Text';
import Position from '../Position';

export interface TextBoxOptions {
  text?: string;
  position: Position;
  width: number;
  height: number;
  padding?: number;
  bgColor?: string;
  focusColor?: string;
  placeholder?: string;
  op?: (input: string) => void;
}

export default class TextBox extends ScreenAttachment {
  private textBoxText: Text;
  private bgColor: string;
  private focusColor: string;
  private position: Position;
  private width: number;
  private height: number;
  private padding: number;
  private text: string;
  private placeholder: string;
  private operation: (input: string) => void;

  private isFocused: boolean = false;

  private onMouseClick = (evt: MouseEvent) => {
    this.isFocused =
      evt.offsetX >= this.position.x &&
      evt.offsetY >= this.position.y &&
      evt.offsetX <= this.position.x + this.width &&
      evt.offsetY <= this.position.y + this.height;
  };

  private onKeyDown = (evt: KeyboardEvent) => {
    if (!this.isFocused) return;
    if (evt.key === 'Enter') this.operation(this.text);
    if (evt.key === 'Backspace') this.setText(this.text.substring(0, this.text.length - 1));
    if (evt.key.length > 1) return;
    this.setText(this.text + evt.key);
  };

  public constructor(options: TextBoxOptions) {
    super();
    this.bgColor = options.bgColor ?? 'white';
    this.focusColor = options.focusColor ?? 'lightblue';
    this.position = options.position;
    this.width = options.width;
    this.height = options.height;
    this.padding = options.padding ?? 0;
    this.text = options.text ?? '';
    this.placeholder = options.placeholder ?? '';
    this.operation = options.op ?? (() => {});
    this.textBoxText = new Text({
      position: { x: this.position.x + this.width / 2, y: this.position.y + this.height - this.padding },
      maxHeight: this.height - this.padding * 2,
      maxWidth: this.width - this.padding * 2,
      original: this.text,
      textAlign: 'center',
    });
    this.setText(this.text);
  }

  public setText(text: string) {
    this.text = text;
    this.textBoxText.setText(this.text === '' ? this.placeholder : this.text);
    this.setPlaceholderColor();
  }

  private setPlaceholderColor() {
    this.textBoxText.setColor(this.text === '' ? 'gray' : 'black');
  }

  public getText() {
    return this.text;
  }

  onAttach(elem: HTMLCanvasElement): void {
    this.addAttachment(this.textBoxText);
    elem.addEventListener('click', this.onMouseClick);
    window.addEventListener('keydown', this.onKeyDown);
  }

  onRender(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.bgColor;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    if (this.isFocused) {
      ctx.strokeStyle = this.focusColor;
      ctx.beginPath();
      ctx.rect(this.position.x, this.position.y, this.width, this.height);
      ctx.stroke();
    }
  }

  onDetach(elem: HTMLCanvasElement): void {
    elem.removeEventListener('click', this.onMouseClick);
    window.removeEventListener('keydown', this.onKeyDown);
  }
}
