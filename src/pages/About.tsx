import React, { useEffect } from 'react';
import HoverGradientNavBar from '../components/ui/hover-gradient-nav-bar';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sparkles, Target, Trophy, Rocket, Brain, CheckCircle2, Mail, FileText, MessageSquare, BookText, FileCheck, Edit } from 'lucide-react';
const About = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const tools = [{
    icon: <Mail className="w-6 h-6" />,
    name: 'AI Cold Email Generator',
    description: 'Craft personalized, professional emails that get responses'
  }, {
    icon: <FileText className="w-6 h-6" />,
    name: 'ATS-Friendly Resume Generator',
    description: 'Create resumes optimized for Applicant Tracking Systems'
  }, {
    icon: <BookText className="w-6 h-6" />,
    name: 'Project Documentation Generator',
    description: 'Generate comprehensive project documentation from code'
  }, {
    icon: <FileCheck className="w-6 h-6" />,
    name: 'ATS Resume Scorer',
    description: 'Get instant feedback on your resume with ATS compatibility scoring'
  }, {
    icon: <MessageSquare className="w-6 h-6" />,
    name: 'AI Interview Questions Generator',
    description: 'Practice with role-specific interview questions'
  }, {
    icon: <Edit className="w-6 h-6" />,
    name: 'SOP & Recommendation Letter Generator',
    description: 'Craft compelling statements tailored to your goals'
  }];
  const howItHelps = [{
    icon: <Trophy className="w-8 h-8 text-emerald-500" />,
    title: 'Stand Out from the Crowd',
    description: 'Create professional, polished career materials that showcase your unique strengths and make you memorable to recruiters and admissions officers.'
  }, {
    icon: <Target className="w-8 h-8 text-emerald-500" />,
    title: 'Achieve Your Career Goals',
    description: 'Whether you\'re applying for internships, jobs, or graduate programs, our tools help you present your best self and increase your chances of success.'
  }, {
    icon: <Rocket className="w-8 h-8 text-emerald-500" />,
    title: 'Save Time, Focus on What Matters',
    description: 'Spend less time struggling with formatting and wording, and more time on your studies, projects, and skill development.'
  }, {
    icon: <Brain className="w-8 h-8 text-emerald-500" />,
    title: 'Learn as You Create',
    description: 'Our AI tools don\'t just generate content—they help you understand what makes effective career communication, improving your skills over time.'
  }];
  const successSteps = [{
    step: '1',
    title: 'Choose Your Tool',
    description: 'Select from our suite of specialized AI tools based on your current need—resume building, email writing, interview prep, or documentation.'
  }, {
    step: '2',
    title: 'Provide Your Information',
    description: 'Input your details, experiences, and preferences. Our AI understands context and tailors outputs to your unique situation.'
  }, {
    step: '3',
    title: 'Get AI-Powered Results',
    description: 'Receive professionally crafted content in seconds, optimized for your industry, role, and goals with built-in best practices.'
  }, {
    step: '4',
    title: 'Refine and Succeed',
    description: 'Review suggestions, make adjustments, and use the final output to advance your career. Track your progress over time.'
  }];
  return <div className="flex flex-col min-h-screen relative">
      <AnimatedBackground />
      <HoverGradientNavBar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
                <Sparkles size={18} className="mr-2" />
                <span>About StudyOrbit</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Your AI-Powered Career <span className="text-gradient">Success Platform</span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
                StudyOrbit is an all-in-one platform that empowers students with cutting-edge AI tools to accelerate their academic and professional journey. 
                From crafting perfect resumes to preparing for interviews, we provide everything you need to stand out and succeed.
              </p>
            </div>
          </div>
        </section>

        {/* What Is StudyOrbit Section */}
        <section className="py-16 bg-secondary/30 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">What is <span className="text-gradient">StudyOrbit</span>?</h2>
              <div className="glass-card p-8 rounded-xl">
                <p className="text-white/80 text-lg leading-relaxed mb-4">
                  StudyOrbit is a comprehensive AI-powered platform designed specifically for students who want to excel in their career development. 
                  We understand the challenges students face—from creating standout resumes to preparing for competitive interviews and crafting compelling applications.
                </p>
                <p className="text-white/80 text-lg leading-relaxed">
                  Our mission is simple: democratize access to professional-grade career tools that were once only available through expensive career coaches and consultants. 
                  With StudyOrbit, every student can access world-class AI assistance to build their professional presence, regardless of their background or resources.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Available Tools Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our <span className="text-gradient">AI-Powered Tools</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool, index) => <div key={index} className="glass-card p-6 rounded-xl hover:border-emerald-500/30 transition-all duration-300">
                    <div className="bg-emerald-500/10 p-3 rounded-lg w-max mb-4 text-emerald-400">
                      {tool.icon}
                    </div>
                    <h3 className="font-semibold mb-2">{tool.name}</h3>
                    <p className="text-white/70 text-sm">{tool.description}</p>
                  </div>)}
              </div>
            </div>
          </div>
        </section>

        {/* How It Helps Section */}
        <section className="py-16 bg-secondary/30 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">How StudyOrbit <span className="text-gradient">Helps You Succeed</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {howItHelps.map((item, index) => <div key={index} className="glass-card p-6 rounded-xl">
                    <div className="mb-4">{item.icon}</div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-white/70">{item.description}</p>
                  </div>)}
              </div>
            </div>
          </div>
        </section>

        {/* Steps to Success Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Your Path to <span className="text-gradient">Success</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {successSteps.map((item, index) => <div key={index} className="glass-card p-6 rounded-xl text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-2xl font-bold">
                      {item.step}
                    </div>
                    <h3 className="font-semibold mb-3">{item.title}</h3>
                    <p className="text-white/70 text-sm">{item.description}</p>
                  </div>)}
              </div>
            </div>
          </div>
        </section>

        {/* Merit & Achievement Section */}
        <section className="py-16 bg-secondary/30 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="glass-card p-8 rounded-xl bg-gradient-to-br from-emerald-900/20 to-background">
                <div className="text-center mb-6">
                  <Trophy className="w-12 h-12 mx-auto mb-4 text-emerald-400" />
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Building Your <span className="text-gradient">Merit & Excellence</span></h2>
                </div>
                <div className="space-y-4 max-w-3xl mx-auto">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-white/80 font-medium mb-1">Competitive Edge in Applications</p>
                      <p className="text-white/70 text-sm">Stand out in scholarship applications, internship programs, and graduate school admissions with professionally crafted materials.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-white/80 font-medium mb-1">Higher Success Rates</p>
                      <p className="text-white/70 text-sm">Our ATS-optimized resumes and tailored application materials significantly increase your chances of getting interviews and offers.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-white/80 font-medium mb-1">Confidence in Communication</p>
                      <p className="text-white/70 text-sm">Master the art of professional communication through AI-guided email writing and interview preparation, building skills that last a lifetime.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-white/80 font-medium mb-1">Track Your Growth</p>
                      <p className="text-white/70 text-sm">Monitor your progress, see improvements in your materials over time, and build a portfolio of accomplishments that demonstrate your merit.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Encouraging Message */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center">
              <div className="inline-block glass-card p-8 rounded-xl max-w-3xl">
                <Rocket className="w-12 h-12 mx-auto mb-4 text-emerald-400" />
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to <span className="text-gradient">Launch Your Career</span>?</h2>
                <p className="text-white/80 text-lg mb-6">
                  Join thousands of students who are already using StudyOrbit to transform their career prospects. 
                  Every great journey starts with a single step—take yours today and discover how our AI tools can help you achieve your dreams.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link to="/tools">
                    <Button size="lg" className="button-gradient">
                      Explore AI Tools
                    </Button>
                  </Link>
                  <Link to="/contact">
                    
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
};
export default About;