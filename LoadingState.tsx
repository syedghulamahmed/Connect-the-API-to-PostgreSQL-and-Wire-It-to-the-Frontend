export function LoadingState() {
  return (
    <div className="state-card" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <h2>Loading internships</h2>
      <p>Fetching the latest mock API response...</p>
    </div>
  );
}
