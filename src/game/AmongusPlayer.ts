import {
  SerializedPlayer,
  Location,
  ClientMessageType,
  ServerAmongusPayloadType,
  ServerMessageType,
  CharacterType,
} from 'amongus-types';
import AmongusGame from './AmongusGame';

const PLAYER_SPEED = 10;

export default class AmongusPlayer {
  private position: Location = { x: 0, y: 0 };

  private isDead: boolean = false;
  private deadBodyLocation: Location = { x: 0, y: 0 };
  private id!: string;
  private displayName!: string;
  private visible!: boolean;
  private characterType!: CharacterType;

  public constructor(private game: AmongusGame, playerData: SerializedPlayer) {
    this.updateState(playerData);
  }

  public updatePosition(pos: Location) {
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
    this.visible = state.visible ?? this.visible;
    this.characterType = state.characterType ?? this.characterType;
  }

  public start(data: ServerAmongusPayloadType[ServerMessageType.GAME_PLAYER_DATA]) {
    // TODO: implement
  }

  public getId() {
    return this.id;
  }

  public getPosition() {
    return this.position;
  }

  public getCharacterType() {
    return this.characterType;
  }

  public isVisible() {
    return this.visible;
  }

  public checkPositionUpdate() {
    // console.log('checking position');
    // console.log(this.game.getKeysDown());

    // if (this.game.getSelfPlayer().getId() !== this.id) return; // idk why i implemented it like this but whatever
    const pos = { ...this.getPosition() };
    if (this.game.getKeysDown()['w']) {
      pos.y -= PLAYER_SPEED;
    }
    if (this.game.getKeysDown()['s']) {
      pos.y += PLAYER_SPEED;
    }
    if (this.game.getKeysDown()['a']) {
      pos.x -= PLAYER_SPEED;
    }
    if (this.game.getKeysDown()['d']) {
      pos.x += PLAYER_SPEED;
    }

    if (pos.x !== this.getPosition().x || pos.y !== this.getPosition().y) {
      this.updatePosition(pos);
    }
  }
}
