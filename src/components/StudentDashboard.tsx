import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  MessageCircle, Calendar, BookOpen, Users, TrendingUp, 
  Heart, Brain, Clock, ArrowRight, LogOut 
} from 'lucide-react';

interface StudentDashboardProps {
  onNavigate: (page: string, data?: any) => void;
  userData?: any;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ onNavigate, userData }) => {
  // Mock user data
  const userStats = {
    currentWellnessScore: 72,
    weeklyTrend: '+5%',
    chatSessions: 12,
    resourcesViewed: 8,
    upcomingSessions: [
      {
        id: 1,
        counselor: 'Dr. Sarah Chen',
        date: 'Tomorrow',
        time: '2:00 PM',
        type: 'Individual Session'
      }
    ],
    recentActivity: [
      { type: 'chat', description: 'Chatted with Riley about study stress', time: '2 hours ago' },
      { type: 'resource', description: 'Read "Managing Academic Overwhelm"', time: '1 day ago' },
      { type: 'assessment', description: 'Completed wellness check-in', time: '3 days ago' }
    ]
  };

  const quickActions = [
    {
      title: 'Chat with AI',
      description: 'Get immediate support from our AI companions',
      icon: MessageCircle,
      color: 'bg-primary',
      action: () => onNavigate('chatbot', {userData})
    },
    {
      title: 'Book Counseling',
      description: 'Schedule a session with a professional counselor',
      icon: Calendar,
      color: 'bg-secondary',
      action: () => onNavigate('counselors', {userData})
    },
    {
      title: 'Wellness Check',
      description: 'Take a quick wellness assessment',
      icon: Heart,
      color: 'bg-wellness-success',
      action: () => onNavigate('assessment', {userData})
    },
    {
      title: 'Resources',
      description: 'Explore mental health resources and guides',
      icon: BookOpen,
      color: 'bg-accent',
      action: () => onNavigate('resources', {userData})
    }
  ];

  const handleLogout = () => {
    onNavigate('home');
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <div className="glass border-b border-glass-border">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Welcome back, {userData?.name || 'Student'}!</h1>
                <p className="text-sm text-muted-foreground">
                  {userData?.university && `${userData.university} • `}Your wellness journey continues
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Heart className="h-3 w-3" />
                <span>Wellness Score: {userStats.currentWellnessScore}%</span>
              </Badge>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">
        {/* Wellness Overview */}
        <Card className="glass border-0 shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-wellness-success" />
              Your Wellness Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-wellness-success mb-2">
                  {userStats.currentWellnessScore}%
                </div>
                <p className="text-sm text-muted-foreground">Current Wellness Score</p>
                <Badge variant="secondary" className="mt-2">
                  {userStats.weeklyTrend} this week
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Stress Management</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Sleep Quality</span>
                    <span>65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Social Connection</span>
                    <span>82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Chat Sessions</span>
                  <Badge variant="secondary">{userStats.chatSessions}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Resources Viewed</span>
                  <Badge variant="secondary">{userStats.resourcesViewed}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Days Active</span>
                  <Badge variant="secondary">14</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Card 
              key={index} 
              className="glass border-0 shadow-soft hover:shadow-medium transition-all duration-300 cursor-pointer group"
              onClick={action.action}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upcoming Sessions & Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="glass border-0 shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-accent" />
                Upcoming Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userStats.upcomingSessions.length > 0 ? (
                <div className="space-y-4">
                  {userStats.upcomingSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold">
                          {session.counselor.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium">{session.counselor}</p>
                          <p className="text-sm text-muted-foreground">
                            {session.date} at {session.time}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No upcoming sessions</p>
                  <Button 
                    variant="outline" 
                    onClick={() => onNavigate('counselors', {userData})}
                  >
                    Book a Session
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="glass border-0 shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userStats.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'chat' ? 'bg-primary' :
                      activity.type === 'resource' ? 'bg-accent' :
                      'bg-wellness-success'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommended for You */}
        <Card className="glass border-0 shadow-medium">
          <CardHeader>
            <CardTitle>Recommended for You</CardTitle>
            <p className="text-sm text-muted-foreground">
              Based on your recent activity and wellness score
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-2 mb-2">
                  <BookOpen className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium">Article</span>
                </div>
                <h4 className="font-semibold mb-1">Managing Study Stress</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  Learn effective techniques to handle academic pressure
                </p>
                <Button variant="ghost" size="sm" className="text-xs">
                  Read Now <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
              
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-2 mb-2">
                  <MessageCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">AI Chat</span>
                </div>
                <h4 className="font-semibold mb-1">Talk to Sam</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  Great for anxiety management and practical solutions
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => onNavigate('chatbot', {userData})}
                >
                  Start Chat <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
              
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="h-4 w-4 text-secondary" />
                  <span className="text-sm font-medium">Community</span>
                </div>
                <h4 className="font-semibold mb-1">Study Group Support</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  Connect with students facing similar challenges
                </p>
                <Button variant="ghost" size="sm" className="text-xs">
                  Join Forum <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;