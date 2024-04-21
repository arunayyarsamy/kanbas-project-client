import React, { useEffect, useState } from 'react';

function QuizPreview() {

  const [questions , setQuestions] = useState([
    {
      question: "What is the capital of France?",
      options: ["Paris", "Berlin", "London", "Madrid"],
      correctAnswer: "Paris",
      userAnswer: ""
    },
    {
      question: "What is the capital of France?",
      options: ["Paris", "Berlin", "London", "Madrid"],
      correctAnswer: "Paris",
      userAnswer: ""
    },
    {
      question: "What is the capital of France?",
      options: ["Paris", "Berlin", "London", "Madrid"],
      correctAnswer: "Paris",
      userAnswer: ""
    },
    {
      question: "What is the capital of France?",
      options: ["Paris", "Berlin", "London", "Madrid"],
      correctAnswer: "Paris",
      userAnswer: ""
    },
    {
      question: "What is the capital of France?",
      options: ["Paris", "Berlin", "London", "Madrid"],
      correctAnswer: "Paris",
      userAnswer: ""
    },
    {
      question: "What is the capital of France?",
      options: ["Paris", "Berlin", "London", "Madrid"],
      correctAnswer: "Paris",
      userAnswer: ""
    },
    {
      question: "What is the capital of France?",
      options: ["Paris", "Berlin", "London", "Madrid"],
      correctAnswer: "Paris",
      userAnswer: ""
    },
    {
      question: "What is the capital of France?",
      options: ["Paris", "Berlin", "London", "Madrid"],
      correctAnswer: "Paris",
      userAnswer: ""
    },
  ]);

  useEffect(() => {
    // Fetch Questions
  }, []);

  return (
    <>
        <div className="quiz-heading">

        </div>
    </>
  );
}

export default QuizPreview;