import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Phone, MessageCircle, Calendar, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CrisisInterventionProps {
  onNavigate: (page: string, data?: any) => void;
  assessmentData?: any;
}

const CrisisIntervention: React.FC<CrisisInterventionProps> = ({ onNavigate, assessmentData }) => {
  const { toast } = useToast();

  const handleEmergencyCall = () => {
    toast({
      title: "Emergency Services",
      description: "In a real emergency, call 911 immediately."
    });
  };

  const handleCrisisLine = () => {
    toast({
      title: "Crisis Helpline",
      description: "988 Suicide & Crisis Lifeline: Call or text 988"
    });
  };

  const handleEmergencyBooking = () => {
    toast({
      title: "Emergency Session Booked",
      description: "A counselor will contact you within 15 minutes."
    });
    onNavigate('counselors', { ...assessmentData, emergency: true });
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <Card className="glass border-0 shadow-medium border-l-4 border-l-wellness-danger">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-wellness-danger rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-wellness-danger">
              We're Here to Help You Right Now
            </CardTitle>
            <p className="text-lg text-muted-foreground">
              Your responses indicate you may be experiencing significant distress. 
              You don't have to face this alone.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-wellness-danger/10 border border-wellness-danger/20 rounded-lg p-6">
              <h3 className="font-semibold text-wellness-danger mb-3 flex items-center">
                <Heart className="h-5 w-5 mr-2" />
                Immediate Support Available
              </h3>
              <p className="text-sm text-muted-foreground">
                If you're having thoughts of hurting yourself or are in immediate danger, 
                please reach out for help right now. You matter, and support is available 24/7.
              </p>
            </div>

            <div className="grid gap-4">
              <Card className="border-wellness-danger/20">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-6 w-6 text-wellness-danger" />
                    <div className="flex-1">
                      <h4 className="font-semibold">24/7 Crisis Helpline</h4>
                      <p className="text-sm text-muted-foreground">
                        988 Suicide & Crisis Lifeline
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleCrisisLine}
                      className="border-wellness-danger text-wellness-danger hover:bg-wellness-danger hover:text-white"
                    >
                      Call/Text 988
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-wellness-warning/20">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-6 w-6 text-wellness-warning" />
                    <div className="flex-1">
                      <h4 className="font-semibold">Emergency Counseling</h4>
                      <p className="text-sm text-muted-foreground">
                        Immediate session with a crisis counselor
                      </p>
                    </div>
                    <Button 
                      variant="wellness"
                      size="sm"
                      onClick={handleEmergencyBooking}
                    >
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="h-6 w-6 text-primary" />
                    <div className="flex-1">
                      <h4 className="font-semibold">Crisis Text Line</h4>
                      <p className="text-sm text-muted-foreground">
                        Text HOME to 741741
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toast({
                        title: "Crisis Text Line",
                        description: "Text HOME to 741741 for support"
                      })}
                    >
                      Text Support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Campus Resources</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Campus Counseling Center: Available 24/7</p>
                <p>• Campus Security: Emergency escort services</p>
                <p>• Student Health Services: Medical support</p>
                <p>• Resident Advisor: On-campus support</p>
              </div>
            </div>

            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground mb-4">
                Remember: This crisis will pass. You are not alone, and help is available.
              </p>
              <Button
                variant="ghost"
                onClick={() => onNavigate('chatbot', assessmentData)}
                className="text-sm"
              >
                Continue to AI Support Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CrisisIntervention;