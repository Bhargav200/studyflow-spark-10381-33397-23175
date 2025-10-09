
import React, { useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import HoverGradientNavBar from '../components/ui/hover-gradient-nav-bar';
import Hero from '../components/Hero';
import AnimatedBackground from '../components/AnimatedBackground';
import logo from '@/assets/logo.png';

// Lazy load heavy sections
const ToolsSection = lazy(() => import('../components/ToolsSection'));
const FeaturesSection = lazy(() => import('../components/FeaturesSection'));
const TestimonialSection = lazy(() => import('../components/TestimonialSection'));
const CTASection = lazy(() => import('../components/CTASection'));
const Footer = lazy(() => import('../components/Footer'));

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative">
      <AnimatedBackground />
      
      {/* Logo - Top Left with optimized loading */}
      <Link to="/" className="fixed top-4 left-4 md:top-6 md:left-8 z-50 group">
        <img 
          src={logo} 
          alt="StudyOrbit Logo" 
          className="h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 object-contain transition-all duration-300 group-hover:scale-110 drop-shadow-lg"
          loading="eager"
          fetchPriority="high"
        />
      </Link>
      
      <HoverGradientNavBar />
      <main className="flex-grow">
        <Hero />
        <Suspense fallback={<div className="min-h-screen" />}>
          <ToolsSection />
          <FeaturesSection />
          <TestimonialSection />
          <CTASection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
