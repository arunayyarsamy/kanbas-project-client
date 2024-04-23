import React from 'react';
import { useSelector } from 'react-redux';
import '../../index.css';

function QuestionNav() {

    const questions = useSelector((state: any) => state.quizzesReducer.questions);

    return (
        <div className="preview-questions-list-container w-25">
            {
                questions.map((question: any, index: any) => {
                    return (
                        <div key={question._id} className="d-flex flex-column justify-content-start align-items-start ">
                            {/* <span>
                                Question {index + 1}
                            </span> */}
                            <button>
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