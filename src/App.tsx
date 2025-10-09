
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Tools from "./pages/Tools";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";

import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

// Tool pages
import EmailGeneratorTool from "./pages/tools/EmailGeneratorTool";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
