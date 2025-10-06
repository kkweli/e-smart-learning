import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Clock, BookOpen, Star, Users, CheckCircle2, Sparkles } from 'lucide-react';
import { FloatingChatButton } from '@/components/ai/FloatingChatButton';
import { AIChat } from '@/components/ai/AIChat';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, user, enrollCourse, toggleLessonComplete, markCourseComplete } = useApp();
  const { toast } = useToast();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const course = courses.find(c => c.id === id);

  if (!course) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Course not found</h1>
        <Button onClick={() => navigate('/')}>Back to Courses</Button>
      </div>
    );
  }

  const completedLessons = course.lessons.filter(l => l.completed).length;
  const totalLessons = course.lessons.length;
  const progressPercent = (completedLessons / totalLessons) * 100;
  const allLessonsComplete = completedLessons === totalLessons;

  const handleEnroll = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    enrollCourse(course.id);
    toast({
      title: "Enrolled successfully!",
      description: `You're now enrolled in ${course.title}`,
    });
  };

  const handleMarkComplete = () => {
    markCourseComplete(course.id);
    toast({
      title: "Congratulations! 🎉",
      description: `You've completed ${course.title}!`,
    });
  };

  const difficultyColors = {
    Beginner: 'bg-success/10 text-success border-success/20',
    Intermediate: 'bg-secondary/10 text-secondary-foreground border-secondary/20',
    Advanced: 'bg-accent/10 text-accent-foreground border-accent/20'
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Course Header */}
      <div className="bg-gradient-hero border-b border-border/50">
        <div className="container py-12">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4 animate-fade-in">
              <div className="flex gap-2">
                <Badge className={difficultyColors[course.difficulty]} variant="outline">
                  {course.difficulty}
                </Badge>
                <Badge variant="outline">{course.category}</Badge>
              </div>
              
              <h1 className="text-4xl font-bold">{course.title}</h1>
              <p className="text-lg text-muted-foreground">{course.description}</p>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-medium">{course.rating}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{course.enrolledStudents.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>{totalLessons} lessons</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4">
                <span className="text-sm font-medium">Instructor:</span>
                <span className="text-sm text-muted-foreground">{course.instructor}</span>
              </div>

              {!course.enrolled ? (
                <Button 
                  size="lg" 
                  onClick={handleEnroll}
                  className="bg-gradient-primary mt-4"
                >
                  Enroll Now
                </Button>
              ) : null}
            </div>

            <div className="relative h-64 md:h-full rounded-lg overflow-hidden animate-scale-in">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container py-12">
        {course.enrolled && (
          <Card className="mb-8 bg-gradient-card border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Your Progress</CardTitle>
                <span className="text-sm text-muted-foreground">
                  {completedLessons} / {totalLessons} lessons complete
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={progressPercent} className="h-3" />
              {allLessonsComplete && (
                <Button
                  onClick={handleMarkComplete}
                  className="mt-4 bg-gradient-primary"
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Mark Course as Complete
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle>Course Lessons</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {course.lessons.map((lesson, idx) => (
              <div
                key={lesson.id}
                className="flex items-start gap-4 p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors animate-fade-in"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {course.enrolled && user && (
                  <Checkbox
                    checked={lesson.completed}
                    onCheckedChange={() => toggleLessonComplete(course.id, lesson.id)}
                    className="mt-1"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-medium">
                        {lesson.order}. {lesson.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {lesson.content}
                      </p>
                    </div>
                    <Badge variant="outline" className="shrink-0">
                      <Clock className="h-3 w-3 mr-1" />
                      {lesson.duration}
                    </Badge>
                  </div>
                  <div className="flex gap-2 mt-3">
                    {course.enrolled && user && (
                      <>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => navigate(`/course/${course.id}/lesson/${lesson.id}`)}
                        >
                          Start Lesson
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsChatOpen(true)}
                        >
                          <Sparkles className="h-4 w-4 mr-2" />
                          Ask AI
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Chat */}
      {user && course.enrolled && (
        <>
          <FloatingChatButton isOpen={isChatOpen} onClick={() => setIsChatOpen(!isChatOpen)} />
          <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
            <SheetContent side="right" className="w-full sm:w-[500px] p-0">
              <AIChat courseContext={course.title} />
            </SheetContent>
          </Sheet>
        </>
      )}
    </div>
  );
}
