# API Contract

## Internship list
`GET /api/internships?search=&location=&category=` returns the frontend-compatible internship array.

## Internship detail
`GET /api/internships/:id` returns one internship or HTTP 404.

## Application creation
`POST /api/internships/:id/applications` accepts `{ "name": string, "email": string, "coverNote": string }`. Validation errors return HTTP 400; duplicate student/internship applications return HTTP 409; missing internships return HTTP 404.

## Reporting
`GET /api/reports/top-companies` and `GET /api/reports/application-status` execute the two committed raw SQL reports.

## Separation of concerns
Routes/controllers own HTTP concerns, services own Prisma operations, and Prisma migrations own database changes. The Week 1/Task 2 frontend shape is preserved at the API boundary so the persistence implementation can change without forcing a UI rewrite.
