interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="state-card error-state" role="alert">
      <div className="state-icon" aria-hidden="true">!</div>
      <h2>Could not load internships</h2>
      <p>{message}</p>
      <button className="button primary" type="button" onClick={onRetry}>
        Try again
      </button>
    </div>
  );
}
