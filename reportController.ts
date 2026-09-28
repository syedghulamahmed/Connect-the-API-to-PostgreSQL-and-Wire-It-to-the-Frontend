import type { Request, Response } from "express";
import { applicationStatusReport, topCompaniesByInternshipCount } from "../services/reportService.js";
export async function getTopCompanies(_req: Request, res: Response) { res.json(await topCompaniesByInternshipCount()); }
export async function getApplicationStatus(_req: Request, res: Response) { res.json(await applicationStatusReport()); }
