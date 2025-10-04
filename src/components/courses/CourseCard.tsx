import { Link } from 'react-router-dom';
import { Clock, Users, Star, BookOpen } from 'lucide-react';
import { Course } from '@/contexts/AppContext';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface CourseCardProps {
  course: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  const completedLessons = course.lessons.filter(l => l.completed).length;
  const totalLessons = course.lessons.length;
  const progressPercent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  const difficultyColors = {
    Beginner: 'bg-success/10 text-success border-success/20',
    Intermediate: 'bg-secondary/10 text-secondary-foreground border-secondary/20',
    Advanced: 'bg-accent/10 text-accent-foreground border-accent/20'
  };

  return (
    <Link to={`/course/${course.id}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-hover)] hover:scale-[1.02] animate-fade-in bg-gradient-card border-border/50">
        <div className="relative h-48 overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
          <Badge 
            className={`absolute top-3 right-3 ${difficultyColors[course.difficulty]}`}
            variant="outline"
          >
            {course.difficulty}
          </Badge>
        </div>

        <CardHeader className="pb-3">
          <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {course.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {course.description}
          </p>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{totalLessons} lessons</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-medium">{course.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{course.enrolledStudents.toLocaleString()} students</span>
            </div>
          </div>

          {course.enrolled && (
            <div className="pt-2 space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                <span>{completedLessons}/{totalLessons} lessons</span>
              </div>
              <Progress value={progressPercent} className="h-2" />
            </div>
          )}
        </CardContent>

        <CardFooter className="text-sm text-muted-foreground">
          by {course.instructor}
        </CardFooter>
      </Card>
    </Link>
  );
};
