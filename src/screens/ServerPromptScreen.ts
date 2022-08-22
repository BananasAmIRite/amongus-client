import TextBox from '../attachments/TextBox';
import Text from '../attachments/Text';
import Screen from '../Screen';
import Amongus from '../Amongus';
import AmongusHomeScreen from './AmongusHomeScreen';

export default class ServerPromptScreen extends Screen {
  private serverTextBox!: TextBox;
  private usernameTextBox!: TextBox;

  public constructor(private game: Amongus) {
    super();
  }

  onAttach(elem: HTMLCanvasElement): void {
    const WIDTH = 400;
    const HEIGHT = 75;
    this.serverTextBox = new TextBox({
      position: { x: elem.width / 2 - WIDTH / 2, y: (3 * elem.height) / 8 - HEIGHT / 2 },
      width: WIDTH,
      height: HEIGHT,
      padding: 10,
      bgColor: 'lightgray',
      placeholder: 'Server ip',
      op: (server: string) => {
        if (this.usernameTextBox.getText() === '') return;
        this.game.attachScreen(new AmongusHomeScreen(this.game, server, this.usernameTextBox.getText()));
      },
    });
    this.usernameTextBox = new TextBox({
      position: { x: elem.width / 2 - WIDTH / 2, y: (5 * elem.height) / 8 - HEIGHT / 2 },
      width: WIDTH,
      height: HEIGHT,
      padding: 10,
      bgColor: 'lightgray',
      placeholder: 'Username',
      op: (name: string) => {
        if (this.usernameTextBox.getText() === '') return;
        this.game.attachScreen(new AmongusHomeScreen(this.game, this.serverTextBox.getText(), name));
      },
    });
    this.addAttachment(this.serverTextBox);
    // this.addAttachment(
    //   new Text({
    //     position: { x: (2 * elem.width) / 3 - WIDTH, y: elem.height / 2 - HEIGHT },
    //     maxWidth: WIDTH,
    //     maxHeight: HEIGHT,
    //     original: 'Connect to server: ',
    //     textAlign: 'center',
    //   })
    // );
    this.addAttachment(this.usernameTextBox);
    // this.addAttachment(
    //   new Text({
    //     position: { x: (2 * elem.width) / 3 - WIDTH, y: elem.height / 2 },
    //     maxWidth: WIDTH,
    //     maxHeight: HEIGHT,
    //     original: 'Username: ',
    //     textAlign: 'center',
    //   })
    // );
  }
  onRender(ctx: CanvasRenderingContext2D): void {}
  onDetach(elem: HTMLCanvasElement): void {}
}
