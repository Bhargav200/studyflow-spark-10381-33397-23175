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
import { Loader2, Copy, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import AnimatedBackground from '@/components/AnimatedBackground';
import HoverGradientNavBar from '@/components/ui/hover-gradient-nav-bar';

const formSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  jobTitle: z.string().min(2, 'Job title is required'),
  experience: z.string().min(10, 'Please provide your experience'),
  education: z.string().min(10, 'Please provide your education'),
  skills: z.string().min(10, 'Please provide your skills'),
  template: z.string(),
});

type ResumeFormValues = z.infer<typeof formSchema>;

const ResumeGeneratorTool = () => {
  const [generatedResume, setGeneratedResume] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      jobTitle: '',
      experience: '',
      education: '',
      skills: '',
      template: 'modern',
    },
  });

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const onSubmit = async (data: ResumeFormValues) => {
    setIsLoading(true);
    try {
      const prompt = `Generate an ATS-friendly resume with the following details:
      
Full Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone}
Job Title: ${data.jobTitle}
Experience: ${data.experience}
Education: ${data.education}
Skills: ${data.skills}
Template Style: ${data.template}

Please format it as a professional, ATS-optimized resume with clear sections.`;

      const response = await generateContent(prompt);
      setGeneratedResume(response);
      toast({
        title: 'Resume generated!',
        description: 'Your ATS-friendly resume has been created successfully.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate resume. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedResume);
    toast({
      title: 'Copied!',
      description: 'Resume copied to clipboard.',
    });
  };

  const downloadResume = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedResume], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'resume.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
              <BreadcrumbPage>ATS Resume Generator</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">ATS-Friendly Resume Generator</h1>
          <p className="text-muted-foreground text-lg">
            Create resumes optimized for Applicant Tracking Systems with keyword optimization and professional formatting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Resume Details</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 234 567 8900" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Software Engineer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Work Experience</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your work experience, achievements, and responsibilities..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="education"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Education</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="List your education, degrees, certifications..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="List your technical and soft skills..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="template"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Template Style</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a template" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="modern">Modern</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="minimalist">Minimalist</SelectItem>
                          <SelectItem value="creative">Creative</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Generate Resume
                </Button>
              </form>
            </Form>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Generated Resume</h2>
              {generatedResume && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadResume}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              )}
            </div>
            {generatedResume ? (
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap bg-muted p-4 rounded-lg text-sm">
                  {generatedResume}
                </pre>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                Fill in the form and click "Generate Resume" to see your ATS-optimized resume here
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResumeGeneratorTool;
