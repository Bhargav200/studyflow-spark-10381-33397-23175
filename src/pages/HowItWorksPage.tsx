import React from 'react';
import HoverGradientNavBar from '../components/ui/hover-gradient-nav-bar';
import HowItWorks from '../components/HowItWorks';
import Footer from '../components/Footer';

const HowItWorksPage = () => {
  return (
    <div className="flex flex-col min-h-screen relative bg-background">
      <HoverGradientNavBar />
      <main className="flex-grow pt-20">
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
