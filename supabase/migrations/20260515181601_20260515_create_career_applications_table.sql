/*
  # Create career_applications (other_positions_applications) table

  1. New Tables
    - `career_applications`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `email` (text)
      - `phone_number` (text)
      - `city_state` (text)
      - `linkedin_profile` (text)
      - `position` (text)
      - `years_experience` (text)
      - `educational_background` (text)
      - `professional_experience` (text)
      - `schedule_availability` (text)
      - `position_type` (text)
      - `start_date` (date)
      - `motivation_join` (text)
      - `strong_fit` (text)
      - `additional_info` (text)
      - `resume_url` (text)
      - `certifications_url` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `career_applications` table
    - Add policy to allow anyone to create career applications
    - Add policy to allow authenticated users to view all applications (for admins)
*/

CREATE TABLE IF NOT EXISTS career_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone_number text,
  city_state text,
  linkedin_profile text,
  position text NOT NULL,
  years_experience text,
  educational_background text NOT NULL,
  professional_experience text NOT NULL,
  schedule_availability text NOT NULL,
  position_type text NOT NULL,
  start_date date NOT NULL,
  motivation_join text NOT NULL,
  strong_fit text NOT NULL,
  additional_info text,
  resume_url text NOT NULL,
  certifications_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE career_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create career applications"
  ON career_applications
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all career applications"
  ON career_applications
  FOR SELECT
  TO authenticated
  USING (true);
