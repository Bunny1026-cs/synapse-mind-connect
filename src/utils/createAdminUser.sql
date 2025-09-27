-- This script creates an admin user for testing
-- Run this in your Supabase SQL editor to create an admin account

-- First, you need to manually create a user account through Supabase Auth
-- Then run this script with the actual user ID

-- Example: Replace 'USER_ID_HERE' with the actual UUID of your admin user
INSERT INTO public.user_roles (user_id, role) 
VALUES ('USER_ID_HERE', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;

-- Alternative: Update an existing user to admin
-- UPDATE public.user_roles 
-- SET role = 'admin' 
-- WHERE user_id = 'USER_ID_HERE';