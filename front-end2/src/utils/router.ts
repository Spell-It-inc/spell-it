import type { Component } from "./types";

type RouteHandler =
  | Component
  | {
      render: (container: HTMLElement, param?: string) => void;
    };

export class Router {
  private routes: Map<string, Component>;
  private container: HTMLElement | null;
  private history: string[] = [];
  private currentIndex: number = -1;

  constructor(containerId: string) {
    this.routes = new Map();
    this.container = document.getElementById(containerId);

    // Handle browser back/forward buttons
    window.addEventListener("popstate", (e) => {
      if (e.state?.route) {
        this.renderComponent(e.state.route);
      }
    });
  }

  public addRoute(route: string, handler: RouteHandler): void {
    this.routes.set(route, handler);
  }

  public hasRoute(route: string): boolean {
    return this.routes.has(route);
  }

  public navigateTo(fullRoute: string): void {
    const [routeName, param] = fullRoute.split("/");
    const handler = this.routes.get(routeName);

    if (!handler) {
      console.error(`Route "${routeName}" not found`);
      return;
    }

    // Add to history
    this.history = this.history.slice(0, this.currentIndex + 1);
    this.history.push(fullRoute);
    this.currentIndex++;

    // Update URL
    window.history.pushState({ route: fullRoute }, "", `#${fullRoute}`);
    this.renderComponent(routeName, param);
  }

  public goBack(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      const previousRoute = this.history[this.currentIndex];
      const [routeName, param] = previousRoute.split("/");
      window.history.pushState(
        { route: previousRoute },
        "",
        `#${previousRoute}`
      );
      this.renderComponent(routeName, param);
    }
  }

  public canGoBack(): boolean {
    return this.currentIndex > 0;
  }

  private renderComponent(routeName: string, param?: string): void {
    if (!this.container) {
      console.error("Container element not found");
      return;
    }

    const handler = this.routes.get(routeName);
    if (!handler) return;

    this.container.innerHTML = "";

    if (typeof handler.render === "function") {
      handler.render(this.container, param);
    } else {
      handler.render(this.container);
    }
  }
}
