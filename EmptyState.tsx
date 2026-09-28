interface EmptyStateProps {
  onClear: () => void;
}

export function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <div className="state-card">
      <div className="state-icon" aria-hidden="true">∅</div>
      <h2>No internships found</h2>
      <p>Try a different search term or reset your filters.</p>
      <button className="button secondary" type="button" onClick={onClear}>
        Clear filters
      </button>
    </div>
  );
}
