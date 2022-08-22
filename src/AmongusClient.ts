import { ClientAmongusPayloadType, ClientMessageType, SerializedPlayer, ServerMessageType } from 'amongus-types';
import { Socket } from 'socket.io-client';
import AmongusGame from './AmongusGame';

export default class AmongusClient {
  private playerUuid!: string;
  //   private game: AmongusGame;
  public constructor(private socket: Socket) {
    socket.on(ServerMessageType.UUID, ({ uuid }) => {
      this.playerUuid = uuid;
    });
    socket.on(ServerMessageType.ACCEPT_JOIN, ({ selfPlayer }: { selfPlayer: SerializedPlayer }) => {
      // TODO: load the AmongusGameScreen, which will contain game data in AmongusGame
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
