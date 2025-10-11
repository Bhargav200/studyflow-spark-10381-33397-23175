
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LenisProvider } from "./contexts/LenisContext";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import Logo from "./components/Logo";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";

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
    <span className="loader"></span>
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
          <LenisProvider>
            <Logo />
            <ScrollToTop />
            <Suspense fallback={<PageLoader />}>
              <Routes>
              {/* Public routes */}
              <Route path="/" element={<PageTransition><Index /></PageTransition>} />
              <Route path="/tools" element={<PageTransition><Tools /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            
            
              {/* Auth routes - accessible only when NOT authenticated */}
              <Route 
                path="/login" 
                element={
                  <PageTransition>
                    <ProtectedRoute requiresAuth={false} redirectTo="/dashboard">
                      <Login />
                    </ProtectedRoute>
                  </PageTransition>
                } 
              />
              <Route 
                path="/register" 
                element={
                  <PageTransition>
                    <ProtectedRoute requiresAuth={false} redirectTo="/dashboard">
                      <Register />
                    </ProtectedRoute>
                  </PageTransition>
                } 
              />
            
              {/* Protected routes - require authentication */}
              <Route 
                path="/dashboard" 
                element={
                  <PageTransition>
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  </PageTransition>
                } 
              />
            
              {/* Tool routes - all protected */}
              <Route 
                path="/tools/email-generator" 
                element={
                  <PageTransition>
                    <ProtectedRoute>
                      <EmailGeneratorTool />
                    </ProtectedRoute>
                  </PageTransition>
                } 
              />
              <Route path="/tools/resume-generator" element={<PageTransition><NotFound /></PageTransition>} />
              <Route path="/tools/project-documentation" element={<PageTransition><NotFound /></PageTransition>} />
              <Route path="/tools/resume-scorer" element={<PageTransition><NotFound /></PageTransition>} />
              <Route path="/tools/interview-questions" element={<PageTransition><NotFound /></PageTransition>} />
              <Route path="/tools/sop-letter-generator" element={<PageTransition><NotFound /></PageTransition>} />
              
              {/* Catch all */}
              <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
            </Routes>
            </Suspense>
          </LenisProvider>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
