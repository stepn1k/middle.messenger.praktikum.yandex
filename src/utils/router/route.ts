import Block from '../../../core/block';

export default class Route {
  private pathname: string;

  private readonly block: Block;

  private readonly routerOutletName: string;

  constructor(pathname: string, view: Block, routerOutletName: string) {
    this.pathname = pathname;
    this.block = view;
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
    routerOutlet.appendChild(this.block.render());
  }

  public getPathName(): string {
    return this.pathname;
  }
}
