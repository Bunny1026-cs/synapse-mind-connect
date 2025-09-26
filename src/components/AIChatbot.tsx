import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Send, ArrowLeft, Calendar, BookOpen, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: string[];
}

interface AIChatbotProps {
  onNavigate: (page: string, data?: any) => void;
  userData?: any;
  assessmentResults?: any;
}

const aiPersonalities = [
  {
    id: 'riley',
    name: 'Riley',
    description: 'Friendly and encouraging, specializes in academic stress',
    avatar: 'R',
    color: 'bg-primary',
    greeting: "Hi there! I'm Riley, and I'm here to help you navigate academic challenges with a positive outlook. What's on your mind today?"
  },
  {
    id: 'sam',
    name: 'Sam',
    description: 'Calm and analytical, specializes in anxiety management',
    avatar: 'S',
    color: 'bg-wellness-calm',
    greeting: "Hello, I'm Sam. I take a thoughtful, step-by-step approach to understanding anxiety and finding practical solutions. How can I support you?"
  },
  {
    id: 'alex',
    name: 'Alex',
    description: 'Warm and empathetic, specializes in relationship/social issues',
    avatar: 'A',
    color: 'bg-secondary',
    greeting: "Hey! I'm Alex, and I believe in the power of connection and understanding. I'm here to listen and help you work through social challenges. What would you like to talk about?"
  }
];

const AIChatbot: React.FC<AIChatbotProps> = ({ onNavigate, userData, assessmentResults }) => {
  const [selectedPersonality, setSelectedPersonality] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string, personality: any): { text: string; suggestions?: string[] } => {
    const lowerMessage = userMessage.toLowerCase();
    let response = '';
    let suggestions: string[] = [];

    // Response based on personality and keywords
    if (lowerMessage.includes('anxious') || lowerMessage.includes('worried') || lowerMessage.includes('stress')) {
      if (personality.id === 'sam') {
        response = "I understand you're feeling anxious. Let's break this down together. Anxiety often feels overwhelming, but we can manage it step by step. What specific situation is causing you the most worry right now?";
        suggestions = ["Tell me about the situation", "I need breathing exercises", "I want to talk to a counselor"];
      } else if (personality.id === 'riley') {
        response = "I hear that you're feeling stressed, and that's completely normal! You're dealing with a lot, and it's okay to feel overwhelmed sometimes. Remember, you've overcome challenges before, and you can do it again. What's the biggest stressor for you right now?";
        suggestions = ["Academic pressure", "Time management", "Upcoming exams"];
      } else {
        response = "It sounds like you're carrying a heavy emotional load right now. That's really tough, and I want you to know that your feelings are completely valid. Sometimes talking through our worries can help lighten that burden. What's weighing on your heart?";
        suggestions = ["I feel isolated", "Relationship issues", "I need support"];
      }
    } else if (lowerMessage.includes('study') || lowerMessage.includes('exam') || lowerMessage.includes('academic')) {
      if (personality.id === 'riley') {
        response = "Academic challenges are my specialty! I love helping students find their stride. It sounds like you're dealing with some study-related stress. The good news is that there are tons of effective strategies we can explore together. What's your biggest academic challenge right now?";
        suggestions = ["Can't focus", "Too much workload", "Procrastination"];
      } else {
        response = "Academic pressure can really impact our overall well-being. It's important to find balance and healthy study habits. What aspect of your studies is causing you the most concern?";
        suggestions = ["Study strategies", "Time management", "Motivation"];
      }
    } else if (lowerMessage.includes('lonely') || lowerMessage.includes('social') || lowerMessage.includes('friends')) {
      if (personality.id === 'alex') {
        response = "Connection and belonging are so important, especially in college. It's brave of you to reach out about this. Feeling lonely doesn't mean there's anything wrong with you - it's a very human experience. Let's talk about what social connection means to you and how we can work on building those relationships.";
        suggestions = ["Making new friends", "Social anxiety", "I feel left out"];
      } else {
        response = "Social challenges can be really difficult to navigate. It's important to remember that many students feel this way. What social situation would you like to work on?";
        suggestions = ["Meeting people", "Social confidence", "Relationship advice"];
      }
    } else if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('down')) {
      response = "I'm really glad you felt comfortable sharing this with me. Feeling sad or down is a signal that you need support, and reaching out shows real strength. You don't have to face these feelings alone. Can you tell me a bit more about what's been bringing you down lately?";
      suggestions = ["I feel hopeless", "Nothing interests me", "I want professional help"];
    } else {
      // Default responses based on personality
      if (personality.id === 'riley') {
        response = "That's interesting! I love how you're thinking through this. As someone who focuses on the positive side of challenges, I'm curious to hear more about your perspective. What would you like to explore together?";
      } else if (personality.id === 'sam') {
        response = "I appreciate you sharing that with me. Let me think through this carefully with you. What's the main thing you'd like to understand or work on regarding this situation?";
      } else {
        response = "Thank you for opening up about that. I can sense there's more to explore here, and I'm here to listen and support you through whatever you're experiencing. What feels most important to discuss right now?";
      }
      suggestions = ["I need study help", "I'm feeling anxious", "I want to talk to someone", "Tell me about resources"];
    }

    // Add counselor suggestions for certain keywords
    if (lowerMessage.includes('professional') || lowerMessage.includes('counselor') || lowerMessage.includes('therapist') || assessmentResults?.severity === 'Moderate' || assessmentResults?.severity === 'High') {
      suggestions.push("Book a counseling session");
    }

    return { text: response, suggestions };
  };

  const handlePersonalitySelect = (personalityId: string) => {
    const personality = aiPersonalities.find(p => p.id === personalityId);
    if (personality) {
      setSelectedPersonality(personalityId);
      const greetingMessage: Message = {
        id: Date.now().toString(),
        text: personality.greeting,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages([greetingMessage]);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedPersonality) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    const personality = aiPersonalities.find(p => p.id === selectedPersonality);
    
    setTimeout(() => {
      const aiResponse = generateAIResponse(newMessage, personality);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        sender: 'ai',
        timestamp: new Date(),
        suggestions: aiResponse.suggestions
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion === "Book a counseling session") {
      onNavigate('counselors', { userData, assessmentResults, fromChat: true });
      return;
    }
    
    setNewMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!selectedPersonality) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          <Card className="glass border-0 shadow-medium">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-2">Choose Your AI Companion</CardTitle>
              <p className="text-muted-foreground">
                Each companion has their own personality and areas of expertise. 
                Pick the one that feels right for your current needs.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {aiPersonalities.map((personality) => (
                  <Card 
                    key={personality.id} 
                    className="cursor-pointer hover:shadow-medium transition-all duration-300 border-0 glass hover:scale-105"
                    onClick={() => handlePersonalitySelect(personality.id)}
                  >
                    <CardContent className="p-6 text-center">
                      <Avatar className={`w-16 h-16 mx-auto mb-4 ${personality.color}`}>
                        <AvatarFallback className="text-white text-2xl font-bold">
                          {personality.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold text-lg mb-2">{personality.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {personality.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Button
                  variant="ghost"
                  onClick={() => onNavigate('dashboard', userData)}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentPersonality = aiPersonalities.find(p => p.id === selectedPersonality);

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      {/* Header */}
      <div className="glass border-b border-glass-border">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                onClick={() => setSelectedPersonality(null)}
                className="p-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Avatar className={`w-10 h-10 ${currentPersonality?.color}`}>
                <AvatarFallback className="text-white font-bold">
                  {currentPersonality?.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">{currentPersonality?.name}</h2>
                <p className="text-sm text-muted-foreground">AI Companion</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onNavigate('counselors', { userData, assessmentResults, fromChat: true })}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Book Counselor
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-6 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                <div
                  className={`p-4 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'glass'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                
                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {message.suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="glass p-4 rounded-lg max-w-[80%]">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="glass rounded-lg p-4">
          <div className="flex space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message ${currentPersonality?.name}...`}
              className="flex-1 border-0 bg-transparent"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || isTyping}
              variant="wellness"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;