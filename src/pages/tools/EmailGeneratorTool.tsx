
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import HoverGradientNavBar from '../../components/ui/hover-gradient-nav-bar';
import Footer from '../../components/Footer';
import AnimatedBackground from '../../components/AnimatedBackground';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { emailGeneratorAPI } from '../../lib/api';
import { Mail, Copy, Download, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

interface EmailFormValues {
  recipient: string;
  purpose: string;
  tone: string;
  additionalInfo: string;
}

const EmailGeneratorTool = () => {
  const { currentUser, userData } = useAuth();
  const navigate = useNavigate();
  const [generatedEmail, setGeneratedEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const form = useForm<EmailFormValues>({
    defaultValues: {
      recipient: '',
      purpose: '',
      tone: 'professional',
      additionalInfo: '',
    },
  });

  React.useEffect(() => {
    if (!currentUser && !form.formState.isSubmitting) {
      navigate('/login');
    }
  }, [currentUser, navigate, form.formState.isSubmitting]);

  const onSubmit = async (data: EmailFormValues) => {
    if (!userData) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "Please log in to use this tool",
      });
      navigate('/login');
      return;
    }

    setIsLoading(true);

    try {
      // In a real implementation, this would call the API
      // const response = await emailGeneratorAPI.generateEmail(data);
      // setGeneratedEmail(response.email);
      
      // For now, we'll simulate an API call with a timeout
      setTimeout(() => {
        const emailSample = `Dear ${data.recipient},

I hope this email finds you well. I am writing to ${data.purpose}.

${data.additionalInfo ? `Additionally, ${data.additionalInfo}` : ''}

I look forward to your response and would be happy to discuss this matter further at your convenience.

Best regards,
${currentUser?.displayName || 'Your Name'}`;

        setGeneratedEmail(emailSample);
        
        toast({
          title: "Email Generated Successfully",
          description: "Your email has been generated",
        });
        
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to generate email:', error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "An error occurred while generating your email. Please try again.",
      });
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedEmail);
    toast({
      title: "Copied to clipboard",
      description: "Email content has been copied to your clipboard",
    });
  };

  const downloadEmail = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedEmail], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'generated-email.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <AnimatedBackground />
      <HoverGradientNavBar />
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild><Link to="/tools">Tools</Link></BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Email Generator</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="text-gradient">AI Cold Email Generator</span>
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              Craft personalized professional emails that get responses with industry-specific templates
              and tone customization.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Email Form Card */}
            <Card className="glass-card border-white/10">
              <CardHeader>
                <div className="flex items-center mb-2">
                  <Mail className="mr-2 h-6 w-6 text-emerald-400" />
                  <CardTitle>Generate Your Email</CardTitle>
                </div>
                <CardDescription>
                  Fill in the details below to generate a personalized email
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="recipient"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Recipient Name/Company</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe or Acme Corp" {...field} />
                          </FormControl>
                          <FormDescription>
                            Who is this email going to?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="purpose"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Purpose</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Inquire about the Senior Developer position" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            What's the main objective of your email?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="tone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tone</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a tone" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="professional">Professional</SelectItem>
                              <SelectItem value="friendly">Friendly</SelectItem>
                              <SelectItem value="formal">Formal</SelectItem>
                              <SelectItem value="persuasive">Persuasive</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            How would you like your email to sound?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="additionalInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Information (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="I have 5 years of experience in software development..."
                              className="resize-none min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Any other details you'd like to include in the email?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="button-gradient w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating Email...
                        </>
                      ) : (
                        <>Generate Email</>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Generated Email Card */}
            <Card className={`glass-card border-white/10 h-full flex flex-col ${!generatedEmail ? 'justify-center' : ''}`}>
              <CardHeader>
                <CardTitle>Generated Email</CardTitle>
                <CardDescription>
                  Your AI-generated email will appear here
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow">
                {generatedEmail ? (
                  <div className="bg-white/5 p-4 rounded-md whitespace-pre-wrap h-full min-h-[300px]">
                    {generatedEmail}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center h-full p-8">
                    <Mail className="h-16 w-16 text-white/20 mb-4" />
                    <p className="text-white/50">
                      Fill out the form and click "Generate Email" to create your professional email
                    </p>
                  </div>
                )}
              </CardContent>
              
              {generatedEmail && (
                <CardFooter className="flex justify-between gap-4">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                    onClick={copyToClipboard}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                    onClick={downloadEmail}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EmailGeneratorTool;
