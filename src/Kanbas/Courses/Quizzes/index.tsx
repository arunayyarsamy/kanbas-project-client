import React from 'react';
import { FaPlus, FaEllipsisV } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { KanbasState } from "../../store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setQuizzes } from "./reducer";
import * as client from "./client";
import { useState } from "react";
import { FaCheckCircle, FaCaretDown, FaPlusCircle, FaList, FaPen, FaTrash } from "react-icons/fa";
import { AiOutlineStop } from "react-icons/ai";

function Quizzes() {

    const { courseId } = useParams();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showQuizContextMenu, setShowQuizContextMenu] = useState(false);
    const [currentQuiz, setCurrentQuiz] = useState({} as any);
    const quizzes = useSelector((state: KanbasState) =>
        state.quizzesReducer.quizzes);
    const dispatch = useDispatch();
    const handleQuizStatus = (quiz: any) => {
        if (currentTime > new Date(quiz.available)) {
            return "Closed";
        } else if (new Date(quiz.available) < currentTime && currentTime < new Date(quiz.due)) {
            return "Available";
        }
        return `Not available until ${quiz.available}`;
    }
    // const getQuizDetails = (quiz: any) => {
    //     return quiz.publishStatus === 1 ? 
    //     `${quiz.points ? quiz.points : "N/A"} pts | ${quiz.numQuestions} Questions` : 
    //     "Not published";
    // }
    useEffect(() => {
        client.findQuizzesForCourse(courseId)
            .then((quizzes) => {
                dispatch(setQuizzes(quizzes));
            });
    }, [courseId, dispatch]);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    

    return (
        <>
            <h1>
                currentTime: {currentTime.toISOString()}
            </h1>
            <div className={
                `popupwindow ${showQuizContextMenu ? "d-flex" : "d-none"}`
            }>
                <div className="popupbox-container">
                    <h5>
                        Quiz Context Menu
                    </h5>
                    <p>
                        Quiz Title: {currentQuiz.title}
                    </p>
                    <div className="d-flex flex-row justify-content-end gap-2">
                        <button className='
                            btn btn-secondary
                        '>
                            Edit
                        </button>
                        <button className='
                            btn btn-danger 
                        '>
                            Delete
                        </button>
                        <button className='
                            btn btn-success
                        '>
                            Publish
                        </button>
                        <button className='
                            btn btn-primary
                        '>
                            Copy
                        </button>
                        <button className='
                            btn btn-warning
                        '>
                            Sort
                        </button>
                        <button className='
                            btn btn-secondary
                        ' onClick={
                            () => setShowQuizContextMenu(!showQuizContextMenu)
                        }>
                            Close
                        </button>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-md-row flex-column justify-content-start justify-content-md-between align-items-md-center align-items-start gap-4 ">
                <input className="assignment-search-input" type="text" placeholder="Search for Assignments" />
                <div className="assiginments-button-grp d-flex gap-2 ">
                    <Link className="text-decoration-none" to="">
                        <button className="add-assignment p-2 px-4">
                            <FaPlus />
                            Quiz
                        </button>
                    </Link>
                    <button className="p-2">
                        <FaEllipsisV />
                    </button>
                </div>
            </div>
            <hr />
            <ul className="list-group wd-modules">
                <li className="list-group-item" key={0}>
                    <div className="d-flex flex-row justify-content-between align-items-center p-2">
                        <div className="d-flex flex-row justify-content-between align-items-center gap-2">
                            <FaEllipsisV />
                            <FaCaretDown />
                            <h3 className="fs-5 fw-bold ">
                                Assignments
                            </h3>
                        </div>
                        <span className="float-end d-flex justify-content-center align-items-center gap-2">
                            <div className="
                                            p-2
                                            border
                                            border-1
                                            rounded-4
                                            ">
                                40% of Total
                            </div>
                            <FaCheckCircle className="text-success" />
                            <FaPlusCircle />
                            <FaEllipsisV />
                        </span>
                    </div>

                    <ul className="list-group">
                        {quizzes
                            .filter((quiz) => quiz.course === courseId)
                            .map((quiz, index) => (
                                <li className="d-flex flex-row flex-grow-1 w-100 justify-content-between align-items-center p-2 px-2 bg-white " key={index}>
                                    <div className="d-flex flex-row justify-content-center align-items-center gap-4">
                                        <FaEllipsisV />
                                        <FaList />
                                        <div className="assignment-title-link d-flex flex-column">
                                            <Link to={`/Kanbas/courses/${courseId}/Assignments/${quiz._id}`}>{quiz.title}</Link>
                                            <span>{
                                                // Closed - if current date is after quizzes Available Date
                                                // Available - if current date is between Available Date and Available Until Date
                                                // Not available until <AVAILABLE DATE> - if current date is before the Available Date
                                                
                                                // currentTime > new Date(quiz.available) ? "Closed" : currentTime > new Date(quiz.due) ? "Available" : `Not available until ${quiz.available}`

                                                handleQuizStatus(quiz)
                                                
                                            } | {quiz.due ? "Due " + quiz.due : "No due date"} | 
                                            {
                                                quiz.publishStatus === 1 ? 
                                                `${quiz.points ? quiz.points : "N/A"} pts 
                                                | ${quiz.numQuestions} Questions` : "Not published"
                                            }
                                            </span>
                                        </div>
                                    </div>
                                    <span className="d-flex flex-row gap-3 align-items-center ">
                                        {/* <FaCheckCircle className={
                                            quiz.publishStatus === 1 ? "text-success" : "text-green-500"
                                        } /> */}
                                        {
                                            quiz.publishStatus === 1 ? <FaCheckCircle className="text-success" /> : <AiOutlineStop className="text-black" />
                                        }
                                        <Link to={`/kanbas/courses/${courseId}/Assignments/${quiz._id}`} className="text-black">
                                            <FaPen />
                                        </Link>
                                        <FaTrash style={{
                                            cursor: "pointer"
                                        }} />
                                        <FaEllipsisV onClick={
                                            () => {
                                                setShowQuizContextMenu(!showQuizContextMenu);
                                                setCurrentQuiz(quiz);
                                            }
                                        } />
                                    </span>
                                </li>
                            ))
                        }
                    </ul>
                </li>
            </ul>
        </>
    );
}

export default Quizzes;