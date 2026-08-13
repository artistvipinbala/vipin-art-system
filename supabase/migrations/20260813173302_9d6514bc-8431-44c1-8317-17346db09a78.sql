CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  whatsapp_number TEXT,
  whatsapp_verified BOOLEAN NOT NULL DEFAULT false,
  training_completed BOOLEAN NOT NULL DEFAULT false,
  feedback_rating TEXT,
  feedback_text TEXT,
  biggest_challenge TEXT,
  personal_question TEXT,
  support_interest BOOLEAN NOT NULL DEFAULT false,
  current_stage TEXT,
  desired_support TEXT,
  seriousness TEXT,
  source TEXT,
  campaign TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.support_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  current_stage TEXT,
  biggest_challenge TEXT,
  desired_support TEXT,
  seriousness TEXT,
  status TEXT NOT NULL DEFAULT 'New',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT ALL ON public.leads TO service_role;
GRANT ALL ON public.support_applications TO service_role;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_applications ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX idx_support_applications_created_at ON public.support_applications (created_at DESC);