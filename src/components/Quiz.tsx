import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, HelpCircle, BookOpen } from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/geographyData';

export const Quiz: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: number]: number }>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setCurrentQuestionIndex(0);
  };

  const score = calculateScore();
  const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);

  return (
    <section id="quiz" className="py-16 md:py-24 bg-[#F8F5EE]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono tracking-widest text-[#A44A29] uppercase font-semibold mb-2">
            CHAPTER 3 · EXAMINATION BENCHMARK
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1B1715] font-bold tracking-tight">
            Academic Assessment
          </h2>
          <div className="h-0.5 w-16 bg-[#A44A29] my-4" />
          <p className="text-base sm:text-lg text-[#5C5147] leading-relaxed font-normal">
            Eight rigorous multiple-choice questions testing diagnostic understanding of wind erosion, particle transport, and depositional dynamics according to the Class 11 curriculum.
          </p>
        </div>

        {/* Quiz Examination Plate */}
        <div className="bg-white border border-[#DDD3C2] p-6 sm:p-10">
          {!submitted ? (
            <div>
              {/* Progress Bar & Question Tracker */}
              <div className="flex items-center justify-between text-xs font-mono text-[#786D62] pb-3 border-b border-[#EDE5D8] mb-6">
                <span className="text-[#8E3D20] font-bold">
                  QUESTION {currentQuestionIndex + 1} OF {QUIZ_QUESTIONS.length}
                </span>
                <span>
                  {Object.keys(selectedAnswers).length} of {QUIZ_QUESTIONS.length} Complete
                </span>
              </div>

              {/* Progress bar line */}
              <div className="w-full h-1 bg-[#EDE5D8] overflow-hidden mb-8">
                <div
                  className="h-full bg-[#8E3D20] transition-all duration-300"
                  style={{
                    width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                  }}
                />
              </div>

              {/* Active Question */}
              {(() => {
                const q = QUIZ_QUESTIONS[currentQuestionIndex];
                const selectedOption = selectedAnswers[q.id];

                return (
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1B1715] mb-6 leading-snug">
                      {q.question}
                    </h3>

                    {/* Options List with comfortable min 48px touch targets */}
                    <div className="space-y-3 mb-8">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = selectedOption === optIdx;

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            className={`w-full min-h-[48px] text-left p-3.5 sm:p-4 border text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-3 focus-visible:outline-none ${
                              isChosen
                                ? 'bg-[#FAF8F5] border-l-4 border-l-[#8E3D20] border-[#DDD3C2] text-[#1B1715]'
                                : 'bg-white border-[#DDD3C2] text-[#443B34] hover:bg-[#FAF9F6] active:bg-[#F3EFE7]'
                            }`}
                          >
                            <span
                              className={`w-6 h-6 flex items-center justify-center text-xs font-mono font-bold shrink-0 border ${
                                isChosen
                                  ? 'bg-[#8E3D20] text-white border-[#8E3D20]'
                                  : 'bg-white text-[#786D62] border-[#DDD3C2]'
                              }`}
                            >
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="leading-relaxed font-normal">{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Navigation Buttons (min 44px height, responsive) */}
                    <div className="flex items-center justify-between pt-5 border-t border-[#EDE5D8] gap-3">
                      <button
                        onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                        disabled={currentQuestionIndex === 0}
                        className="min-h-[44px] px-3.5 sm:px-4 py-2 text-xs font-mono border border-[#DDD3C2] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FAF8F5] text-[#443B34] cursor-pointer flex items-center justify-center shrink-0"
                      >
                        ← Prev
                      </button>

                      <div className="flex items-center gap-2 sm:gap-3">
                        {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? (
                          <button
                            onClick={() =>
                              setCurrentQuestionIndex((prev) =>
                                Math.min(QUIZ_QUESTIONS.length - 1, prev + 1)
                              )
                            }
                            className="min-h-[44px] px-4 sm:px-5 py-2 text-xs font-mono uppercase tracking-wider font-semibold bg-[#1B1715] text-white hover:bg-[#8E3D20] active:bg-[#6D2E16] transition-colors cursor-pointer flex items-center justify-center"
                          >
                            Next →
                          </button>
                        ) : (
                          <button
                            onClick={() => setSubmitted(true)}
                            className="min-h-[44px] px-4 sm:px-6 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold bg-[#8E3D20] text-white hover:bg-[#1B1715] active:bg-[#6D2E16] transition-all cursor-pointer flex items-center justify-center gap-2"
                          >
                            <Award className="w-4 h-4 shrink-0" />
                            <span>Submit</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            /* Results Screen */
            <div className="animate-in fade-in duration-200">
              <div className="text-center py-6 border-b border-[#EDE5D8] mb-8">
                <div className="w-14 h-14 bg-[#FAF8F5] border border-[#DDD3C2] flex items-center justify-center mx-auto text-[#8E3D20] mb-4">
                  <Award className="w-7 h-7" />
                </div>
                <div className="text-xs font-mono uppercase tracking-widest text-[#8C7F72] mb-1">
                  Examination Result
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1715]">
                  Evaluation Summary
                </h3>
                <div className="mt-3 text-4xl sm:text-5xl font-serif font-bold text-[#8E3D20] tabular-nums">
                  {score} / {QUIZ_QUESTIONS.length}
                </div>
                <div className="text-xs font-mono text-[#786D62] mt-2">
                  Cumulative Score: {percentage}% · {percentage >= 75 ? 'Distinction: Complete Syllabus Mastery' : 'Satisfactory: Review Rationale Citations Below'}
                </div>
              </div>

              {/* Comprehensive Answer Review */}
              <div className="space-y-6">
                <h4 className="font-serif text-xl font-bold text-[#1B1715]">
                  Detailed Syllabus Rationale &amp; Explanations
                </h4>

                {QUIZ_QUESTIONS.map((q, idx) => {
                  const userAnswer = selectedAnswers[q.id];
                  const isCorrect = userAnswer === q.correctIndex;

                  return (
                    <div
                      key={q.id}
                      className={`p-5 border ${
                        isCorrect
                          ? 'bg-[#FAFDF9] border-[#A3D9A5]'
                          : 'bg-[#FDF9F8] border-[#E8B4A8]'
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-2">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-[#2E5C38] shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-[#8E3D20] shrink-0 mt-0.5" />
                        )}
                        <div>
                          <div className="text-xs font-mono text-[#786D62] mb-1">
                            ITEM 0{idx + 1}
                          </div>
                          <h5 className="font-serif text-base font-bold text-[#1B1715]">
                            {q.question}
                          </h5>
                        </div>
                      </div>

                      <div className="mt-3 text-xs space-y-1.5 pl-8">
                        <div className="text-[#443B34]">
                          <span className="font-mono text-[#786D62]">Your Selection:</span>{' '}
                          <span className="font-medium">{userAnswer !== undefined ? q.options[userAnswer] : 'Unanswered'}</span>
                        </div>
                        {!isCorrect && (
                          <div className="text-[#2E5C38] font-medium">
                            <span className="font-mono">Correct Reference:</span> {q.options[q.correctIndex]}
                          </div>
                        )}
                      </div>

                      {/* Explanation from PDF */}
                      <div className="mt-3 pt-3 border-t border-[#EDE5D8] pl-8 text-xs text-[#5C5147] leading-relaxed">
                        <div className="font-mono text-[11px] uppercase tracking-wider text-[#1B1715] font-semibold mb-1">
                          Curriculum Rationale:
                        </div>
                        <p>{q.explanation}</p>
                        <div className="text-[11px] font-mono text-[#8E3D20] mt-1.5">
                          Source: {q.syllabusReference}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-[#EDE5D8] flex items-center justify-between">
                <button
                  onClick={handleRestart}
                  className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold bg-[#1B1715] text-white hover:bg-[#8E3D20] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Examination</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
