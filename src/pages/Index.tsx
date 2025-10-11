
import React, { lazy, Suspense } from 'react';
import HoverGradientNavBar from '../components/ui/hover-gradient-nav-bar';
import Hero from '../components/Hero';
import AnimatedBackground from '../components/AnimatedBackground';

// Lazy load heavy sections
const ToolsSection = lazy(() => import('../components/ToolsSection'));
const FeaturesSection = lazy(() => import('../components/FeaturesSection'));
const TestimonialSection = lazy(() => import('../components/TestimonialSection'));
const CTASection = lazy(() => import('../components/CTASection'));
const Footer = lazy(() => import('../components/Footer'));

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen relative" style={{ willChange: 'transform' }}>
      <AnimatedBackground />
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
