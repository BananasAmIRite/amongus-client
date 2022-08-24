import { GameRole, SerializedPlayer, ServerMessageType } from 'amongus-types';
import { Server } from 'http';
import AmongusClient from '../AmongusClient';
import AmongusGameRenderer from './AmongusGameRenderer';
import AmongusPlayer from './AmongusPlayer';
import AmongusMapLoader from './map/AmongusMapLoader';

export default class AmongusGame {
  private renderer: AmongusGameRenderer;

  private mapLoader: AmongusMapLoader;

  private players: AmongusPlayer[];

  private selfPlayer: AmongusPlayer;
  public constructor(private gameUuid: string, private client: AmongusClient, selfPlayer: SerializedPlayer) {
    this.renderer = new AmongusGameRenderer(this);

    this.mapLoader = new AmongusMapLoader();

    const p = new AmongusPlayer(this, selfPlayer);
    this.players = [p];

    this.selfPlayer = p;

    this.setupListeners();
  }

  private setupListeners() {
    // TODO: set up all these listeners
    this.client.on(ServerMessageType.PLAYER_JOIN, ({ player }) => {
      this.players.push(new AmongusPlayer(this, player));
    });
    this.client.on(ServerMessageType.LOAD_MAP, ({ resource }) => {
      this.mapLoader.setMap(`./assets/${resource}`);
    });
    this.client.on(ServerMessageType.PLAYER_LEAVE, ({ playerId }) => {
      this.removePlayer(playerId);
    });
    this.client.on(ServerMessageType.PLAYER_MOVE, ({ playerId, position }) => {
      const p = this.getPlayer(playerId);
      if (!p) return;
      p.updateState({
        position,
      });
    });
    this.client.on(ServerMessageType.GAME_PLAYER_DATA, (data) => {
      this.selfPlayer.start(data);
    });
    this.client.on(ServerMessageType.PLAYER_DEATH, ({ playerId, deathPosition }) => {
      const p = this.getPlayer(playerId);
      if (!p) return;
      p.updateState({
        isDead: true,
        deadBodyPosition: deathPosition,
      });
    });
    this.client.on(ServerMessageType.PLAYER_SET_VISIBLE, ({ playerId, visibility }) => {
      const p = this.getPlayer(playerId);
      if (!p) return;
      p.updateState({
        visible: visibility,
      });
    });
    this.client.on(ServerMessageType.GAME_END, ({ winner }) => {
      this.end(winner);
    });
  }

  public getPlayer(id: string) {
    return this.players.find((e) => e.getId() === id);
  }

  public removePlayer(id: string) {
    const idx = this.players.findIndex((e) => e.getId() === id);
    if (idx !== -1) this.players.splice(idx, 1);
  }

  public getGameId() {
    return this.gameUuid;
  }

  public getRenderer() {
    return this.renderer;
  }

  public getClient() {
    return this.client;
  }

  public getSelfPlayer() {
    return this.selfPlayer;
  }

  public getMapLoader() {
    return this.mapLoader;
  }

  public getPlayers() {
    return this.players;
  }

  private end(winner: GameRole) {
    // TODO: implement
  }
}
