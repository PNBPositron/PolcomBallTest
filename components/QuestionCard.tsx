interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  question: {
    id: string;
    text: string;
    category: string;
  };
  selectedAnswer: number | null;
  onAnswerSelect: (value: number) => void;
}

export default function QuestionCard({
  questionNumber,
  totalQuestions,
  question,
  selectedAnswer,
  onAnswerSelect,
}: QuestionCardProps) {
  const answers = [
    { value: -5, label: 'Strongly\nDisagree' },
    { value: -3, label: 'Disagree' },
    { value: -1, label: 'Slightly\nDisagree' },
    { value: 0, label: 'Neutral' },
    { value: 1, label: 'Slightly\nAgree' },
    { value: 3, label: 'Agree' },
    { value: 5, label: 'Strongly\nAgree' },
  ];

  return (
    <div className="question-card">
      <div className="question-number">
        Question {questionNumber} of {totalQuestions}
      </div>
      <div className="question-category">{question.category}</div>
      <div className="question-text">{question.text}</div>

      <div className="answer-options">
        {answers.map((answer) => (
          <button
            key={answer.value}
            className={`answer-btn ${selectedAnswer === answer.value ? 'selected' : ''}`}
            onClick={() => onAnswerSelect(answer.value)}
          >
            <span>{answer.value > 0 ? '+' : ''}{answer.value !== 0 ? answer.value : '0'}</span>
            <span className={`answer-label ${selectedAnswer === answer.value ? 'selected' : ''}`}>
              {answer.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
