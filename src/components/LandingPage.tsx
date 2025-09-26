import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Brain, Users, Shield, Calendar, MessageCircle } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="glass sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Synapse</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => onNavigate('login')}>
              Student Login
            </Button>
            <Button variant="wellness" onClick={() => onNavigate('admin-login')}>
              Admin
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
            Your Digital Wellness
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Companion</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with professional counselors, AI support, and a caring community. 
            Your mental health journey starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={() => onNavigate('login')}
              className="text-lg px-8 py-6"
            >
              Get Started Today
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => onNavigate('about')}
              className="text-lg px-8 py-6"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Complete Mental Wellness Support
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="glass border-0 shadow-soft hover:shadow-medium transition-smooth">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <CardTitle>AI Companion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Chat with empathetic AI companions trained to provide support and guidance 24/7.
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-0 shadow-soft hover:shadow-medium transition-smooth">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Professional Counseling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Book sessions with licensed counselors who specialize in student mental health.
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-0 shadow-soft hover:shadow-medium transition-smooth">
              <CardHeader>
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Peer Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect with other students in safe, anonymous support groups and forums.
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-0 shadow-soft hover:shadow-medium transition-smooth">
              <CardHeader>
                <div className="w-12 h-12 bg-wellness-success rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Wellness Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Take personalized assessments to understand your mental health and get tailored recommendations.
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-0 shadow-soft hover:shadow-medium transition-smooth">
              <CardHeader>
                <div className="w-12 h-12 bg-wellness-calm rounded-lg flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Educational Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access articles, guides, and tools to build mental health literacy and coping skills.
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-0 shadow-soft hover:shadow-medium transition-smooth">
              <CardHeader>
                <div className="w-12 h-12 bg-wellness-warning rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Crisis Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Immediate access to crisis intervention resources and emergency support when you need it most.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="glass border-0 shadow-medium">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to Start Your Wellness Journey?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of students who have found support, guidance, and community with Synapse.
              </p>
              <Button 
                variant="hero" 
                size="lg" 
                onClick={() => onNavigate('login')}
                className="text-lg px-8 py-6"
              >
                Create Your Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-glass-border">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-primary rounded flex items-center justify-center">
              <Brain className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-foreground">Synapse</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Synapse Mental Wellness Platform. Providing compassionate support for student mental health.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;