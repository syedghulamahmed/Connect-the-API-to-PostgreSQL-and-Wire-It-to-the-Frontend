import { ApplicationStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.application.deleteMany();
  await prisma.internshipRequiredSkill.deleteMany();
  await prisma.studentSkill.deleteMany();
  await prisma.internship.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.student.deleteMany();
  await prisma.company.deleteMany();

  const nova = await prisma.company.create({ data: { name: "NovaWorks", slug: "novaworks", description: "Product engineering studio building modern digital products.", website: "https://example.com/novaworks", location: "Lahore, Pakistan" } });
  const cloudnest = await prisma.company.create({ data: { name: "CloudNest", slug: "cloudnest", description: "Cloud infrastructure team focused on developer platforms and observability.", website: "https://example.com/cloudnest", location: "Islamabad, Pakistan" } });
  const orbit = await prisma.company.create({ data: { name: "Orbit Labs", slug: "orbit-labs", description: "Data and AI consultancy helping teams turn operational data into products.", website: "https://example.com/orbit", location: "Karachi, Pakistan" } });

  const skillNames = ["React", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Python", "Figma", "Docker", "Git"];
  const skillRows = await Promise.all(skillNames.map((name) => prisma.skill.create({ data: { name } })));
  const skill = Object.fromEntries(skillRows.map((row) => [row.name, row.id]));

  const createInternship = (data: { companyId: string; title: string; location: string; category: string; type: string; duration: string; stipend: string; description: string; responsibilities: string[]; requirements: string[]; skills: string[] }) =>
    prisma.internship.create({ data: { companyId: data.companyId, title: data.title, location: data.location, category: data.category, type: data.type, duration: data.duration, stipend: data.stipend, description: data.description, responsibilities: data.responsibilities, requirements: data.requirements } }).then(async (internship) => {
      await prisma.internshipRequiredSkill.createMany({ data: data.skills.map((name) => ({ internshipId: internship.id, skillId: skill[name] })) });
      return internship;
    });

  const internships = await Promise.all([
    createInternship({ companyId: nova.id, title: "Frontend Engineering Intern", location: "Lahore, Pakistan", category: "Engineering", type: "Hybrid", duration: "12 weeks", stipend: "PKR 35,000 / month", description: "Work with product engineers to ship accessible, responsive interfaces and reusable React components.", responsibilities: ["Build React interfaces from product requirements", "Write tests and review pull requests", "Collaborate with designers and backend engineers"], requirements: ["Basic React and TypeScript", "Comfort with Git", "Strong problem-solving fundamentals"], skills: ["React", "TypeScript", "Git"] }),
    createInternship({ companyId: nova.id, title: "Full Stack Web Intern", location: "Lahore, Pakistan", category: "Engineering", type: "On-site", duration: "16 weeks", stipend: "PKR 45,000 / month", description: "Build end-to-end features across a TypeScript frontend, Node API and PostgreSQL database.", responsibilities: ["Implement API endpoints", "Model relational data", "Connect UI flows to backend services"], requirements: ["JavaScript or TypeScript", "Basic SQL knowledge", "Interest in backend engineering"], skills: ["Node.js", "PostgreSQL", "Prisma"] }),
    createInternship({ companyId: cloudnest.id, title: "Cloud Platform Intern", location: "Islamabad, Pakistan", category: "DevOps", type: "Hybrid", duration: "12 weeks", stipend: "PKR 40,000 / month", description: "Support internal developer tooling, CI pipelines and containerized services.", responsibilities: ["Improve CI workflows", "Maintain Docker-based local environments", "Document developer tooling"], requirements: ["Linux basics", "Git familiarity", "Curiosity about cloud systems"], skills: ["Docker", "Git", "Node.js"] }),
    createInternship({ companyId: orbit.id, title: "Data Engineering Intern", location: "Karachi, Pakistan", category: "Data", type: "Remote", duration: "14 weeks", stipend: "PKR 42,000 / month", description: "Help prepare reliable datasets and reporting pipelines for analytics products.", responsibilities: ["Transform datasets", "Write analytical SQL", "Create data quality checks"], requirements: ["Python basics", "SQL fundamentals", "Attention to data quality"], skills: ["Python", "PostgreSQL"] }),
    createInternship({ companyId: orbit.id, title: "Product Design Intern", location: "Remote, Pakistan", category: "Design", type: "Remote", duration: "10 weeks", stipend: "PKR 30,000 / month", description: "Support product discovery and translate user needs into clear interface concepts.", responsibilities: ["Create wireframes", "Participate in user research", "Maintain design-system components"], requirements: ["Figma basics", "Communication skills", "Portfolio or coursework"], skills: ["Figma", "Git"] })
  ]);

  const ali = await prisma.student.create({ data: { name: "Ali Raza", email: "ali.raza@example.com", university: "University of Engineering and Technology", graduationYear: 2027 } });
  const sara = await prisma.student.create({ data: { name: "Sara Khan", email: "sara.khan@example.com", university: "FAST National University", graduationYear: 2026 } });
  const hamza = await prisma.student.create({ data: { name: "Hamza Malik", email: "hamza.malik@example.com", university: "COMSATS University", graduationYear: 2027 } });

  await prisma.studentSkill.createMany({ data: [
    { studentId: ali.id, skillId: skill.React }, { studentId: ali.id, skillId: skill.TypeScript }, { studentId: ali.id, skillId: skill.Git },
    { studentId: sara.id, skillId: skill.Python }, { studentId: sara.id, skillId: skill.PostgreSQL }, { studentId: sara.id, skillId: skill.Docker },
    { studentId: hamza.id, skillId: skill.Figma }, { studentId: hamza.id, skillId: skill.React }, { studentId: hamza.id, skillId: skill.Git }
  ] });

  await prisma.application.createMany({ data: [
    { studentId: ali.id, internshipId: internships[0].id, coverNote: "I enjoy building responsive React interfaces and want to deepen my TypeScript skills through a real product team.", status: ApplicationStatus.REVIEWING },
    { studentId: sara.id, internshipId: internships[3].id, coverNote: "My coursework and projects have given me practical SQL and Python experience that I would like to apply to data pipelines.", status: ApplicationStatus.PENDING },
    { studentId: hamza.id, internshipId: internships[4].id, coverNote: "I have worked on interface prototypes in Figma and enjoy turning user feedback into simple product flows.", status: ApplicationStatus.ACCEPTED }
  ] });

  console.log(`Seeded ${internships.length} internships, ${skillRows.length} skills, 3 students and 3 applications.`);
}

main().catch((error) => { console.error(error); process.exit(1); }).finally(async () => prisma.$disconnect());
