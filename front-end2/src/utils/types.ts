export {}

declare global {
  interface Window {
    handleCredentialResponse: (response: any) => void;
    google: any; 
  }
}

export interface Component {
  render(container: HTMLElement): void
}
