import { Link } from "react-router-dom";
import { Badge } from "./Badge";
import type { Internship } from "../types/internship";

interface InternshipCardProps {
  internship: Internship;
}

export function InternshipCard({ internship }: InternshipCardProps) {
  return (
    <article className="internship-card">
      <div className="card-topline">
        <span className="company-mark">{internship.company.slice(0, 1)}</span>
        <span className="category-label">{internship.category}</span>
      </div>

      <h2>{internship.title}</h2>
      <p className="company">{internship.company}</p>

      <div className="meta-row">
        <span>⌖ {internship.location}</span>
        <span>◷ {internship.duration}</span>
      </div>

      <div className="badge-row">
        {internship.tags.map((tag) => (
          <Badge key={tag} label={tag} />
        ))}
      </div>

      <div className="card-footer">
        <strong>{internship.stipend}</strong>
        <Link className="text-link" to={`/internships/${internship.id}`}>
          View details →
        </Link>
      </div>
    </article>
  );
}
