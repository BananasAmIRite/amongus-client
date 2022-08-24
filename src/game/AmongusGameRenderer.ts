import AmongusGame from './AmongusGame';

export default class AmongusGameRenderer {
  public constructor(private game: AmongusGame) {}

  public render(ctx: CanvasRenderingContext2D) {
    // draw map
    const selfPlayerPosition = this.game.getSelfPlayer().getPosition();
    // NOTE: it may be a pain to adjust for fov and speed with the current setup :P
    ctx.fillStyle = 'black'; // black is the color if theres nothing else to render
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(
      this.game.getMapLoader().getMap(),
      ctx.canvas.width / 2 - selfPlayerPosition.x,
      ctx.canvas.height / 2 - selfPlayerPosition.y
    );
    // TODO: render everything else idk

    for (const player of this.game.getPlayers()) {
      // TODO: make the actual player assets and stuff; prob pass the player asset to the ACCEPT_JOIN and PLAYER_JOIN events
      // render them !!
    }
  }
}
