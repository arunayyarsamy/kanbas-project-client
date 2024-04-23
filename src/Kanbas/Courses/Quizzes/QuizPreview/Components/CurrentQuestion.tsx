import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAnsweredQuestion } from '../../reducer';
import '../../index.css';

function CurrentQuestion() {

    const questions = useSelector((state: any) => state.quizzesReducer.questions);
    const currentQuestion = useSelector((state: any) => state.quizzesReducer.question);
    const answeredQuestions = useSelector((state: any) => state.quizzesReducer.answeredQuestions);
    const dispatch = useDispatch();

    const handleAnswerQuestion = (e: any) => {
        if (e.target.checked) {
            let answeredQuestion = {
                question: currentQuestion,
                answer: e.target.nextSibling.data
            }
            dispatch(addAnsweredQuestion(answeredQuestion));
        }
    }

    return (
        <div className="preview-question-container w-75">
            <div className="preview-question-title">
                <span>
                    {currentQuestion.title}
                </span>
                <span>
                    {currentQuestion.points} pts
                </span>
            </div>
            <div className="preview-question-body">
                <div className="preview-question">
                    {currentQuestion.question}
                </div>
                <div className="preview-choices">
                    {
                        currentQuestion.choices.map((choice: any) => {
                            return (
                                <label htmlFor="">
                                    <input type="radio" name="answer" id="" />
                                    {choice}
                                </label>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default CurrentQuestion;