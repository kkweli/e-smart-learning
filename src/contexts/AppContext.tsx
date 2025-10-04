import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string;
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
  enrolledStudents: number;
  rating: number;
  enrolled: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  enrolledCourses: string[];
  completedCourses: string[];
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
  geminiApiKey: string;
  setGeminiApiKey: (key: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialCourses: Course[] = [
  {
    id: '1',
    title: 'Web Development Fundamentals',
    description: 'Master the basics of web development with HTML, CSS, and JavaScript. Build responsive, modern websites from scratch.',
    instructor: 'Sarah Johnson',
    duration: '8 hours',
    difficulty: 'Beginner',
    category: 'Web Development',
    thumbnail: '/src/assets/web-dev-course.jpg',
    enrolledStudents: 1243,
    rating: 4.8,
    enrolled: false,
    lessons: [
      { id: '1-1', title: 'Introduction to HTML', duration: '45 min', content: 'Learn the fundamentals of HTML structure and semantic markup', completed: false, order: 1 },
      { id: '1-2', title: 'CSS Styling Basics', duration: '60 min', content: 'Master CSS selectors, properties, and the box model', completed: false, order: 2 },
      { id: '1-3', title: 'Responsive Design', duration: '75 min', content: 'Create responsive layouts with flexbox and grid', completed: false, order: 3 },
      { id: '1-4', title: 'JavaScript Fundamentals', duration: '90 min', content: 'Variables, functions, and control structures in JavaScript', completed: false, order: 4 },
      { id: '1-5', title: 'DOM Manipulation', duration: '80 min', content: 'Interact with HTML elements using JavaScript', completed: false, order: 5 },
      { id: '1-6', title: 'Building Your First Website', duration: '120 min', content: 'Put it all together in a complete project', completed: false, order: 6 },
    ]
  },
  {
    id: '2',
    title: 'Introduction to Data Science',
    description: 'Dive into data analysis with Python, pandas, and data visualization. Learn to extract insights from real-world datasets.',
    instructor: 'Michael Chen',
    duration: '10 hours',
    difficulty: 'Intermediate',
    category: 'Data Science',
    thumbnail: '/src/assets/data-science-course.jpg',
    enrolledStudents: 892,
    rating: 4.9,
    enrolled: false,
    lessons: [
      { id: '2-1', title: 'Python for Data Science', duration: '60 min', content: 'Python basics and data science libraries', completed: false, order: 1 },
      { id: '2-2', title: 'Working with Pandas', duration: '90 min', content: 'Data manipulation with pandas DataFrames', completed: false, order: 2 },
      { id: '2-3', title: 'Data Visualization', duration: '75 min', content: 'Create compelling charts with matplotlib and seaborn', completed: false, order: 3 },
      { id: '2-4', title: 'Statistical Analysis', duration: '85 min', content: 'Understand distributions and statistical measures', completed: false, order: 4 },
      { id: '2-5', title: 'Data Cleaning', duration: '70 min', content: 'Handle missing data and outliers', completed: false, order: 5 },
      { id: '2-6', title: 'Real-World Project', duration: '120 min', content: 'Analyze a complete dataset from start to finish', completed: false, order: 6 },
    ]
  },
  {
    id: '3',
    title: 'AI and Machine Learning Basics',
    description: 'Explore artificial intelligence and machine learning concepts. Build and train your first neural network.',
    instructor: 'Dr. Emily Rodriguez',
    duration: '12 hours',
    difficulty: 'Intermediate',
    category: 'Artificial Intelligence',
    thumbnail: '/src/assets/ai-ml-course.jpg',
    enrolledStudents: 1567,
    rating: 4.7,
    enrolled: false,
    lessons: [
      { id: '3-1', title: 'Introduction to AI', duration: '50 min', content: 'History and fundamentals of artificial intelligence', completed: false, order: 1 },
      { id: '3-2', title: 'Machine Learning Basics', duration: '80 min', content: 'Supervised vs unsupervised learning', completed: false, order: 2 },
      { id: '3-3', title: 'Neural Networks', duration: '90 min', content: 'How neural networks work and learn', completed: false, order: 3 },
      { id: '3-4', title: 'Training Models', duration: '100 min', content: 'Model training, validation, and testing', completed: false, order: 4 },
      { id: '3-5', title: 'Deep Learning Intro', duration: '85 min', content: 'Introduction to deep learning architectures', completed: false, order: 5 },
      { id: '3-6', title: 'AI Applications', duration: '75 min', content: 'Real-world applications of AI and ML', completed: false, order: 6 },
      { id: '3-7', title: 'Build Your Own Model', duration: '140 min', content: 'Create and train a complete ML model', completed: false, order: 7 },
    ]
  }
];

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

    // Mark all lessons as complete
    setCourses(prev => prev.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          lessons: course.lessons.map(lesson => ({ ...lesson, completed: true }))
        };
      }
      return course;
    }));

    // Add to completed courses
    setUser(prev => prev ? {
      ...prev,
      completedCourses: [...prev.completedCourses, courseId],
      badges: [...new Set([...prev.badges, 'Course Completed'])]
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
