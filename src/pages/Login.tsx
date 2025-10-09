
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from '../lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import HoverGradientNavBar from '../components/ui/hover-gradient-nav-bar';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Login successful!',
        description: 'Welcome back to StudyOrbit!',
      });
      navigate('/');
    } catch (error: any) {
      setError(
        error.code === 'auth/invalid-credential'
          ? 'Invalid email or password'
          : 'Failed to login. Please try again.'
      );
      toast({
        variant: 'destructive',
        title: 'Login Error',
        description: error.code === 'auth/invalid-credential'
          ? 'Invalid email or password'
          : 'Failed to login. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <AnimatedBackground />
      <HoverGradientNavBar />
      <main className="flex-grow flex items-center justify-center pt-24 pb-20 px-4">
        <Card className="w-full max-w-md glass-card border-white/10">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              <span className="text-gradient">Welcome Back</span>
            </CardTitle>
            <CardDescription className="text-center text-white/70">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="bg-destructive/20 p-3 rounded-md flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                  <span className="text-destructive text-sm">{error}</span>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-xs text-emerald-400 hover:text-emerald-300">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 h-4 w-4" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="button-gradient w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-white/70">
              Don't have an account?{" "}
              <Link to="/register" className="text-emerald-400 hover:text-emerald-300 font-medium">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
