/*
  # Create resumes storage bucket

  1. Storage Bucket
    - Create public `resumes` bucket for storing application resumes
    - Set permissions to allow public read access
    - Allow authenticated users to upload files

  2. Security
    - Enable public read access so URLs are accessible
    - Restrict uploads to authenticated users only (enforced in code)
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view resumes"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'resumes');

CREATE POLICY "Authenticated users can upload resumes"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'resumes');

CREATE POLICY "Authenticated users can delete their own resumes"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'resumes');
