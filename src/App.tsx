import React, { Suspense } from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import SettingsDialogWrapper from "@/components/ui/settings-dialog-wrapper";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useAuth, AuthProvider } from "../supabase/auth";
import routes from "tempo-routes";

import Home from "./components/pages/home";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import Dashboard from "./components/pages/dashboard";
import Agents from "./components/pages/agents";
import SubscriptionPage from "./components/pages/subscription";
import CheckoutPage from "./components/pages/checkout";
import HelpPage from "./components/pages/help";
import ChartAnalyzerPage from "./components/chart-analyzer/ChartAnalyzerPage";
import ChartAnalysisAdminPage from "./components/pages/chart-analysis-admin";
import Success from "./components/pages/success";
import Signals from "./components/pages/signals";
import SocialTrading from "./components/pages/social-trading";
import RedFlagAI from "./components/pages/red-flag-ai";
import BrokerRadarPage from "./components/pages/broker-radar";

function LoadingScreen({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-gray-500">{text}</p>
    </div>
  );
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen text="Authenticating..." />;
  }

  // Temporarily allowing access without authentication
  return <>{children}</>;
}

function AppRoutes() {
  // Create Tempo routes element if in Tempo environment
  const tempoRoutes =
    import.meta.env.VITE_TEMPO === "true" ? useRoutes(routes) : null;

  return (
    <>
      {tempoRoutes}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/agents"
          element={
            <PrivateRoute>
              <Agents />
            </PrivateRoute>
          }
        />
        <Route
          path="/insights"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/news"
          element={
            <PrivateRoute>
              <Suspense
                fallback={<LoadingScreen text="Loading news feed..." />}
              >
                {React.createElement(
                  React.lazy(() => import("./components/pages/news-feed")),
                )}
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/alerts"
          element={
            <PrivateRoute>
              <Suspense
                fallback={<LoadingScreen text="Loading AI alerts..." />}
              >
                {React.createElement(
                  React.lazy(() => import("./components/pages/alerts")),
                )}
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/advisor"
          element={
            <PrivateRoute>
              <Suspense fallback={<LoadingScreen text="Loading advisor..." />}>
                {React.createElement(
                  React.lazy(
                    () => import("./components/pages/personal-advisor"),
                  ),
                )}
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/advisor"
          element={
            <PrivateRoute>
              <Suspense
                fallback={<LoadingScreen text="Loading admin interface..." />}
              >
                {React.createElement(
                  React.lazy(() => import("./components/pages/admin-advisor")),
                )}
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/subscription"
          element={
            <PrivateRoute>
              <SubscriptionPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <CheckoutPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/help"
          element={
            <PrivateRoute>
              <HelpPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/sectors/:sectorId"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/chart-analyzer"
          element={
            <PrivateRoute>
              <ChartAnalyzerPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/chart-analysis-admin"
          element={
            <PrivateRoute>
              <ChartAnalysisAdminPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/signals"
          element={
            <PrivateRoute>
              <Signals />
            </PrivateRoute>
          }
        />
        <Route
          path="/social-trading"
          element={
            <PrivateRoute>
              <SocialTrading />
            </PrivateRoute>
          }
        />
        <Route
          path="/broker-radar"
          element={
            <PrivateRoute>
              <BrokerRadarPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/risk-assessment"
          element={
            <PrivateRoute>
              <Suspense
                fallback={<LoadingScreen text="Loading risk assessment..." />}
              >
                {React.createElement(
                  React.lazy(
                    () => import("./components/pages/risk-assessment-ai"),
                  ),
                )}
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/crypto-map"
          element={
            <PrivateRoute>
              <Suspense
                fallback={<LoadingScreen text="Loading crypto map..." />}
              >
                {React.createElement(
                  React.lazy(
                    () => import("./components/pages/crypto-world-map"),
                  ),
                )}
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/red-flag-ai"
          element={
            <PrivateRoute>
              <RedFlagAI />
            </PrivateRoute>
          }
        />
        <Route
          path="/tax-tracker"
          element={
            <PrivateRoute>
              <Suspense
                fallback={<LoadingScreen text="Loading tax tracker..." />}
              >
                {React.createElement(
                  React.lazy(() => import("./components/pages/tax-tracker")),
                )}
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/market-correlation"
          element={
            <PrivateRoute>
              <Suspense
                fallback={
                  <LoadingScreen text="Loading market correlation..." />
                }
              >
                {React.createElement(
                  React.lazy(
                    () => import("./components/pages/market-correlation"),
                  ),
                )}
              </Suspense>
            </PrivateRoute>
          }
        />

        <Route path="/success" element={<Success />} />
        {/* Add a catch-all route for Tempo storybooks */}
        {import.meta.env.VITE_TEMPO === "true" && <Route path="/tempobook/*" />}
      </Routes>
    </>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="marketmind-theme">
      <AuthProvider>
        <Suspense fallback={<LoadingScreen text="Loading application..." />}>
          <AppRoutes />
          <Toaster />
          <SettingsDialogWrapper />
        </Suspense>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
