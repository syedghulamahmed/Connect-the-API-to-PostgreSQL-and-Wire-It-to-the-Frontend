import { useEffect, useState } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  debounceMs?: number;
}

export function SearchBar({
  value,
  onChange,
  debounceMs = 250,
}: SearchBarProps) {
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      onChange(draft);
    }, debounceMs);

    return () => window.clearTimeout(timer);
  }, [draft, debounceMs, onChange]);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  return (
    <label className="search-field">
      <span className="sr-only">Search internships</span>
      <span className="search-icon" aria-hidden="true">⌕</span>
      <input
        type="search"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder="Search by title or company..."
        aria-label="Search internships by title or company"
      />
    </label>
  );
}
