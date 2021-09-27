import Block from '../../../core/block';

export default class Route {
  private pathname: string;

  private readonly blockBuilder: () => Block;

  private readonly routerOutletName: string;

  constructor(pathname: string, blockBuilder: () => Block, routerOutletName: string) {
    this.pathname = pathname;
    this.blockBuilder = blockBuilder;
    this.routerOutletName = routerOutletName;
  }

  public navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  public match(pathname: string) {
    return pathname === this.pathname;
  }

  public render() {
    const routerOutlet = document.querySelector(`[data-router-outlet='${this.routerOutletName}']`);
    routerOutlet.innerHTML = '';
    const block = this.blockBuilder();
    routerOutlet.appendChild(block.render());
  }

  public getPathName(): string {
    return this.pathname;
  }
}
