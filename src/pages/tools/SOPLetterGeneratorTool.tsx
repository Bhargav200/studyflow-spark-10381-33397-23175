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
  documentType: z.string(),
  applicantName: z.string().min(2, 'Name is required'),
  program: z.string().min(2, 'Program/position is required'),
  institution: z.string().min(2, 'Institution is required'),
  background: z.string().min(50, 'Background must be at least 50 characters'),
  achievements: z.string().min(20, 'Achievements are required'),
  goals: z.string().min(20, 'Goals are required'),
  whyProgram: z.string().min(20, 'This field is required'),
});

type SOPFormValues = z.infer<typeof formSchema>;

const SOPLetterGeneratorTool = () => {
  const [generatedDocument, setGeneratedDocument] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const form = useForm<SOPFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentType: 'sop',
      applicantName: '',
      program: '',
      institution: '',
      background: '',
      achievements: '',
      goals: '',
      whyProgram: '',
    },
  });

  // ⚠️ TEMPORARILY DISABLED FOR DEVELOPMENT - RE-ENABLE BEFORE GITHUB EXPORT ⚠️
  // useEffect(() => {
  //   if (!currentUser) {
  //     navigate('/login');
  //   }
  // }, [currentUser, navigate]);

  const onSubmit = async (data: SOPFormValues) => {
    setIsLoading(true);
    try {
      const documentName = data.documentType === 'sop' ? 'Statement of Purpose' : 'Letter of Recommendation';
      const prompt = `Generate a compelling ${documentName} with the following details:

Applicant Name: ${data.applicantName}
Program/Position: ${data.program}
Institution: ${data.institution}
Background: ${data.background}
Key Achievements: ${data.achievements}
Career Goals: ${data.goals}
Why This Program: ${data.whyProgram}

Please create a professional, well-structured ${documentName.toLowerCase()} that highlights the applicant's strengths and suitability for the program.`;

      const response = await generateContent(prompt);
      setGeneratedDocument(response);
      toast({
        title: 'Document generated!',
        description: `Your ${documentName.toLowerCase()} has been created successfully.`,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate document. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedDocument);
    toast({
      title: 'Copied!',
      description: 'Document copied to clipboard.',
    });
  };

  const downloadDocument = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedDocument], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    const docType = form.getValues('documentType');
    element.download = `${docType === 'sop' ? 'SOP' : 'Recommendation_Letter'}-${form.getValues('applicantName')}.txt`;
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
              <BreadcrumbPage>SOP & Recommendation Letter</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">SOP & Recommendation Letter Generator</h1>
          <p className="text-muted-foreground text-lg">
            Craft compelling Statements of Purpose and Letters of Recommendation tailored to your achievements and goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Application Details</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="documentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Document Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select document type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="sop">Statement of Purpose (SOP)</SelectItem>
                          <SelectItem value="lor">Letter of Recommendation (LOR)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="applicantName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Applicant Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="program"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Program/Position</FormLabel>
                      <FormControl>
                        <Input placeholder="Master's in Computer Science" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="institution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institution/University</FormLabel>
                      <FormControl>
                        <Input placeholder="Stanford University" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="background"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Academic/Professional Background</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your educational background and relevant experience..."
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
                  name="achievements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Key Achievements</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="List your major accomplishments, awards, projects..."
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
                  name="goals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Career Goals</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your short-term and long-term career goals..."
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
                  name="whyProgram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Why This Program/Institution</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Explain why you're interested in this specific program..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Generate Document
                </Button>
              </form>
            </Form>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Generated Document</h2>
              {generatedDocument && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadDocument}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              )}
            </div>
            {generatedDocument ? (
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap bg-muted p-4 rounded-lg text-sm max-h-[600px] overflow-y-auto">
                  {generatedDocument}
                </pre>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                Fill in the form and click "Generate Document" to create your SOP or recommendation letter
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SOPLetterGeneratorTool;
