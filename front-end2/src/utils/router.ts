import type { Component } from "./types"

export class Router {
  private routes: Map<string, Component>
  private container: HTMLElement | null
  private defaultComponent: Component | null

  constructor(containerId: string) {
    this.routes = new Map()
    this.container = document.getElementById(containerId)

    // Handle browser back/forward buttons
    window.addEventListener("popstate", (e) => {
      if (e.state?.route) {
        this.renderComponent(e.state.route)
      }
    })

    window.addEventListener("DOMContentLoaded", () => {
      this.checkRouting()
    })

    window.addEventListener("hashchange", () => {
      this.checkRouting()
    })
  }

  private checkRouting(): void {
    if (window.location.hash) {
      const route = window.location.hash.substring(1);
      this.navigateTo(route)
    } else {
      if (this.defaultComponent) {
        this.container.innerHTML = ``
        this.defaultComponent.render(this.container)
        window.history.replaceState({}, document.title, window.location.pathname);
      } else {
        this.container.innerHTML = `No Page Set `
      }
    }
  }

  public addRoute(route: string, component: Component): void {
    this.routes.set(route, component)
  }

  public hasRoute(route: string): boolean {
    return this.routes.has(route)
  }

  public addDefault(component: Component): void {
    this.defaultComponent = component
  }

  public navigateTo(route: string): void {
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
