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
  Edit,
  Clock,
  GraduationCap,
  Briefcase,
  Award,
  ArrowRight,
  BookOpen,
  PenTool,
  Calendar,
  Lightbulb
} from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';

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

  const dailyBenefits = [
    {
      icon: <Clock className="w-8 h-8 text-emerald-500" />,
      title: 'Save 5+ Hours Weekly',
      description: 'Transform tasks that took hours into minutes. Generate project documentation, emails, and reports in seconds.',
      stat: '5+ hrs',
      statLabel: 'Saved weekly'
    },
    {
      icon: <Calendar className="w-8 h-8 text-emerald-500" />,
      title: 'Never Miss Deadlines',
      description: 'Quick AI assistance helps you complete assignments on time without compromising quality.',
      stat: '100%',
      statLabel: 'On-time submissions'
    },
    {
      icon: <PenTool className="w-8 h-8 text-emerald-500" />,
      title: 'Better Quality Work',
      description: 'AI-powered suggestions improve your writing, formatting, and overall presentation.',
      stat: '40%',
      statLabel: 'Grade improvement'
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-emerald-500" />,
      title: 'Learn While Creating',
      description: 'Understand best practices in documentation, professional writing, and communication.',
      stat: 'Lifetime',
      statLabel: 'Skills gained'
    }
  ];

  const studentUseCases = [
    {
      title: 'Daily Assignments',
      icon: <BookOpen className="w-5 h-5 text-emerald-500" />,
      items: ['Project documentation & reports', 'Lab report summaries', 'Research paper outlines', 'Case study analysis', 'Assignment formatting']
    },
    {
      title: 'Career Preparation',
      icon: <Briefcase className="w-5 h-5 text-emerald-500" />,
      items: ['Professional resumes', 'Cover letters', 'LinkedIn profile optimization', 'Cold emails to recruiters', 'Interview preparation']
    },
    {
      title: 'Academic Applications',
      icon: <GraduationCap className="w-5 h-5 text-emerald-500" />,
      items: ['Statement of Purpose', 'Recommendation letters', 'Scholarship essays', 'University applications', 'Personal statements']
    }
  ];

  const successSteps = [
    {
      step: '01',
      title: 'Choose Your Tool',
      description: 'Select from our suite of specialized AI tools based on your current need—assignments, career prep, or applications.'
    },
    {
      step: '02',
      title: 'Input Your Details',
      description: 'Provide your information, requirements, and preferences. Our AI understands context instantly.'
    },
    {
      step: '03',
      title: 'AI Generation',
      description: 'Receive professionally crafted content in seconds, optimized with industry best practices.'
    },
    {
      step: '04',
      title: 'Refine & Submit',
      description: 'Review, customize, and export your polished documents ready for submission.'
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/10 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Main Heading */}
        <div className="text-center mb-20">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            <Sparkles size={18} className="mr-2" />
            How StudyOrbit Works
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Your AI-Powered <span className="text-gradient">Study Companion</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            StudyOrbit simplifies your academic life by handling tedious documentation and preparation tasks, 
            so you can focus on learning, growing, and achieving your dreams.
          </p>
        </div>

        {/* Daily Benefits for Students */}
        <div className="mb-24">
          <h3 className="text-2xl md:text-3xl font-semibold text-center mb-4">
            How It Helps Your <span className="text-gradient">Daily Student Life</span>
          </h3>
          <p className="text-white/60 text-center mb-12 max-w-2xl mx-auto">
            From morning assignments to evening study sessions — we've got your back
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dailyBenefits.map((benefit, index) => (
              <SpotlightCard key={index} spotlightColor="rgba(16, 185, 129, 0.25)">
                <div className="bg-emerald-500/10 p-3 rounded-lg w-max mb-4">
                  {benefit.icon}
                </div>
                <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
                <p className="text-white/60 text-sm mb-4">{benefit.description}</p>
                <div className="pt-4 border-t border-white/10">
                  <span className="text-2xl font-bold text-emerald-400">{benefit.stat}</span>
                  <span className="text-white/50 text-sm ml-2">{benefit.statLabel}</span>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* Simple Steps */}
        <div className="mb-24">
          <h3 className="text-2xl md:text-3xl font-semibold text-center mb-12">
            Simple <span className="text-gradient">4-Step Process</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {successSteps.map((step, index) => (
              <div key={index} className="relative">
                <SpotlightCard spotlightColor="rgba(16, 185, 129, 0.2)">
                  <span className="text-5xl font-bold text-emerald-500/20 mb-2 block">{step.step}</span>
                  <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                  <p className="text-white/60 text-sm">{step.description}</p>
                </SpotlightCard>
                {index < successSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-emerald-500/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Use Cases Grid */}
        <div className="mb-24">
          <h3 className="text-2xl md:text-3xl font-semibold text-center mb-4">
            Perfect For <span className="text-gradient">Every Student Need</span>
          </h3>
          <p className="text-white/60 text-center mb-12 max-w-2xl mx-auto">
            Whether it's a quick assignment or a life-changing application
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {studentUseCases.map((useCase, index) => (
              <SpotlightCard key={index} spotlightColor="rgba(16, 185, 129, 0.2)">
                <div className="flex items-center gap-2 mb-4">
                  {useCase.icon}
                  <h4 className="text-lg font-semibold">{useCase.title}</h4>
                </div>
                <ul className="space-y-3">
                  {useCase.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-2 text-white/70 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* Available Tools */}
        <div className="mb-24">
          <h3 className="text-2xl md:text-3xl font-semibold text-center mb-12">
            Our <span className="text-gradient">AI-Powered Tools</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {tools.map((tool, index) => (
              <SpotlightCard key={index} spotlightColor="rgba(16, 185, 129, 0.2)">
                <div className="bg-emerald-500/10 p-3 rounded-xl w-max mb-4 text-emerald-400">
                  {tool.icon}
                </div>
                <h4 className="font-semibold text-lg mb-2">{tool.name}</h4>
                <p className="text-white/60 text-sm">{tool.description}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* Achievement Section */}
        <div className="mb-16">
          <SpotlightCard className="max-w-4xl mx-auto" spotlightColor="rgba(16, 185, 129, 0.15)">
            <div className="text-center py-6">
              <Trophy className="w-14 h-14 mx-auto mb-6 text-emerald-400" />
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Building Your <span className="text-gradient">Academic Excellence</span>
              </h3>
              <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                Join thousands of students who are already saving time, improving grades, and preparing for successful careers.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-400">500+</div>
                  <div className="text-white/50 text-sm">Active Students</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-400">10K+</div>
                  <div className="text-white/50 text-sm">Documents Generated</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-400">95%</div>
                  <div className="text-white/50 text-sm">Satisfaction Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-400">3x</div>
                  <div className="text-white/50 text-sm">More Interviews</div>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* Free Badge */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span className="text-white/80">100% Free for Students — No Credit Card Required</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
