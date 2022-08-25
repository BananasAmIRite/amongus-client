import {
  ClientAmongusPayloadType,
  ClientMessageType,
  ServerAmongusPayloadType,
  ServerMessageType,
} from 'amongus-types';
import { io, Socket } from 'socket.io-client';
import Amongus from '../Amongus';
import AmongusClient from '../AmongusClient';
import Button from '../attachments/Button';
import TextBox from '../attachments/TextBox';
import Screen from '../Screen';
import { AmongusSocket } from '../types/types';

enum ConnectionStatus {
  CONNECTING,
  CONNECTED,
  CONNECTING_FAILED,
}

export default class AmongusHomeScreen extends Screen {
  private socket: AmongusSocket;

  private connectionStatus: ConnectionStatus = ConnectionStatus.CONNECTING;

  public constructor(private game: Amongus, private url: string, displayName: string) {
    super();

    this.socket = io(url, {
      query: {
        displayName,
      },
    });

    this.socket.on('connect', () => {
      this.connectionStatus = ConnectionStatus.CONNECTED;

      this.game.setClient(new AmongusClient(this.game, this.socket));
    });
    this.socket.on('connect_error', () => {
      this.connectionStatus = ConnectionStatus.CONNECTING_FAILED;
    });
    this.socket.connect();
  }
  onAttach(elem: HTMLCanvasElement): void {
    const WIDTH = 200;
    const HEIGHT = 50;
    this.addAttachment(
      new Button({
        position: { x: elem.width / 2 - WIDTH / 2, y: (3 * elem.height) / 8 - HEIGHT / 2 },
        width: WIDTH,
        height: HEIGHT,
        color: 'lightgray',
        text: 'Create game',
        padding: 10,
        op: async () => {
          const code = await (
            await fetch(`http://${this.url}/newgame?owner=${this.game.getClient().getId()}`, { method: 'POST' })
          ).text();

          this.game.getClient().send(ClientMessageType.JOIN, { uuid: code });
        },
      })
    );
    this.addAttachment(
      new TextBox({
        position: { x: elem.width / 2 - WIDTH / 2, y: (5 * elem.height) / 8 - HEIGHT / 2 },
        width: WIDTH,
        height: HEIGHT,
        bgColor: 'lightgray',
        placeholder: 'Join game',
        padding: 10,
        op: (code) => {
          this.game.getClient().send(ClientMessageType.JOIN, { uuid: code });
        },
      })
    );
  }
  onRender(ctx: CanvasRenderingContext2D): void {
    if (this.connectionStatus !== ConnectionStatus.CONNECTED) return;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
  onDetach(elem: HTMLCanvasElement): void {}
}
