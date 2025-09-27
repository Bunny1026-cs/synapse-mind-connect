-- Create wellness assessments table
CREATE TABLE public.wellness_assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mood_rating INTEGER NOT NULL CHECK (mood_rating >= 1 AND mood_rating <= 10),
  energy_level INTEGER NOT NULL CHECK (energy_level >= 1 AND energy_level <= 10),
  stress_level INTEGER NOT NULL CHECK (stress_level >= 1 AND stress_level <= 10),
  sleep_quality INTEGER NOT NULL CHECK (sleep_quality >= 1 AND sleep_quality <= 10),
  social_connection INTEGER NOT NULL CHECK (social_connection >= 1 AND social_connection <= 10),
  academic_pressure INTEGER NOT NULL CHECK (academic_pressure >= 1 AND academic_pressure <= 10),
  overall_score DECIMAL(3,1) GENERATED ALWAYS AS ((mood_rating + energy_level + (11-stress_level) + sleep_quality + social_connection + (11-academic_pressure)) / 6.0) STORED,
  risk_level TEXT GENERATED ALWAYS AS (
    CASE 
      WHEN ((mood_rating + energy_level + (11-stress_level) + sleep_quality + social_connection + (11-academic_pressure)) / 6.0) >= 8 THEN 'low'
      WHEN ((mood_rating + energy_level + (11-stress_level) + sleep_quality + social_connection + (11-academic_pressure)) / 6.0) >= 6 THEN 'moderate'
      WHEN ((mood_rating + energy_level + (11-stress_level) + sleep_quality + social_connection + (11-academic_pressure)) / 6.0) >= 4 THEN 'high'
      ELSE 'critical'
    END
  ) STORED,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create counselors table
CREATE TABLE public.counselors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  specialization TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  availability JSONB DEFAULT '{}',
  rating DECIMAL(2,1) DEFAULT 5.0,
  total_sessions INTEGER DEFAULT 0,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create appointments table
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  counselor_id UUID NOT NULL REFERENCES public.counselors(id) ON DELETE CASCADE,
  appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no-show')),
  notes TEXT,
  is_emergency BOOLEAN DEFAULT false,
  meeting_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chat sessions table
CREATE TABLE public.chat_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT DEFAULT 'Chat Session',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'ended')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chat messages table
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create crisis interventions table
CREATE TABLE public.crisis_interventions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assessment_id UUID REFERENCES public.wellness_assessments(id),
  crisis_type TEXT NOT NULL,
  severity_level TEXT NOT NULL CHECK (severity_level IN ('low', 'moderate', 'high', 'critical')),
  intervention_taken TEXT NOT NULL,
  follow_up_required BOOLEAN DEFAULT true,
  follow_up_date TIMESTAMP WITH TIME ZONE,
  resolved BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create wellness resources table
CREATE TABLE public.wellness_resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  resource_type TEXT NOT NULL CHECK (resource_type IN ('article', 'video', 'exercise', 'tool', 'contact')),
  content_url TEXT,
  content TEXT,
  is_crisis_resource BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.wellness_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.counselors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crisis_interventions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wellness_resources ENABLE ROW LEVEL SECURITY;

-- RLS Policies for wellness_assessments
CREATE POLICY "Users can view their own assessments" 
ON public.wellness_assessments FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own assessments" 
ON public.wellness_assessments FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own assessments" 
ON public.wellness_assessments FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all assessments" 
ON public.wellness_assessments FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for counselors
CREATE POLICY "Everyone can view available counselors" 
ON public.counselors FOR SELECT 
USING (is_available = true);

CREATE POLICY "Admins can manage counselors" 
ON public.counselors FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for appointments
CREATE POLICY "Users can view their own appointments" 
ON public.appointments FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own appointments" 
ON public.appointments FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own appointments" 
ON public.appointments FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all appointments" 
ON public.appointments FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for chat_sessions
CREATE POLICY "Users can view their own chat sessions" 
ON public.chat_sessions FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own chat sessions" 
ON public.chat_sessions FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own chat sessions" 
ON public.chat_sessions FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for chat_messages
CREATE POLICY "Users can view messages from their sessions" 
ON public.chat_messages FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create messages in their sessions" 
ON public.chat_messages FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for crisis_interventions
CREATE POLICY "Users can view their own interventions" 
ON public.crisis_interventions FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own interventions" 
ON public.crisis_interventions FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all interventions" 
ON public.crisis_interventions FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage interventions" 
ON public.crisis_interventions FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for wellness_resources
CREATE POLICY "Everyone can view wellness resources" 
ON public.wellness_resources FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage wellness resources" 
ON public.wellness_resources FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Add triggers for updated_at columns
CREATE TRIGGER update_wellness_assessments_updated_at
  BEFORE UPDATE ON public.wellness_assessments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_counselors_updated_at
  BEFORE UPDATE ON public.counselors
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON public.appointments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_chat_sessions_updated_at
  BEFORE UPDATE ON public.chat_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_crisis_interventions_updated_at
  BEFORE UPDATE ON public.crisis_interventions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_wellness_resources_updated_at
  BEFORE UPDATE ON public.wellness_resources
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();