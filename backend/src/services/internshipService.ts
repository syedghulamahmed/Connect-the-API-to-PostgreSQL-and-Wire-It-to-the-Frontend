import { prisma } from "../prisma.js";
const internshipInclude = { company: true, requiredSkills: { include: { skill: true } } } as const;
export async function listInternships(filters: { search?: string; location?: string; category?: string }) {
  const search = filters.search?.trim();
  return prisma.internship.findMany({
    where: { ...(filters.location ? { location: filters.location } : {}), ...(filters.category ? { category: filters.category } : {}), ...(search ? { OR: [{ title: { contains: search, mode: "insensitive" } }, { company: { name: { contains: search, mode: "insensitive" } } }] } : {}) },
    include: internshipInclude, orderBy: { createdAt: "desc" }
  });
}
export function getInternship(id: string) { return prisma.internship.findUnique({ where: { id }, include: internshipInclude }); }
export async function createApplication(input: { internshipId: string; name: string; email: string; coverNote: string }) {
  return prisma.$transaction(async (tx) => {
    const internship = await tx.internship.findUnique({ where: { id: input.internshipId } });
    if (!internship) throw new Error("INTERNSHIP_NOT_FOUND");
    const student = await tx.student.upsert({
      where: { email: input.email.toLowerCase() }, update: { name: input.name },
      create: { name: input.name, email: input.email.toLowerCase(), university: "Not provided", graduationYear: new Date().getFullYear() + 1 }
    });
    return tx.application.create({ data: { studentId: student.id, internshipId: input.internshipId, coverNote: input.coverNote }, include: { internship: true, student: true } });
  });
}
export function listApplications() { return prisma.application.findMany({ include: { student: true, internship: { include: { company: true } } }, orderBy: { appliedAt: "desc" } }); }
