import React, { useEffect, useState } from "react";
import '../../index.css'
import { FaPlus } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { setQuiz } from "../../reducer";
import * as client from "../../client";

function QuizEditorDetails(quizId: any) {

    const dispatch = useDispatch();

    const currentQuiz = useSelector((state: any) => state.quizzesReducer.quiz);

    const [showQuizContextMenu, setShowQuizContextMenu] = useState(false);

    const formatDate = (date: any) => {
        const d = new Date(date);
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const year = d.getFullYear();
        return `${year}-${month}-${day}`;
    }

    const checkNewQuiz = () => {
        if (quizId === "newQuiz") {
            setShowQuizContextMenu(true);
        }
        return false;
    }

    return (
        <>
            <div className={
                `popupwindow ${showQuizContextMenu ? "d-flex" : "d-none"}`
            }>
                <div className="popupbox-container">
                    <h5>
                        Please save the basic quiz information before adding questions.
                    </h5>
                    <button>
                        Save & Continue
                    </button>
                </div>
            </div>
            <div className="">
                <div className="d-flex flex-column gap-4 p-4 pt-0 ">
                    <input type="text" className="input-tags" value={currentQuiz.name} 
                    onChange={
                        (e) => {
                            dispatch(setQuiz({
                                ...currentQuiz,
                                name: e.target.value,
                            }));
                        }
                    }
                    />
                    <textarea className="input-tags" name="" id="" cols={30}
                        rows={5}
                    >
                    </textarea>
                    <div className="quiz-input-grp">
                        <div className="quiz-input-label">
                            Quiz Type
                        </div>
                        <div className="quiz-input-cont">
                            <select name="" id="quiz-select" className="input-tags"
                            onChange={
                                (e) => {
                                    dispatch(setQuiz({
                                        ...currentQuiz,
                                        quizType: e.target.value,
                                    }));
                                }
                            }
                            >
                                <option value="">Practice Quiz</option>
                                <option value="">Graded Quiz</option>
                            </select>
                        </div>
                    </div>
                    <div className="quiz-input-grp">
                        <div className="quiz-input-label">
                            Assignment Group
                        </div>
                        <div className="quiz-input-cont">
                            <select name="" id="" className="input-tags"
                            onChange={
                                (e) => {
                                    dispatch(setQuiz({
                                        ...currentQuiz,
                                        assignmentGroup: e.target.value,
                                    }));
                            }}
                            >
                                <option value="">ASSIGNMENT</option>
                                <option value="">QUIZ</option>
                            </select>
                        </div>
                    </div>
                    <div className="quiz-input-grp">
                        <div className="quiz-input-label">
                        </div>
                        <div className="quiz-input-cont">
                            <span>
                                Options
                            </span>
                            <div className="quiz-inner-input-cont">
                                <div className="">
                                    <label htmlFor="">
                                        <input type="checkbox" name="" id="" 
                                        onChange={
                                            (e) => {
                                                dispatch(setQuiz({
                                                    ...currentQuiz,
                                                    showCorrectAnswers: e.target.checked,
                                                }));
                                            }
                                        }
                                        />
                                        <span>
                                            Shuffle Questions
                                        </span>
                                    </label>
                                </div>
                                <div className="d-flex flex-row align-items-center justify-content-start gap-4">
                                    <label htmlFor="">
                                        <input type="checkbox" name="" id="" 
                                        onChange={
                                            (e) => {
                                                dispatch(setQuiz({
                                                    ...currentQuiz,
                                                    shuffleAnswers: e.target.checked,
                                                }));
                                            }
                                        }
                                        />
                                        <span>
                                            Time Limit
                                        </span>
                                    </label>
                                    <label htmlFor="">
                                        <input type="number" name="" id="" className="w-25" 
                                        onChange={
                                            (e) => {
                                                dispatch(setQuiz({
                                                    ...currentQuiz,
                                                    timeLimit: e.target.value,
                                                }));
                                            }
                                        }
                                        />
                                        <span>
                                            Minutes
                                        </span>
                                    </label>
                                </div>
                                <div className="
                                border border-gray-300 p-3 rounded
                                ">
                                    <label htmlFor="">
                                        <input type="checkbox" name="" id="" 
                                        onChange={
                                            (e) => {
                                                dispatch(setQuiz({
                                                    ...currentQuiz,
                                                    webcamRequired: e.target.checked,
                                                }));
                                            }
                                        }
                                        />
                                        <span>
                                            Allow Multiple Attempts
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="quiz-input-grp">
                        <div className="quiz-input-label">
                        </div>
                        <div className="input-grp">
                            <label>
                                Assign
                            </label>
                            <div className="d-flex flex-column w-100 ">
                                <div className="special-input-box w-100 p-4 ">
                                    <div className="special-input-grp">
                                        <div className="w-100">
                                            <label htmlFor="">
                                                Assign to
                                            </label>
                                            <div className="
                                                    nested-input p-2
                                                    ">
                                                <div className="p-2 py-1 ">
                                                    <span>
                                                        Everyone
                                                    </span>
                                                    <IoCloseSharp />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-100">
                                            <label htmlFor="">
                                                Due
                                            </label>
                                            <input type="date"
                                                value={formatDate(currentQuiz.dueDate)}
                                                onChange={
                                                    (e) => {
                                                        dispatch(setQuiz({
                                                            ...currentQuiz,
                                                            dueDate: e.target.value,
                                                        }));
                                                    }
                                                }
                                            />
                                        </div>
                                        <div className="w-100 d-flex gap-2 ">
                                            <div className="w-50">
                                                <label htmlFor="">
                                                    Available From
                                                </label>
                                                <input
                                                    type="date"
                                                    value={formatDate(currentQuiz.availableDate)}
                                                    onChange={
                                                        (e) => {
                                                            dispatch(setQuiz({
                                                                ...currentQuiz,
                                                                availableDate: e.target.value,
                                                            }));
                                                        }
                                                    }
                                                />
                                            </div>
                                            <div className="w-50">
                                                <label htmlFor="">
                                                    Until
                                                </label>
                                                <input type="date"
                                                    value={formatDate(currentQuiz.untilDate)}
                                                    onChange={
                                                        (e) => {
                                                            dispatch(setQuiz({
                                                                ...currentQuiz,
                                                                untilDate: e.target.value,
                                                            }));
                                                        }
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button style={{
                                    width: "100%",
                                    backgroundColor: "#f5f5f5",
                                    color: "black",
                                    textAlign: "center",
                                    borderTopLeftRadius: "0%",
                                    borderTopRightRadius: "0%",
                                    border: "1px solid #E0E0E0",
                                    borderTop: "none"
                                }} className="">
                                    <FaPlus />
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuizEditorDetails;