
ALTER TABLE public.blueprint_requests
  ADD CONSTRAINT blueprint_requests_name_len CHECK (char_length(name) BETWEEN 2 AND 100),
  ADD CONSTRAINT blueprint_requests_email_len CHECK (char_length(email) BETWEEN 5 AND 255),
  ADD CONSTRAINT blueprint_requests_email_fmt CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  ADD CONSTRAINT blueprint_requests_contact_len CHECK (char_length(contact) BETWEEN 7 AND 30),
  ADD CONSTRAINT blueprint_requests_location_len CHECK (char_length(location) BETWEEN 1 AND 100),
  ADD CONSTRAINT blueprint_requests_bill_range CHECK (monthly_bill BETWEEN 0 AND 10000000);
