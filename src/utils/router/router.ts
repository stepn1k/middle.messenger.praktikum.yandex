import Route from './route';
import Block from '../../../core/block';

export default class Router {
  private static routerInstance: Router;

  private readonly routerOutletName: string;

  private routes: Route[] = [];

  private history: History;

  private currentRoute: Route;

  private notFoundRoute: Route;

  constructor(routerName: string) {
    if (Router.routerInstance) {
      return Router.routerInstance;
    }

    this.routerOutletName = routerName;
    this.routes = [];
    this.history = window.history;
    this.currentRoute = null;

    Router.routerInstance = this;
  }

  public use(pathname: string, blockBuilder: () => Block) {
    const route = new Route(pathname, blockBuilder, this.routerOutletName);
    this.routes.push(route);
    return this;
  }

  public useNotFound(pathname: string, blockBuilder: () => Block) {
    this.notFoundRoute = new Route(pathname, blockBuilder, this.routerOutletName);
    return this;
  }

  public start() {
    window.onpopstate = (event: PopStateEvent) => {
      if (event.currentTarget !== null) {
        const target = event.currentTarget as Window;
        this.onRoute(target.location.pathname);
      }
    };
    this.onRoute(window.location.pathname);
  }

  private onRoute(pathname: string) {
    this.currentRoute = this.getRoute(pathname);
    if (!this.currentRoute) {
      this.currentRoute = this.notFoundRoute;
    }
    this.currentRoute.render();
  }

  public go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this.onRoute(pathname);
  }

  public back() {
    window.history.back();
  }

  public forward() {
    window.history.forward();
  }

  private getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }

  public getCurrentPath(): string {
    return this.currentRoute.getPathName();
  }
}
