# Week 2 Verification Report

## Static checks completed

- Prisma schema contains 7 models: Company, Internship, Student, Application, Skill, StudentSkill, InternshipRequiredSkill.
- Company → internships is one-to-many.
- Internship → applications and Student → applications are one-to-many.
- Student ↔ Skill and Internship ↔ Skill are many-to-many through explicit join models.
- `Application(studentId, internshipId)` has a database-level unique constraint.
- Meaningful indexes include internship location/company/category and application status/internship/student.
- Two incremental migration directories are committed.
- `prisma/seed.ts` creates realistic companies, internships, students, skills and applications.
- Frontend runtime no longer references `mock-data.json`.
- Frontend API base URL is controlled by `VITE_API_BASE_URL`.
- Application submission uses a real POST request and displays network/API errors.
- Internship queries load company and required skills through Prisma relations in one query path, avoiding an N+1 card-loading loop.

## Environment limitation

This execution environment does not provide Docker or a local PostgreSQL server, and npm registry installation was unavailable within the execution time window. Therefore a live `prisma migrate deploy`, seed run, API server run, and browser build could not be executed here. The committed Docker Compose file provides PostgreSQL 16 for local verification, and the migration SQL is committed for review.

Before public submission, run the commands in the root README on a machine with Docker and npm access, then verify `/health`, `/api/internships`, `/api/reports/top-companies`, and a POST to `/api/internships/:id/applications`.
