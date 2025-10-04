import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  enrollCourse: (courseId: string) => void;
  toggleLessonComplete: (courseId: string, lessonId: string) => void;
  markCourseComplete: (courseId: string) => void;
  submitQuiz: (courseId: string, lessonId: string | undefined, quizId: string, score: number, totalQuestions: number) => void;
  geminiApiKey: string;
  setGeminiApiKey: (key: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

import { initialCourses } from '@/data/coursesData';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [geminiApiKey, setGeminiApiKey] = useState<string>('');

  const login = (email: string, password: string): boolean => {
    // Simple mock login
    setUser({
      id: '1',
      name: 'Demo User',
      email: email,
      enrolledCourses: [],
      completedCourses: [],
      quizResults: [],
      certificates: [],
      streak: 5,
      badges: ['First Steps', 'Quick Learner']
    });
    return true;
  };

  const signup = (name: string, email: string, password: string): boolean => {
    setUser({
      id: '1',
      name: name,
      email: email,
      enrolledCourses: [],
      completedCourses: [],
      quizResults: [],
      certificates: [],
      streak: 0,
      badges: ['First Steps']
    });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const enrollCourse = (courseId: string) => {
    if (!user) return;
    
    setCourses(prev => prev.map(course => 
      course.id === courseId ? { ...course, enrolled: true } : course
    ));
    
    setUser(prev => prev ? {
      ...prev,
      enrolledCourses: [...prev.enrolledCourses, courseId]
    } : null);
  };

  const toggleLessonComplete = (courseId: string, lessonId: string) => {
    setCourses(prev => prev.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          lessons: course.lessons.map(lesson =>
            lesson.id === lessonId ? { ...lesson, completed: !lesson.completed } : lesson
          )
        };
      }
      return course;
    }));
  };

  const markCourseComplete = (courseId: string) => {
    if (!user) return;

    const course = courses.find(c => c.id === courseId);
    if (!course) return;

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

    // Generate certificate
    const certificate: Certificate = {
      id: `cert-${Date.now()}`,
      courseId: course.id,
      courseName: course.title,
      userName: user.name,
      completionDate: new Date(),
      instructor: course.instructor
    };

    // Add to completed courses and certificates
    setUser(prev => prev ? {
      ...prev,
      completedCourses: [...prev.completedCourses, courseId],
      certificates: [...prev.certificates, certificate],
      badges: [...new Set([...prev.badges, 'Course Completed'])]
    } : null);
  };

  const submitQuiz = (courseId: string, lessonId: string | undefined, quizId: string, score: number, totalQuestions: number) => {
    if (!user) return;

    const percentage = (score / totalQuestions) * 100;
    const passed = percentage >= 70;

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
