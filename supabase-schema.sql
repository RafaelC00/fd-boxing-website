-- FD-Boxing Database Schema for Supabase
-- Run this SQL in your Supabase SQL Editor to set up the database

-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    academy_name TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    preferred_dates TEXT NOT NULL,
    number_of_participants INTEGER NOT NULL CHECK (number_of_participants >= 5),
    message TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'rejected'))
);

-- Create tour_dates table
CREATE TABLE IF NOT EXISTS public.tour_dates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    date DATE NOT NULL,
    end_date DATE,
    venue TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('confirmed', 'pending', 'available')),
    spots_available INTEGER,
    description TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tour_dates ENABLE ROW LEVEL SECURITY;

-- Create policies for bookings table
-- Allow anyone to insert bookings (public form submissions)
CREATE POLICY "Anyone can insert bookings"
ON public.bookings FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated users (admin) can view all bookings
CREATE POLICY "Only authenticated users can view bookings"
ON public.bookings FOR SELECT
TO authenticated
USING (true);

-- Only authenticated users (admin) can update bookings
CREATE POLICY "Only authenticated users can update bookings"
ON public.bookings FOR UPDATE
TO authenticated
USING (true);

-- Create policies for tour_dates table
-- Allow anyone to view tour dates
CREATE POLICY "Anyone can view tour dates"
ON public.tour_dates FOR SELECT
TO anon, authenticated
USING (true);

-- Only authenticated users (admin) can insert tour dates
CREATE POLICY "Only authenticated users can insert tour dates"
ON public.tour_dates FOR INSERT
TO authenticated
WITH CHECK (true);

-- Only authenticated users (admin) can update tour dates
CREATE POLICY "Only authenticated users can update tour dates"
ON public.tour_dates FOR UPDATE
TO authenticated
USING (true);

-- Only authenticated users (admin) can delete tour dates
CREATE POLICY "Only authenticated users can delete tour dates"
ON public.tour_dates FOR DELETE
TO authenticated
USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS bookings_created_at_idx ON public.bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS bookings_status_idx ON public.bookings(status);
CREATE INDEX IF NOT EXISTS tour_dates_date_idx ON public.tour_dates(date);
CREATE INDEX IF NOT EXISTS tour_dates_status_idx ON public.tour_dates(status);

-- Insert sample tour dates (optional - remove if you don't want sample data)
INSERT INTO public.tour_dates (city, country, date, end_date, venue, status, spots_available, description)
VALUES
    ('Barcelona', 'Spain', '2026-03-15', '2026-03-16', 'Elite Boxing Academy', 'confirmed', 25, '2-day intensive seminar covering fundamentals to advanced techniques'),
    ('Paris', 'France', '2026-03-22', '2026-03-23', 'Paris Fight Club', 'confirmed', 30, 'Technical boxing masterclass'),
    ('Berlin', 'Germany', '2026-04-05', NULL, 'TBA', 'pending', NULL, 'Venue and details to be confirmed'),
    ('Amsterdam', 'Netherlands', '2026-04-12', NULL, 'Available', 'available', NULL, 'Open date - book your academy now!'),
    ('Rome', 'Italy', '2026-04-19', '2026-04-20', 'Roman Boxing Center', 'confirmed', 20, 'Weekend intensive training'),
    ('London', 'United Kingdom', '2026-05-03', NULL, 'Available', 'available', NULL, 'Open date - be the first to book!');
