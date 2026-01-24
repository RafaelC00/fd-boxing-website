import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string;
          created_at: string;
          academy_name: string;
          contact_name: string;
          email: string;
          phone: string;
          city: string;
          country: string;
          preferred_dates: string;
          number_of_participants: number;
          message: string;
          status: 'pending' | 'confirmed' | 'rejected';
        };
        Insert: Omit<Database['public']['Tables']['bookings']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['bookings']['Insert']>;
      };
      tour_dates: {
        Row: {
          id: string;
          created_at: string;
          city: string;
          country: string;
          date: string;
          end_date: string | null;
          venue: string;
          status: 'confirmed' | 'pending' | 'available';
          spots_available: number | null;
          description: string | null;
        };
        Insert: Omit<Database['public']['Tables']['tour_dates']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['tour_dates']['Insert']>;
      };
    };
  };
}
