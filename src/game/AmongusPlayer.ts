import {
  SerializedPlayer,
  Location,
  ClientMessageType,
  ServerAmongusPayloadType,
  ServerMessageType,
} from 'amongus-types';
import AmongusGame from './AmongusGame';

export default class AmongusPlayer {
  private position: Location = { x: 0, y: 0 };

  private isDead: boolean = false;
  private deadBodyLocation: Location = { x: 0, y: 0 };
  private id!: string;
  private displayName!: string;

  public constructor(private game: AmongusGame, playerData: SerializedPlayer) {
    this.updateState(playerData);
  }

  private updatePosition(pos: Location) {
    this.game.getClient().send(ClientMessageType.MOVE_PLAYER, {
      newPosition: pos,
    });
  }

  public updateState(state: Partial<SerializedPlayer>) {
    this.position = state.position ?? this.position;
    this.isDead = state.isDead ?? this.isDead;
    this.deadBodyLocation = state.deadBodyPosition ?? this.deadBodyLocation;
    this.id = this.id ?? state.id; // id never changes once set
    this.displayName = this.displayName ?? state.displayName;
  }

  public start(data: ServerAmongusPayloadType[ServerMessageType.GAME_PLAYER_DATA]) {
    // TODO: implement
  }

  public getId() {
    return this.id;
  }
}
