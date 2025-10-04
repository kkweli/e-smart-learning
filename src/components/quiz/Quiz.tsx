import { useState } from 'react';
import { Quiz as QuizType, QuizQuestion } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

interface QuizProps {
  quiz: QuizType;
  onComplete: (score: number, totalQuestions: number, passed: boolean) => void;
}

export function Quiz({ quiz, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(quiz.questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number>(-1);

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);
    setSelectedAnswer(-1);

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      const correct = newAnswers.filter((answer, idx) => 
        answer === quiz.questions[idx].correctAnswer
      ).length;
      const percentage = (correct / quiz.questions.length) * 100;
      const passed = percentage >= quiz.passingScore;
      
      onComplete(correct, quiz.questions.length, passed);
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1]);
    }
  };

  if (showResults) {
    const correct = answers.filter((answer, idx) => 
      answer === quiz.questions[idx].correctAnswer
    ).length;
    const percentage = (correct / quiz.questions.length) * 100;
    const passed = percentage >= quiz.passingScore;

    return (
      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="text-center">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className={`text-6xl font-bold ${passed ? 'text-success' : 'text-destructive'}`}>
              {percentage.toFixed(0)}%
            </div>
            <div className="text-2xl font-semibold">
              {passed ? (
                <div className="flex items-center justify-center gap-2 text-success">
                  <CheckCircle2 className="h-8 w-8" />
                  <span>Passed!</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 text-destructive">
                  <XCircle className="h-8 w-8" />
                  <span>Not Passed</span>
                </div>
              )}
            </div>
            <div className="text-muted-foreground">
              You got {correct} out of {quiz.questions.length} questions correct
            </div>
            <div className="text-sm text-muted-foreground">
              Passing Score: {quiz.passingScore}%
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Performance Breakdown:</h4>
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                Correct: {correct}
              </span>
              <span className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-destructive" />
                Incorrect: {quiz.questions.length - correct}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {quiz.questions.map((q, idx) => {
              const userAnswer = answers[idx];
              const isCorrect = userAnswer === q.correctAnswer;
              
              return (
                <div key={q.id} className="p-4 rounded-lg border border-border/50 space-y-2">
                  <div className="flex items-start gap-2">
                    {isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">Question {idx + 1}: {q.question}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your answer: {q.options[userAnswer] || 'Not answered'}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-success mt-1">
                          Correct answer: {q.options[q.correctAnswer]}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground mt-2">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-card border-border/50">
      <CardHeader>
        <div className="space-y-4">
          <CardTitle>{quiz.title}</CardTitle>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Quiz in Progress
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {question.question}
          </h3>

          <RadioGroup value={selectedAnswer.toString()} onValueChange={(val) => handleAnswer(parseInt(val))}>
            <div className="space-y-3">
              {question.options.map((option, idx) => (
                <div key={idx} className="flex items-center space-x-2 border border-border/50 rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={idx.toString()} id={`option-${idx}`} />
                  <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={selectedAnswer === -1}
            className="bg-gradient-primary"
          >
            {currentQuestion === quiz.questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
