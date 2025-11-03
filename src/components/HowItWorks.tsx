import React from 'react';
import { 
  Sparkles, 
  Target, 
  Trophy, 
  Rocket, 
  Brain, 
  CheckCircle2,
  Mail,
  FileText,
  MessageSquare,
  BookText,
  FileCheck,
  Edit
} from 'lucide-react';

const HowItWorks = () => {
  const tools = [
    {
      icon: <Mail className="w-6 h-6" />,
      name: 'AI Cold Email Generator',
      description: 'Craft personalized, professional emails that get responses'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      name: 'ATS-Friendly Resume Generator',
      description: 'Create resumes optimized for Applicant Tracking Systems'
    },
    {
      icon: <BookText className="w-6 h-6" />,
      name: 'Project Documentation Generator',
      description: 'Generate comprehensive project documentation from code'
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      name: 'ATS Resume Scorer',
      description: 'Get instant feedback on your resume with ATS compatibility scoring'
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      name: 'AI Interview Questions Generator',
      description: 'Practice with role-specific interview questions'
    },
    {
      icon: <Edit className="w-6 h-6" />,
      name: 'SOP & Recommendation Letter Generator',
      description: 'Craft compelling statements tailored to your goals'
    }
  ];

  const howItHelps = [
    {
      icon: <Trophy className="w-8 h-8 text-emerald-500" />,
      title: 'Stand Out from the Crowd',
      description: 'Create professional, polished career materials that showcase your unique strengths and make you memorable to recruiters and admissions officers.'
    },
    {
      icon: <Target className="w-8 h-8 text-emerald-500" />,
      title: 'Achieve Your Career Goals',
      description: 'Whether you\'re applying for internships, jobs, or graduate programs, our tools help you present your best self and increase your chances of success.'
    },
    {
      icon: <Rocket className="w-8 h-8 text-emerald-500" />,
      title: 'Save Time, Focus on What Matters',
      description: 'Spend less time struggling with formatting and wording, and more time on your studies, projects, and skill development.'
    },
    {
      icon: <Brain className="w-8 h-8 text-emerald-500" />,
      title: 'Learn as You Create',
      description: 'Our AI tools don\'t just generate content—they help you understand what makes effective career communication, improving your skills over time.'
    }
  ];

  const successSteps = [
    {
      step: '1',
      title: 'Choose Your Tool',
      description: 'Select from our suite of specialized AI tools based on your current need—resume building, email writing, interview prep, or documentation.'
    },
    {
      step: '2',
      title: 'Provide Your Information',
      description: 'Input your details, experiences, and preferences. Our AI understands context and tailors outputs to your unique situation.'
    },
    {
      step: '3',
      title: 'Get AI-Powered Results',
      description: 'Receive professionally crafted content in seconds, optimized for your industry, role, and goals with built-in best practices.'
    },
    {
      step: '4',
      title: 'Refine and Succeed',
      description: 'Review suggestions, make adjustments, and use the final output to advance your career. Track your progress over time.'
    }
  ];

  return (
    <section className="py-20 bg-secondary/30 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Heading */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-8 tracking-wide">
              <Sparkles size={20} className="mr-2" />
              <span>HOW STUDYORBIT WORKS</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 leading-tight">
              Your AI-Powered Career <span className="text-gradient">Success Platform</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light">
              StudyOrbit is an all-in-one platform that empowers students with cutting-edge AI tools to accelerate their academic and professional journey. 
              From crafting perfect resumes to preparing for interviews, we provide everything you need to stand out and succeed.
            </p>
          </div>

          {/* What Is StudyOrbit Section */}
          <div className="mb-20">
            <h3 className="text-3xl md:text-4xl font-bold mb-10 text-center tracking-tight">
              What is <span className="text-gradient">StudyOrbit</span>?
            </h3>
            <div className="glass-card p-10 md:p-12 rounded-2xl">
              <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-6 font-light">
                StudyOrbit is a comprehensive AI-powered platform designed specifically for students who want to excel in their career development. 
                We understand the challenges students face—from creating standout resumes to preparing for competitive interviews and crafting compelling applications.
              </p>
              <p className="text-white/90 text-lg md:text-xl leading-relaxed font-light">
                Our mission is simple: <span className="font-semibold text-emerald-400">democratize access to professional-grade career tools</span> that were once only available through expensive career coaches and consultants. 
                With StudyOrbit, every student can access world-class AI assistance to build their professional presence, regardless of their background or resources.
              </p>
            </div>
          </div>

          {/* Available Tools Section */}
          <div className="mb-20">
            <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center tracking-tight">
              Our <span className="text-gradient">AI-Powered Tools</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.map((tool, index) => (
                <div key={index} className="glass-card p-8 rounded-2xl hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 group">
                  <div className="bg-emerald-500/10 p-4 rounded-xl w-max mb-5 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                    {tool.icon}
                  </div>
                  <h4 className="font-bold text-lg mb-3">{tool.name}</h4>
                  <p className="text-white/70 text-base leading-relaxed">{tool.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How It Helps Section */}
          <div className="mb-20">
            <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center tracking-tight">
              How StudyOrbit <span className="text-gradient">Helps You Succeed</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {howItHelps.map((item, index) => (
                <div key={index} className="glass-card p-8 rounded-2xl hover:border-emerald-500/40 transition-all duration-300">
                  <div className="mb-6">{item.icon}</div>
                  <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
                  <p className="text-white/80 text-base leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Steps to Success Section */}
          <div className="mb-20">
            <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center tracking-tight">
              Your Path to <span className="text-gradient">Success</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {successSteps.map((item, index) => (
                <div key={index} className="glass-card p-8 rounded-2xl text-center hover:border-emerald-500/40 transition-all duration-300">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-3xl font-extrabold shadow-lg shadow-emerald-500/20">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-lg mb-4">{item.title}</h4>
                  <p className="text-white/70 text-base leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Merit & Achievement Section */}
          <div className="glass-card p-10 md:p-12 rounded-2xl bg-gradient-to-br from-emerald-900/20 to-background">
            <div className="text-center mb-10">
              <Trophy className="w-16 h-16 mx-auto mb-6 text-emerald-400" />
              <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                Building Your <span className="text-gradient">Merit & Excellence</span>
              </h3>
            </div>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-7 h-7 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white/90 font-bold text-lg mb-2">Competitive Edge in Applications</p>
                  <p className="text-white/70 text-base leading-relaxed">Stand out in scholarship applications, internship programs, and graduate school admissions with professionally crafted materials.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-7 h-7 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white/90 font-bold text-lg mb-2">Higher Success Rates</p>
                  <p className="text-white/70 text-base leading-relaxed">Our ATS-optimized resumes and tailored application materials significantly increase your chances of getting interviews and offers.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-7 h-7 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white/90 font-bold text-lg mb-2">Confidence in Communication</p>
                  <p className="text-white/70 text-base leading-relaxed">Master the art of professional communication through AI-guided email writing and interview preparation, building skills that last a lifetime.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-7 h-7 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white/90 font-bold text-lg mb-2">Track Your Growth</p>
                  <p className="text-white/70 text-base leading-relaxed">Monitor your progress, see improvements in your materials over time, and build a portfolio of accomplishments that demonstrate your merit.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Encouraging Message */}
          <div className="mt-20 text-center">
            <div className="inline-block glass-card p-10 md:p-12 rounded-2xl max-w-4xl">
              <Rocket className="w-16 h-16 mx-auto mb-6 text-emerald-400" />
              <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                Ready to <span className="text-gradient">Launch Your Career</span>?
              </h3>
              <p className="text-white/90 text-lg md:text-xl leading-relaxed font-light">
                Join over <span className="font-bold text-emerald-400">500+ students</span> who are already using StudyOrbit to transform their career prospects. 
                Every great journey starts with a single step—take yours today and discover how our AI tools can help you achieve your dreams.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
