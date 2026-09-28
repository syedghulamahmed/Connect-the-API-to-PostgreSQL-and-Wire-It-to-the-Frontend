import type { Request, Response } from "express";
import { z } from "zod";
import { createApplication, getInternship, listApplications, listInternships } from "../services/internshipService.js";
const applicationSchema = z.object({ name: z.string().trim().min(2), email: z.string().email(), coverNote: z.string().trim().min(30) });
function toLegacyInternship(item: any) { return { id: item.id, title: item.title, company: item.company.name, location: item.location, category: item.category, type: item.type, duration: item.duration, stipend: item.stipend, tags: item.requiredSkills.map((entry: any) => entry.skill.name), description: item.description, responsibilities: item.responsibilities, requirements: item.requirements }; }
export async function getInternships(req: Request, res: Response) { const rows = await listInternships({ search: String(req.query.search ?? ""), location: String(req.query.location ?? ""), category: String(req.query.category ?? "") }); res.json(rows.map(toLegacyInternship)); }
export async function getInternshipById(req: Request, res: Response) { const row = await getInternship(req.params.id); if (!row) return res.status(404).json({ error: "Internship not found" }); return res.json(toLegacyInternship(row)); }
export async function postApplication(req: Request, res: Response) {
  const parsed = applicationSchema.safeParse(req.body); if (!parsed.success) return res.status(400).json({ error: "Invalid application", details: parsed.error.flatten() });
  try { const row = await createApplication({ internshipId: req.params.id, ...parsed.data }); return res.status(201).json({ id: row.id, status: row.status, internshipId: row.internshipId, studentId: row.studentId, appliedAt: row.appliedAt }); }
  catch (error) { if (error instanceof Error && error.message === "INTERNSHIP_NOT_FOUND") return res.status(404).json({ error: "Internship not found" }); if ((error as any)?.code === "P2002") return res.status(409).json({ error: "This student has already applied to this internship." }); throw error; }
}
export async function getApplications(_req: Request, res: Response) { res.json(await listApplications()); }
