CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'REVIEWING', 'ACCEPTED', 'REJECTED');

CREATE TABLE "Company" (
  "id" TEXT NOT NULL,
  "name" VARCHAR(120) NOT NULL,
  "slug" VARCHAR(140) NOT NULL,
  "description" TEXT NOT NULL,
  "website" VARCHAR(255),
  "location" VARCHAR(120) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");
CREATE UNIQUE INDEX "Company_slug_key" ON "Company"("slug");

CREATE TABLE "Internship" (
  "id" TEXT NOT NULL,
  "companyId" TEXT NOT NULL,
  "title" VARCHAR(160) NOT NULL,
  "location" VARCHAR(120) NOT NULL,
  "category" VARCHAR(80) NOT NULL,
  "type" VARCHAR(50) NOT NULL,
  "duration" VARCHAR(50) NOT NULL,
  "stipend" VARCHAR(80) NOT NULL,
  "description" TEXT NOT NULL,
  "responsibilities" TEXT[] NOT NULL,
  "requirements" TEXT[] NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Internship_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "Internship_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX "Internship_location_idx" ON "Internship"("location");
CREATE INDEX "Internship_companyId_idx" ON "Internship"("companyId");
CREATE INDEX "Internship_category_idx" ON "Internship"("category");

CREATE TABLE "Student" (
  "id" TEXT NOT NULL,
  "name" VARCHAR(120) NOT NULL,
  "email" VARCHAR(180) NOT NULL,
  "university" VARCHAR(160) NOT NULL,
  "graduationYear" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

CREATE TABLE "Skill" (
  "id" TEXT NOT NULL,
  "name" VARCHAR(80) NOT NULL,
  CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

CREATE TABLE "Application" (
  "id" TEXT NOT NULL,
  "studentId" TEXT NOT NULL,
  "internshipId" TEXT NOT NULL,
  "coverNote" TEXT NOT NULL,
  "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
  "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Application_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "Application_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "Application_internshipId_fkey" FOREIGN KEY ("internshipId") REFERENCES "Internship"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "Application_studentId_internshipId_key" ON "Application"("studentId", "internshipId");
CREATE INDEX "Application_status_idx" ON "Application"("status");
CREATE INDEX "Application_internshipId_idx" ON "Application"("internshipId");
CREATE INDEX "Application_studentId_idx" ON "Application"("studentId");

CREATE TABLE "StudentSkill" (
  "studentId" TEXT NOT NULL,
  "skillId" TEXT NOT NULL,
  CONSTRAINT "StudentSkill_pkey" PRIMARY KEY ("studentId", "skillId"),
  CONSTRAINT "StudentSkill_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "StudentSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX "StudentSkill_skillId_idx" ON "StudentSkill"("skillId");

CREATE TABLE "InternshipRequiredSkill" (
  "internshipId" TEXT NOT NULL,
  "skillId" TEXT NOT NULL,
  CONSTRAINT "InternshipRequiredSkill_pkey" PRIMARY KEY ("internshipId", "skillId"),
  CONSTRAINT "InternshipRequiredSkill_internshipId_fkey" FOREIGN KEY ("internshipId") REFERENCES "Internship"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "InternshipRequiredSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX "InternshipRequiredSkill_skillId_idx" ON "InternshipRequiredSkill"("skillId");
