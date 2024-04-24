import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAnsweredQuestion } from '../../reducer';
import '../../index.css';

export function TrueFalseComponent(props: any) {

    const answeredQuestions = useSelector((state: any) => state.quizzesReducer.answeredQuestions);
    const currentQuestion = useSelector((state: any) => state.quizzesReducer.question);
    const dispatch = useDispatch();

    const handleAnswerQuestion = (choice: any) => {
        let answeredQuestion = {
            _id: currentQuestion._id,
            answer: [choice]
        }
        dispatch(addAnsweredQuestion(answeredQuestion));
    }

    return (
        <div className="preview-choices w-100">
            {
                props.choices.map((choice: any, index: any) => {
                    return (
                        <>
                            <hr className='m-0' />
                            <label htmlFor="">
                                <input
                                    type="radio"
                                    name="answer"
                                    id=""
                                    value={choice}
                                    onChange={(e) => {
                                        handleAnswerQuestion(e.target.value);
                                    }}
                                    checked={
                                        answeredQuestions.find((answeredQuestion: any) => answeredQuestion._id === currentQuestion._id)?.chosenAnswer.includes(choice)
                                    }
                                />
                                <span>
                                    {choice}
                                </span>
                            </label>
                        </>
                    )
                })
            }
        </div>
    );
}

export function FillInTheBlankComponent(props: any) {

    const answeredQuestions = useSelector((state: any) => state.quizzesReducer.answeredQuestions);
    const currentQuestion = useSelector((state: any) => state.quizzesReducer.question);
    const dispatch = useDispatch();
    const [possibleAnswers, setPossibleAnswers] = React.useState<any>([]);

    useEffect(() => {
        let possibleAnswers = currentQuestion.choices.map((choice: any, index: any) => {
            return ({
                answerIndex: index,
                answer: "",
            })
        });
        setPossibleAnswers(possibleAnswers);
    }, [currentQuestion]);

    const handleAnswerQuestion = (e: any, index: any) => {
        const answerIndex = index;
        const answer = e.target.value;
        const existingAnswer = possibleAnswers.find((answerObj: any) => answerObj.answerIndex === answerIndex);
        if (existingAnswer) {
            const updatedAnswers = possibleAnswers.map((answerObj: any) => {
                if (answerObj.answerIndex === answerIndex) {
                    return {
                        ...answerObj,
                        answer: answer
                    };
                }
                return answerObj;
            });
            setPossibleAnswers(updatedAnswers);
        } else {
            const newAnswer = {
                answerIndex: answerIndex,
                answer: answer
            };
            setPossibleAnswers([...possibleAnswers, newAnswer]);
        }
        let answeredQuestion = {
            _id: currentQuestion._id,
            answer: possibleAnswers.map((answerObj: any) => answerObj.answer)
        }
        dispatch(addAnsweredQuestion(answeredQuestion));
    }

    return (
        <>
            <div className="preview-choices w-100">
                {
                    props.choices.map((choice: any, index: any) => {
                        return (
                            <>
                                <hr className='m-0' />
                                <label htmlFor="" className='
                                fillintheblank
                                d-flex flex-row justify-content-start align-items-center
                                '>
                                    <span>
                                        {index + 1}
                                    </span>
                                    <input
                                        type="text"
                                        name="answer"
                                        id=""
                                        value={
                                            possibleAnswers.find((answerObj: any) => answerObj.answerIndex === index)?.answer
                                        }
                                        onChange={(e) => {
                                            handleAnswerQuestion(e, index);
                                        }}
                                    />
                                </label>
                            </>
                        )
                    })
                }
            </div></>
    );
}

export function MultipleChoiceOptionsComponent(props: any) {

    const answeredQuestions = useSelector((state: any) => state.quizzesReducer.answeredQuestions);
    const currentQuestion = useSelector((state: any) => state.quizzesReducer.question);
    const dispatch = useDispatch();

    const handleAnswerQuestion = (choice: any) => {
        // let answeredQuestion = {
        //     _id: currentQuestion._id,
        //     answer: [choice]
        // }
        dispatch(addAnsweredQuestion({
            _id: currentQuestion._id,
            question: currentQuestion.question,
            questionType: currentQuestion.questionType,
            choices: currentQuestion.choices,
            answer: currentQuestion.answer,
            points: currentQuestion.points,
            chosenAnswer: [choice],
          }));
    }

    return (
        <div className="preview-choices w-100">
            {
                props.choices.map((choice: any, index: any) => {
                    return (
                        <>
                            <hr className='m-0' />
                            <label htmlFor="">
                                <input
                                    type="radio"
                                    name="answer"
                                    id=""
                                    value={choice}
                                    onChange={(e) => {
                                        handleAnswerQuestion(e.target.value);
                                    }}
                                    checked={
                                        answeredQuestions.find((answeredQuestion: any) => answeredQuestion._id === currentQuestion._id)?.chosenAnswer.includes(choice)
                                    }
                                />
                                <span>
                                    {choice}
                                </span>
                            </label>
                        </>
                    )
                })
            }
        </div>
    );
}

function CurrentQuestion() {

    const currentQuestion = useSelector((state: any) => state.quizzesReducer.question);
    const answeredQuestions = useSelector((state: any) => state.quizzesReducer.answeredQuestions);
    const dispatch = useDispatch();

    return (
        <div className="preview-question-container w-75">
            {
                answeredQuestions.map((answeredQuestion: any) => {
                    if (answeredQuestion._id === currentQuestion._id) {
                        return (
                            <div className="selected-answer">
                                Selected Answer: {answeredQuestion.answer}
                            </div>
                        )
                    }
                }
                )
            }
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
                {
                    currentQuestion.questionType === "Multiple Choice" ?
                        <MultipleChoiceOptionsComponent choices={currentQuestion.choices} questionId={currentQuestion._id} />
                        : null
                }
                {
                    currentQuestion.questionType === "Fill in the Blank" ?
                        <FillInTheBlankComponent choices={currentQuestion.choices} />
                        : null
                }
                {
                    currentQuestion.questionType === "True/False" ?
                        <TrueFalseComponent choices={currentQuestion.choices} />
                        : null
                }
                {/* <div className="preview-choices w-100">
                    {
                        currentQuestion.choices.map((choice: any, index: any) => {
                            return (
                                <>
                                    <hr className='m-0' />
                                    <label htmlFor="">
                                        <input
                                            type="radio"
                                            name="answer"
                                            id=""
                                            value={choice}
                                            onChange={(e) => {
                                                handleAnswerQuestion(e.target.value);
                                            }}
                                        />
                                        <span>
                                            {choice}
                                        </span>
                                    </label>
                                </>
                            )
                        })
                    }
                </div> */}
            </div>
        </div>
    );
}

export default CurrentQuestion;