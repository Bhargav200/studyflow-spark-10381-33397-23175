import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { generateContent } from '@/lib/api';
import { Loader2, Copy, RefreshCw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import AnimatedBackground from '@/components/AnimatedBackground';
import HoverGradientNavBar from '@/components/ui/hover-gradient-nav-bar';

const formSchema = z.object({
  jobRole: z.string().min(2, 'Job role is required'),
  industry: z.string().min(2, 'Industry is required'),
  experienceLevel: z.string(),
  specificTopics: z.string().optional(),
});

type InterviewFormValues = z.infer<typeof formSchema>;

const InterviewQuestionsTool = () => {
  const [generatedQuestions, setGeneratedQuestions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const form = useForm<InterviewFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobRole: '',
      industry: '',
      experienceLevel: 'mid',
      specificTopics: '',
    },
  });

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const onSubmit = async (data: InterviewFormValues) => {
    setIsLoading(true);
    try {
      const prompt = `Generate comprehensive interview questions for the following position:

Job Role: ${data.jobRole}
Industry: ${data.industry}
Experience Level: ${data.experienceLevel}
${data.specificTopics ? `Specific Topics: ${data.specificTopics}` : ''}

Please provide:
1. 10 technical/role-specific questions
2. 5 behavioral questions
3. 3 situational questions
4. Sample answers or tips for each question

Format the response clearly with sections and numbering.`;

      const response = await generateContent(prompt);
      setGeneratedQuestions(response);
      toast({
        title: 'Questions generated!',
        description: 'Your interview questions are ready.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate questions. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedQuestions);
    toast({
      title: 'Copied!',
      description: 'Questions copied to clipboard.',
    });
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
              <BreadcrumbPage>Interview Questions</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">AI Interview Questions Generator</h1>
          <p className="text-muted-foreground text-lg">
            Practice with role-specific interview questions customized to your experience level and industry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Interview Details</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="jobRole"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Role</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Software Engineer, Product Manager" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Technology, Finance, Healthcare" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="experienceLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                          <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                          <SelectItem value="senior">Senior Level (6-10 years)</SelectItem>
                          <SelectItem value="lead">Lead/Principal (10+ years)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="specificTopics"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specific Topics (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any specific skills or topics you want to focus on..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Generate Questions
                </Button>
              </form>
            </Form>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Interview Questions</h2>
              {generatedQuestions && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => form.handleSubmit(onSubmit)()}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
              )}
            </div>
            {generatedQuestions ? (
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap bg-muted p-4 rounded-lg text-sm max-h-[600px] overflow-y-auto">
                  {generatedQuestions}
                </pre>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                Fill in the form and click "Generate Questions" to get your personalized interview questions
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InterviewQuestionsTool;
