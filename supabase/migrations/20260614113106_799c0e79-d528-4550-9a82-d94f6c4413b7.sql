
CREATE TABLE public.blueprint_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  contact TEXT NOT NULL,
  location TEXT NOT NULL,
  monthly_bill INTEGER NOT NULL,
  upload_bill BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.blueprint_requests TO anon, authenticated;
GRANT ALL ON public.blueprint_requests TO service_role;

ALTER TABLE public.blueprint_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a blueprint request"
  ON public.blueprint_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
