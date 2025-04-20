// File: controllers/quizController.js
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');

exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find()
      .populate('category', 'name')
      .select('title description category timeLimit questions points status date');
    
    // Format quizzes for frontend display
    const formattedQuizzes = quizzes.map(quiz => ({
      id: quiz._id,
      title: quiz.title,
      category: quiz.category.name,
      date: quiz.date,
      timeLimit: quiz.timeLimit,
      questions: quiz.questions.length,
      points: quiz.points,
      status: quiz.status
    }));
    
    res.status(200).json(formattedQuizzes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quizzes', error: error.message });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate('category', 'name')
      .select('-__v');
      
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quiz', error: error.message });
  }
};

exports.createQuiz = async (req, res) => {
  try {
    const newQuiz = new Quiz(req.body);
    const savedQuiz = await newQuiz.save();
    
    res.status(201).json(savedQuiz);
  } catch (error) {
    res.status(500).json({ message: 'Error creating quiz', error: error.message });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    
    res.status(200).json(updatedQuiz);
  } catch (error) {
    res.status(500).json({ message: 'Error updating quiz', error: error.message });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
    
    if (!deletedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    
    // Also delete associated questions
    await Question.deleteMany({ quiz: req.params.id });
    
    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting quiz', error: error.message });
  }
};

exports.getQuizQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ quiz: req.params.id })
      .select('-correctAnswer'); // Don't send correct answers to frontend
      
    if (!questions.length) {
      return res.status(404).json({ message: 'No questions found for this quiz' });
    }
    
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions', error: error.message });
  }
};

exports.submitQuizAnswers = async (req, res) => {
  try {
    const { answers } = req.body; // Array of {questionId, selectedAnswer}
    const quizId = req.params.id;
    
    // Verify the quiz exists
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    
    // Get all questions with their correct answers
    const questions = await Question.find({ 
      _id: { $in: answers.map(a => a.questionId) },
      quiz: quizId
    });
    
    // Calculate score
    let score = 0;
    let totalPoints = 0;
    
    const results = questions.map(question => {
      const answer = answers.find(a => a.questionId.toString() === question._id.toString());
      const isCorrect = answer && answer.selectedAnswer === question.correctAnswer;
      
      if (isCorrect) {
        score += question.points;
      }
      totalPoints += question.points;
      
      return {
        questionId: question._id,
        isCorrect,
        points: isCorrect ? question.points : 0,
        correctAnswer: question.correctAnswer
      };
    });
    
    // Create submission record (would normally be saved to database)
    const submission = {
      quiz: quizId,
      score,
      totalPoints,
      percentage: (score / totalPoints) * 100,
      results,
      submittedAt: new Date()
    };
    
    res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting answers', error: error.message });
  }
};