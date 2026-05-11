import { useState } from 'react';
import Head from 'next/head';
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
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [QUESTIONS[currentQuestion].id]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const calculateResults = () => {
    const scores: Record<string, number> = {};

    // Initialize scores
    Object.keys(IDEOLOGIES).forEach((key) => {
      scores[key] = 0;
    });

    // Calculate scores based on answers
    QUESTIONS.forEach((question) => {
      const answer = answers[question.id] || 0;
      Object.entries(question.ideologyWeights).forEach(([ideology, weight]) => {
        if (scores[ideology] !== undefined) {
          scores[ideology] += answer * weight;
        }
      });
    });

    // Normalize scores to 0-100 range
    const maxScore = Math.max(...Object.values(scores));
    const minScore = Math.min(...Object.values(scores));
    const range = maxScore - minScore || 1;

    const results: Result[] = Object.entries(scores)
      .map(([id, score]) => {
        const ideology = IDEOLOGIES[id];
        const normalized = ((score - minScore) / range) * 100;
        return {
          id,
          name: ideology.name,
          score: normalized,
          description: ideology.description,
          color: ideology.color,
        };
      })
      .sort((a, b) => b.score - a.score);

    setShowResults(true);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;
  const currentQ = QUESTIONS[currentQuestion];
  const selectedAnswer = answers[currentQ?.id];

  return (
    <>
      <Head>
        <title>Polcomballs Political Test</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Interactive political ideology test based on polcomballs"
        />
      </Head>

      <div className="container">
        <div className="header">
          <h1>🎯 Polcomballs Political Test</h1>
          <p>Discover which political ideology aligns with your values</p>
        </div>

        {!showResults ? (
          <>
            <div className="progress-container">
              <div className="progress-info">
                <span>Progress</span>
                <span>{currentQuestion + 1} / {QUESTIONS.length}</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {currentQ && (
              <QuestionCard
                questionNumber={currentQuestion + 1}
                totalQuestions={QUESTIONS.length}
                question={currentQ}
                selectedAnswer={selectedAnswer}
                onAnswerSelect={handleAnswerSelect}
              />
            )}

            <div className="btn-group">
              <button
                className="btn btn-primary"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                style={{ opacity: currentQuestion === 0 ? 0.5 : 1 }}
              >
                ← Previous
              </button>
              <button
                className="btn"
                onClick={handleNext}
                disabled={selectedAnswer === undefined && currentQuestion === 0}
                style={{ opacity: selectedAnswer === undefined ? 0.5 : 1 }}
              >
                {currentQuestion === QUESTIONS.length - 1 ? 'See Results' : 'Next'} →
              </button>
            </div>
          </>
        ) : (
          <ResultsView results={Object.values(calculateResults())} onRestart={handleRestart} />
        )}
      </div>
    </>
  );

  function calculateResults(): Result[] {
    const scores: Record<string, number> = {};

    Object.keys(IDEOLOGIES).forEach((key) => {
      scores[key] = 0;
    });

    QUESTIONS.forEach((question) => {
      const answer = answers[question.id] || 0;
      Object.entries(question.ideologyWeights).forEach(([ideology, weight]) => {
        if (scores[ideology] !== undefined) {
          scores[ideology] += answer * weight;
        }
      });
    });

    const maxScore = Math.max(...Object.values(scores));
    const minScore = Math.min(...Object.values(scores));
    const range = maxScore - minScore || 1;

    return Object.entries(scores)
      .map(([id, score]) => {
        const ideology = IDEOLOGIES[id];
        const normalized = ((score - minScore) / range) * 100;
        return {
          id,
          name: ideology.name,
          score: normalized,
          description: ideology.description,
          color: ideology.color,
        };
      })
      .sort((a, b) => b.score - a.score);
  }
}
