export default class AmongusMapLoader {
  private map?: HTMLImageElement;
  public constructor() {}

  public setMap(map: string): Promise<void>;
  public setMap(map: HTMLImageElement): void;
  public setMap(map: HTMLImageElement | string): void | Promise<void> {
    // if its an HTMLImageElement, assume its already been loaded
    if (typeof map === 'string') {
      const elem = new HTMLImageElement();
      return new Promise((resolve) => {
        elem.onload = () => {
          this.map = elem;
        };
        elem.src = map;
      });
    }

    this.map = map;
  }

  public getMap() {
    return this.map ?? new HTMLImageElement();
  }
}
