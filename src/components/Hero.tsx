import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SparklesText } from '@/components/ui/sparkles-text';
import Aurora from '@/components/Aurora';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-32 pb-10 relative overflow-hidden">
      <Aurora
        colorStops={['#10b981', '#34d399', '#059669']}
        amplitude={1.5}
        blend={0.6}
        speed={0.8}
        className="opacity-50"
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8 animate-fade-in">
            <Sparkles size={18} className="mr-2" />
            <span>Introducing StudyOrbit for Students</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            All your AI tools, <span className="text-gradient">in one intelligent orbit</span>
          </h1>
          
          <SparklesText className="block">
            <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
              Boost your career prospects with our suite of AI tools designed specifically for students. 
              Create professional emails, ATS resumes, and practice with tailored interview questions.
            </p>
          </SparklesText>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <Link to="/register">
              <Button size="lg" className="button-gradient h-14 px-8 text-lg font-medium">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/tools">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-medium border-white/20 bg-white/5 hover:bg-white/10">
                Explore Tools
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 flex items-center justify-center animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-xs font-medium border-2 border-background">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div className="ml-4 text-sm text-white/70">
              <span className="font-semibold text-white">500+</span> students already using our tools
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
