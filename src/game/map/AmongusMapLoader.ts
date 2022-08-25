export enum MapLoaderStatus {
  IDLE,
  LOADING,
}

export default class AmongusMapLoader {
  private map?: HTMLImageElement;
  private status: MapLoaderStatus = MapLoaderStatus.IDLE;
  public constructor() {}

  public setMap(map: string): Promise<void>;
  public setMap(map: HTMLImageElement): void;
  public setMap(map: HTMLImageElement | string): void | Promise<void> {
    // if its an HTMLImageElement, assume its already been loaded
    if (typeof map === 'string') {
      const elem = document.createElement('img');
      return new Promise((resolve) => {
        this.status = MapLoaderStatus.LOADING;
        elem.onload = () => {
          this.map = elem;
          this.status = MapLoaderStatus.IDLE;
          resolve();
        };
        elem.src = map;
      });
    }

    this.map = map;
  }

  public getMap() {
    return this.map ?? document.createElement('img');
  }
}
