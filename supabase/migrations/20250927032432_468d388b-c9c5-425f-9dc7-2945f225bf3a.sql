-- Insert sample counselors data
INSERT INTO public.counselors (name, specialization, bio, image_url, rating, total_sessions) VALUES
('Dr. Sarah Chen', 'Anxiety & Depression', 'Specialized in cognitive behavioral therapy with over 10 years of experience helping students manage anxiety and depression.', NULL, 4.9, 150),
('Dr. Michael Rodriguez', 'Academic Stress', 'Expert in academic counseling and stress management techniques specifically designed for university students.', NULL, 4.8, 120),
('Dr. Emily Johnson', 'Crisis Intervention', 'Crisis counselor with extensive training in immediate intervention and safety planning for students in crisis.', NULL, 5.0, 89),
('Dr. David Kim', 'Mindfulness & Wellness', 'Mindfulness-based therapy specialist helping students develop healthy coping mechanisms and self-care practices.', NULL, 4.7, 200),
('Dr. Lisa Thompson', 'Relationship Counseling', 'Specializes in interpersonal relationships, social anxiety, and helping students build healthy connections.', NULL, 4.9, 95);

-- Insert sample wellness resources
INSERT INTO public.wellness_resources (title, description, category, resource_type, content_url, is_crisis_resource) VALUES
('National Crisis Text Line', 'Text HOME to 741741 for immediate crisis support', 'Crisis Support', 'contact', 'https://www.crisistextline.org', true),
('National Suicide Prevention Lifeline', 'Call 988 for immediate help in a mental health crisis', 'Crisis Support', 'contact', 'https://suicidepreventionlifeline.org', true),
('Breathing Exercises for Anxiety', 'Simple breathing techniques to manage anxiety and panic attacks', 'Anxiety Management', 'exercise', NULL, false),
('Sleep Hygiene Guide', 'Tips for better sleep quality and establishing healthy sleep routines', 'Sleep Health', 'article', NULL, false),
('Mindfulness Meditation Videos', 'Guided meditation sessions for stress relief and mindfulness practice', 'Mindfulness', 'video', 'https://example.com/meditation', false),
('Academic Planning Tools', 'Resources for managing coursework, deadlines, and academic stress', 'Academic Support', 'tool', NULL, false),
('Campus Mental Health Services', 'How to access counseling and mental health resources on campus', 'Campus Resources', 'article', NULL, false);