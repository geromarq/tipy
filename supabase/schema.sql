-- ============================================
-- TIPY — Database Schema
-- Run in Supabase SQL Editor
-- ============================================

-- Users (DJ profiles, extends auth.users)
create table if not exists public.users (
  id           uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  slug         text unique not null,
  bio          text,
  instagram    text,
  avatar_url   text,
  created_at   timestamptz default now()
);

-- MercadoPago credentials (encrypted at rest)
create table if not exists public.mp_credentials (
  id                     uuid primary key default gen_random_uuid(),
  user_id                uuid not null references public.users(id) on delete cascade unique,
  access_token_encrypted text not null,
  public_key             text not null,
  created_at             timestamptz default now(),
  updated_at             timestamptz default now()
);

-- Events
create table if not exists public.events (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.users(id) on delete cascade,
  name        text not null,
  venue       text,
  genre       text,
  message     text,
  start_time  timestamptz not null,
  end_time    timestamptz not null,
  is_active   boolean default true,
  created_at  timestamptz default now()
);
create index if not exists events_user_id_idx on events(user_id);
create index if not exists events_is_active_idx on events(is_active);

-- Event DJs (shared QR between multiple DJs)
create table if not exists public.event_djs (
  event_id   uuid references public.events(id) on delete cascade,
  user_id    uuid references public.users(id) on delete cascade,
  slot_start timestamptz,
  slot_end   timestamptz,
  primary key (event_id, user_id)
);

-- QR Codes
create table if not exists public.qr_codes (
  id         uuid primary key default gen_random_uuid(),
  event_id   uuid not null references public.events(id) on delete cascade,
  slug       text unique not null,
  label      text,
  is_active  boolean default true,
  created_at timestamptz default now()
);
create index if not exists qr_codes_slug_idx on qr_codes(slug);
create index if not exists qr_codes_event_id_idx on qr_codes(event_id);

-- Suggestions
create table if not exists public.suggestions (
  id                uuid primary key default gen_random_uuid(),
  qr_code_id        uuid not null references public.qr_codes(id),
  event_id          uuid not null references public.events(id),
  dj_user_id        uuid not null references public.users(id),
  text              text not null,
  matched_track     jsonb,
  status            text not null default 'pending' check (status in ('pending', 'accepted', 'rejected')),
  contact_name      text,
  contact_instagram text,
  contact_phone     text,
  contact_email     text,
  tip_amount        numeric(10,2) default 0,
  tip_pool          numeric(10,2) default 0,
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);
create index if not exists suggestions_dj_user_id_idx on suggestions(dj_user_id);
create index if not exists suggestions_event_id_idx on suggestions(event_id);
create index if not exists suggestions_status_idx on suggestions(status);
create index if not exists suggestions_created_at_idx on suggestions(created_at desc);

-- Votes (crowdsourcing)
create table if not exists public.votes (
  id             uuid primary key default gen_random_uuid(),
  suggestion_id  uuid not null references public.suggestions(id) on delete cascade,
  session_token  text not null,
  amount         numeric(10,2) default 0,
  mp_payment_id  text,
  created_at     timestamptz default now()
);
create index if not exists votes_suggestion_id_idx on votes(suggestion_id);
create unique index if not exists votes_unique_session on votes(suggestion_id, session_token);

-- Vibe Ratings
create table if not exists public.vibe_ratings (
  id            uuid primary key default gen_random_uuid(),
  qr_code_id    uuid not null references public.qr_codes(id),
  event_id      uuid not null references public.events(id),
  dj_user_id    uuid not null references public.users(id),
  rating        smallint not null check (rating between 1 and 10),
  session_token text,
  created_at    timestamptz default now()
);
create index if not exists vibe_ratings_event_id_idx on vibe_ratings(event_id);
create index if not exists vibe_ratings_dj_user_id_idx on vibe_ratings(dj_user_id);
create index if not exists vibe_ratings_created_at_idx on vibe_ratings(created_at);

-- Tip Transactions
create table if not exists public.tip_transactions (
  id                uuid primary key default gen_random_uuid(),
  suggestion_id     uuid references public.suggestions(id),
  vote_id           uuid references public.votes(id),
  dj_user_id        uuid not null references public.users(id),
  mp_payment_id     text not null,
  mp_preference_id  text not null,
  amount            numeric(10,2) not null,
  currency          text default 'ARS',
  status            text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'refunded')),
  payer_email       text,
  refund_id         text,
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);
create index if not exists tip_tx_mp_payment_id_idx on tip_transactions(mp_payment_id);
create index if not exists tip_tx_suggestion_id_idx on tip_transactions(suggestion_id);
create index if not exists tip_tx_dj_user_id_idx on tip_transactions(dj_user_id);

-- ============================================
-- Public view for crowdsource feed (masks PII)
-- ============================================
create or replace view public.public_suggestions as
  select
    id, qr_code_id, event_id, text, matched_track,
    status, tip_pool, created_at
  from public.suggestions
  where status in ('pending', 'accepted');

-- ============================================
-- Realtime
-- ============================================
alter publication supabase_realtime add table public.suggestions;
alter publication supabase_realtime add table public.votes;
alter publication supabase_realtime add table public.vibe_ratings;

-- ============================================
-- Row Level Security
-- ============================================

-- Enable RLS on all tables
alter table public.users enable row level security;
alter table public.mp_credentials enable row level security;
alter table public.events enable row level security;
alter table public.qr_codes enable row level security;
alter table public.suggestions enable row level security;
alter table public.votes enable row level security;
alter table public.vibe_ratings enable row level security;
alter table public.tip_transactions enable row level security;
alter table public.event_djs enable row level security;

-- USERS
create policy "Public read users" on public.users
  for select to anon using (true);
create policy "Owner update users" on public.users
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- MP_CREDENTIALS (no anon access ever)
create policy "Owner read mp_credentials" on public.mp_credentials
  for select to authenticated
  using (user_id = (select auth.uid()));

-- EVENTS
create policy "Public read active events" on public.events
  for select to anon using (is_active = true);
create policy "DJ read all own events" on public.events
  for select to authenticated
  using (user_id = (select auth.uid()));
create policy "DJ write own events" on public.events
  for all to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

-- QR_CODES
create policy "Public read qr_codes" on public.qr_codes
  for select to anon using (true);
create policy "DJ write own qr_codes" on public.qr_codes
  for all to authenticated
  using (event_id in (select id from public.events where user_id = (select auth.uid())))
  with check (event_id in (select id from public.events where user_id = (select auth.uid())));

-- SUGGESTIONS
create policy "Public read pending/accepted suggestions" on public.suggestions
  for select to anon
  using (status in ('pending', 'accepted'));
create policy "Anon insert suggestions" on public.suggestions
  for insert to anon with check (true);
create policy "DJ read own suggestions" on public.suggestions
  for select to authenticated
  using (dj_user_id = (select auth.uid()));

-- VOTES
create policy "Public read votes" on public.votes
  for select to anon using (true);
create policy "Anon insert votes" on public.votes
  for insert to anon with check (true);

-- VIBE_RATINGS (no public read)
create policy "Anon insert vibe_ratings" on public.vibe_ratings
  for insert to anon with check (true);
create policy "DJ read own vibe_ratings" on public.vibe_ratings
  for select to authenticated
  using (dj_user_id = (select auth.uid()));

-- TIP_TRANSACTIONS (no anon access)
create policy "DJ read own tip_transactions" on public.tip_transactions
  for select to authenticated
  using (dj_user_id = (select auth.uid()));

-- EVENT_DJS
create policy "Public read event_djs" on public.event_djs
  for select to anon using (true);
create policy "DJ write own event_djs" on public.event_djs
  for all to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));
