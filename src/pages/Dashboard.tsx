
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import HoverGradientNavBar from '../components/ui/hover-gradient-nav-bar';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, FileText, MessageSquare, FileCheck, Edit, BookText, Activity, Clock } from 'lucide-react';

interface ToolUsage {
  tool: string;
  count: number;
  lastUsed: string;
}

const Dashboard = () => {
  const { currentUser, userData } = useAuth();
  const navigate = useNavigate();
  const [toolUsage, setToolUsage] = useState<ToolUsage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Redirect if not logged in
  // ⚠️ TEMPORARILY DISABLED FOR DEVELOPMENT - RE-ENABLE BEFORE GITHUB EXPORT ⚠️
  // useEffect(() => {
  //   if (!currentUser && !isLoading) {
  //     navigate('/login');
  //   }
  // }, [currentUser, navigate, isLoading]);

  useEffect(() => {
    const fetchToolUsage = async () => {
      try {
        // This would fetch from your backend, using the toolUsageAPI
        // For now, we'll use mock data
        setToolUsage([
          { tool: 'Email Generator', count: 12, lastUsed: '2025-05-15' },
          { tool: 'Resume Generator', count: 3, lastUsed: '2025-05-12' },
          { tool: 'Resume Scorer', count: 4, lastUsed: '2025-05-10' },
          { tool: 'Interview Questions', count: 7, lastUsed: '2025-05-08' },
        ]);
      } catch (error) {
        console.error('Failed to fetch tool usage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentUser) {
      fetchToolUsage();
    }
  }, [currentUser]);

  if (!currentUser || isLoading) {
    return (
      <div className="flex flex-col min-h-screen relative">
        <AnimatedBackground />
        <HoverGradientNavBar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse text-white/70">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  const toolIcons: Record<string, React.ReactNode> = {
    'Email Generator': <Mail className="h-5 w-5 text-emerald-400" />,
    'Resume Generator': <FileText className="h-5 w-5 text-emerald-400" />,
    'Resume Scorer': <FileCheck className="h-5 w-5 text-emerald-400" />,
    'Interview Questions': <MessageSquare className="h-5 w-5 text-emerald-400" />,
    'Project Documentation': <BookText className="h-5 w-5 text-emerald-400" />,
    'SOP Letter Generator': <Edit className="h-5 w-5 text-emerald-400" />
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <AnimatedBackground />
      <HoverGradientNavBar />
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">
            <span className="text-gradient">Your Dashboard</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Activity Card */}
            <Card className="glass-card border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Activity className="h-5 w-5 text-emerald-400 mr-2" />
                  Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{toolUsage.reduce((sum, item) => sum + item.count, 0)}</p>
                <p className="text-white/70 text-sm mt-1">Total generations</p>
              </CardContent>
              <CardFooter>
                <Link to="/tools">
                  <Button variant="outline" size="sm" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
                    Explore Tools
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Recent Activity Card */}
            <Card className="glass-card border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Clock className="h-5 w-5 text-emerald-400 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {toolUsage.length > 0 ? (
                  <p className="text-white/90">
                    Last used: <span className="font-semibold">{toolUsage[0].tool}</span>
                    <span className="text-white/70 text-sm block mt-1">
                      {new Date(toolUsage[0].lastUsed).toLocaleDateString()}
                    </span>
                  </p>
                ) : (
                  <p className="text-white/70">No recent activity</p>
                )}
              </CardContent>
              <CardFooter>
                <Link to="/tools">
                  <Button variant="outline" size="sm" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
                    Explore Tools
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          {/* Tool Usage */}
          <Card className="glass-card border-white/10 mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Tool Usage</CardTitle>
              <CardDescription>Your recent activity across all tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {toolUsage.map((item, index) => (
                  <div key={index} className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center">
                      {toolIcons[item.tool] || <div className="h-8 w-8 bg-emerald-500/20 rounded-full flex items-center justify-center">?</div>}
                      <div className="ml-3">
                        <p className="font-medium">{item.tool}</p>
                        <p className="text-white/70 text-sm">Last used: {new Date(item.lastUsed).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-semibold">{item.count}</p>
                      <p className="text-white/70 text-sm">uses</p>
                    </div>
                  </div>
                ))}

                {toolUsage.length === 0 && (
                  <div className="text-center py-8 text-white/70">
                    <p>You haven't used any tools yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Link to="/tools/email-generator">
              <Button variant="outline" className="w-full h-full py-6 flex flex-col items-center justify-center space-y-2 border-white/10 hover:bg-white/5">
                <Mail className="h-6 w-6 text-emerald-400" />
                <span>Email Generator</span>
              </Button>
            </Link>
            <Link to="/tools/resume-generator">
              <Button variant="outline" className="w-full h-full py-6 flex flex-col items-center justify-center space-y-2 border-white/10 hover:bg-white/5">
                <FileText className="h-6 w-6 text-emerald-400" />
                <span>Resume Generator</span>
              </Button>
            </Link>
            <Link to="/tools/resume-scorer">
              <Button variant="outline" className="w-full h-full py-6 flex flex-col items-center justify-center space-y-2 border-white/10 hover:bg-white/5">
                <FileCheck className="h-6 w-6 text-emerald-400" />
                <span>Resume Scorer</span>
              </Button>
            </Link>
            <Link to="/tools/interview-questions">
              <Button variant="outline" className="w-full h-full py-6 flex flex-col items-center justify-center space-y-2 border-white/10 hover:bg-white/5">
                <MessageSquare className="h-6 w-6 text-emerald-400" />
                <span>Interview Questions</span>
              </Button>
            </Link>
            <Link to="/tools/project-documentation">
              <Button variant="outline" className="w-full h-full py-6 flex flex-col items-center justify-center space-y-2 border-white/10 hover:bg-white/5">
                <BookText className="h-6 w-6 text-emerald-400" />
                <span>Project Docs</span>
              </Button>
            </Link>
            <Link to="/tools/sop-letter-generator">
              <Button variant="outline" className="w-full h-full py-6 flex flex-col items-center justify-center space-y-2 border-white/10 hover:bg-white/5">
                <Edit className="h-6 w-6 text-emerald-400" />
                <span>SOP Generator</span>
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
