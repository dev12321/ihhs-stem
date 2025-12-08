-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Stalls Table
create table public.stalls (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  category text not null,
  image_url text,
  location text,
  students text, -- Names of students
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Gallery Table
create table public.gallery (
  id uuid default uuid_generate_v4() primary key,
  image_url text not null,
  caption text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Votes Table
create table public.votes (
  id uuid default uuid_generate_v4() primary key,
  stall_id uuid references public.stalls(id) on delete cascade not null,
  user_email text not null,
  category text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_email, category) -- Enforce one vote per category per user
);

-- RLS Policies (Optional if using Service Role Server-side, but good for safety)
alter table public.stalls enable row level security;
alter table public.gallery enable row level security;
alter table public.votes enable row level security;

-- Public read access for stalls and gallery
create policy "Allow public read access on stalls" on public.stalls for select using (true);
create policy "Allow public read access on gallery" on public.gallery for select using (true);

-- Votes should only be readable by admins or aggregate (handled via server logic usually, but we can allow reading own votes)
create policy "Allow admins read all votes" on public.votes for select using (true); -- Simplified, assuming server role usage
