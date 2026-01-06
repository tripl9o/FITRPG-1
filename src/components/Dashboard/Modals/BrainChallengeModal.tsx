import React, { useState, useEffect } from 'react';
import { X, Brain, CheckCircle } from 'lucide-react';
import { BRAIN_QUESTIONS, BrainQuestion } from '../../../types/quests';

interface BrainChallengeModalProps {
  onClose: () => void;
  onComplete: () => void;
}

export const BrainChallengeModal: React.FC<BrainChallengeModalProps> = ({ onClose, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState<BrainQuestion[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);

  // Select 3 random questions on mount
  useEffect(() => {
    const shuffled = [...BRAIN_QUESTIONS].sort(() => 0.5 - Math.random());
    setSelectedQuestions(shuffled.slice(0, 3));
  }, []);

  const currentQuestion = selectedQuestions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
  };

  const handleNext = () => {
    const newAnsweredCount = answeredQuestions + 1;
    setAnsweredQuestions(newAnsweredCount);
    
    if (newAnsweredCount >= 3) {
      // Challenge complete
      setTimeout(() => {
        onComplete();
      }, 1500);
    } else {
      // Next question
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  if (!currentQuestion) {
    return null;
  }

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1f3a] rounded-xl p-6 w-full max-w-2xl border border-[#4a90e2]/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Brain className="w-6 h-6 text-[#4a90e2]" />
            <h2 className="text-xl font-bold text-white">Brain Challenge</h2>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-400 text-sm">
              Question {currentQuestionIndex + 1} of 3
            </span>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {answeredQuestions >= 3 ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Challenge Complete!</h3>
            <p className="text-gray-400">Great job! You've earned your XP and gold.</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-400 capitalize">
                  {currentQuestion.category}
                </span>
                <div className="flex space-x-1">
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i < answeredQuestions ? 'bg-green-500' : 
                        i === currentQuestionIndex ? 'bg-[#4a90e2]' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-4">
                {currentQuestion.question}
              </h3>
            </div>

            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                    showResult
                      ? index === currentQuestion.correctAnswer
                        ? 'bg-green-900/30 border-green-500 text-green-400'
                        : index === selectedAnswer && !isCorrect
                        ? 'bg-red-900/30 border-red-500 text-red-400'
                        : 'bg-[#0a0e27] border-gray-600 text-gray-400'
                      : 'bg-[#0a0e27] border-[#4a90e2]/20 text-white hover:border-[#4a90e2]/40 hover:bg-[#4a90e2]/5'
                  }`}
                >
                  <span className="font-medium mr-3">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </button>
              ))}
            </div>

            {showResult && (
              <div className="mb-6 p-4 bg-[#0a0e27] rounded-lg">
                <div className={`flex items-center space-x-2 mb-2 ${
                  isCorrect ? 'text-green-400' : 'text-red-400'
                }`}>
                  <span className="font-semibold">
                    {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                  </span>
                </div>
                <p className="text-gray-300 text-sm">
                  <strong>Fun Fact:</strong> {currentQuestion.funFact}
                </p>
              </div>
            )}

            {showResult && (
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-[#4a90e2] hover:bg-[#5a9ff2] text-white rounded-lg transition-colors"
                >
                  {answeredQuestions >= 2 ? 'Finish Challenge' : 'Next Question'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};