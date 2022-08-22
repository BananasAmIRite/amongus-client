import { ClientAmongusPayloadType, ClientMessageType, SerializedPlayer, ServerMessageType } from 'amongus-types';
import Amongus from './Amongus';
import AmongusGame from './game/AmongusGame';
import AmongusGameScreen from './screens/AmongusGameScreen';
import { AmongusSocket, ServerListenerMap } from './types/types';

export default class AmongusClient {
  private playerUuid!: string;
  //   private game: AmongusGame;
  public constructor(private game: Amongus, private socket: AmongusSocket) {
    socket.on(ServerMessageType.UUID, ({ uuid }) => {
      this.playerUuid = uuid;
    });
    socket.on(ServerMessageType.ACCEPT_JOIN, ({ gameUuid, selfPlayer }) => {
      const game = new AmongusGame(gameUuid, this, selfPlayer);
      this.game.attachScreen(new AmongusGameScreen(game));
    });
  }

  send<T extends ClientMessageType>(type: T, payload: ClientAmongusPayloadType[T]) {
    this.socket.send(
      JSON.stringify({
        type,
        payload,
      })
    );
  }

  public getId() {
    return this.playerUuid;
  }

  public on<T extends ServerMessageType>(evt: T, listener: ServerListenerMap[T]) {
    this.socket.on(evt, listener as any); // bruh ok this is stupid
  }
}
