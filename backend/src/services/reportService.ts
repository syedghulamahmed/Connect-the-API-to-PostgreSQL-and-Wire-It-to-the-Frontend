import { prisma } from "../prisma.js";
export function topCompaniesByInternshipCount() { return prisma.$queryRaw<Array<{ company_id: string; company_name: string; internship_count: number }>>`
  SELECT c.id AS company_id, c.name AS company_name, COUNT(i.id)::int AS internship_count
  FROM "Company" c LEFT JOIN "Internship" i ON i."companyId" = c.id
  GROUP BY c.id, c.name ORDER BY internship_count DESC, c.name ASC LIMIT 5;`;
}
export function applicationStatusReport() { return prisma.$queryRaw<Array<{ status: string; application_count: number }>>`
  SELECT status::text AS status, COUNT(*)::int AS application_count
  FROM "Application" GROUP BY status ORDER BY application_count DESC, status ASC;`;
}
