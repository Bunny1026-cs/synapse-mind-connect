import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Brain, ArrowLeft, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminLoginProps {
  onNavigate: (page: string, userData?: any) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onNavigate }) => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginData.username || !loginData.password) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    // Simple demo credentials
    if (loginData.username === 'admin' && loginData.password === 'synapse123') {
      toast({
        title: "Admin access granted",
        description: "Welcome to the Synapse admin dashboard."
      });
      
      onNavigate('admin-dashboard', {
        role: 'admin',
        name: 'System Administrator',
        loginTime: new Date().toISOString()
      });
    } else {
      toast({
        title: "Invalid credentials",
        description: "Please check your username and password.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card className="glass border-0 shadow-medium">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-foreground">Synapse</span>
            </div>
            <CardTitle className="text-xl">Administrator Portal</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Secure access for wellness administrators
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Administrator Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter admin username"
                  value={loginData.username}
                  onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                  className="glass"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter admin password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  className="glass"
                />
              </div>
              
              <Button type="submit" variant="wellness" className="w-full">
                <Shield className="h-4 w-4 mr-2" />
                Admin Sign In
              </Button>
            </form>
            
            <div className="mt-6 pt-6 border-t border-glass-border">
              <div className="text-xs text-muted-foreground text-center mb-4">
                Demo Credentials: admin / synapse123
              </div>
              <Button
                variant="ghost"
                onClick={() => onNavigate('home')}
                className="w-full"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;