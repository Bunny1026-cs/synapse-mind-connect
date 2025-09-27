import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Brain, ArrowLeft, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface AdminLoginProps {
  onNavigate: (page: string, userData?: any) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onNavigate }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginData.email || !loginData.password) {
      return;
    }

    setLoading(true);
    const result = await signIn(loginData.email, loginData.password);
    setLoading(false);
    
    if (result.success) {
      // The auth hook will handle role checking
      // Navigation will be handled by the main app when user is authenticated
      onNavigate('admin-dashboard');
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
                <Label htmlFor="email">Administrator Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter admin email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
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
              
              <Button type="submit" variant="wellness" className="w-full" disabled={loading}>
                <Shield className="h-4 w-4 mr-2" />
                {loading ? 'Signing In...' : 'Admin Sign In'}
              </Button>
            </form>
            
            <div className="mt-6 pt-6 border-t border-glass-border">
              <div className="text-xs text-muted-foreground text-center mb-4">
                Use your admin email and password to sign in
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