import AmongusClient from './AmongusClient';
import AmongusGame from './AmongusGame';
import Screen from './Screen';
import ServerPromptScreen from './screens/ServerPromptScreen';

export default class Amongus {
  private screen?: Screen;
  private canvas: HTMLCanvasElement;
  private client!: AmongusClient;

  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  public attachScreen(screen: Screen) {
    this.detachScreen();
    this.screen = screen;
    screen.attach(this.canvas);
  }

  public detachScreen() {
    this.screen?.detach(this.canvas);
    this.screen = undefined;
  }

  public render() {
    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas rendering context does not exist. ');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    this.screen?.render(ctx);
    window.requestAnimationFrame(() => this.render());
  }

  public start() {
    this.attachScreen(new ServerPromptScreen(this));
    this.render();
  }

  public getCanvas() {
    return this.canvas;
  }

  public setClient(c: AmongusClient) {
    this.client = c;
  }

  public getClient() {
    return this.client;
  }
}
