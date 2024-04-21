import React, { useEffect } from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import "../../../index.css"
import { useParams } from "react-router";
import { Editor } from '@tinymce/tinymce-react';
import { idText } from "typescript";
import * as client from "../../../client";

export function MultipleChoiceAnswerContainer({ questionId, newQuestion, setNewQuestion, possibleAnswersLen }: { questionId:any, newQuestion: any, setNewQuestion: any, possibleAnswersLen:any }) {
    return (
        <>
            <div className="correct-answer quiz-input-grp">
                <label htmlFor="" className="">
                    <span className="text-success">
                        Correct Answer
                    </span>
                    <input
                        type="text"
                        name=""
                        id=""
                        value={newQuestion.answer[0]}
                        onBlur={(e) => {
                            setNewQuestion((prevState: any) => ({
                                ...prevState,
                                answer: [e.target.value]
                            }));
                        }}
                    />
                </label>
            </div>
            {
                questionId === "newQuestion" ? Array.from({ length: possibleAnswersLen }, (_, index) => (
                    <PossibleAnswerContainer
                        key={index}
                        newQuestion={newQuestion}
                        setNewQuestion={setNewQuestion}
                    />
                )) : newQuestion.possibleAnswers.map((possibleAnswer: any, index: any) => (
                    <div className="possible-answer quiz-input-grp" key={index}>
                        <label htmlFor="" className="input-grp">
                            <span className="text-danger">
                                Possible Answer
                            </span>
                            <input
                                type="text"
                                name=""
                                id=""
                                value={possibleAnswer}
                                onChange={(e) => {
                                    const updatedPossibleAnswers = newQuestion.possibleAnswers.map((possibleAnswer: any, possibleAnswerIndex: any) => {
                                        if (possibleAnswerIndex === index) {
                                            return e.target.value;
                                        }
                                        return possibleAnswer;
                                    });
                                    setNewQuestion((prevState: any) => ({
                                        ...prevState,
                                        possibleAnswers: updatedPossibleAnswers
                                    }));
                                }}
                                onBlur={(e) => {
                                    const updatedPossibleAnswers = newQuestion.possibleAnswers.map((possibleAnswer: any, possibleAnswerIndex: any) => {
                                        if (possibleAnswerIndex === index) {
                                            // Remove HTML tags from the input value
                                            return e.target.value.replace(/<\/?[^>]+(>|$)/g, "");
                                        }
                                        return possibleAnswer;
                                    });
                                    setNewQuestion((prevState: any) => ({
                                        ...prevState,
                                        possibleAnswers: updatedPossibleAnswers
                                    }));
                                }}
                            />
                        </label>
                    </div>
                ))
            }
        </>
    );
}


export function PossibleAnswerContainer({ newQuestion, setNewQuestion }: { newQuestion: any, setNewQuestion: any }) {

    const handlePossibleAnswerBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const possibleAnswer = e.target.value;
        const updatesPossibleAnswers = newQuestion.possibleAnswers.filte
        console.log("currentChoices", updatesPossibleAnswers);
        setNewQuestion((prevState: any) => ({
            ...prevState,
            possibleAnswers: updatesPossibleAnswers
        }));
    };

    return (
        <div className="possible-answer quiz-input-grp">
            <label htmlFor="" className="input-grp">
                <span className="text-danger">
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

export function FillInBlanksAnswerContainer({ newQuestion, setNewQuestion }: { newQuestion: any, setNewQuestion: any }) {

    return (
        <div className="possible-answer quiz-input-grp">
            <label htmlFor="" className="input-grp">
                <span className="text-danger">
                    {newQuestion.answer.length + 1}.
                </span>
                <input
                    type="text"
                    name=""
                    id=""
                />
            </label>
        </div>
    );
}

function NewQuestion() {

    const { quizId } = useParams();
    const { questionId } = useParams();

    const [newQuestion, setNewQuestion] = useState({
        _id: "",
        title: "new Ques",
        points: "1",
        question: "",
        choices: [] as string[],
        questionType: "",
        answer: [] as string[],
        possibleAnswers: [] as string[]
    });

    useEffect(() => {
        if (questionId === "newQuestion") {
        } else {
            client.findQuestionById(
                quizId, questionId
            ).then((question) => {
                // setNewQuestion(question, possibleAnswers = question.choices || [])
                setNewQuestion({
                    ...question,
                    possibleAnswers: question.choices.filter((choice: any) => !question.answer.includes(choice))
                });
            })
        }
    }, []);

    useEffect(() => {
        if (newQuestion.questionType === "Multiple Choice") {
            setPossibleAnswersLimit(3);
            setPossibleAnswersLen(0);
        } else if (newQuestion.questionType === "True/False") {
            setPossibleAnswersLimit(1);
            setPossibleAnswersLen(0);
        } else if (newQuestion.questionType === "Fill in the Blank") {
            setPossibleAnswersLimit(100);
            setPossibleAnswersLen(0);
        } else {
            setPossibleAnswersLimit(0);
            setPossibleAnswersLen(0);
        }
        newQuestion.choices = []
    }, [newQuestion.questionType])

    const saveQuestion = (finalQuestion: any) => {
        console.log("newQuestion", finalQuestion);
        // if (questionId === "newQuestion") {
        //     client.createQuestion(quizId, finalQuestion)
        //         .then((question) => {
        //             setNewQuestion(question);
        //         });
        // } else {
        //     client.updateQuestion(quizId, finalQuestion)
        //         .then((question) => {
        //             setNewQuestion(question);
        //         });
        // }
    }

    const getFinalQuestion = () => {
        if (newQuestion.points === "0") {
            alert("Please provide points");
            return;
        }
        // if (newQuestion.correctAnswer.length === 0) {
        //     alert("Please provide a correct answer");
        //     return;
        // }
        // if (newQuestion.possibleAnswers.length === 0) {
        //     alert("Please provide a question");
        //     return;
        // }
        // if (newQuestion.choices.includes(newQuestion.answer[0])) {
        //     alert("Correct answer cannot be in the possible answers");
        //     return;
        // }

        const finalChoices = newQuestion.possibleAnswers.concat(newQuestion.answer);
        const shuffledChoices = finalChoices.sort(() => Math.random() - 0.5);
        const finalQuestion = {
            ...newQuestion,
            choices: shuffledChoices
        };
        // setNewQuestion({
        //     ...newQuestion,
        //     choices: finalChoices
        // });
        saveQuestion(finalQuestion);
    }

    const [possibleAnswersLimit, setPossibleAnswersLimit] = useState(0);
    const [possibleAnswersLen, setPossibleAnswersLen] = useState(0);

    return (
        <>
            <div className="d-flex flex-column gap-3 newQuestion-main-grp">
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
                                        questionType: e.target.value
                                    })
                                }
                            } value={
                                newQuestion.questionType
                            } className="w-100">
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
                            <label htmlFor="" className="newQuestion-heading">
                                Question:
                            </label>
                            <Editor
                                apiKey='9cwhor0h9kuvm0z028tcchgsf8v7mi7f3r2fh16a89rtp1z5'
                                init={{
                                    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                    tinycomments_mode: 'embedded',
                                    tinycomments_author: 'Author name',
                                    mergetags_list: [
                                        { value: 'First.Name', title: 'First Name' },
                                        { value: 'Email', title: 'Email' },
                                    ]
                                }}
                                initialValue={newQuestion.question}
                                onEditorChange={
                                    (content, editor) => {
                                        const plainTextContent = editor.getContent({ format: 'text' });
                                        setNewQuestion({
                                            ...newQuestion,
                                            question: plainTextContent
                                        })
                                    }
                                }
                            />
                        </div>
                        <div className="newquestion-answers-grp-container">
                            <h6 className="newQuestion-heading">
                                Answers:
                            </h6>
                            <div className="newquestion-answer-container d-flex flex-column gap-4">
                                {
                                    newQuestion.questionType === "Fill in the Blanks" ?
                                        <FillInBlanksAnswerContainer
                                            newQuestion={newQuestion}
                                            setNewQuestion={setNewQuestion}
                                        />
                                        :
                                        newQuestion.questionType === "Multiple Choice" || newQuestion.questionType === "True/False" ?
                                            <MultipleChoiceAnswerContainer
                                                questionId={questionId}
                                                newQuestion={newQuestion}
                                                setNewQuestion={setNewQuestion}
                                                possibleAnswersLen={possibleAnswersLen}
                                            /> : null
                                }
                                {/* <div className="correct-answer quiz-input-grp">
                                    <label htmlFor="" className="">
                                        <span className="
                                    text-success
                                    ">
                                            Correct Answer
                                        </span>
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            value={newQuestion.answer[0]}
                                            // onChange={(e) => {
                                            //     setNewQuestion((prevState) => ({
                                            //         ...prevState,
                                            //         answer: [e.target.value]
                                            //     }));
                                            // }}
                                            onBlur={(e) => {
                                                setNewQuestion((prevState) => ({
                                                    ...prevState,
                                                    answer: [e.target.value]
                                                }));
                                            }
                                            }
                                        />

                                    </label>
                                </div>
                                {
                                    questionId === "newQuestion" ? Array.from({ length: possibleAnswersLen }, (_, index) => (
                                        <PossibleAnswerContainer
                                            key={index}
                                            newQuestion={newQuestion}
                                            setNewQuestion={setNewQuestion}
                                        />
                                    )) : newQuestion.possibleAnswers.map((possibleAnswer: any, index: any) => (
                                        <div className="possible-answer quiz-input-grp" key={index}>
                                            <label htmlFor="" className="input-grp">
                                                <span className="text-danger">
                                                    Possible Answer
                                                </span>
                                                <input
                                                    type="text"
                                                    name=""
                                                    id=""
                                                    value={possibleAnswer}
                                                    onChange={(e) => {
                                                        const updatedPossibleAnswers = newQuestion.possibleAnswers.map((possibleAnswer: any, possibleAnswerIndex: any) => {
                                                            if (possibleAnswerIndex === index) {
                                                                return e.target.value;
                                                            }
                                                            return possibleAnswer;
                                                        });
                                                        setNewQuestion((prevState) => ({
                                                            ...prevState,
                                                            possibleAnswers: updatedPossibleAnswers
                                                        }));
                                                    }}
                                                />
                                            </label>
                                        </div>
                                    ))
                                } */}
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
                        }>
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
                    <button onClick={
                        getFinalQuestion
                    }>
                        Update Question
                    </button>
                </div>
            </div>
        </>
    )
}

export default NewQuestion;