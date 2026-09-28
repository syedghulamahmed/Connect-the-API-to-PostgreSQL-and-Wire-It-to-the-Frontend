import type { ApplicationFormData, Internship } from "../types/internship";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api").replace(/\/$/, "");

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, { headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) }, ...init });
  } catch {
    throw new Error("Unable to reach the TalentBridge API. Check that the backend is running.");
  }
  const payload: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const message = typeof payload === "object" && payload !== null && "error" in payload && typeof payload.error === "string" ? payload.error : `Request failed (${response.status}).`;
    throw new Error(message);
  }
  return payload as T;
}

export function fetchInternships(params?: { search?: string; location?: string; category?: string }): Promise<Internship[]> {
  const query = new URLSearchParams();
  if (params?.search) query.set("search", params.search);
  if (params?.location) query.set("location", params.location);
  if (params?.category) query.set("category", params.category);
  return request<Internship[]>(`/internships${query.toString() ? `?${query}` : ""}`);
}

export function fetchInternship(id: string): Promise<Internship> { return request<Internship>(`/internships/${id}`); }

export function submitApplication(internshipId: string, data: ApplicationFormData): Promise<{ id: string; status: string }> {
  return request<{ id: string; status: string }>(`/internships/${internshipId}/applications`, { method: "POST", body: JSON.stringify(data) });
}
