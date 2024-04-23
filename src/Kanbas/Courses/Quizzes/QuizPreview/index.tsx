import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import * as client from '../client';
import { setQuestions, setQuestion } from '../reducer';
import CurrentQuestion from './Components/CurrentQuestion';
import QuestionNav from './Components/QuestionsNav';

function QuizPreview() {

  const { quizId } = useParams();
  const dispatch = useDispatch();

  const questions = useSelector((state: any) => state.quizzesReducer.questions);

  const question = useSelector((state: any) => state.quizzesReducer.question);

  useEffect(() => {
    client.findQuestionsForQuiz(quizId).then((response) => {
      dispatch(setQuestions(response));
      dispatch(setQuestion(response[0]));
    });
  }, [quizId]);

  return (
    <>
      <div className="d-flex flex-row justify-content-between align-items-center gap-4 ">
        <CurrentQuestion />
        <QuestionNav />
      </div>
    </>
  );
}

export default QuizPreview;