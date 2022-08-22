import { SerializedPlayer } from 'amongus-types';

export default class AmongusGame {
  public constructor(private gameUuid: string, selfPlayer: SerializedPlayer) {
    // TODO: make player class and stuff
    // player class should handle all player-based
  }

  public getGameId() {
    return this.gameUuid;
  }
}
