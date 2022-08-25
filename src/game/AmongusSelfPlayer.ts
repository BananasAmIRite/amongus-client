import { ClientMessageType, Location, ServerAmongusPayloadType, ServerMessageType } from 'amongus-types';
import AmongusGame from './AmongusGame';
import AmongusPlayer from './AmongusPlayer';

const PLAYER_SPEED = 10;

export default class AmongusSelfPlayer {
  public constructor(private game: AmongusGame, private player: AmongusPlayer) {}

  public updatePosition(pos: Location) {
    this.game.getClient().send(ClientMessageType.MOVE_PLAYER, {
      newPosition: pos,
    });
  }

  public checkPositionUpdate() {
    // console.log('checking position');
    // console.log(this.game.getKeysDown());

    // if (this.game.getSelfPlayer().getId() !== this.id) return; // idk why i implemented it like this but whatever
    const pos = { ...this.player.getPosition() };
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

    if (pos.x !== this.player.getPosition().x || pos.y !== this.player.getPosition().y) {
      this.updatePosition(pos);
    }
  }

  public start(data: ServerAmongusPayloadType[ServerMessageType.GAME_PLAYER_DATA]) {
    // TODO: implement
  }

  public getPosition() {
    return this.player.getPosition();
  }

  public getId() {
    return this.player.getId();
  }

  public getCharacterType() {
    return this.player.getCharacterType();
  }
}
