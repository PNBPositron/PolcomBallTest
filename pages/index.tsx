import { useState } from 'react';
import QuestionCard from '../components/QuestionCard';
import ResultsView from '../components/ResultsView';
import { QUESTIONS } from '../data/questions';
import { IDEOLOGIES } from '../data/ideologies';

interface Result {
  id: string;
  name: string;
  score: number;
  description: string;
  color: string;
}

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [results, setResults] = useState<Result[] | null>(null);

  const handleAnswerSelect = (value: number) => {
    setAnswers({
      ...answers,
      [QUESTIONS[currentQuestion].id]: value,
    });

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    const scores: Record<string, number> = {};

    IDEOLOGIES.forEach((ideology) => {
      scores[ideology.id] = 0;
    });

    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = QUESTIONS.find((q) => q.id === questionId);
      if (!question) return;

      Object.entries(question.ideologyWeights).forEach(([ideologyId, weight]) => {
        if (scores[ideologyId] !== undefined) {
          scores[ideologyId] += answer * weight;
        }
      });
    });

    const calculatedResults = IDEOLOGIES.map((ideology) => ({
      id: ideology.id,
      name: ideology.name,
      score: Math.max(0, scores[ideology.id] || 0),
      description: ideology.description,
      color: ideology.color,
    }))
      .sort((a, b) => b.score - a.score);

    setResults(calculatedResults);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResults(null);
  };

  if (results) {
    return <ResultsView results={results} onRestart={handleRestart} />;
  }

  return (
    <div className="container">
      <div className="header">
        <h1>🎭 Polcomballs Political Test</h1>
        <p>Discover which political ideology aligns with your values</p>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%`,
          }}
        ></div>
      </div>

      <QuestionCard
        questionNumber={currentQuestion + 1}
        totalQuestions={QUESTIONS.length}
        question={QUESTIONS[currentQuestion]}
        selectedAnswer={answers[QUESTIONS[currentQuestion].id] || null}
        onAnswerSelect={handleAnswerSelect}
      />

      <div className="navigation">
        <button
          className="btn btn-secondary"
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
        >
          ← Previous
        </button>
        <span className="question-status">
          {currentQuestion + 1} / {QUESTIONS.length}
        </span>
        <button
          className="btn btn-secondary"
          onClick={() => {
            if (currentQuestion < QUESTIONS.length - 1) {
              setCurrentQuestion(currentQuestion + 1);
            }
          }}
          disabled={currentQuestion === QUESTIONS.length - 1}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
