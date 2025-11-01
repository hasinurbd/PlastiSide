import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import NotFound from "./pages/NotFound";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const AdminRegister = lazy(() => import("./pages/AdminRegister"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const SubmitPlastic = lazy(() => import("./pages/SubmitPlastic"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

const queryClient = new QueryClient();

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-light-grey">
    <div className="text-center">
      <div className="animate-spin h-12 w-12 border-4 border-eco-green border-t-transparent rounded-full mx-auto"></div>
      <p className="mt-4 text-dark-charcoal">Loading...</p>
    </div>
  </div>
);

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-grey">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-eco-green border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-dark-charcoal">Loading...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Admin protected route
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-grey">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-eco-green border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-dark-charcoal">Loading...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated && user?.role === "admin" ? (
    <>{children}</>
  ) : (
    <Navigate to="/" replace />
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Suspense fallback={<LoadingFallback />}><Index /></Suspense>} />
            <Route path="/login" element={<Suspense fallback={<LoadingFallback />}><Login /></Suspense>} />
            <Route path="/register" element={<Suspense fallback={<LoadingFallback />}><Register /></Suspense>} />
            <Route path="/admin-register" element={<Suspense fallback={<LoadingFallback />}><AdminRegister /></Suspense>} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/submit"
              element={
                <ProtectedRoute>
                  <SubmitPlastic />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
