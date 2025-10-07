import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { CourseCard } from '@/components/courses/CourseCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, TrendingUp, Award, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import heroImage from '@/assets/hero-bg.jpg';
import { FloatingChatButton } from '@/components/ai/FloatingChatButton';
import { AIChat } from '@/components/ai/AIChat';
import { Sheet, SheetContent } from '@/components/ui/sheet';

export default function Home() {
  const { user, courses } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const categories = ['All', 'Web Development', 'Data Science', 'Artificial Intelligence', 'Business', 'Creative', 'Personal Development'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const enrolledCourses = user ? courses.filter(c => c.enrolled) : [];
  const completedCount = user?.completedCourses.length || 0;
  const totalHours = enrolledCourses.reduce((acc, c) => acc + parseInt(c.duration), 0);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Hero" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="container relative py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Learn with AI E-smart learning
            </h1>
            <p className="text-xl text-muted-foreground">
              Master new skills with AI-powered learning assistance. Get personalized help, instant answers, and adaptive study plans.
            </p>
            {user && (
              <div className="grid grid-cols-3 gap-4 pt-8 max-w-2xl mx-auto">
                <Card className="bg-gradient-card border-border/50">
                  <CardContent className="p-4 text-center">
                    <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{enrolledCourses.length}</div>
                    <div className="text-xs text-muted-foreground">Active Courses</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-card border-border/50">
                  <CardContent className="p-4 text-center">
                    <Award className="h-8 w-8 mx-auto mb-2 text-accent" />
                    <div className="text-2xl font-bold">{completedCount}</div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-card border-border/50">
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 text-success" />
                    <div className="text-2xl font-bold">{user.streak}</div>
                    <div className="text-xs text-muted-foreground">Day Streak</div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="container py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'bg-gradient-primary' : ''}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="container pb-20">
        <h2 className="text-3xl font-bold mb-8">
          {selectedCategory === 'All' ? 'All Courses' : selectedCategory}
        </h2>
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No courses found matching your criteria.</p>
          </Card>
        )}
      </section>

      {/* Floating AI Chat */}
      {user && (
        <>
          <FloatingChatButton isOpen={isChatOpen} onClick={() => setIsChatOpen(!isChatOpen)} />
          <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
            <SheetContent side="right" className="w-full sm:w-[500px] p-0">
              <AIChat />
            </SheetContent>
          </Sheet>
        </>
      )}
    </div>
  );
}
