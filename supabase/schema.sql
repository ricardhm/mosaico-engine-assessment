-- ============================================================
-- Mosaico Engine Assessment — Supabase Schema
-- Run this in the Supabase SQL Editor to set up your project.
-- ============================================================

-- Extension for generating UUIDs
create extension if not exists "pgcrypto";

-- ============================================================
-- admin_users: Consultant profiles (extends Supabase auth.users)
-- ============================================================
create table if not exists public.admin_users (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  role        text not null default 'consultant' check (role in ('consultant', 'admin')),
  created_at  timestamptz not null default now()
);

-- Auto-create an admin_users row when a new auth user is created
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.admin_users (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- sessions: One record per client engagement
-- ============================================================
create table if not exists public.sessions (
  id                  uuid primary key default gen_random_uuid(),
  token               text unique not null,
  status              text not null default 'pending'
                        check (status in ('pending', 'in_progress', 'completed')),
  company_name        text not null,
  company_size        text,
  industry_vertical   text,
  annual_revenue_band text,
  primary_channel     text,
  contact_name        text,
  contact_email       text,
  respondent_seniority text,
  consultant_id       uuid references auth.users(id) on delete set null,
  created_at          timestamptz not null default now(),
  completed_at        timestamptz
);

-- Run this on existing databases to add the seniority column:
-- alter table public.sessions add column if not exists respondent_seniority text;

create index if not exists sessions_token_idx on public.sessions (token);
create index if not exists sessions_consultant_idx on public.sessions (consultant_id);
create index if not exists sessions_status_idx on public.sessions (status);

-- ============================================================
-- responses: One row per question per session
-- ============================================================
create table if not exists public.responses (
  id          uuid primary key default gen_random_uuid(),
  session_id  uuid not null references public.sessions(id) on delete cascade,
  question_id text not null,
  score       int not null check (score between 1 and 5),
  created_at  timestamptz not null default now(),
  unique (session_id, question_id)
);

create index if not exists responses_session_idx on public.responses (session_id);

-- ============================================================
-- scores: Computed scores, cached after assessment completion
-- ============================================================
create table if not exists public.scores (
  id             uuid primary key default gen_random_uuid(),
  session_id     uuid not null unique references public.sessions(id) on delete cascade,
  pillar_scores  jsonb not null default '{}',
  engine_scores  jsonb not null default '{}',
  overall_score  numeric(4,2) not null,
  tiers          jsonb not null default '{}',
  computed_at    timestamptz not null default now()
);

-- ============================================================
-- notes: Internal consultant notes per engine per session
-- ============================================================
create table if not exists public.notes (
  id          uuid primary key default gen_random_uuid(),
  session_id  uuid not null references public.sessions(id) on delete cascade,
  engine      text not null check (engine in ('growth', 'efficiency', 'adaptability', 'overall')),
  body        text not null default '',
  author_id   uuid references auth.users(id) on delete set null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create unique index if not exists notes_session_engine_idx on public.notes (session_id, engine);
create index if not exists notes_session_idx on public.notes (session_id);

-- Auto-update updated_at on notes
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists notes_set_updated_at on public.notes;
create trigger notes_set_updated_at
  before update on public.notes
  for each row execute function public.set_updated_at();

-- ============================================================
-- Row Level Security
-- All data is accessible only to authenticated users (consultants).
-- Client access to sessions/responses is handled server-side
-- via the service role key — clients never call Supabase directly.
-- ============================================================

alter table public.admin_users   enable row level security;
alter table public.sessions      enable row level security;
alter table public.responses     enable row level security;
alter table public.scores        enable row level security;
alter table public.notes         enable row level security;

-- admin_users: users can read/update their own row
create policy "Users can view own profile"
  on public.admin_users for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.admin_users for update
  using (auth.uid() = id);

-- sessions: authenticated users can do everything
create policy "Authenticated users can manage sessions"
  on public.sessions for all
  using (auth.role() = 'authenticated');

-- responses: authenticated users can do everything
create policy "Authenticated users can manage responses"
  on public.responses for all
  using (auth.role() = 'authenticated');

-- scores: authenticated users can do everything
create policy "Authenticated users can manage scores"
  on public.scores for all
  using (auth.role() = 'authenticated');

-- notes: authenticated users can do everything
create policy "Authenticated users can manage notes"
  on public.notes for all
  using (auth.role() = 'authenticated');
