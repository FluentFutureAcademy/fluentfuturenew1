/*
  # Create/Update teacher_applications table

  1. New Tables
    - `teacher_applications`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `email` (text)
      - `phone_number` (text)
      - `city_state` (text)
      - `linkedin_profile` (text)
      - `resume_url` (text)
      - `languages_speak` (text)
      - `languages_teach` (text)
      - `proficiency` (text)
      - `program_interest` (text)
      - `specific_subject` (text)
      - `age_group` (text)
      - `level` (text)
      - `years_experience` (integer)
      - `professional_education_exp` (boolean)
      - `educational_background` (text)
      - `teaching_mode` (text)
      - `previous_experience` (text)
      - `professional_experience` (text)
      - `schedule_availability` (text)
      - `position_type` (text)
      - `start_date` (date)
      - `willing_travel` (text)
      - `travel_distance` (text)
      - `motivation_join` (text)
      - `strong_fit` (text)
      - `additional_info` (text)
      - `certifications_url` (text)
      - `sample_lesson_url` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `teacher_applications` table
    - Add policy to allow anyone to create teacher applications
    - Add policy to allow authenticated users to view all applications
*/

CREATE TABLE IF NOT EXISTS teacher_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone_number text,
  city_state text,
  linkedin_profile text,
  resume_url text NOT NULL,
  languages_speak text NOT NULL,
  languages_teach text NOT NULL,
  proficiency text,
  program_interest text,
  specific_subject text NOT NULL,
  age_group text NOT NULL,
  level text,
  years_experience integer,
  professional_education_exp boolean,
  educational_background text NOT NULL,
  teaching_mode text,
  previous_experience text NOT NULL,
  professional_experience text,
  schedule_availability text NOT NULL,
  position_type text NOT NULL,
  start_date date NOT NULL,
  willing_travel text,
  travel_distance text,
  motivation_join text NOT NULL,
  strong_fit text NOT NULL,
  additional_info text,
  certifications_url text,
  sample_lesson_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE teacher_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create teacher applications"
  ON teacher_applications
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all teacher applications"
  ON teacher_applications
  FOR SELECT
  TO authenticated
  USING (true);
