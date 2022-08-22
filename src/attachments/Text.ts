import ScreenAttachment from '../ScreenAttachment';
import Position from '../Position';

export interface TextOptions {
  position: Position;
  maxHeight: number;
  maxWidth: number;
  original?: string;
  textAlign?: CanvasTextAlign;
  textColor?: string;
}

export default class Text extends ScreenAttachment {
  private text: string;
  private position: Position;
  private maxWidth: number;
  private maxHeight: number;
  private textAlign: CanvasTextAlign;
  private textColor: string;

  public constructor(options: TextOptions) {
    super();
    this.text = options.original ?? '';
    this.position = options.position;
    this.maxWidth = options.maxWidth;
    this.maxHeight = options.maxHeight;
    this.textAlign = options.textAlign ?? 'start';
    this.textColor = options.textColor ?? 'black';
  }

  onAttach(elem: HTMLCanvasElement) {}
  onRender(ctx: CanvasRenderingContext2D): void {
    ctx.textAlign = this.textAlign;

    ctx.font = this.findOptimalTextSize(ctx);

    ctx.fillStyle = this.textColor;

    ctx.fillText(this.text, this.position.x, this.position.y);
    ctx.textAlign = 'start';
  }
  onDetach(elem: HTMLCanvasElement): void {}

  public setText(text: string) {
    this.text = text;
  }

  private findOptimalTextSize(ctx: CanvasRenderingContext2D): string {
    const originalFont = ctx.font;
    if (this.text.length === 0) return originalFont;
    let size = 0;
    let lastMeasurement = 0;
    while (true) {
      ctx.font = `${size}px Arial`;
      const textWidth = ctx.measureText(this.text).width;

      if (lastMeasurement >= 0 && textWidth >= this.maxWidth) {
        ctx.font = originalFont;
        return `${size - lastMeasurement > this.maxHeight ? this.maxHeight : size - lastMeasurement}px Arial`;
      }

      lastMeasurement = Math.sign(this.maxWidth - textWidth);

      size += lastMeasurement;
    }
  }

  public setColor(color: string) {
    console.log(color);

    this.textColor = color;
  }
}
