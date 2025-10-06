import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  passingScore: number;
  questions: QuizQuestion[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string;
  videoUrl: string;
  textContent: string;
  keyTakeaways: string[];
  quiz: Quiz;
  completed: boolean;
  order: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  thumbnail: string;
  lessons: Lesson[];
  finalExam: Quiz;
  enrolledStudents: number;
  rating: number;
  enrolled: boolean;
}

export interface QuizResult {
  courseId: string;
  lessonId?: string;
  quizId: string;
  score: number;
  totalQuestions: number;
  passed: boolean;
  completedAt: Date;
}

export interface Certificate {
  id: string;
  courseId: string;
  courseName: string;
  userName: string;
  completionDate: Date;
  instructor: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  enrolledCourses: string[];
  completedCourses: string[];
  quizResults: QuizResult[];
  certificates: Certificate[];
  streak: number;
  badges: string[];
}

interface AppContextType {
  user: User | null;
  courses: Course[];
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  enrollCourse: (courseId: string) => Promise<void>;
  toggleLessonComplete: (courseId: string, lessonId: string) => Promise<void>;
  markCourseComplete: (courseId: string) => Promise<void>;
  submitQuiz: (courseId: string, lessonId: string | undefined, quizId: string, score: number, totalQuestions: number) => Promise<void>;
  geminiApiKey: string;
  setGeminiApiKey: (key: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

import { initialCourses } from '@/data/coursesData';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [geminiApiKey, setGeminiApiKey] = useState<string>(import.meta.env.VITE_GEMINI_API_KEY || '');
  const [loading, setLoading] = useState(true);

  // Initialize auth and load user data
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSupabaseUser(session?.user ?? null);
      if (session?.user) {
        loadUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSupabaseUser(session?.user ?? null);
      if (session?.user) {
        loadUserProfile(session.user.id);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load courses from database
  useEffect(() => {
    loadCourses();
  }, []);

  const loadUserProfile = async (userId: string) => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profile) {
        const { data: enrollments } = await supabase
          .from('enrollments')
          .select('course_id, completed_at')
          .eq('user_id', userId);

        const { data: certificates } = await supabase
          .from('certificates')
          .select('*')
          .eq('user_id', userId);

        const { data: achievements } = await supabase
          .from('user_achievements')
          .select('achievement_type')
          .eq('user_id', userId);

        setUser({
          id: profile.id,
          name: profile.full_name,
          email: profile.email,
          enrolledCourses: enrollments?.map(e => e.course_id) || [],
          completedCourses: enrollments?.filter(e => e.completed_at).map(e => e.course_id) || [],
          quizResults: [],
          certificates: certificates?.map(c => ({
            id: c.id,
            courseId: c.course_id,
            courseName: '', // Will be populated from course data
            userName: profile.full_name,
            completionDate: new Date(c.issued_at),
            instructor: ''
          })) || [],
          streak: profile.learning_streak || 0,
          badges: achievements?.map(a => a.achievement_type) || []
        });
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCourses = useCallback(async () => {
    try {
      const { data: coursesData } = await supabase
        .from('courses')
        .select(`
          *,
          lessons (
            id,
            title,
            lesson_order,
            video_url,
            video_duration,
            content_text,
            key_takeaways,
            description
          )
        `)
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (coursesData) {
        const formattedCourses: Course[] = await Promise.all(coursesData.map(async (course: any) => {
          // Check if user is enrolled
          let isEnrolled = false;
          if (user) {
            const { data: enrollment } = await supabase
              .from('enrollments')
              .select('id')
              .eq('user_id', user.id)
              .eq('course_id', course.id)
              .maybeSingle();
            isEnrolled = !!enrollment;
          }

          // Get lesson progress for enrolled courses
          const lessonsWithProgress = await Promise.all(course.lessons?.map(async (lesson: {
            id: string;
            title: string;
            lesson_order: number;
            video_url?: string;
            video_duration: number;
            content_text?: string;
            key_takeaways?: string[];
            description?: string;
          }) => {
            let completed = false;
            if (user) {
              const { data: progress } = await supabase
                .from('lesson_progress')
                .select('completed')
                .eq('user_id', user.id)
                .eq('lesson_id', lesson.id)
                .maybeSingle();
              completed = progress?.completed || false;
            }

            return {
              id: lesson.id,
              title: lesson.title,
              duration: `${lesson.video_duration} min`,
              content: lesson.description || '',
              videoUrl: lesson.video_url || '',
              textContent: lesson.content_text || '',
              keyTakeaways: lesson.key_takeaways || [],
              quiz: { id: '', title: '', passingScore: 70, questions: [] },
              completed,
              order: lesson.lesson_order
            };
          }) || []);

          return {
            id: course.id,
            title: course.title,
            description: course.description,
            instructor: course.instructor_name,
            duration: `${course.duration_hours} hours`,
            difficulty: (course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1)) as 'Beginner' | 'Intermediate' | 'Advanced',
            category: course.category,
            thumbnail: course.thumbnail_url || '',
            lessons: lessonsWithProgress.sort((a: Lesson, b: Lesson) => a.order - b.order),
            finalExam: { id: '', title: '', passingScore: 75, questions: [] },
            enrolledStudents: course.enrolled_count || 0,
            rating: parseFloat(course.rating || '0'),
            enrolled: isEnrolled
          };
        }));
        setCourses(formattedCourses);
      }
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name
          }
        }
      });
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const enrollCourse = async (courseId: string) => {
    if (!user || !supabaseUser) return;
    
    try {
      await supabase
        .from('enrollments')
        .insert({ user_id: user.id, course_id: courseId });
      
      setCourses(prev => prev.map(course => 
        course.id === courseId ? { ...course, enrolled: true } : course
      ));
      
      setUser(prev => prev ? {
        ...prev,
        enrolledCourses: [...prev.enrolledCourses, courseId]
      } : null);
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  const toggleLessonComplete = async (courseId: string, lessonId: string) => {
    if (!user) return;
    
    try {
      const course = courses.find(c => c.id === courseId);
      const lesson = course?.lessons.find(l => l.id === lessonId);
      const newCompleted = !lesson?.completed;

      await supabase
        .from('lesson_progress')
        .upsert({
          user_id: user.id,
          lesson_id: lessonId,
          completed: newCompleted,
          completed_at: newCompleted ? new Date().toISOString() : null
        });

      setCourses(prev => prev.map(course => {
        if (course.id === courseId) {
          return {
            ...course,
            lessons: course.lessons.map(lesson =>
              lesson.id === lessonId ? { ...lesson, completed: newCompleted } : lesson
            )
          };
        }
        return course;
      }));
    } catch (error) {
      console.error('Error toggling lesson completion:', error);
    }
  };

  const markCourseComplete = async (courseId: string) => {
    if (!user) return;

    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    try {
      // Update enrollment completion
      await supabase
        .from('enrollments')
        .update({ 
          completed_at: new Date().toISOString(),
          progress_percentage: 100,
          certificate_issued: true
        })
        .eq('user_id', user.id)
        .eq('course_id', courseId);

      // Generate certificate
      const certificateNumber = `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      const verificationCode = `VER-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      await supabase
        .from('certificates')
        .insert({
          user_id: user.id,
          course_id: courseId,
          certificate_number: certificateNumber,
          verification_code: verificationCode
        });

      // Mark all lessons as complete
      setCourses(prev => prev.map(c => {
        if (c.id === courseId) {
          return {
            ...c,
            lessons: c.lessons.map(lesson => ({ ...lesson, completed: true }))
          };
        }
        return c;
      }));

      // Update user state
      const certificate: Certificate = {
        id: certificateNumber,
        courseId: course.id,
        courseName: course.title,
        userName: user.name,
        completionDate: new Date(),
        instructor: course.instructor
      };

      setUser(prev => prev ? {
        ...prev,
        completedCourses: [...prev.completedCourses, courseId],
        certificates: [...prev.certificates, certificate],
        badges: [...new Set([...prev.badges, 'Course Completed'])]
      } : null);
    } catch (error) {
      console.error('Error marking course complete:', error);
    }
  };

  const submitQuiz = async (courseId: string, lessonId: string | undefined, quizId: string, score: number, totalQuestions: number) => {
    if (!user) return;

    const percentage = (score / totalQuestions) * 100;
    const passed = percentage >= 70;

    try {
      await supabase
        .from('quiz_attempts')
        .insert({
          user_id: user.id,
          quiz_id: quizId,
          score,
          total_questions: totalQuestions,
          passed,
          answers_json: {}
        });

      const quizResult: QuizResult = {
        courseId,
        lessonId,
        quizId,
        score,
        totalQuestions,
        passed,
        completedAt: new Date()
      };

      setUser(prev => prev ? {
        ...prev,
        quizResults: [...prev.quizResults, quizResult]
      } : null);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  return (
    <AppContext.Provider value={{
      user,
      courses,
      login,
      signup,
      logout,
      enrollCourse,
      toggleLessonComplete,
      markCourseComplete,
      submitQuiz,
      geminiApiKey,
      setGeminiApiKey
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
