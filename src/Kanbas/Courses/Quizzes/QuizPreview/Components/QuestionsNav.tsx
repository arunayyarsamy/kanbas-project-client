import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuestionFromId } from '../../reducer';
import '../../index.css';

function QuestionNav() {

    const dispatch = useDispatch();

    const questions = useSelector((state: any) => state.quizzesReducer.questions);

    return (
        <div className="preview-questions-list-container w-25 h-100 
        d-flex flex-column justify-content-start align-items-start gap-2
        ">
            <h3>
                Questions
            </h3>
            {
                questions.map((question: any, index: any) => {
                    return (
                        <div key={question._id} className="">
                            <button onClick={
                                () => {
                                    dispatch(setQuestionFromId(question._id));
                                }
                            }>
                                Question {index + 1}
                            </button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default QuestionNav;