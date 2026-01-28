const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Basic .env.local parser
function loadEnv() {
    const envPath = path.resolve(__dirname, '../.env.local');
    if (!fs.existsSync(envPath)) return;
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase credentials missing in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const tourDates = [
    // Italy
    { city: 'Rome', country: 'Italy', date: '2026-05-15', venue: 'TBD', status: 'available' },
    { city: 'Milan', country: 'Italy', date: '2026-05-18', venue: 'TBD', status: 'available' },
    { city: 'Naples', country: 'Italy', date: '2026-05-21', venue: 'TBD', status: 'available' },
    { city: 'Florence', country: 'Italy', date: '2026-05-24', venue: 'TBD', status: 'available' },
    { city: 'Turin', country: 'Italy', date: '2026-05-27', venue: 'TBD', status: 'available' },
    // Spain
    { city: 'Madrid', country: 'Spain', date: '2026-06-05', venue: 'TBD', status: 'available' },
    { city: 'Barcelona', country: 'Spain', date: '2026-06-08', venue: 'TBD', status: 'available' },
    { city: 'Valencia', country: 'Spain', date: '2026-06-11', venue: 'TBD', status: 'available' },
    { city: 'Seville', country: 'Spain', date: '2026-06-14', venue: 'TBD', status: 'available' },
    { city: 'Bilbao', country: 'Spain', date: '2026-06-17', venue: 'TBD', status: 'available' },
];

async function seed() {
    console.log('Seeding tour dates...');
    const { data, error } = await supabase
        .from('tour_dates')
        .insert(tourDates);

    if (error) {
        console.error('Error seeding data:', error.message);
        process.exit(1);
    }

    console.log('Successfully seeded 10 tour dates!');
}

seed();
