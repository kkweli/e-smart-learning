import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Award, BookOpen, Clock, Flame, TrendingUp, ArrowLeft } from 'lucide-react';
import { CourseCard } from '@/components/courses/CourseCard';

export default function Profile() {
  const { user, courses } = useApp();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const enrolledCourses = courses.filter(c => c.enrolled);
  const completedCoursesList = courses.filter(c => user.completedCourses.includes(c.id));
  const inProgressCourses = enrolledCourses.filter(c => !user.completedCourses.includes(c.id));

  const totalLessons = enrolledCourses.reduce((acc, c) => acc + c.lessons.length, 0);
  const completedLessons = enrolledCourses.reduce((acc, c) => 
    acc + c.lessons.filter(l => l.completed).length, 0
  );

  return (
    <div className="min-h-screen pb-20">
      {/* Profile Header */}
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

          <div className="flex items-start gap-6 animate-fade-in">
            <div className="h-24 w-24 rounded-full bg-gradient-primary flex items-center justify-center text-white text-3xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
              <p className="text-muted-foreground mb-4">{user.email}</p>
              <div className="flex gap-2 flex-wrap">
                {user.badges.map(badge => (
                  <Badge key={badge} className="bg-accent/10 text-accent border-accent/20" variant="outline">
                    <Award className="h-3 w-3 mr-1" />
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-card border-border/50 animate-fade-in">
            <CardContent className="p-6 text-center">
              <BookOpen className="h-10 w-10 mx-auto mb-3 text-primary" />
              <div className="text-3xl font-bold mb-1">{enrolledCourses.length}</div>
              <div className="text-sm text-muted-foreground">Enrolled Courses</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 animate-fade-in" style={{ animationDelay: '50ms' }}>
            <CardContent className="p-6 text-center">
              <Award className="h-10 w-10 mx-auto mb-3 text-accent" />
              <div className="text-3xl font-bold mb-1">{completedCoursesList.length}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <CardContent className="p-6 text-center">
              <Flame className="h-10 w-10 mx-auto mb-3 text-destructive" />
              <div className="text-3xl font-bold mb-1">{user.streak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 animate-fade-in" style={{ animationDelay: '150ms' }}>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-10 w-10 mx-auto mb-3 text-success" />
              <div className="text-3xl font-bold mb-1">
                {totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0}%
              </div>
              <div className="text-sm text-muted-foreground">Overall Progress</div>
            </CardContent>
          </Card>
        </div>

        {/* In Progress Courses */}
        {inProgressCourses.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Continue Learning</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inProgressCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}

        {/* Completed Courses */}
        {completedCoursesList.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Completed Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedCoursesList.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}

        {enrolledCourses.length === 0 && (
          <Card className="p-12 text-center">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No courses yet</h3>
            <p className="text-muted-foreground mb-6">Start your learning journey by enrolling in a course!</p>
            <Button onClick={() => navigate('/')} className="bg-gradient-primary">
              Browse Courses
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
