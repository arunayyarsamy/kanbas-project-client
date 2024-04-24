import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import * as client from '../client';
import { setQuestions, setQuestion, addAnsweredQuestion } from '../reducer';
import CurrentQuestion from './Components/CurrentQuestion';
import QuestionNav from './Components/QuestionsNav';
import { FaCaretRight, FaCaretLeft } from 'react-icons/fa';
import '../index.css';

function QuizPreview() {

  const { quizId } = useParams();
  const dispatch = useDispatch();
  const [quiz, setQuiz] = useState<any>();
  const navigate = useNavigate();

  const questions = useSelector((state: any) => state.quizzesReducer.questions);

  const question1 = useSelector((state: any) => state.quizzesReducer.question);

  const answeredQuestions = useSelector((state: any) => state.quizzesReducer.answeredQuestions);

  useEffect(() => {
    dispatch(
      setQuestion(
        {
          _id: "",
          question: "",
          type: "Multiple Choice",
          options: [],
          correctAnswer: "",
          points: 0
        }
      )
    )
    client.findQuestionsForQuiz(quizId).then((response) => {
      dispatch(setQuestions(response));
      dispatch(setQuestion(response[0]));
      response.forEach((question: any) => {
        dispatch(addAnsweredQuestion({
          _id: question._id,
          question: question.question,
          type: question.type,
          options: question.options,
          correctAnswer: question.correctAnswer,
          points: question.points,
          chosenAnswer: [],
        }));
      });
    });
    client.findQuizById(quizId).then((response) => {
      setQuiz(response);
    });
  }, [quizId]);

  const handleSubmitQuiz = () => {
    // console.log(answeredQuestions);
    client.submitQuiz(quizId, answeredQuestions);
    navigate(`/Kanbas/courses/${quiz.courseId}/Quizzes/${quizId}/details`);
  }

  const handleNext = () => {
    const currentIndex = questions.findIndex((question: any) => question._id === question1._id);
    if (currentIndex < questions.length - 1) {
      dispatch(setQuestion(questions[currentIndex + 1]));
    }
  }

  const handlePrevious = () => {
    const currentIndex = questions.findIndex((question: any) => question._id === question1._id);
    if (currentIndex > 0) {
      dispatch(setQuestion(questions[currentIndex - 1]));
    }
  }

  return (
    <>
      <div className="preview-heading w-75">
        <h3 className='
        font-weight-bold
        '>
          {quiz && quiz.name}
        </h3>
        <span>
          This is a preview of the published version of the quiz.
        </span>
      </div>
      <hr className='w-75'/>
      <div className="d-flex flex-row justify-content-between align-items-start gap-4 ">
        <CurrentQuestion />
        <QuestionNav />
      </div>
      <div className="w-75 d-flex flex-row justify-content-end gap-4 p-4 ">
        <button
          className='preview-button'
          onClick={handlePrevious}
        >
          <FaCaretLeft />Previous
        </button>
        <button className='preview-button' onClick={
          handleNext
        }>
          Next<FaCaretRight />
        </button>
      </div>
      <div className="w-75 preview-submit-button-container
      d-flex flex-row justify-content-end p-3     
      ">
        <button onClick={
          handleSubmitQuiz
        }>
          Submit Quiz
        </button>
      </div>
    </>
  );
}

export default QuizPreview;