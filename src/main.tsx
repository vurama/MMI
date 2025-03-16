import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
// Import the dev tools and initialize them
import { TempoDevtools } from "tempo-devtools";
import { setupApiRoutes } from "./api/setup";

TempoDevtools.init();

// Setup API routes
setupApiRoutes();

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
