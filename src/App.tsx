
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LenisProvider } from "./contexts/LenisContext";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

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
const ResumeGeneratorTool = lazy(() => import("./pages/tools/ResumeGeneratorTool"));
const ProjectDocumentationTool = lazy(() => import("./pages/tools/ProjectDocumentationTool"));
const ResumeScorerTool = lazy(() => import("./pages/tools/ResumeScorerTool"));
const InterviewQuestionsTool = lazy(() => import("./pages/tools/InterviewQuestionsTool"));
const SOPLetterGeneratorTool = lazy(() => import("./pages/tools/SOPLetterGeneratorTool"));
const HowItWorksPage = lazy(() => import("./pages/HowItWorksPage"));

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
            <Link to="/" className="fixed top-4 left-4 z-50 group">
              <img 
                src={logo} 
                alt="StudyOrbit Logo" 
                className="h-20 w-auto md:h-24 lg:h-32 object-contain transition-all duration-300 group-hover:scale-110 drop-shadow-lg rounded-lg"
                loading="eager"
              />
            </Link>
            <ScrollToTop />
            <Suspense fallback={<PageLoader />}>
              <Routes>
              {/* Public routes */}
              <Route path="/" element={<PageTransition><Index /></PageTransition>} />
              <Route path="/tools" element={<PageTransition><Tools /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
              <Route path="/how-it-works" element={<PageTransition><HowItWorksPage /></PageTransition>} />
            
            
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
            
              {/* Tool routes - Protected */}
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
              <Route 
                path="/tools/resume-generator" 
                element={
                  <PageTransition>
                    <ProtectedRoute>
                      <ResumeGeneratorTool />
                    </ProtectedRoute>
                  </PageTransition>
                } 
              />
              <Route 
                path="/tools/project-documentation" 
                element={
                  <PageTransition>
                    <ProtectedRoute>
                      <ProjectDocumentationTool />
                    </ProtectedRoute>
                  </PageTransition>
                } 
              />
              <Route 
                path="/tools/resume-scorer" 
                element={
                  <PageTransition>
                    <ProtectedRoute>
                      <ResumeScorerTool />
                    </ProtectedRoute>
                  </PageTransition>
                } 
              />
              <Route 
                path="/tools/interview-questions" 
                element={
                  <PageTransition>
                    <ProtectedRoute>
                      <InterviewQuestionsTool />
                    </ProtectedRoute>
                  </PageTransition>
                } 
              />
              <Route 
                path="/tools/sop-letter-generator" 
                element={
                  <PageTransition>
                    <ProtectedRoute>
                      <SOPLetterGeneratorTool />
                    </ProtectedRoute>
                  </PageTransition>
                } 
              />
              
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
