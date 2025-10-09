
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy load all pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Tools = lazy(() => import("./pages/Tools"));
const About = lazy(() => import("./pages/About"));
const Careers = lazy(() => import("./pages/Careers"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const EmailGeneratorTool = lazy(() => import("./pages/tools/EmailGeneratorTool"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            
            
            {/* Auth routes - accessible only when NOT authenticated */}
            <Route 
              path="/login" 
              element={
                <ProtectedRoute requiresAuth={false} redirectTo="/dashboard">
                  <Login />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <ProtectedRoute requiresAuth={false} redirectTo="/dashboard">
                  <Register />
                </ProtectedRoute>
              } 
            />
            
            {/* Protected routes - require authentication */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Tool routes - all protected */}
            <Route 
              path="/tools/email-generator" 
              element={
                <ProtectedRoute>
                  <EmailGeneratorTool />
                </ProtectedRoute>
              } 
            />
            <Route path="/tools/resume-generator" element={<NotFound />} />
            <Route path="/tools/project-documentation" element={<NotFound />} />
            <Route path="/tools/resume-scorer" element={<NotFound />} />
            <Route path="/tools/interview-questions" element={<NotFound />} />
            <Route path="/tools/sop-letter-generator" element={<NotFound />} />
            
            {/* Catch all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
