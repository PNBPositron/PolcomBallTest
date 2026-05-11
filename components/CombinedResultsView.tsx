interface CombinedResultsViewProps {
  combinedIdeology: {
    name: string;
    description: string;
    color: string;
    components: string[];
    primaryComponent: { id: string; name: string; score: number };
    secondaryComponent: { id: string; name: string; score: number } | null;
    tertiaryComponent: { id: string; name: string; score: number } | null;
  };
  allResults: Array<{ id: string; name: string; score: number; description: string; color: string }>;
  onRestart: () => void;
}

export default function CombinedResultsView({
  combinedIdeology,
  allResults,
  onRestart,
}: CombinedResultsViewProps) {
  return (
    <div className="results-container">
      <div className="results-header">
        <h2>Your Political Ideology</h2>
      </div>

      <div className="combined-ideology-card">
        <div className="combined-ideology-name">{combinedIdeology.name}</div>
        <div className="combined-ideology-description">{combinedIdeology.description}</div>

        <div className="components-section">
          <h3>Components:</h3>
          <div className="components-list">
            {combinedIdeology.primaryComponent && (
              <div className="component-item primary">
                <div className="component-label">Primary</div>
                <div className="component-name">{combinedIdeology.primaryComponent.name}</div>
                <div className="component-score">{Math.round(combinedIdeology.primaryComponent.score)}</div>
              </div>
            )}
            {combinedIdeology.secondaryComponent && (
              <div className="component-item secondary">
                <div className="component-label">Secondary</div>
                <div className="component-name">{combinedIdeology.secondaryComponent.name}</div>
                <div className="component-score">{Math.round(combinedIdeology.secondaryComponent.score)}</div>
              </div>
            )}
            {combinedIdeology.tertiaryComponent && (
              <div className="component-item tertiary">
                <div className="component-label">Tertiary</div>
                <div className="component-name">{combinedIdeology.tertiaryComponent.name}</div>
                <div className="component-score">{Math.round(combinedIdeology.tertiaryComponent.score)}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="all-results-section">
        <h3>All Ideology Scores:</h3>
        <div className="results-grid">
          {allResults.slice(0, 10).map((result, index) => {
            const maxScore = Math.max(...allResults.map((r) => r.score));
            const percentage = Math.round((result.score / maxScore) * 100);
            return (
              <div key={result.id} className="result-card">
                <div className="result-rank">{index + 1}</div>
                <div className="result-name">{result.name}</div>
                <div className="result-score">{percentage}%</div>
                <div className="result-bar">
                  <div
                    className="result-bar-fill"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="btn-group">
        <button className="btn btn-primary" onClick={onRestart}>
          Take Test Again
        </button>
        <a href="/" className="btn">
          Home
        </a>
      </div>
    </div>
  );
}
