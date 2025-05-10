// index.ts

type Route = {
    path: string;
    view: () => string;
  };
  
  const routes: Route[] = [
    { path: "/", view: () => "<h1>Home Page</h1>" },
    { path: "/about", view: () => "<h1>About Page</h1>" },
    { path: "/contact", view: () => "<h1>Contact Page</h1>" },
  ];
  
  const navigateTo = (url: string) => {
    history.pushState(null, "", url);
    render();
  };
  
  const render = () => {
    const path = window.location.pathname;
    const route = routes.find(r => r.path === path);
    const content = route ? route.view() : "<h1>404 - Not Found</h1>";
    document.getElementById("app")!.innerHTML = content;
  };
  
  // Intercept link clicks
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo((target as HTMLAnchorElement).href);
    }
  });
  
  // Handle browser back/forward
  window.addEventListener("popstate", render);
  
  // Initial render
  window.addEventListener("DOMContentLoaded", render);
  