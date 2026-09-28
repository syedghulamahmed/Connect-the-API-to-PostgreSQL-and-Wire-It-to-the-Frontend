CREATE INDEX "Internship_location_idx" ON "Internship"("location");
CREATE INDEX "Internship_companyId_idx" ON "Internship"("companyId");
CREATE INDEX "Internship_category_idx" ON "Internship"("category");
CREATE INDEX "Application_status_idx" ON "Application"("status");
CREATE INDEX "Application_internshipId_idx" ON "Application"("internshipId");
CREATE INDEX "Application_studentId_idx" ON "Application"("studentId");
CREATE INDEX "StudentSkill_skillId_idx" ON "StudentSkill"("skillId");
CREATE INDEX "InternshipRequiredSkill_skillId_idx" ON "InternshipRequiredSkill"("skillId");
