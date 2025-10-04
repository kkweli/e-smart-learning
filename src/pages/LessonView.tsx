import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, FileDown, Sparkles } from 'lucide-react';
import { VideoPlayer } from '@/components/courses/VideoPlayer';
import { Quiz } from '@/components/quiz/Quiz';
import ReactMarkdown from 'react-markdown';
import { useToast } from '@/hooks/use-toast';

export default function LessonView() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { courses, toggleLessonComplete, submitQuiz } = useApp();
  const { toast } = useToast();
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const course = courses.find(c => c.id === courseId);
  const lesson = course?.lessons.find(l => l.id === lessonId);

  if (!course || !lesson) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Lesson not found</h1>
        <Button onClick={() => navigate('/')}>Back to Courses</Button>
      </div>
    );
  }

  const currentIndex = course.lessons.findIndex(l => l.id === lessonId);
  const nextLesson = course.lessons[currentIndex + 1];
  const previousLesson = course.lessons[currentIndex - 1];

  const handleComplete = () => {
    toggleLessonComplete(course.id, lesson.id);
    toast({
      title: "Lesson completed!",
      description: `Great job! You've completed "${lesson.title}"`,
    });
  };

  const handleQuizComplete = (score: number, totalQuestions: number, passed: boolean) => {
    submitQuiz(course.id, lesson.id, lesson.quiz.id, score, totalQuestions);
    setQuizCompleted(true);
    
    toast({
      title: passed ? "Quiz Passed! 🎉" : "Quiz Complete",
      description: passed 
        ? `You scored ${score}/${totalQuestions}. Well done!`
        : `You scored ${score}/${totalQuestions}. Review the material and try again.`,
      variant: passed ? "default" : "destructive"
    });
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="bg-gradient-hero border-b border-border/50">
        <div className="container py-8">
          <Button
            variant="ghost"
            onClick={() => navigate(`/course/${courseId}`)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Button>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
              <p className="text-muted-foreground">Lesson {lesson.order} of {course.lessons.length}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                <Clock className="h-3 w-3 mr-1" />
                {lesson.duration}
              </Badge>
              {lesson.completed && (
                <Badge className="bg-success/10 text-success border-success/20">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Video Section */}
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-6">
              <VideoPlayer videoUrl={lesson.videoUrl} title={lesson.title} />
            </CardContent>
          </Card>

          {/* Lesson Content */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle>Lesson Content</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <ReactMarkdown>{lesson.textContent}</ReactMarkdown>
            </CardContent>
          </Card>

          {/* Key Takeaways */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Key Takeaways
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {lesson.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle>Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <FileDown className="mr-2 h-4 w-4" />
                Download Lesson Summary (PDF)
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileDown className="mr-2 h-4 w-4" />
                Download Code Examples (ZIP)
              </Button>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          {!showQuiz && !quizCompleted && (
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle>Lesson Quiz</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Test your knowledge with {lesson.quiz.questions.length} questions. 
                  You need {lesson.quiz.passingScore}% to pass.
                </p>
                <Button onClick={() => setShowQuiz(true)} className="bg-gradient-primary">
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
          )}

          {showQuiz && !quizCompleted && (
            <Quiz quiz={lesson.quiz} onComplete={handleQuizComplete} />
          )}

          {quizCompleted && (
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-6 text-center">
                <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Quiz Completed!</h3>
                <p className="text-muted-foreground mb-4">
                  You can now continue to the next lesson or review the material.
                </p>
                <Button onClick={() => setShowQuiz(false)} variant="outline" className="mr-2">
                  Retake Quiz
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex flex-wrap gap-4 justify-between items-center pt-8 border-t border-border/50">
            <div>
              {previousLesson && (
                <Button
                  variant="outline"
                  onClick={() => navigate(`/course/${courseId}/lesson/${previousLesson.id}`)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous Lesson
                </Button>
              )}
            </div>
            
            <div className="flex gap-4">
              {!lesson.completed && (
                <Button onClick={handleComplete} variant="outline">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Mark as Complete
                </Button>
              )}
              
              {nextLesson && (
                <Button
                  onClick={() => navigate(`/course/${courseId}/lesson/${nextLesson.id}`)}
                  className="bg-gradient-primary"
                >
                  Next Lesson
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
