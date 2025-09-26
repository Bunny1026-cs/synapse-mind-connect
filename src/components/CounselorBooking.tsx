import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Star, Clock, Video, MessageCircle, Calendar as CalendarIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Counselor {
  id: string;
  name: string;
  title: string;
  specialization: string[];
  rating: number;
  experience: string;
  approach: string;
  avatar: string;
  availability: string[];
  nextAvailable: string;
}

interface CounselorBookingProps {
  onNavigate: (page: string, data?: any) => void;
  userData?: any;
  assessmentResults?: any;
  fromChat?: boolean;
  emergency?: boolean;
}

const counselors: Counselor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    title: 'Licensed Clinical Psychologist',
    specialization: ['Anxiety', 'Academic Stress', 'Perfectionism'],
    rating: 4.9,
    experience: '8 years',
    approach: 'Cognitive Behavioral Therapy (CBT) with mindfulness techniques',
    avatar: 'SC',
    availability: ['Mon 2-5pm', 'Wed 10am-3pm', 'Fri 1-4pm'],
    nextAvailable: 'Today 3:00 PM'
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    title: 'Licensed Professional Counselor',
    specialization: ['Depression', 'Mood Disorders', 'Life Transitions'],
    rating: 4.8,
    experience: '6 years',
    approach: 'Person-centered therapy with strength-based interventions',
    avatar: 'MR',
    availability: ['Tue 9am-12pm', 'Thu 2-6pm', 'Sat 10am-2pm'],
    nextAvailable: 'Tomorrow 10:00 AM'
  },
  {
    id: '3',
    name: 'Dr. Priya Patel',
    title: 'Licensed Marriage & Family Therapist',
    specialization: ['Relationships', 'Social Issues', 'Family Dynamics'],
    rating: 4.9,
    experience: '10 years',
    approach: 'Emotionally Focused Therapy (EFT) and systems therapy',
    avatar: 'PP',
    availability: ['Mon 1-5pm', 'Wed 9am-1pm', 'Thu 3-7pm'],
    nextAvailable: 'Today 4:30 PM'
  },
  {
    id: '4',
    name: 'James Thompson',
    title: 'Licensed Clinical Social Worker',
    specialization: ['ADHD', 'Learning Support', 'Executive Functioning'],
    rating: 4.7,
    experience: '7 years',
    approach: 'Solution-focused therapy with practical skill building',
    avatar: 'JT',
    availability: ['Tue 11am-4pm', 'Fri 9am-2pm', 'Sat 1-5pm'],
    nextAvailable: 'Wednesday 11:00 AM'
  },
  {
    id: '5',
    name: 'Dr. Maria Santos',
    title: 'Licensed Clinical Psychologist',
    specialization: ['Trauma', 'PTSD', 'Crisis Intervention'],
    rating: 4.9,
    experience: '12 years',
    approach: 'EMDR and trauma-informed cognitive therapy',
    avatar: 'MS',
    availability: ['Mon 9am-12pm', 'Wed 2-6pm', 'Fri 10am-3pm'],
    nextAvailable: 'Today 2:00 PM'
  },
  {
    id: '6',
    name: 'David Kim',
    title: 'Licensed Professional Counselor',
    specialization: ['LGBTQ+ Support', 'Identity', 'Belonging'],
    rating: 4.8,
    experience: '5 years',
    approach: 'Affirmative therapy with multicultural competence',
    avatar: 'DK',
    availability: ['Tue 1-6pm', 'Thu 10am-3pm', 'Sat 9am-1pm'],
    nextAvailable: 'Thursday 2:00 PM'
  }
];

const CounselorBooking: React.FC<CounselorBookingProps> = ({ 
  onNavigate, 
  userData, 
  assessmentResults, 
  fromChat, 
  emergency 
}) => {
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookingStep, setBookingStep] = useState<'list' | 'calendar' | 'confirmation'>('list');
  const { toast } = useToast();

  const getRecommendedCounselors = () => {
    if (emergency || assessmentResults?.recommendation === 'crisis') {
      return counselors.filter(c => c.specialization.includes('Trauma') || c.specialization.includes('Crisis Intervention'));
    }
    
    if (assessmentResults?.severity === 'High' || assessmentResults?.severity === 'Moderate') {
      return counselors.filter(c => 
        c.specialization.includes('Depression') || 
        c.specialization.includes('Anxiety') ||
        c.specialization.includes('Mood Disorders')
      );
    }
    
    return counselors;
  };

  const recommendedCounselors = getRecommendedCounselors();
  const otherCounselors = counselors.filter(c => !recommendedCounselors.includes(c));

  const availableTimes = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const handleBookingConfirm = () => {
    if (!selectedCounselor || !selectedDate || !selectedTime) {
      toast({
        title: "Please complete your booking",
        description: "Select a date and time to continue.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Session Booked Successfully!",
      description: `Your session with ${selectedCounselor.name} is scheduled for ${selectedDate.toLocaleDateString()} at ${selectedTime}.`
    });

    setBookingStep('confirmation');
  };

  if (bookingStep === 'confirmation') {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <Card className="glass border-0 shadow-medium">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-wellness-success rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarIcon className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-wellness-success">
                Session Booked Successfully!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <Avatar className="w-12 h-12 bg-primary">
                    <AvatarFallback className="text-white font-bold">
                      {selectedCounselor?.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <h3 className="font-semibold">{selectedCounselor?.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedCounselor?.title}</p>
                  </div>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Date:</span>
                      <p>{selectedDate?.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="font-medium">Time:</span>
                      <p>{selectedTime}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>✓ Confirmation email sent to {userData?.email}</p>
                  <p>✓ Calendar invitation added</p>
                  <p>✓ Session link will be sent 24 hours before</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="hero" 
                  className="flex-1"
                  onClick={() => onNavigate('dashboard', userData)}
                >
                  Go to Dashboard
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => onNavigate('chatbot', {userData, assessmentResults})}
                >
                  Continue Chatting
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (bookingStep === 'calendar' && selectedCounselor) {
    return (
      <div className="min-h-screen bg-gradient-hero p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="glass border-0 shadow-medium">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={() => setBookingStep('list')}
                  className="p-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <CardTitle>Book Session with {selectedCounselor.name}</CardTitle>
                <div></div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4">Select Date</h3>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0} // Disable past dates and Sundays
                    className="glass rounded-md border p-3"
                  />
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4">Available Times</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {availableTimes.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "wellness" : "outline"}
                        onClick={() => setSelectedTime(time)}
                        className="justify-start"
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        {time}
                      </Button>
                    ))}
                  </div>
                  
                  {selectedDate && selectedTime && (
                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium mb-2">Session Details</h4>
                      <div className="text-sm space-y-1">
                        <p>📅 {selectedDate.toLocaleDateString()}</p>
                        <p>⏰ {selectedTime}</p>
                        <p>📹 Video session (link will be provided)</p>
                        <p>⏱️ 50 minutes</p>
                      </div>
                      
                      <Button 
                        variant="hero" 
                        className="w-full mt-4"
                        onClick={handleBookingConfirm}
                      >
                        Confirm Booking
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="max-w-6xl mx-auto">
        <Card className="glass border-0 shadow-medium mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => onNavigate(fromChat ? 'chatbot' : 'dashboard', {userData, assessmentResults})}
                className="p-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="text-center">
                <CardTitle className="text-2xl">
                  {emergency ? 'Crisis Support - Available Now' : 'Professional Counselors'}
                </CardTitle>
                <p className="text-muted-foreground">
                  Licensed mental health professionals specializing in student wellness
                </p>
              </div>
              <div></div>
            </div>
          </CardHeader>
        </Card>

        {emergency && (
          <Card className="glass border-0 shadow-medium mb-6 border-l-4 border-l-wellness-danger">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-wellness-danger rounded-full flex items-center justify-center">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-wellness-danger">Crisis Support Available</h3>
                  <p className="text-sm text-muted-foreground">
                    Priority booking - A counselor will contact you within 15 minutes
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {recommendedCounselors.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Star className="h-5 w-5 mr-2 text-wellness-warning" />
              Recommended for You
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedCounselors.map((counselor) => (
                <Card key={counselor.id} className="glass border-0 shadow-soft hover:shadow-medium transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3 mb-4">
                      <Avatar className="w-12 h-12 bg-primary">
                        <AvatarFallback className="text-white font-bold">
                          {counselor.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">{counselor.name}</h3>
                        <p className="text-sm text-muted-foreground">{counselor.title}</p>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-wellness-warning fill-current" />
                          <span className="text-sm ml-1">{counselor.rating}</span>
                          <span className="text-xs text-muted-foreground ml-2">{counselor.experience}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {counselor.specialization.map((spec) => (
                          <Badge key={spec} variant="secondary" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {counselor.approach}
                      </p>
                    </div>
                    
                    <div className="mb-4 text-sm">
                      <p className="font-medium text-wellness-success">
                        Next available: {counselor.nextAvailable}
                      </p>
                    </div>
                    
                    <Button 
                      variant="wellness" 
                      className="w-full"
                      onClick={() => {
                        setSelectedCounselor(counselor);
                        setBookingStep('calendar');
                      }}
                    >
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Book Session
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {otherCounselors.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">All Counselors</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherCounselors.map((counselor) => (
                <Card key={counselor.id} className="glass border-0 shadow-soft hover:shadow-medium transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3 mb-4">
                      <Avatar className="w-12 h-12 bg-secondary">
                        <AvatarFallback className="text-white font-bold">
                          {counselor.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">{counselor.name}</h3>
                        <p className="text-sm text-muted-foreground">{counselor.title}</p>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-wellness-warning fill-current" />
                          <span className="text-sm ml-1">{counselor.rating}</span>
                          <span className="text-xs text-muted-foreground ml-2">{counselor.experience}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {counselor.specialization.map((spec) => (
                          <Badge key={spec} variant="secondary" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {counselor.approach}
                      </p>
                    </div>
                    
                    <div className="mb-4 text-sm">
                      <p className="font-medium text-wellness-success">
                        Next available: {counselor.nextAvailable}
                      </p>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setSelectedCounselor(counselor);
                        setBookingStep('calendar');
                      }}
                    >
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Book Session
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CounselorBooking;