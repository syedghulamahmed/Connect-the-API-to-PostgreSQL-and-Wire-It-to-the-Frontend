# Raw SQL Report Notes

1. The first report answers: “Which companies publish the most internships?”
2. It starts from `Company` and uses a `LEFT JOIN` to `Internship`.
3. `LEFT JOIN` keeps companies visible even when their internship count is zero.
4. The query groups by company ID and name before counting internship IDs.
5. `COUNT(i.id)::int` keeps the JSON result convenient for the API response.
6. Results are ordered by count descending and company name ascending for stable output.
7. `LIMIT 5` turns the aggregation into the requested top-five report.
8. The second report answers: “How are applications distributed by status?”
9. It groups the `Application` table by the PostgreSQL `ApplicationStatus` enum.
10. It counts each status and orders the largest groups first.
11. Prisma is used for transactional CRUD and typed relation loading elsewhere in the app.
12. Raw SQL is appropriate here because the assignment explicitly asks for reporting SQL and the join/grouping logic is clearer when reviewed as SQL.
13. Both statements are static and use `prisma.$queryRaw`, so no user input is interpolated into SQL.
