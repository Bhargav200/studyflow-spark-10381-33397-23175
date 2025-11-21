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
  projectName: z.string().min(2, 'Project name is required'),
  projectType: z.string().min(2, 'Project type is required'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  techStack: z.string().min(5, 'Tech stack is required'),
  features: z.string().min(20, 'Features description is required'),
  docType: z.string(),
});

type DocumentationFormValues = z.infer<typeof formSchema>;

const ProjectDocumentationTool = () => {
  const [generatedDoc, setGeneratedDoc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const form = useForm<DocumentationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: '',
      projectType: '',
      description: '',
      techStack: '',
      features: '',
      docType: 'readme',
    },
  });

  // ⚠️ TEMPORARILY DISABLED FOR DEVELOPMENT - RE-ENABLE BEFORE GITHUB EXPORT ⚠️
  // useEffect(() => {
  //   if (!currentUser) {
  //     navigate('/login');
  //   }
  // }, [currentUser, navigate]);

  const onSubmit = async (data: DocumentationFormValues) => {
    setIsLoading(true);
    try {
      const prompt = `Generate comprehensive ${data.docType === 'readme' ? 'README.md' : data.docType === 'api' ? 'API documentation' : 'user guide'} for the following project:

Project Name: ${data.projectName}
Project Type: ${data.projectType}
Description: ${data.description}
Tech Stack: ${data.techStack}
Features: ${data.features}

Please create professional, well-structured documentation with clear sections, code examples where appropriate, and proper formatting.`;

      const response = await generateContent(prompt);
      setGeneratedDoc(response);
      toast({
        title: 'Documentation generated!',
        description: 'Your project documentation has been created successfully.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate documentation. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedDoc);
    toast({
      title: 'Copied!',
      description: 'Documentation copied to clipboard.',
    });
  };

  const downloadDoc = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedDoc], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${form.getValues('projectName')}-${form.getValues('docType')}.md`;
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
              <BreadcrumbPage>Project Documentation</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Project Documentation Generator</h1>
          <p className="text-muted-foreground text-lg">
            Generate comprehensive project documentation including README files, API documentation, and user guides.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Project Information</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="projectName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input placeholder="My Awesome Project" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Type</FormLabel>
                      <FormControl>
                        <Input placeholder="Web Application, Mobile App, API, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe what your project does and its purpose..."
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
                  name="techStack"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Technology Stack</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="List the technologies, frameworks, and tools used..."
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
                  name="features"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Key Features</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="List the main features and functionalities..."
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
                  name="docType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Documentation Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select documentation type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="readme">README.md</SelectItem>
                          <SelectItem value="api">API Documentation</SelectItem>
                          <SelectItem value="user-guide">User Guide</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Generate Documentation
                </Button>
              </form>
            </Form>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Generated Documentation</h2>
              {generatedDoc && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadDoc}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              )}
            </div>
            {generatedDoc ? (
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap bg-muted p-4 rounded-lg text-sm">
                  {generatedDoc}
                </pre>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                Fill in the form and click "Generate Documentation" to see your documentation here
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDocumentationTool;
