import { RootRoute, Route, Router } from "@tanstack/react-router";
import { Index } from "./pages";
import App from "./App";
import { Browse } from "./pages/browse";

const rootRoute = new RootRoute({
  component: App,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Index,
});
const browseRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/browse",
  component: Browse,
});

const routeTree = rootRoute.addChildren([indexRoute, browseRoute]);

export const router = new Router({ routeTree });

// needed for maximum type safety
declare module "@tanstack/router" {
  interface Register {
    router: typeof router;
  }
}
