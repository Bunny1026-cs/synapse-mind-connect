import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, TrendingUp, MessageCircle, Calendar, BookOpen, 
  AlertTriangle, BarChart3, Clock, Shield, LogOut 
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigate: (page: string, data?: any) => void;
  userData?: any;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate, userData }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Mock data for analytics
  const analyticsData = {
    totalStudents: 2847,
    activeUsers: 1932,
    assessmentsCompleted: 456,
    sessionsBooked: 89,
    crisisInterventions: 12,
    forumPosts: 234,
    resourceViews: 1567,
    avgWellnessScore: 72
  };

  const wellnessTrends = [
    { month: 'Aug', score: 68 },
    { month: 'Sep', score: 71 },
    { month: 'Oct', score: 69 },
    { month: 'Nov', score: 72 },
    { month: 'Dec', score: 74 }
  ];

  const topResources = [
    { title: '5-Minute Breathing Exercises', views: 432, category: 'Anxiety' },
    { title: 'Managing Academic Overwhelm', views: 387, category: 'Stress' },
    { title: 'Sleep Hygiene for Students', views: 298, category: 'Sleep' },
    { title: 'Building Healthy Relationships', views: 245, category: 'Social' }
  ];

  const recentAlerts = [
    { id: 1, type: 'crisis', message: 'High-risk assessment detected', time: '2 min ago', student: 'Student #2847' },
    { id: 2, type: 'trend', message: 'Anxiety levels increased 15% this week', time: '1 hour ago', student: null },
    { id: 3, type: 'usage', message: 'Peak usage detected - additional resources needed', time: '3 hours ago', student: null }
  ];

  const counselorStats = [
    { name: 'Dr. Sarah Chen', sessions: 28, rating: 4.9, specialization: 'Anxiety' },
    { name: 'Marcus Rodriguez', sessions: 24, rating: 4.8, specialization: 'Depression' },
    { name: 'Dr. Priya Patel', sessions: 31, rating: 4.9, specialization: 'Relationships' },
    { name: 'James Thompson', sessions: 19, rating: 4.7, specialization: 'ADHD' },
    { name: 'Dr. Maria Santos', sessions: 15, rating: 4.9, specialization: 'Trauma' },
    { name: 'David Kim', sessions: 22, rating: 4.8, specialization: 'LGBTQ+' }
  ];

  const handleLogout = () => {
    onNavigate('home');
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <div className="glass border-b border-glass-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Synapse Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {userData?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>Live</span>
              </Badge>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="wellness">Wellness Analytics</TabsTrigger>
            <TabsTrigger value="counselors">Counselor Management</TabsTrigger>
            <TabsTrigger value="resources">Resource Management</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="glass border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Students</p>
                      <p className="text-2xl font-bold">{analyticsData.totalStudents.toLocaleString()}</p>
                    </div>
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <div className="mt-2">
                    <Badge variant="secondary" className="text-xs">
                      +12% vs last month
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Users</p>
                      <p className="text-2xl font-bold">{analyticsData.activeUsers.toLocaleString()}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-wellness-success" />
                  </div>
                  <div className="mt-2">
                    <Badge variant="secondary" className="text-xs">
                      68% engagement rate
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Sessions Booked</p>
                      <p className="text-2xl font-bold">{analyticsData.sessionsBooked}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-accent" />
                  </div>
                  <div className="mt-2">
                    <Badge variant="secondary" className="text-xs">
                      This week
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Crisis Interventions</p>
                      <p className="text-2xl font-bold">{analyticsData.crisisInterventions}</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-wellness-danger" />
                  </div>
                  <div className="mt-2">
                    <Badge variant="secondary" className="text-xs">
                      Urgent attention
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Alerts */}
            <Card className="glass border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-wellness-warning" />
                  Recent Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          alert.type === 'crisis' ? 'bg-wellness-danger' :
                          alert.type === 'trend' ? 'bg-wellness-warning' : 'bg-primary'
                        }`}></div>
                        <div>
                          <p className="font-medium">{alert.message}</p>
                          <p className="text-sm text-muted-foreground">
                            {alert.student && `${alert.student} • `}{alert.time}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Usage Statistics */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="glass border-0 shadow-medium">
                <CardHeader>
                  <CardTitle>Platform Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>AI Chat Sessions</span>
                        <span>1,234</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Assessments Completed</span>
                        <span>{analyticsData.assessmentsCompleted}</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Resource Views</span>
                        <span>{analyticsData.resourceViews}</span>
                      </div>
                      <Progress value={89} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Forum Posts</span>
                        <span>{analyticsData.forumPosts}</span>
                      </div>
                      <Progress value={42} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-0 shadow-medium">
                <CardHeader>
                  <CardTitle>Top Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topResources.map((resource, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{resource.title}</p>
                          <p className="text-xs text-muted-foreground">{resource.category}</p>
                        </div>
                        <Badge variant="secondary">{resource.views} views</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="wellness" className="space-y-6">
            <Card className="glass border-0 shadow-medium">
              <CardHeader>
                <CardTitle>Wellness Trends</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Average wellness scores across all students
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-wellness-success mb-2">
                      {analyticsData.avgWellnessScore}%
                    </div>
                    <p className="text-muted-foreground">Average Wellness Score</p>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-4">
                    {wellnessTrends.map((trend, index) => (
                      <div key={index} className="text-center">
                        <div className="h-20 bg-muted/50 rounded-lg flex items-end justify-center p-2 mb-2">
                          <div 
                            className="w-6 bg-primary rounded-t"
                            style={{ height: `${(trend.score / 100) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-sm font-medium">{trend.month}</p>
                        <p className="text-xs text-muted-foreground">{trend.score}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="glass border-0 shadow-medium">
                <CardHeader>
                  <CardTitle className="text-lg">Mood Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Excellent</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-wellness-success rounded-full"></div>
                        <span className="text-sm">23%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Good</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">34%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Fair</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-14 h-2 bg-wellness-warning rounded-full"></div>
                        <span className="text-sm">28%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Poor</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-2 bg-wellness-danger rounded-full"></div>
                        <span className="text-sm">15%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-0 shadow-medium">
                <CardHeader>
                  <CardTitle className="text-lg">Common Issues</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Academic Stress</span>
                      <Badge variant="secondary">67%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Anxiety</span>
                      <Badge variant="secondary">52%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Sleep Issues</span>
                      <Badge variant="secondary">48%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Social Isolation</span>
                      <Badge variant="secondary">31%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Depression</span>
                      <Badge variant="secondary">24%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-0 shadow-medium">
                <CardHeader>
                  <CardTitle className="text-lg">Peak Usage Times</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Sunday Evening</span>
                      <Badge variant="secondary">High</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Exam Periods</span>
                      <Badge className="bg-wellness-danger text-white">Critical</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Late Night (11pm-1am)</span>
                      <Badge variant="secondary">High</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Monday Morning</span>
                      <Badge className="bg-wellness-warning text-white">Moderate</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="counselors" className="space-y-6">
            <Card className="glass border-0 shadow-medium">
              <CardHeader>
                <CardTitle>Counselor Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {counselorStats.map((counselor, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                          {counselor.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium">{counselor.name}</p>
                          <p className="text-sm text-muted-foreground">{counselor.specialization}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="text-center">
                          <p className="font-medium">{counselor.sessions}</p>
                          <p className="text-muted-foreground">Sessions</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium">{counselor.rating}</p>
                          <p className="text-muted-foreground">Rating</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <Card className="glass border-0 shadow-medium">
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">Resource Categories</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Stress Management</span>
                        <Badge variant="secondary">24 articles</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Anxiety Support</span>
                        <Badge variant="secondary">18 articles</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Sleep & Wellness</span>
                        <Badge variant="secondary">15 articles</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Social Connection</span>
                        <Badge variant="secondary">12 articles</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4">Content Actions</h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Add New Article
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Content Analytics
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Forum Moderation
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;