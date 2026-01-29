import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      academyName,
      contactName,
      email,
      phone,
      city,
      country,
      preferredDates,
      numberOfParticipants,
      message,
    } = body;

    // Validate required fields
    if (!academyName || !contactName || !email || !phone || !city || !country || !preferredDates || !numberOfParticipants || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          academy_name: academyName,
          contact_name: contactName,
          email,
          phone,
          city,
          country,
          preferred_dates: preferredDates,
          number_of_participants: numberOfParticipants,
          message,
          status: 'pending',
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save booking' },
        { status: 500 }
      );
    }

    // Send email notification using Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(resendApiKey);

        await resend.emails.send({
          from: 'FD Boxing <onboarding@resend.dev>', // You should verify your domain in Resend
          to: 'rafacaicedo@hotmail.com',
          subject: `New Seminar Booking: ${academyName}`,
          html: `
            <h1>New Seminar Booking Request</h1>
            <p><strong>Academy:</strong> ${academyName}</p>
            <p><strong>Contact:</strong> ${contactName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Location:</strong> ${city}, ${country}</p>
            <p><strong>Preferred Dates:</strong> ${preferredDates}</p>
            <p><strong>Participants:</strong> ${numberOfParticipants}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
        // We don't return error here because the booking was already saved to DB
      }
    } else {
      console.warn('RESEND_API_KEY missing. Email notification skipped.');
    }

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch bookings' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
