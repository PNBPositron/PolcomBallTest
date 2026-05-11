interface Result {
  id: string;
  name: string;
  score: number;
  description: string;
  color: string;
}

interface ResultsViewProps {
  results: Result[];
  onRestart: () => void;
}

export default function ResultsView({ results, onRestart }: ResultsViewProps) {
  const maxScore = Math.max(...results.map((r) => r.score));

  return (
    <div className="results-container">
      <div className="results-header">
        <h2>Your Political Profile</h2>
        <p>Based on your answers, here are your top ideological matches:</p>
      </div>

      <div className="results-grid">
        {results.slice(0, 5).map((result, index) => {
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
              <div className="result-description">{result.description}</div>
            </div>
          );
        })}
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
