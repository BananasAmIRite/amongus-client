import { CharacterType } from 'amongus-types';
import AmongusGame from './AmongusGame';
import getImage from './Characters';

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
      // const plrImage = getImage(player.getCharacterType(), 'rightface');
      if (player.getId() === this.game.getSelfPlayer().getId()) continue;
      if (!player.isVisible()) continue;
      ctx.fillStyle = (player.getCharacterType() ?? CharacterType.RED).toString();

      ctx.fillRect(
        player.getPosition().x - selfPlayerPosition.x + ctx.canvas.width / 2,
        player.getPosition().y - selfPlayerPosition.y + ctx.canvas.height / 2,
        65,
        100
      );

      // ctx.drawImage(
      //   plrImage,
      //   player.getPosition().x - selfPlayerPosition.x + ctx.canvas.width / 2,
      //   player.getPosition().y - selfPlayerPosition.y + ctx.canvas.height / 2
      // );
    }

    ctx.fillStyle = (this.game.getSelfPlayer().getCharacterType() ?? CharacterType.RED).toString();
    ctx.fillRect(ctx.canvas.width / 2, ctx.canvas.height / 2, 65, 100);
    // handle event controls
    this.game.getSelfPlayer().checkPositionUpdate();
  }
}
