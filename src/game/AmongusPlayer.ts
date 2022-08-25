import { SerializedPlayer, Location, ServerAmongusPayloadType, ServerMessageType, CharacterType } from 'amongus-types';
import AmongusGame from './AmongusGame';

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

  public updateState(state: Partial<SerializedPlayer>) {
    this.position = state.position ?? this.position;
    this.isDead = state.isDead ?? this.isDead;
    this.deadBodyLocation = state.deadBodyPosition ?? this.deadBodyLocation;
    this.id = this.id ?? state.id; // id never changes once set
    this.displayName = this.displayName ?? state.displayName;
    this.visible = state.visible ?? this.visible;
    this.characterType = state.characterType ?? this.characterType;
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
}
