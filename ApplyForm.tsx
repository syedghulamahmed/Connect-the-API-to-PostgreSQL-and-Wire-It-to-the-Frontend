import { FormEvent, useState } from "react";
import type { ApplicationErrors, ApplicationFormData } from "../types/internship";
import { submitApplication } from "../services/internshipApi";
const initialForm: ApplicationFormData = { name: "", email: "", coverNote: "" };
function validate(data: ApplicationFormData): ApplicationErrors {
  const errors: ApplicationErrors = {};
  if (!data.name.trim()) errors.name = "Name is required."; else if (data.name.trim().length < 2) errors.name = "Name must contain at least 2 characters.";
  if (!data.email.trim()) errors.email = "Email is required."; else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Enter a valid email address.";
  if (!data.coverNote.trim()) errors.coverNote = "Cover note is required."; else if (data.coverNote.trim().length < 30) errors.coverNote = "Cover note must contain at least 30 characters.";
  return errors;
}
interface ApplyFormProps { internshipId: string; internshipTitle: string; }
export function ApplyForm({ internshipId, internshipTitle }: ApplyFormProps) {
  const [form, setForm] = useState<ApplicationFormData>(initialForm);
  const [errors, setErrors] = useState<ApplicationErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const updateField = (field: keyof ApplicationFormData, value: string) => { setForm((current) => ({ ...current, [field]: value })); setErrors((current) => ({ ...current, [field]: undefined })); setServerError(null); setSubmitted(false); };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const nextErrors = validate(form); setErrors(nextErrors); if (Object.keys(nextErrors).length) return;
    setSubmitting(true); setServerError(null);
    try { await submitApplication(internshipId, form); setSubmitted(true); setForm(initialForm); }
    catch (error) { setServerError(error instanceof Error ? error.message : "Unable to submit application."); }
    finally { setSubmitting(false); }
  };
  if (submitted) return <div className="success-card" role="status" aria-live="polite"><div className="success-icon" aria-hidden="true">✓</div><h2>Application submitted</h2><p>Your application for <strong>{internshipTitle}</strong> was saved to PostgreSQL.</p><button className="button secondary" type="button" onClick={() => setSubmitted(false)}>Submit another application</button></div>;
  return <form className="apply-form" onSubmit={handleSubmit} noValidate>
    <div className="form-heading"><span className="eyebrow">Take the next step</span><h2>Apply for this internship</h2></div>
    {serverError && <div className="state-card error-state" role="alert"><div className="state-icon" aria-hidden="true">!</div><strong>{serverError}</strong></div>}
    <div className="form-field"><label htmlFor="name">Full name</label><input id="name" autoComplete="name" value={form.name} onChange={(e) => updateField("name", e.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} placeholder="Your full name" />{errors.name && <span id="name-error" className="field-error">{errors.name}</span>}</div>
    <div className="form-field"><label htmlFor="email">Email address</label><input id="email" type="email" autoComplete="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} placeholder="you@example.com" />{errors.email && <span id="email-error" className="field-error">{errors.email}</span>}</div>
    <div className="form-field"><label htmlFor="coverNote">Cover note</label><textarea id="coverNote" rows={6} value={form.coverNote} onChange={(e) => updateField("coverNote", e.target.value)} aria-invalid={Boolean(errors.coverNote)} aria-describedby={errors.coverNote ? "coverNote-error" : undefined} placeholder="Tell the hiring team why you are interested..." />{errors.coverNote && <span id="coverNote-error" className="field-error">{errors.coverNote}</span>}</div>
    <button className="button primary full-width" type="submit" disabled={submitting}>{submitting ? "Submitting…" : "Submit application"}</button>
    <p className="form-note">Applications are sent to the live TalentBridge API and stored in PostgreSQL.</p>
  </form>;
}
