import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SparklesText } from '@/components/ui/sparkles-text';
import Aurora from '@/components/Aurora';
const Hero = () => {
  return <section className="min-h-screen flex items-center justify-center pt-24 md:pt-32 pb-10 px-4 relative overflow-hidden">
      <Aurora colorStops={['#10b981', '#34d399', '#059669']} amplitude={1.5} blend={0.6} speed={0.8} className="opacity-50" />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs md:text-sm font-medium mb-6 md:mb-8 animate-fade-in">
            <Sparkles size={16} className="mr-1.5 md:mr-2" />
            <span>Introducing StudyOrbit for Students</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6 animate-slide-up px-2" style={{
          animationDelay: '0.2s'
        }}>
            All your AI tools, <span className="text-gradient">in one intelligent orbit</span>
          </h1>
          
          <SparklesText className="block">
            <p className="text-base md:text-xl text-white/80 mb-8 md:mb-10 max-w-3xl mx-auto animate-slide-up px-2" style={{
            animationDelay: '0.4s'
          }}>
              Boost your career prospects with our suite of AI tools designed specifically for students. 
              Create professional emails, ATS resumes, and practice with tailored interview questions.
            </p>
          </SparklesText>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 animate-slide-up px-4" style={{
          animationDelay: '0.6s'
        }}>
            <Link to="/register" className="w-full sm:w-auto">
              
            </Link>
            <Link to="/tools" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-medium border-white/20 bg-white/5 hover:bg-white/10 w-full sm:w-auto">
                Explore Tools
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0 animate-slide-up" style={{
          animationDelay: '0.8s'
        }}>
          <div className="flex -space-x-3 md:-space-x-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-emerald-500/20 border-2 border-background" />
            ))}
          </div>
            <div className="sm:ml-4 text-xs md:text-sm text-white/70 text-center sm:text-left">
              <span className="font-semibold text-white">500+</span> students already using our tools
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;