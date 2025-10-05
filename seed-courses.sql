-- Delete existing data
DELETE FROM quiz_questions;
DELETE FROM quiz_attempts;
DELETE FROM quizzes;
DELETE FROM lesson_progress;
DELETE FROM lessons;
DELETE FROM enrollments;
DELETE FROM certificates;
DELETE FROM user_achievements;
DELETE FROM courses;

-- Insert courses
INSERT INTO courses (id, title, description, short_description, instructor_name, instructor_bio, category, difficulty, duration_hours, rating, is_published) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Web Development Fundamentals', 'Master the essentials of modern web development with HTML, CSS, and JavaScript. Build responsive, interactive websites from scratch.', 'Learn HTML, CSS, JavaScript and build your first website', 'Brad Traversy', 'Full-stack web developer and founder of Traversy Media, teaching web development to millions worldwide.', 'technology', 'beginner', 8, 4.8, true),
('550e8400-e29b-41d4-a716-446655440002', 'Introduction to Data Science', 'Dive into the world of data science using Python. Learn data analysis, visualization, and machine learning fundamentals.', 'Master Python, pandas, and data visualization', 'Keith Galli', 'Data scientist and educator specializing in Python programming and data analysis tutorials.', 'technology', 'intermediate', 10, 4.7, true),
('550e8400-e29b-41d4-a716-446655440003', 'AI and Machine Learning Basics', 'Understand artificial intelligence and machine learning concepts. Explore neural networks, deep learning, and real-world AI applications.', 'Learn AI, ML, and neural networks fundamentals', 'Andrew Ng', 'AI pioneer, Stanford professor, and founder of deeplearning.ai and Coursera.', 'technology', 'intermediate', 12, 4.9, true),
('550e8400-e29b-41d4-a716-446655440004', 'Digital Marketing Fundamentals', 'Learn digital marketing strategies including SEO, social media, content marketing, and analytics to grow your business online.', 'Master SEO, social media, and digital marketing', 'Neil Patel', 'Digital marketing expert and entrepreneur, helping businesses grow through innovative marketing strategies.', 'business', 'beginner', 9, 4.6, true),
('550e8400-e29b-41d4-a716-446655440005', 'Project Management Essentials', 'Master project management methodologies, Agile, Scrum, and best practices for leading successful projects from start to finish.', 'Learn Agile, Scrum, and PM best practices', 'PMI Institute', 'Leading global association for project management professionals.', 'business', 'beginner', 8, 4.7, true),
('550e8400-e29b-41d4-a716-446655440006', 'Personal Finance Management', 'Take control of your finances. Learn budgeting, saving, investing, and retirement planning to achieve financial independence.', 'Master budgeting, investing, and financial planning', 'Dave Ramsey', 'Financial expert and bestselling author helping millions achieve financial freedom.', 'academic', 'beginner', 6, 4.8, true),
('550e8400-e29b-41d4-a716-446655440007', 'Introduction to Psychology', 'Explore the human mind and behavior. Study memory, cognition, social psychology, and mental health fundamentals.', 'Understand human behavior and psychology basics', 'Dr. Paul Bloom', 'Yale University psychology professor renowned for his engaging lectures on human nature.', 'academic', 'beginner', 10, 4.9, true),
('550e8400-e29b-41d4-a716-446655440008', 'Public Speaking Mastery', 'Overcome stage fright and master the art of public speaking. Learn to deliver confident, engaging presentations.', 'Conquer fear and deliver powerful presentations', 'TED Talks', 'Platform for world-class speakers sharing ideas worth spreading.', 'academic', 'beginner', 5, 4.7, true);

-- Web Development Lessons
INSERT INTO lessons (course_id, title, description, lesson_order, video_url, video_duration, content_text, key_takeaways) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Introduction to HTML', 'Learn HTML basics, document structure, and essential tags', 1, 'https://www.youtube.com/embed/UB1O30fR-EE', 60, 
'# Introduction to HTML

HTML (HyperText Markup Language) is the standard markup language for creating web pages. It provides the structure and content of websites.

## What is HTML?
HTML consists of elements represented by tags. These tags tell the browser how to display content.

## HTML Document Structure
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
  </head>
  <body>
    <h1>My First Heading</h1>
    <p>My first paragraph.</p>
  </body>
</html>
```

## Common HTML Tags
- **Headings**: `<h1>` to `<h6>` for different heading levels
- **Paragraphs**: `<p>` for text paragraphs
- **Links**: `<a href="">` for hyperlinks
- **Images**: `<img src="" alt="">` for images
- **Lists**: `<ul>`, `<ol>`, `<li>` for lists

## Semantic HTML
Use semantic tags like `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, and `<footer>` for better structure and SEO.',
ARRAY['HTML is a markup language, not a programming language', 'Every HTML document starts with <!DOCTYPE html>', 'Use semantic tags for better accessibility', 'Always include alt text for images']),

('550e8400-e29b-41d4-a716-446655440001', 'CSS Fundamentals', 'Master CSS selectors, box model, and styling techniques', 2, 'https://www.youtube.com/embed/yfoY53QXEnI', 70,
'# CSS Fundamentals

CSS (Cascading Style Sheets) is used to style and layout web pages.

## CSS Syntax
```css
selector {
  property: value;
}
```

## CSS Selectors
- **Element**: `p { color: blue; }`
- **Class**: `.classname { color: red; }`
- **ID**: `#idname { color: green; }`
- **Descendant**: `div p { margin: 10px; }`

## The Box Model
Every element is a box with:
- Content
- Padding
- Border
- Margin

## Flexbox Basics
```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

## Responsive Design
Use media queries for different screen sizes:
```css
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
```',
ARRAY['CSS controls the visual presentation', 'The box model is fundamental to layout', 'Flexbox simplifies layout design', 'Mobile-first design is best practice']);

-- Data Science Lessons
INSERT INTO lessons (course_id, title, description, lesson_order, video_url, video_duration, content_text, key_takeaways) VALUES
('550e8400-e29b-41d4-a716-446655440002', 'Python for Data Science', 'Python basics and data structures for data analysis', 1, 'https://www.youtube.com/embed/rfscVS0vtbw', 75,
'# Python for Data Science

Python is the most popular language for data science due to its simplicity and powerful libraries.

## Why Python?
- Easy to learn and read
- Extensive data science libraries (pandas, numpy, matplotlib)
- Large community support
- Versatile for various tasks

## Python Basics
```python
# Variables
name = "Data Scientist"
age = 25

# Lists
numbers = [1, 2, 3, 4, 5]

# Dictionaries
person = {"name": "John", "age": 30}

# Functions
def calculate_mean(numbers):
    return sum(numbers) / len(numbers)
```

## Essential Libraries
- **NumPy**: Numerical computations
- **Pandas**: Data manipulation
- **Matplotlib**: Data visualization
- **Scikit-learn**: Machine learning',
ARRAY['Python is beginner-friendly', 'Pandas is essential for data manipulation', 'Practice coding daily', 'Documentation is your friend']);

-- More lessons will be added via the admin panel or additional inserts...

-- Insert sample quizzes
INSERT INTO quizzes (course_id, lesson_id, title, description, passing_score) 
SELECT '550e8400-e29b-41d4-a716-446655440001', id, 'HTML Basics Quiz', 'Test your HTML knowledge', 70
FROM lessons 
WHERE course_id = '550e8400-e29b-41d4-a716-446655440001' AND lesson_order = 1;

-- Insert sample quiz questions
INSERT INTO quiz_questions (quiz_id, question_text, question_type, options, correct_answer, explanation, question_order)
SELECT id,
       'What does HTML stand for?',
       'multiple_choice',
       '["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks Text Markup Language"]'::jsonb,
       'Hyper Text Markup Language',
       'HTML stands for Hyper Text Markup Language, the standard markup language for creating web pages.',
       1
FROM quizzes WHERE title = 'HTML Basics Quiz';

INSERT INTO quiz_questions (quiz_id, question_text, question_type, options, correct_answer, explanation, question_order)
SELECT id,
       'Which HTML tag is used to create a hyperlink?',
       'multiple_choice',
       '["<link>", "<a>", "<href>", "<hyperlink>"]'::jsonb,
       '<a>',
       'The <a> (anchor) tag is used to create hyperlinks in HTML.',
       2
FROM quizzes WHERE title = 'HTML Basics Quiz';

INSERT INTO quiz_questions (quiz_id, question_text, question_type, options, correct_answer, explanation, question_order)
SELECT id,
       'HTML is a programming language.',
       'true_false',
       '["True", "False"]'::jsonb,
       'False',
       'HTML is a markup language, not a programming language. It structures content but doesn''t have logic or algorithms.',
       3
FROM quizzes WHERE title = 'HTML Basics Quiz';

INSERT INTO quiz_questions (quiz_id, question_text, question_type, options, correct_answer, explanation, question_order)
SELECT id,
       'Which tag creates the largest heading?',
       'multiple_choice',
       '["<h6>", "<heading>", "<h1>", "<head>"]'::jsonb,
       '<h1>',
       '<h1> creates the largest heading, with <h6> being the smallest.',
       4
FROM quizzes WHERE title = 'HTML Basics Quiz';

INSERT INTO quiz_questions (quiz_id, question_text, question_type, options, correct_answer, explanation, question_order)
SELECT id,
       'The <div> tag is used for divisions or sections in HTML.',
       'true_false',
       '["True", "False"]'::jsonb,
       'True',
       'The <div> tag is a container element used to group content for styling and layout purposes.',
       5
FROM quizzes WHERE title = 'HTML Basics Quiz';