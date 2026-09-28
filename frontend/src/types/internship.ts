export interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  type: string;
  duration: string;
  stipend: string;
  tags: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export interface ApplicationFormData {
  name: string;
  email: string;
  coverNote: string;
}

export type ApplicationErrors = Partial<Record<keyof ApplicationFormData, string>>;
