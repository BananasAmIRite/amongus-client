import { ClientAmongusPayloadType, ClientMessageType, SerializedPlayer, ServerMessageType } from 'amongus-types';
import Amongus from './Amongus';
import AmongusGame from './game/AmongusGame';
import AmongusGameScreen from './screens/AmongusGameScreen';
import { AmongusSocket } from './types/types';

export default class AmongusClient {
  private playerUuid!: string;
  //   private game: AmongusGame;
  public constructor(private game: Amongus, private socket: AmongusSocket) {
    socket.on(ServerMessageType.UUID, ({ uuid }) => {
      this.playerUuid = uuid;
    });
    socket.on(ServerMessageType.ACCEPT_JOIN, ({ gameUuid, selfPlayer }) => {
      const game = new AmongusGame(gameUuid, selfPlayer);
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
}
