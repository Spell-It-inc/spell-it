import type { Component } from "./types"

export class Router {
  private routes: Map<string, Component>
  private container: HTMLElement | null

  constructor(containerId: string) {
    this.routes = new Map()
    this.container = document.getElementById(containerId)

    // Handle browser back/forward buttons
    window.addEventListener("popstate", (e) => {
      if (e.state?.route) {
        this.renderComponent(e.state.route)
      }
    })
  }

  public addRoute(route: string, component: Component): void {
    this.routes.set(route, component)
  }

  public hasRoute(route: string): boolean {
    return this.routes.has(route)
  }

  public navigateTo(route: string): void {
    if(route.startsWith('category/')){
      this.renderComponent('category');
      
      return;
    }
    if (!this.routes.has(route)) {
      console.error(`Route "${route}" not found`)
      return
    }

    // Update browser history
    window.history.pushState({ route }, "", `#${route}`)
    this.renderComponent(route)
  }

  private renderComponent(route: string): void {
    if (!this.container) {
      console.error("Container element not found")
      return
    }

    const component = this.routes.get(route)
    if (component) {
      // Clear the container
      this.container.innerHTML = ""

      // Render the component
      component.render(this.container)
    }
  }
}
