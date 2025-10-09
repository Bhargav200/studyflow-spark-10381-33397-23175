
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HoverGradientNavBar from '../components/ui/hover-gradient-nav-bar';
import Hero from '../components/Hero';
import ToolsSection from '../components/ToolsSection';
import FeaturesSection from '../components/FeaturesSection';
import TestimonialSection from '../components/TestimonialSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import logo from '@/assets/logo.png';

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative">
      <AnimatedBackground />
      
      {/* Logo - Top Left */}
      <Link to="/" className="fixed top-4 left-4 md:top-6 md:left-8 z-50 group">
        <img 
          src={logo} 
          alt="StudyOrbit Logo" 
          className="h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 object-contain transition-all duration-300 group-hover:scale-110 drop-shadow-lg"
        />
      </Link>
      
      <HoverGradientNavBar />
      <main className="flex-grow">
        <Hero />
        <ToolsSection />
        <FeaturesSection />
        <TestimonialSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
