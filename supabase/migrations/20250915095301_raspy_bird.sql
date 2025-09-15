/*
  # Create job applications table

  1. New Tables
    - `job_applications`
      - `id` (uuid, primary key)
      - `name` (text, required) - Applicant's full name
      - `email` (text, required) - Email address
      - `mobile` (text, required) - Mobile number
      - `java_experience` (text, required) - Java experience level
      - `graduation_year` (text, required) - Year of graduation
      - `current_location` (text, required) - Current location
      - `preferred_location` (text) - Preferred work location
      - `notice_period` (text) - Notice period
      - `previous_company` (text) - Previous company name
      - `relevant_skills` (text) - Relevant skills and technologies
      - `additional_comments` (text) - Additional comments
      - `resume_url` (text) - URL to resume file
      - `applied_at` (timestamptz) - Application timestamp
      - `created_at` (timestamptz) - Record creation time
      - `updated_at` (timestamptz) - Record update time

  2. Security
    - Enable RLS on `job_applications` table
    - Add policy for public insert access (anyone can apply)
    - Add policy for authenticated read access (admin can view applications)
*/

CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  mobile text NOT NULL,
  java_experience text NOT NULL,
  graduation_year text NOT NULL,
  current_location text NOT NULL,
  preferred_location text,
  notice_period text,
  previous_company text,
  relevant_skills text,
  additional_comments text,
  resume_url text,
  applied_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to submit job applications
CREATE POLICY "Anyone can submit job applications"
  ON job_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy to allow authenticated users to view all applications (for admin)
CREATE POLICY "Authenticated users can view all applications"
  ON job_applications
  FOR SELECT
  TO authenticated
  USING (true);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS job_applications_email_idx ON job_applications(email);

-- Create an index on applied_at for sorting
CREATE INDEX IF NOT EXISTS job_applications_applied_at_idx ON job_applications(applied_at DESC);