import React, { useEffect } from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import "../../../index.css"

export function PossibleAnswerContainer({ newQuestion, setNewQuestion }: { newQuestion: any, setNewQuestion: any }) {

    const handlePossibleAnswerBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const updatedPossibleAnswer = e.target.value.trim();
        if (updatedPossibleAnswer !== "") {
            setNewQuestion((prevState: { possibleAnswers: any; }) => ({
                ...prevState,
                possibleAnswers: [...prevState.possibleAnswers, updatedPossibleAnswer]
            }));
        }
    };

    return (
        <div className="possible-answer">
            <label htmlFor="" className="input-grp">
                <span>
                    Possible Answer
                </span>
                <input
                    type="text"
                    name=""
                    id=""
                    onBlur={handlePossibleAnswerBlur}
                />
            </label>
        </div>
    );
}


function NewQuestion() {

    const [newQuestion, setNewQuestion] = useState({
        title: "",
        type: "",
        points: "0",
        question: "",
        correctAnswer: [] as string[],
        possibleAnswers: [] as string[],
        allAnswers: [] as string[]
    });

    useEffect(() => {
        if (newQuestion.type === "Multiple Choice") {
            setPossibleAnswersLimit(3);
            setPossibleAnswersLen(0);
        } else if (newQuestion.type === "True/False") {
            setPossibleAnswersLimit(1);
            setPossibleAnswersLen(0);
        } else if (newQuestion.type === "Fill in the Blank") {
            setPossibleAnswersLimit(1);
            setPossibleAnswersLen(0);
        }
        newQuestion.possibleAnswers = []
    }, [newQuestion.type])

    const saveQuestion = () => {
        // if (newQuestion.points === "0") {
        //     alert("Please provide points");
        //     return;
        // }
        // if (newQuestion.correctAnswer.length === 0) {
        //     alert("Please provide a correct answer");
        //     return;
        // }
        // if (newQuestion.possibleAnswers.length === 0) {
        //     alert("Please provide a question");
        //     return;
        // }
        const combinedAnswers = [...newQuestion.correctAnswer, ...newQuestion.possibleAnswers];
        setNewQuestion({
            ...newQuestion,
            allAnswers: combinedAnswers
        });
        console.log(newQuestion);
    }

    const [possibleAnswersLimit, setPossibleAnswersLimit] = useState(0);
    const [possibleAnswersLen, setPossibleAnswersLen] = useState(0);

    return (
        <>
            <div className="d-flex flex-column gap-3">
                <div className="d-flex flex-row justify-content-between align-items-center gap-4 ">
                    <div className="d-flex flex-row justify-content-start align-items-center gap-4">
                        <div className="input-grp">
                            <input type="text" value={"Question Title"} className="form-control"
                                onChange={
                                    (e) => {
                                        setNewQuestion({
                                            ...newQuestion,
                                            title: e.target.value
                                        })
                                    }}
                            />
                        </div>
                        <div className="input-grp">
                            <select name="" id="" onChange={
                                (e) => {
                                    setNewQuestion({
                                        ...newQuestion,
                                        type: e.target.value
                                    })
                                }
                            }>
                                <option value="" defaultChecked>Question Type</option>
                                <option value="Multiple Choice">Multiple Choice</option>
                                <option value="True/False">True/False</option>
                                <option value="Fill in the Blanks">Fill in the Blanks</option>
                            </select>
                        </div>
                    </div>
                    <div className="input-grp d-flex gap-2 align-items-center ">
                        <span>pts: </span>
                        <input type="text" value={"0"} className="form-control"
                            onChange={(e) => {
                                console.log(e.target.value);
                                setNewQuestion({
                                    ...newQuestion,
                                    points: e.target.value
                                })
                            }}
                        />
                    </div>
                </div>
                <hr />
                <div className="d-flex flex-column gap-4">
                    <span className="question-message">
                        Enter your question and multiple answers, then select the one correct answer.
                    </span>
                    <div className="newquestion-body d-flex flex-column gap-4 ">
                        <div className="newquestion-question-container d-flex flex-column gap-2 ">
                            <label htmlFor="">
                                Question:
                            </label>
                            <textarea name="" id="" cols={30} rows={10} onChange={
                                (e) => {
                                    setNewQuestion({
                                        ...newQuestion,
                                        question: e.target.value
                                    })
                                }
                            }></textarea>
                        </div>
                        <div className="newquestion-answers-grp-container">
                            <h6>
                                Answers:
                            </h6>
                            <div className="newquestion-answer-container d-flex flex-column gap-4">
                                <div className="correct-answer">
                                    <label htmlFor="" className="input-grp">
                                        <span className="
                                    text-success
                                    ">
                                            Correct Answer
                                        </span>
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            onChange={(e) => {
                                                setNewQuestion((prevState) => ({
                                                    ...prevState,
                                                    correctAnswer: [e.target.value]
                                                }));
                                            }}
                                        />

                                    </label>
                                </div>
                                {Array.from({ length: possibleAnswersLen }, (_, index) => (
                                    <PossibleAnswerContainer
                                        key={index}
                                        newQuestion={newQuestion}
                                        setNewQuestion={setNewQuestion}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="newQuestionButtonContainer">
                        <button disabled={
                            possibleAnswersLen === possibleAnswersLimit
                        } onClick={
                            () => {
                                setPossibleAnswersLen(possibleAnswersLen + 1);
                            }
                        } className="float-end d-flex flex-row justify-content-center align-items-center 
                    gap-2 border-0 bg-transparent
                    " style={{
                                color: "#007bff"
                            }}>
                            <FaPlus />
                            Add Another Answer
                        </button>
                    </div>
                </div>
                <div className="submission-button-grp
                        d-flex gap-3
                        ">
                    <button>
                        Cancel
                    </button>
                    <button>
                        Update Question
                    </button>
                </div>
            </div>
        </>
    )
}

export default NewQuestion;