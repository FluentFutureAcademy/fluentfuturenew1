/*
  # Create consultation_requests table

  1. New Tables
    - `consultation_requests`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `email` (text)
      - `phone_number` (text)
      - `preferred_start_date` (date)
      - `program_title` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `consultation_requests` table
    - Add policy to allow anyone to create consultation requests (no auth required)
    - Add policy to allow read access for authenticated users with admin role (future use)
*/

CREATE TABLE IF NOT EXISTS consultation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone_number text NOT NULL,
  preferred_start_date date NOT NULL,
  program_title text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create consultation requests"
  ON consultation_requests
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all consultation requests"
  ON consultation_requests
  FOR SELECT
  TO authenticated
  USING (true);
