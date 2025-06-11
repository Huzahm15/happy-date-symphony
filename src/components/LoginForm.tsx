
import { useState } from "react";
import { Mail, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const { toast } = useToast();

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: isLogin ? "Login Successful" : "Account Created",
      description: `Welcome to CelebratePro! ${email}`,
    });
  };

  const handleGoogleAuth = () => {
    toast({
      title: "Google Authentication",
      description: "Google login integration would be implemented here",
    });
  };

  const handleGithubAuth = () => {
    toast({
      title: "GitHub Authentication", 
      description: "GitHub login integration would be implemented here",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg w-fit mb-4">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">{isLogin ? "Welcome Back" : "Create Account"}</CardTitle>
          <CardDescription>
            {isLogin ? "Sign in to your CelebratePro account" : "Join CelebratePro today"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Social Login Buttons */}
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleGoogleAuth}
            >
              <Mail className="h-4 w-4 mr-2" />
              Continue with Google
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleGithubAuth}
            >
              <Github className="h-4 w-4 mr-2" />
              Continue with GitHub
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-purple-600 hover:underline"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
