# TalentBridge Frontend — Week 2

React + TypeScript frontend based on the Week 1/Task 2 internship dashboard. The mock JSON data source has been removed from runtime use.

## Environment

Copy `.env.example` to `.env`:

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

The frontend now uses real HTTP requests for internship lists, individual internship details, and application submission. Loading and error states therefore reflect actual network/API conditions rather than simulated delays or random failures.
