import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Progress } from '@/components/ui/progress';
import { generateContent } from '@/lib/api';
import { Loader2, Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import AnimatedBackground from '@/components/AnimatedBackground';
import HoverGradientNavBar from '@/components/ui/hover-gradient-nav-bar';

const formSchema = z.object({
  resumeText: z.string().min(50, 'Resume text must be at least 50 characters'),
  jobDescription: z.string().min(20, 'Job description is required'),
});

type ScorerFormValues = z.infer<typeof formSchema>;

const ResumeScorerTool = () => {
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const form = useForm<ScorerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resumeText: '',
      jobDescription: '',
    },
  });

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const onSubmit = async (data: ScorerFormValues) => {
    setIsLoading(true);
    try {
      const prompt = `Analyze this resume against the job description and provide:
1. An ATS compatibility score (0-100)
2. Detailed feedback on keyword optimization
3. Suggestions for improvement
4. Missing keywords and skills

Resume:
${data.resumeText}

Job Description:
${data.jobDescription}

Please format the response with a clear score at the beginning.`;

      const response = await generateContent(prompt);
      
      // Extract score from response (assuming format "Score: XX" or similar)
      const scoreMatch = response.match(/score:?\s*(\d+)/i);
      if (scoreMatch) {
        setScore(parseInt(scoreMatch[1]));
      } else {
        setScore(75); // Default score if not found
      }
      
      setFeedback(response);
      toast({
        title: 'Analysis complete!',
        description: 'Your resume has been scored successfully.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to analyze resume. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        form.setValue('resumeText', text);
        toast({
          title: 'File uploaded',
          description: 'Resume text has been extracted.',
        });
      };
      reader.readAsText(file);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <AnimatedBackground />
      <HoverGradientNavBar />
      
      <div className="container mx-auto px-4 py-24 relative z-10">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/tools">AI Tools</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>ATS Resume Scorer</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">ATS Resume Scorer</h1>
          <p className="text-muted-foreground text-lg">
            Upload your resume and get instant feedback with an ATS compatibility score and improvement suggestions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Resume Analysis</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="resumeText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resume Text</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <Input
                              type="file"
                              accept=".txt,.doc,.docx"
                              onChange={handleFileUpload}
                              className="flex-1"
                            />
                            <Button type="button" variant="outline">
                              <Upload className="h-4 w-4" />
                            </Button>
                          </div>
                          <Textarea 
                            placeholder="Paste your resume text here or upload a file..."
                            className="min-h-[200px]"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="jobDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Paste the job description you're applying for..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Analyze Resume
                </Button>
              </form>
            </Form>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">ATS Score & Feedback</h2>
            {score !== null ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className={`text-6xl font-bold mb-2 ${getScoreColor(score)}`}>
                    {score}
                  </div>
                  <p className="text-muted-foreground">ATS Compatibility Score</p>
                  <Progress value={score} className="mt-4" />
                </div>
                <div className="prose prose-sm max-w-none">
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">Detailed Feedback</h3>
                    <pre className="whitespace-pre-wrap text-sm">
                      {feedback}
                    </pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                Submit your resume and job description to receive your ATS score and detailed feedback
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResumeScorerTool;
