import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Brain, ArrowLeft, ArrowRight, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WellnessAssessmentProps {
  onNavigate: (page: string, data?: any) => void;
  userData?: any;
}

const assessmentQuestions = [
  {
    id: 1,
    question: "Over the last 2 weeks, how often have you felt down, depressed, or hopeless?",
    category: "mood"
  },
  {
    id: 2,
    question: "How often have you felt nervous, anxious, or on edge?",
    category: "anxiety"
  },
  {
    id: 3,
    question: "How often have you had trouble sleeping or sleeping too much?",
    category: "sleep"
  },
  {
    id: 4,
    question: "How often have you felt tired or had little energy?",
    category: "energy"
  },
  {
    id: 5,
    question: "How often have you had trouble concentrating on tasks or studies?",
    category: "concentration"
  },
  {
    id: 6,
    question: "How often have you felt bad about yourself or that you're a failure?",
    category: "self-worth"
  },
  {
    id: 7,
    question: "How often have you had trouble relaxing or feeling restless?",
    category: "restlessness"
  },
  {
    id: 8,
    question: "How often have you been worrying about different things?",
    category: "worry"
  }
];

const answerOptions = [
  { value: "0", label: "Not at all", points: 0 },
  { value: "1", label: "Several days", points: 1 },
  { value: "2", label: "More than half the days", points: 2 },
  { value: "3", label: "Nearly every day", points: 3 }
];

const WellnessAssessment: React.FC<WellnessAssessmentProps> = ({ onNavigate, userData }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const totalQuestions = assessmentQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleAnswer = (questionId: number, value: string) => {
    const points = parseInt(value);
    setAnswers(prev => ({ ...prev, [questionId]: points }));
  };

  const handleNext = () => {
    const currentQuestionId = assessmentQuestions[currentQuestion].id;
    if (!(currentQuestionId in answers)) {
      toast({
        title: "Please select an answer",
        variant: "destructive"
      });
      return;
    }

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateResults = () => {
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    const maxScore = totalQuestions * 3;
    const percentage = (totalScore / maxScore) * 100;

    let severity = "Low";
    let recommendation = "chat";
    let message = "You're doing well! Continue with self-care practices.";
    let nextSteps = ["Try our AI companion for daily check-ins", "Explore our wellness resources"];

    if (percentage >= 30 && percentage < 50) {
      severity = "Mild";
      message = "You may be experiencing some challenges. Consider talking to someone.";
      nextSteps = ["Chat with our AI companion for personalized support", "Consider booking a counseling session"];
    } else if (percentage >= 50 && percentage < 70) {
      severity = "Moderate";
      recommendation = "counselor";
      message = "You're experiencing significant challenges. Professional support is recommended.";
      nextSteps = ["Book a session with a professional counselor", "Connect with our AI companion for immediate support"];
    } else if (percentage >= 70) {
      severity = "High";
      recommendation = "crisis";
      message = "You may be experiencing severe symptoms. Immediate support is available.";
      nextSteps = ["Get immediate professional help", "Access crisis intervention resources"];
    }

    // Check for crisis indicators (multiple high scores)
    const highScores = Object.values(answers).filter(score => score >= 3).length;
    if (highScores >= 4) {
      recommendation = "crisis";
    }

    const results = {
      totalScore,
      maxScore,
      percentage,
      severity,
      recommendation,
      message,
      nextSteps,
      userData
    };

    if (recommendation === "crisis") {
      onNavigate('crisis', results);
    } else {
      setShowResults(true);
      // Store results for later use
      localStorage.setItem('assessmentResults', JSON.stringify(results));
    }
  };

  const getResultsColor = () => {
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    const percentage = (totalScore / (totalQuestions * 3)) * 100;
    
    if (percentage < 30) return "wellness-success";
    if (percentage < 50) return "wellness-warning";
    if (percentage < 70) return "wellness-warning";
    return "wellness-danger";
  };

  if (showResults) {
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    const percentage = (totalScore / (totalQuestions * 3)) * 100;
    
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <Card className="glass border-0 shadow-medium">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Your Wellness Assessment Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className={`text-4xl font-bold ${getResultsColor()} mb-2`}>
                  {Math.round(percentage)}%
                </div>
                <p className="text-lg text-muted-foreground">
                  {percentage < 30 ? "You're managing well" : 
                   percentage < 50 ? "Some areas need attention" :
                   percentage < 70 ? "Significant challenges detected" :
                   "High level of concern"}
                </p>
              </div>

              <div className="grid gap-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <h3 className="font-semibold mb-2">Recommended next steps:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Connect with our AI wellness companion</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span>Explore our educational resources</span>
                    </li>
                    {percentage >= 30 && (
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span>Consider booking a counseling session</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="hero" 
                  className="flex-1"
                  onClick={() => onNavigate('chatbot', {userData, assessmentResults: JSON.parse(localStorage.getItem('assessmentResults') || '{}')})}
                >
                  Chat with AI Companion
                </Button>
                <Button 
                  variant="wellness" 
                  className="flex-1"
                  onClick={() => onNavigate('counselors', {userData, assessmentResults: JSON.parse(localStorage.getItem('assessmentResults') || '{}')})}
                >
                  Find a Counselor
                </Button>
              </div>

              <Button
                variant="ghost"
                onClick={() => onNavigate('dashboard', userData)}
                className="w-full"
              >
                Continue to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const question = assessmentQuestions[currentQuestion];
  const currentAnswer = answers[question.id]?.toString() || "";

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <Card className="glass border-0 shadow-medium">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                onClick={() => onNavigate('login')}
                className="p-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {totalQuestions}
              </div>
            </div>
            <Progress value={progress} className="mb-4" />
            <CardTitle className="text-center">
              {userData?.isNewUser ? "Welcome! Let's start with a wellness check-in" : "Let's check in on your wellness"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <h2 className="text-lg font-medium mb-6">{question.question}</h2>
              
              <RadioGroup 
                value={currentAnswer} 
                onValueChange={(value) => handleAnswer(question.id, value)}
                className="space-y-3"
              >
                {answerOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={option.value} id={`q${question.id}-${option.value}`} />
                    <Label 
                      htmlFor={`q${question.id}-${option.value}`} 
                      className="flex-1 text-left cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              <Button
                variant="wellness"
                onClick={handleNext}
                disabled={!currentAnswer}
              >
                {currentQuestion === totalQuestions - 1 ? "View Results" : "Next"}
                {currentQuestion < totalQuestions - 1 && <ArrowRight className="h-4 w-4 ml-2" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WellnessAssessment;