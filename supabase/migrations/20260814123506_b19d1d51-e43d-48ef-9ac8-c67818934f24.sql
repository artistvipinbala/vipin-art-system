ALTER TABLE public.support_applications
  ADD COLUMN IF NOT EXISTS email text,
  ADD COLUMN IF NOT EXISTS art_type text,
  ADD COLUMN IF NOT EXISTS age_range text,
  ADD COLUMN IF NOT EXISTS work_place text,
  ADD COLUMN IF NOT EXISTS spend_ready text;