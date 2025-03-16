import { apiRoutes } from "./routes";

// Setup API route handling
export function setupApiRoutes() {
  // Intercept fetch requests to handle API routes
  const originalFetch = window.fetch;

  window.fetch = async function (input: RequestInfo | URL, init?: RequestInit) {
    const url = input instanceof Request ? input.url : input.toString();

    // Check if this is one of our API routes
    for (const [route, handler] of Object.entries(apiRoutes)) {
      if (url.includes(route)) {
        const request =
          input instanceof Request ? input : new Request(url, init);
        return handler(request);
      }
    }

    // If not an API route, use the original fetch
    return originalFetch(input, init);
  };

  console.log("API routes setup complete");
}
