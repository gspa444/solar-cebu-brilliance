import { useState, type FormEvent } from "react";
import { ArrowRight, ClipboardCheck, ShieldCheck } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const LOCATIONS = [
  "Cebu City",
  "Mandaue City",
  "Lapu-Lapu City",
  "Minglanilla",
  "Talisay City",
  "Liloan",
  "Consolacion",
  "Carcar",
  "Naga City",
  "Other Visayas",
];

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255),
  contact: z
    .string()
    .trim()
    .min(7, "Please enter a valid contact number")
    .max(30),
  location: z.string().min(1, "Please select your location"),
  bill: z
    .string()
    .trim()
    .regex(/^\d{1,7}$/, "Enter a valid monthly bill amount"),
  uploadBill: z.boolean(),
});

export function IntakeForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    location: "",
    bill: "",
    uploadBill: true,
  });
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please review the form");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("blueprint_requests").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      contact: parsed.data.contact,
      location: parsed.data.location,
      monthly_bill: Number(parsed.data.bill),
      upload_bill: parsed.data.uploadBill,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Could not submit", {
        description: "Please try again in a moment.",
      });
      return;
    }
    toast.success("Blueprint request received", {
      description: "Our engineering team will reach out within 24 hours.",
    });
    setForm({
      name: "",
      email: "",
      contact: "",
      location: "",
      bill: "",
      uploadBill: true,
    });
  };

  return (
    <section id="estimate" className="relative isolate overflow-hidden bg-charcoal py-24">
      <div className="absolute inset-0 -z-10 opacity-60">
        <div className="absolute -top-32 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[color:var(--gold)]/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[color:var(--solar-blue)]/25 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/40 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-[color:var(--gold)] backdrop-blur">
            <ClipboardCheck className="h-3.5 w-3.5" /> Engineering Intake
          </span>
          <h2 className="mt-6 font-display text-4xl sm:text-5xl font-semibold text-white leading-tight">
            Get Your Custom Solar <span className="text-[color:var(--gold)]">Engineering Blueprint</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Share a few details and our Cebu-based engineers will return a tailored
            system design, projected savings, and ROI timeline — no obligation.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-12 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] backdrop-blur"
          noValidate
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full Name" htmlFor="name">
              <Input
                id="name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Juan Dela Cruz"
                maxLength={100}
                className="h-11 border-white/15 bg-white/5 text-white placeholder:text-white/40 focus-visible:ring-[color:var(--gold)]"
                required
              />
            </Field>
            <Field label="Contact Number / WhatsApp" htmlFor="contact">
              <Input
                id="contact"
                type="tel"
                value={form.contact}
                onChange={(e) => update("contact", e.target.value)}
                placeholder="+63 920 000 0000"
                maxLength={30}
                className="h-11 border-white/15 bg-white/5 text-white placeholder:text-white/40 focus-visible:ring-[color:var(--gold)]"
                required
              />
            </Field>
            <Field label="Cebu Location" htmlFor="location">
              <Select
                value={form.location}
                onValueChange={(v) => update("location", v)}
              >
                <SelectTrigger
                  id="location"
                  className="h-11 border-white/15 bg-white/5 text-white data-[placeholder]:text-white/40 focus:ring-[color:var(--gold)]"
                >
                  <SelectValue placeholder="Select your area" />
                </SelectTrigger>
                <SelectContent>
                  {LOCATIONS.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Current Avg. Monthly Power Bill (₱)" htmlFor="bill">
              <Input
                id="bill"
                inputMode="numeric"
                value={form.bill}
                onChange={(e) =>
                  update("bill", e.target.value.replace(/[^\d]/g, "").slice(0, 7))
                }
                placeholder="e.g. 12000"
                className="h-11 border-white/15 bg-white/5 text-white placeholder:text-white/40 focus-visible:ring-[color:var(--gold)]"
                required
              />
            </Field>
          </div>

          <label className="mt-6 flex items-start gap-3 rounded-xl border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/[0.06] p-4 cursor-pointer transition-colors hover:bg-[color:var(--gold)]/10">
            <Checkbox
              checked={form.uploadBill}
              onCheckedChange={(v) => update("uploadBill", v === true)}
              className="mt-0.5 border-[color:var(--gold)]/60 data-[state=checked]:bg-[color:var(--gold)] data-[state=checked]:text-charcoal data-[state=checked]:border-[color:var(--gold)]"
            />
            <span className="text-sm text-white/90 leading-relaxed">
              I want to submit a photo/copy of my recent power bill for a{" "}
              <span className="text-[color:var(--gold)] font-medium">
                free line-by-line savings analysis
              </span>
              .
            </span>
          </label>

          <Button
            type="submit"
            disabled={submitting}
            className="group mt-8 h-14 w-full rounded-full bg-[color:var(--gold)] text-charcoal text-base font-semibold tracking-wide hover:bg-[color:var(--gold)]/90 hover:shadow-[0_25px_60px_-15px_rgba(193,153,68,0.7)] hover:-translate-y-0.5 transition-all duration-300"
          >
            {submitting ? "Submitting…" : "Secure My Energy Independence Blueprint"}
            <ArrowRight className="ml-1 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-white/50">
            <ShieldCheck className="h-3.5 w-3.5 text-[color:var(--gold)]/70" />
            Your information is kept strictly confidential.
          </div>

          <p className="mt-6 text-center text-xs italic text-white/55 leading-relaxed">
            System financing options are available through partner banking institutions,
            subject to standard credit evaluation and bank approval.
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor} className="text-xs uppercase tracking-[0.18em] text-white/70">
        {label}
      </Label>
      {children}
    </div>
  );
}
