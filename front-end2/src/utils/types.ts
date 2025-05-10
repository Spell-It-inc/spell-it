export {}

declare global {
  interface Window {
    handleCredentialResponse: (response: any) => void;
  }
}

export interface Component {
  render(container: HTMLElement): void
}