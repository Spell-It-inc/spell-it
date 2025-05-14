export {}

declare global {
  interface Window {
    __ENV__: any
  }
}

export interface Component {
  render(container: HTMLElement): void
}
