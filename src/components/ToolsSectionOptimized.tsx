import React from 'react';
import { Mail, FileText, MessageSquare, BookText, FileCheck, Edit } from 'lucide-react';
import RobotAnimation from './RobotAnimation';
import ToolCard from './ToolCard';
import { useOptimizedAnimation } from '@/hooks/useOptimizedAnimation';

const ToolsSectionOptimized = () => {
  const { shouldDisableHeavyEffects } = useOptimizedAnimation();

  const tools = [
    {
      id: 'email-generator',
      icon: <Mail className="w-8 h-8 text-emerald-500" />,
      title: 'AI Cold Email Generator',
      description: 'Craft personalized professional emails that get responses with industry-specific templates and tone customization.',
      path: '/tools/email-generator',
      badge: 'Most Popular',
      name: 'Email Generator',
      image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?q=80&w=800&auto=format&fit=crop&fm=jpg&brightness=1.2'
    },
    {
      id: 'resume-generator',
      icon: <FileText className="w-8 h-8 text-emerald-500" />,
      title: 'ATS-Friendly Resume Generator',
      description: 'Create resumes optimized for Applicant Tracking Systems with keyword optimization and real-time scoring.',
      path: '/tools/resume-generator',
      badge: 'Premium',
      name: 'Resume Builder',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop&brightness=1.3'
    },
    {
      id: 'project-documentation',
      icon: <BookText className="w-8 h-8 text-emerald-500" />,
      title: 'Project Documentation Generator',
      description: 'Generate comprehensive project documentation from your code, including README files, API documentation, and user guides.',
      path: '/tools/project-documentation',
      badge: 'New',
      name: 'Documentation',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=800&auto=format&fit=crop&brightness=1.3'
    },
    {
      id: 'resume-scorer',
      icon: <FileCheck className="w-8 h-8 text-emerald-500" />,
      title: 'ATS Resume Scorer',
      description: 'Upload your resume and get instant feedback with an ATS compatibility score, keyword analysis, and improvement suggestions in real-time.',
      path: '/tools/resume-scorer',
      badge: 'Free',
      name: 'Resume Scorer'
    },
    {
      id: 'interview-questions',
      icon: <MessageSquare className="w-8 h-8 text-emerald-500" />,
      title: 'AI Interview Questions Generator',
      description: 'Practice with role-specific interview questions customized to your experience level and industry.',
      path: '/tools/interview-questions',
      name: 'Interview Prep'
    },
    {
      id: 'sop-letter-generator',
      icon: <Edit className="w-8 h-8 text-emerald-500" />,
      title: 'SOP & Recommendation Letter Generator',
      description: 'Craft compelling Statements of Purpose and Letters of Recommendation tailored to your achievements, goals, and target institutions.',
      path: '/tools/sop-letter-generator',
      badge: 'New',
      name: 'SOP Generator'
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-10 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          {!shouldDisableHeavyEffects && <RobotAnimation tools={tools.slice(0, 4)} />}
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI-Powered Tools for <span className="text-gradient">Student Success</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Our suite of specialized AI tools designed to help students accelerate their career development and communication skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.slice(0, 3).map((tool, index) => (
            <ToolCard key={tool.id} {...tool} index={index} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {tools.slice(3).map((tool, index) => (
            <ToolCard key={tool.id} {...tool} index={index + 3} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSectionOptimized;
