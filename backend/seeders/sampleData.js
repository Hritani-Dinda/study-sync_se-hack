// File: seeders/sampleData.js
const mongoose = require('mongoose');
const Category = require('../models/Category');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const QuizBattleRoom = require('../models/QuizBattleRoom');

// Sample categories
const categories = [
  {
    name: 'Database Systems',
    description: 'Courses and quizzes about database design, SQL, and data management'
  },
  {
    name: 'Data Structures and Algorithms',
    description: 'Learn about fundamental data structures and algorithms'
  },
  {
    name: 'Web Development',
    description: 'HTML, CSS, JavaScript, and modern web frameworks'
  }
];

// Sample quizzes (without questions yet)
const quizzes = [
  {
    title: 'Database Normalization',
    description: 'Test your knowledge of database normalization forms and principles',
    timeLimit: 45, // 45 minutes
    status: 'open',
    date: new Date('2025-05-12T14:00:00'), // May 12, 2:00 PM
    points: 100 // Will be calculated based on questions
  },
  {
    title: 'Sorting Algorithms',
    description: 'Test your understanding of various sorting algorithms and their complexities',
    timeLimit: 60, // 60 minutes
    status: 'open',
    date: new Date('2025-05-15T10:00:00'), // May 15, 10:00 AM
    points: 125 // Will be calculated based on questions
  },
  {
    title: 'HTML and CSS Basics',
    description: 'Fundamental concepts of HTML and CSS for web development',
    timeLimit: 30, // 30 minutes
    status: 'not_yet_open',
    date: new Date('2025-05-18T15:30:00'), // May 18, 3:30 PM
    points: 75 // Will be calculated based on questions
  }
];

// Sample questions
const generateQuestions = (quizIds) => {
  const dbNormalizationQuestions = [
    {
      quiz: quizIds[0], // Database Normalization
      text: 'Which normal form eliminates transitive dependencies?',
      type: 'multiple',
      options: ['1NF', '2NF', '3NF', 'BCNF'],
      correctAnswer: '3NF',
      explanation: 'Third Normal Form (3NF) eliminates transitive dependencies, where a non-key attribute depends on another non-key attribute.',
      points: 5,
      difficulty: 'medium'
    },
    {
      quiz: quizIds[0],
      text: 'A relation is in 2NF if it is in 1NF and:',
      type: 'multiple',
      options: [
        'Has no partial dependencies', 
        'Has no transitive dependencies', 
        'Has no multivalued dependencies', 
        'All attributes are determined by candidate keys'
      ],
      correctAnswer: 'Has no partial dependencies',
      explanation: 'Second Normal Form (2NF) requires that all non-key attributes are fully functionally dependent on the primary key.',
      points: 5,
      difficulty: 'medium'
    }
    // Add more questions as needed
  ];

  const sortingAlgorithmsQuestions = [
    {
      quiz: quizIds[1], // Sorting Algorithms
      text: 'What is the worst-case time complexity of QuickSort?',
      type: 'multiple',
      options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(2ⁿ)'],
      correctAnswer: 'O(n²)',
      explanation: 'QuickSort has a worst-case time complexity of O(n²) when the pivot selection consistently results in highly unbalanced partitions.',
      points: 5,
      difficulty: 'medium'
    },
    {
      quiz: quizIds[1],
      text: 'Which sorting algorithm is stable by nature?',
      type: 'multiple',
      options: ['QuickSort', 'HeapSort', 'MergeSort', 'SelectionSort'],
      correctAnswer: 'MergeSort',
      explanation: 'MergeSort is stable as it preserves the relative order of equal elements in the sorted output.',
      points: 5,
      difficulty: 'medium'
    }
    // Add more questions as needed
  ];

  const htmlCssQuestions = [
    {
      quiz: quizIds[2], // HTML and CSS Basics
      text: 'Which CSS property is used to control the space between elements?',
      type: 'multiple',
      options: ['margin', 'padding', 'border', 'float'],
      correctAnswer: 'margin',
      explanation: 'The margin property defines the space outside an element, while padding controls the space inside the element.',
      points: 5,
      difficulty: 'easy'
    },
    {
      quiz: quizIds[2],
      text: 'Which HTML tag is used to create a hyperlink?',
      type: 'multiple',
      options: ['<a>', '<link>', '<href>', '<url>'],
      correctAnswer: '<a>',
      explanation: 'The <a> (anchor) tag is used to create hyperlinks in HTML, typically with the href attribute to specify the URL.',
      points: 5,
      difficulty: 'easy'
    }
    // Add more questions as needed
  ];

  return [
    ...dbNormalizationQuestions,
    ...sortingAlgorithmsQuestions,
    ...htmlCssQuestions
  ];
};

// Seed function
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Category.deleteMany({});
    await Quiz.deleteMany({});
    await Question.deleteMany({});
    await QuizBattleRoom.deleteMany({});
    
    console.log('Cleared existing data');
    
    // Insert categories
    const savedCategories = await Category.insertMany(categories);
    console.log(`Inserted ${savedCategories.length} categories`);
    
    // Map category names to IDs
    const categoryMap = savedCategories.reduce((map, category) => {
      map[category.name] = category._id;
      return map;
    }, {});
    
    // Add category IDs to quizzes
    const quizzesWithCategories = quizzes.map((quiz, index) => {
      if (index === 0) {
        return { ...quiz, category: categoryMap['Database Systems'] };
      } else if (index === 1) {
        return { ...quiz, category: categoryMap['Data Structures and Algorithms'] };
      } else {
        return { ...quiz, category: categoryMap['Web Development'] };
      }
    });
    
    // Insert quizzes
    const savedQuizzes = await Quiz.insertMany(quizzesWithCategories);
    console.log(`Inserted ${savedQuizzes.length} quizzes`);
    
    // Get quiz IDs
    const quizIds = savedQuizzes.map(quiz => quiz._id);
    
    // Generate and insert questions
    const questions = generateQuestions(quizIds);
    const savedQuestions = await Question.insertMany(questions);
    console.log(`Inserted ${savedQuestions.length} questions`);
    
    // Update quizzes with question IDs
    for (let i = 0; i < savedQuizzes.length; i++) {
      const quizQuestions = savedQuestions.filter(
        q => q.quiz.toString() === savedQuizzes[i]._id.toString()
      );
      
      await Quiz.findByIdAndUpdate(
        savedQuizzes[i]._id,
        { 
          questions: quizQuestions.map(q => q._id),
          points: quizQuestions.reduce((sum, q) => sum + q.points, 0)
        }
      );
    }
    
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Run seeder if directly executed
if (require.main === module) {
  // Connect to database
  const db = require('../config/database');
  
  seedDatabase()
    .then(() => {
      console.log('Seeding completed');
      process.exit(0);
    })
    .catch(err => {
      console.error('Seeding failed:', err);
      process.exit(1);
    });
}

module.exports = seedDatabase;