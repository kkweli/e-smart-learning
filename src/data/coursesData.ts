import { Course, Quiz } from '@/contexts/AppContext';

// Helper function to create quiz
const createQuiz = (id: string, title: string, questions: any[]): Quiz => ({
  id,
  title,
  passingScore: 70,
  questions
});

export const initialCourses: Course[] = [
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
      {
        id: '1-1',
        title: 'Introduction to HTML',
        duration: '45 min',
        content: 'Learn the fundamentals of HTML structure and semantic markup',
        videoUrl: 'https://www.youtube.com/embed/UB1O30fR-EE',
        textContent: `
# What is HTML?

HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of web pages using markup.

## HTML Document Structure

Every HTML document follows a basic structure:
- DOCTYPE declaration
- HTML root element
- Head section (metadata)
- Body section (content)

## Common HTML Tags

- **Headings**: <h1> to <h6>
- **Paragraphs**: <p>
- **Links**: <a href="">
- **Images**: <img src="" alt="">
- **Lists**: <ul>, <ol>, <li>

## Semantic HTML

Use semantic elements like <header>, <nav>, <main>, <article>, <section>, and <footer> for better accessibility and SEO.
        `,
        keyTakeaways: [
          'HTML is the foundation of all web pages',
          'Use semantic tags for better structure',
          'Always include proper DOCTYPE and metadata',
          'Accessibility matters - use alt text for images'
        ],
        quiz: createQuiz('quiz-1-1', 'HTML Basics Quiz', [
          {
            id: 'q1',
            type: 'multiple-choice',
            question: 'What does HTML stand for?',
            options: [
              'Hyper Text Markup Language',
              'High Tech Modern Language',
              'Home Tool Markup Language',
              'Hyperlinks and Text Markup Language'
            ],
            correctAnswer: 0,
            explanation: 'HTML stands for Hyper Text Markup Language, which is used to structure web pages.'
          },
          {
            id: 'q2',
            type: 'multiple-choice',
            question: 'Which tag is used for creating hyperlinks?',
            options: ['<link>', '<a>', '<href>', '<url>'],
            correctAnswer: 1,
            explanation: 'The <a> tag (anchor) is used to create hyperlinks in HTML.'
          },
          {
            id: 'q3',
            type: 'true-false',
            question: 'HTML is a programming language.',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation: 'HTML is a markup language, not a programming language. It structures content but does not contain logic.'
          },
          {
            id: 'q4',
            type: 'multiple-choice',
            question: 'Which character is used to indicate an end tag?',
            options: ['/', '\\', '<', '>'],
            correctAnswer: 0,
            explanation: 'The forward slash (/) is used before the tag name in closing tags, like </p>.'
          },
          {
            id: 'q5',
            type: 'multiple-choice',
            question: 'What is the correct HTML for adding a background color?',
            options: [
              '<body bg="yellow">',
              '<background>yellow</background>',
              '<body style="background-color:yellow;">',
              '<body color="yellow">'
            ],
            correctAnswer: 2,
            explanation: 'The style attribute with background-color property is the correct way to add background color inline.'
          }
        ]),
        completed: false,
        order: 1
      },
      {
        id: '1-2',
        title: 'CSS Styling Basics',
        duration: '60 min',
        content: 'Master CSS selectors, properties, and the box model',
        videoUrl: 'https://www.youtube.com/embed/1PnVor36_40',
        textContent: `
# CSS Fundamentals

CSS (Cascading Style Sheets) is used to style and layout web pages.

## CSS Syntax

A CSS rule consists of:
- Selector (which elements to style)
- Property (what to change)
- Value (how to change it)

## The Box Model

Every HTML element is a rectangular box with:
- Content
- Padding
- Border
- Margin

## Common CSS Properties

- **Colors**: color, background-color
- **Fonts**: font-family, font-size, font-weight
- **Spacing**: margin, padding
- **Layout**: display, position, flexbox, grid
        `,
        keyTakeaways: [
          'CSS controls the visual presentation of HTML',
          'The box model is fundamental to layout',
          'Selectors determine which elements get styled',
          'Use modern layout tools like Flexbox and Grid'
        ],
        quiz: createQuiz('quiz-1-2', 'CSS Basics Quiz', [
          {
            id: 'q1',
            type: 'multiple-choice',
            question: 'What does CSS stand for?',
            options: [
              'Cascading Style Sheets',
              'Computer Style Sheets',
              'Creative Style Sheets',
              'Colorful Style Sheets'
            ],
            correctAnswer: 0,
            explanation: 'CSS stands for Cascading Style Sheets, used for styling web pages.'
          },
          {
            id: 'q2',
            type: 'multiple-choice',
            question: 'Which property is used to change the background color?',
            options: ['color', 'bg-color', 'background-color', 'bgcolor'],
            correctAnswer: 2,
            explanation: 'The background-color property sets the background color of an element.'
          },
          {
            id: 'q3',
            type: 'multiple-choice',
            question: 'How do you select an element with id "demo"?',
            options: ['.demo', '#demo', 'demo', '*demo'],
            correctAnswer: 1,
            explanation: 'The # symbol is used to select elements by their ID in CSS.'
          },
          {
            id: 'q4',
            type: 'true-false',
            question: 'Flexbox is used for creating flexible layouts.',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation: 'Flexbox is a CSS layout model designed for creating flexible, responsive layouts.'
          },
          {
            id: 'q5',
            type: 'multiple-choice',
            question: 'Which property controls the text size?',
            options: ['text-size', 'font-size', 'text-style', 'font-style'],
            correctAnswer: 1,
            explanation: 'The font-size property controls the size of text.'
          }
        ]),
        completed: false,
        order: 2
      },
      {
        id: '1-3',
        title: 'Responsive Design',
        duration: '75 min',
        content: 'Create responsive layouts with flexbox and grid',
        videoUrl: 'https://www.youtube.com/embed/srvUrASNj0s',
        textContent: `
# Responsive Web Design

Responsive design ensures websites work well on all devices and screen sizes.

## Media Queries

Use @media rules to apply different styles based on screen size:
- Mobile: max-width 768px
- Tablet: 768px - 1024px  
- Desktop: 1024px+

## Flexbox Layout

Flexbox is perfect for one-dimensional layouts:
- flex-direction
- justify-content
- align-items
- flex-wrap

## Grid Layout

CSS Grid excels at two-dimensional layouts:
- grid-template-columns
- grid-template-rows
- gap
- grid areas
        `,
        keyTakeaways: [
          'Mobile-first design is best practice',
          'Media queries adapt to different screen sizes',
          'Flexbox handles single-axis layouts',
          'CSS Grid manages complex two-dimensional layouts'
        ],
        quiz: createQuiz('quiz-1-3', 'Responsive Design Quiz', [
          {
            id: 'q1',
            type: 'multiple-choice',
            question: 'What is the mobile-first approach?',
            options: [
              'Design for mobile devices only',
              'Design for mobile first, then scale up',
              'Design for desktop first',
              'Use only mobile CSS'
            ],
            correctAnswer: 1,
            explanation: 'Mobile-first means designing for mobile devices first, then progressively enhancing for larger screens.'
          },
          {
            id: 'q2',
            type: 'multiple-choice',
            question: 'Which property makes a flex container?',
            options: ['display: flex', 'flex: container', 'flexbox: true', 'layout: flex'],
            correctAnswer: 0,
            explanation: 'Setting display: flex on an element makes it a flex container.'
          },
          {
            id: 'q3',
            type: 'true-false',
            question: 'CSS Grid can only create horizontal layouts.',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation: 'CSS Grid can create both horizontal and vertical layouts simultaneously.'
          },
          {
            id: 'q4',
            type: 'multiple-choice',
            question: 'What is the typical mobile breakpoint?',
            options: ['480px', '768px', '1024px', '1200px'],
            correctAnswer: 1,
            explanation: '768px is commonly used as the mobile-to-tablet breakpoint.'
          },
          {
            id: 'q5',
            type: 'multiple-choice',
            question: 'Which units are best for responsive typography?',
            options: ['px', 'rem/em', 'pt', 'cm'],
            correctAnswer: 1,
            explanation: 'rem and em units scale with user preferences, making them ideal for responsive design.'
          }
        ]),
        completed: false,
        order: 3
      },
      {
        id: '1-4',
        title: 'JavaScript Fundamentals',
        duration: '90 min',
        content: 'Variables, functions, and control structures in JavaScript',
        videoUrl: 'https://www.youtube.com/embed/W6NZfCO5SIk',
        textContent: `
# JavaScript Basics

JavaScript brings interactivity to web pages.

## Variables

Declare variables with:
- let (block-scoped, reassignable)
- const (block-scoped, constant)
- var (function-scoped, avoid)

## Data Types

- Primitives: string, number, boolean, null, undefined
- Objects: arrays, objects, functions

## Functions

Functions are reusable blocks of code:
- Function declarations
- Function expressions
- Arrow functions

## Control Structures

- Conditionals: if/else, switch
- Loops: for, while, forEach
        `,
        keyTakeaways: [
          'Use const by default, let when needed',
          'JavaScript is dynamically typed',
          'Functions are first-class citizens',
          'Modern JavaScript uses arrow functions'
        ],
        quiz: createQuiz('quiz-1-4', 'JavaScript Quiz', [
          {
            id: 'q1',
            type: 'multiple-choice',
            question: 'Which keyword creates a constant variable?',
            options: ['var', 'let', 'const', 'constant'],
            correctAnswer: 2,
            explanation: 'The const keyword declares a constant (read-only) variable.'
          },
          {
            id: 'q2',
            type: 'multiple-choice',
            question: 'What is the output of typeof []?',
            options: ['array', 'object', 'list', 'undefined'],
            correctAnswer: 1,
            explanation: 'Arrays are actually objects in JavaScript, so typeof returns "object".'
          },
          {
            id: 'q3',
            type: 'true-false',
            question: 'Arrow functions have their own "this" binding.',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation: 'Arrow functions do not have their own "this" - they inherit it from the parent scope.'
          },
          {
            id: 'q4',
            type: 'multiple-choice',
            question: 'Which method adds an element to the end of an array?',
            options: ['push()', 'pop()', 'shift()', 'unshift()'],
            correctAnswer: 0,
            explanation: 'The push() method adds elements to the end of an array.'
          },
          {
            id: 'q5',
            type: 'multiple-choice',
            question: 'What does === check?',
            options: [
              'Value only',
              'Type only',
              'Value and type',
              'Reference'
            ],
            correctAnswer: 2,
            explanation: 'The === operator checks both value and type equality.'
          }
        ]),
        completed: false,
        order: 4
      },
      {
        id: '1-5',
        title: 'DOM Manipulation',
        duration: '80 min',
        content: 'Interact with HTML elements using JavaScript',
        videoUrl: 'https://www.youtube.com/embed/5fb2aPlgoys',
        textContent: `
# DOM Manipulation

The DOM (Document Object Model) represents the structure of your HTML as a tree of objects.

## Selecting Elements

- document.getElementById()
- document.querySelector()
- document.querySelectorAll()

## Modifying Elements

- element.textContent
- element.innerHTML
- element.style
- element.classList

## Event Handling

Listen for user interactions:
- click
- submit
- keypress
- mouseover

## Creating Elements

- document.createElement()
- element.appendChild()
- element.removeChild()
        `,
        keyTakeaways: [
          'The DOM is a programming interface for HTML',
          'Use querySelector for modern element selection',
          'Event listeners make pages interactive',
          'Always manipulate the DOM efficiently'
        ],
        quiz: createQuiz('quiz-1-5', 'DOM Manipulation Quiz', [
          {
            id: 'q1',
            type: 'multiple-choice',
            question: 'Which method selects elements by CSS selector?',
            options: [
              'getElement()',
              'querySelector()',
              'select()',
              'find()'
            ],
            correctAnswer: 1,
            explanation: 'querySelector() selects elements using CSS selector syntax.'
          },
          {
            id: 'q2',
            type: 'multiple-choice',
            question: 'How do you add a class to an element?',
            options: [
              'element.addClass()',
              'element.class.add()',
              'element.classList.add()',
              'element.addClassName()'
            ],
            correctAnswer: 2,
            explanation: 'The classList.add() method adds a class to an element.'
          },
          {
            id: 'q3',
            type: 'true-false',
            question: 'innerHTML can execute script tags.',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation: 'innerHTML can execute scripts, which is a security risk if inserting user content.'
          },
          {
            id: 'q4',
            type: 'multiple-choice',
            question: 'Which event fires when a user clicks?',
            options: ['onclick', 'click', 'mouseclick', 'tap'],
            correctAnswer: 1,
            explanation: 'The "click" event fires when an element is clicked.'
          },
          {
            id: 'q5',
            type: 'multiple-choice',
            question: 'What creates a new element?',
            options: [
              'document.newElement()',
              'document.createElement()',
              'document.create()',
              'new Element()'
            ],
            correctAnswer: 1,
            explanation: 'document.createElement() creates a new HTML element.'
          }
        ]),
        completed: false,
        order: 5
      },
      {
        id: '1-6',
        title: 'Building Your First Website',
        duration: '120 min',
        content: 'Put it all together in a complete project',
        videoUrl: 'https://www.youtube.com/embed/hu-q2zYwEYs',
        textContent: `
# Building a Complete Website

Time to apply everything you've learned!

## Project Planning

1. Define your website's purpose
2. Sketch the layout
3. Choose your color scheme
4. Plan your content structure

## HTML Structure

Create semantic, well-organized markup:
- Header with navigation
- Main content area
- Sidebar (optional)
- Footer with contact info

## CSS Styling

Apply consistent, professional styles:
- Typography system
- Color palette
- Spacing scale
- Responsive breakpoints

## JavaScript Interactivity

Add dynamic features:
- Mobile menu toggle
- Form validation
- Smooth scrolling
- Image galleries

## Testing & Deployment

- Test on multiple browsers
- Check mobile responsiveness
- Validate HTML/CSS
- Deploy to hosting
        `,
        keyTakeaways: [
          'Planning prevents problems',
          'Semantic HTML improves accessibility',
          'Consistent styling looks professional',
          'Test thoroughly before deploying'
        ],
        quiz: createQuiz('quiz-1-6', 'Website Building Quiz', [
          {
            id: 'q1',
            type: 'multiple-choice',
            question: 'What should you do first when building a website?',
            options: [
              'Write code',
              'Plan and sketch',
              'Choose colors',
              'Buy hosting'
            ],
            correctAnswer: 1,
            explanation: 'Planning and sketching your layout helps prevent issues later.'
          },
          {
            id: 'q2',
            type: 'multiple-choice',
            question: 'Which element should contain main navigation?',
            options: ['<div>', '<nav>', '<menu>', '<links>'],
            correctAnswer: 1,
            explanation: 'The <nav> element is semantic and designates navigation links.'
          },
          {
            id: 'q3',
            type: 'true-false',
            question: 'You should test your website on only one browser.',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation: 'Always test on multiple browsers to ensure compatibility.'
          },
          {
            id: 'q4',
            type: 'multiple-choice',
            question: 'What makes a website "responsive"?',
            options: [
              'Fast loading',
              'Works on all screen sizes',
              'Has animations',
              'Uses JavaScript'
            ],
            correctAnswer: 1,
            explanation: 'Responsive means the site adapts to different screen sizes and devices.'
          },
          {
            id: 'q5',
            type: 'multiple-choice',
            question: 'Why use semantic HTML?',
            options: [
              'It looks better',
              'It loads faster',
              'Better SEO and accessibility',
              'Required by browsers'
            ],
            correctAnswer: 2,
            explanation: 'Semantic HTML improves SEO, accessibility, and code maintainability.'
          }
        ]),
        completed: false,
        order: 6
      }
    ],
    finalExam: createQuiz('final-exam-1', 'Web Development Final Exam', [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'What is the correct DOCTYPE for HTML5?',
        options: [
          '<!DOCTYPE html>',
          '<!DOCTYPE HTML5>',
          '<DOCTYPE html>',
          '<!HTML5>'
        ],
        correctAnswer: 0,
        explanation: '<!DOCTYPE html> is the simple, case-insensitive DOCTYPE for HTML5.'
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'Which CSS property creates space INSIDE an element?',
        options: ['margin', 'padding', 'border', 'spacing'],
        correctAnswer: 1,
        explanation: 'Padding creates space inside an element between content and border.'
      },
      {
        id: 'q3',
        type: 'true-false',
        question: 'JavaScript is the same as Java.',
        options: ['True', 'False'],
        correctAnswer: 1,
        explanation: 'JavaScript and Java are completely different programming languages.'
      },
      {
        id: 'q4',
        type: 'multiple-choice',
        question: 'What does API stand for?',
        options: [
          'Application Programming Interface',
          'Advanced Programming Integration',
          'Application Process Integration',
          'Advanced Process Interface'
        ],
        correctAnswer: 0,
        explanation: 'API stands for Application Programming Interface.'
      },
      {
        id: 'q5',
        type: 'multiple-choice',
        question: 'Which is NOT a valid CSS selector?',
        options: ['.class', '#id', 'element', '@attribute'],
        correctAnswer: 3,
        explanation: '@ is not used for attribute selectors. Use [attribute] instead.'
      },
      {
        id: 'q6',
        type: 'true-false',
        question: 'CSS Grid can only create 2-column layouts.',
        options: ['True', 'False'],
        correctAnswer: 1,
        explanation: 'CSS Grid can create complex multi-column and multi-row layouts.'
      },
      {
        id: 'q7',
        type: 'multiple-choice',
        question: 'What is the default display value for <div>?',
        options: ['inline', 'block', 'flex', 'grid'],
        correctAnswer: 1,
        explanation: '<div> elements have display: block by default.'
      },
      {
        id: 'q8',
        type: 'multiple-choice',
        question: 'Which method prevents form submission?',
        options: [
          'event.stop()',
          'event.preventDefault()',
          'event.cancel()',
          'return false'
        ],
        correctAnswer: 1,
        explanation: 'event.preventDefault() prevents the default action of an event.'
      },
      {
        id: 'q9',
        type: 'true-false',
        question: 'Mobile-first design means designing for mobile only.',
        options: ['True', 'False'],
        correctAnswer: 1,
        explanation: 'Mobile-first means starting with mobile design and enhancing for larger screens.'
      },
      {
        id: 'q10',
        type: 'multiple-choice',
        question: 'What is the purpose of alt attribute in images?',
        options: [
          'Alternative color',
          'Alternative text for accessibility',
          'Alternate image URL',
          'Image alignment'
        ],
        correctAnswer: 1,
        explanation: 'The alt attribute provides alternative text for screen readers and when images fail to load.'
      },
      {
        id: 'q11',
        type: 'multiple-choice',
        question: 'Which JavaScript operator assigns a value?',
        options: ['==', '===', '=', '=>'],
        correctAnswer: 2,
        explanation: 'The = operator assigns values to variables.'
      },
      {
        id: 'q12',
        type: 'true-false',
        question: 'External CSS files must be loaded in the <body> tag.',
        options: ['True', 'False'],
        correctAnswer: 1,
        explanation: 'CSS files should be loaded in the <head> for better performance.'
      },
      {
        id: 'q13',
        type: 'multiple-choice',
        question: 'What does JSON stand for?',
        options: [
          'JavaScript Object Notation',
          'JavaScript Online Network',
          'Java Syntax Object Notation',
          'JavaScript Operational Node'
        ],
        correctAnswer: 0,
        explanation: 'JSON stands for JavaScript Object Notation, a data interchange format.'
      },
      {
        id: 'q14',
        type: 'multiple-choice',
        question: 'Which is the correct way to comment in CSS?',
        options: [
          '// comment',
          '<!-- comment -->',
          '/* comment */',
          '# comment'
        ],
        correctAnswer: 2,
        explanation: 'CSS uses /* */ for comments.'
      },
      {
        id: 'q15',
        type: 'true-false',
        question: 'querySelector() returns all matching elements.',
        options: ['True', 'False'],
        correctAnswer: 1,
        explanation: 'querySelector() returns only the first match. Use querySelectorAll() for all matches.'
      },
      {
        id: 'q16',
        type: 'multiple-choice',
        question: 'What is the box model order from inside out?',
        options: [
          'Content, Padding, Margin, Border',
          'Content, Padding, Border, Margin',
          'Content, Border, Padding, Margin',
          'Padding, Content, Border, Margin'
        ],
        correctAnswer: 1,
        explanation: 'The box model goes: Content → Padding → Border → Margin.'
      },
      {
        id: 'q17',
        type: 'multiple-choice',
        question: 'Which property makes elements side-by-side in Flexbox?',
        options: [
          'flex-direction: row',
          'flex-align: horizontal',
          'flex-layout: row',
          'flex-position: side'
        ],
        correctAnswer: 0,
        explanation: 'flex-direction: row makes flex items arrange horizontally.'
      },
      {
        id: 'q18',
        type: 'true-false',
        question: 'let and var have the same scoping rules.',
        options: ['True', 'False'],
        correctAnswer: 1,
        explanation: 'let is block-scoped while var is function-scoped.'
      }
    ])
  },
];
