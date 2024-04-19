import React from "react";
import { FaEllipsisV, FaCheckCircle, FaPencilAlt } from "react-icons/fa";
import '../index.css'
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function QuizDetails() {

    const { quizId } = useParams();
    // const currentQuiz = useSelector((state: any) => state.quizzes.quizzes.find((quiz: any) => quiz.id === quizId));

    return (
        <>
            <div className="details-button-grp float-end d-flex gap-3">
                <button>
                    <FaCheckCircle />
                    Publish
                </button>
                <button>
                    Preview
                </button>
                <button>
                    <FaPencilAlt />
                    Edit
                </button>
                <button>
                    <FaEllipsisV />
                </button>
            </div>
            <br /><br />
            <hr />
            <div className="quiz-details-main-container px-5 ">
                <h1>
                    Quiz Title
                </h1>
                <div className="d-flex flex-column gap-4 w-100 mt-4">
                    <div className="quiz-details d-flex w-50 flex-column gap-2">
                        <div className="quiz-field">
                            <div className="quiz-label">
                                Quiz Type
                            </div>
                            <div className="quiz-value">
                                Graded Quiz
                            </div>
                        </div>
                        <div className="quiz-field">
                            <div className="quiz-label">
                                Points
                            </div>
                            <div className="quiz-value">
                                10
                            </div>
                        </div>
                        <div className="quiz-field">
                            <div className="quiz-label">
                                Assignment Group
                            </div>
                            <div className="quiz-value">
                                QUIZZES
                            </div>
                        </div>
                        <div className="quiz-field">
                            <div className="quiz-label">
                                Shuffle Answers
                            </div>
                            <div className="quiz-value">
                                Yes
                            </div>
                        </div>
                        <div className="quiz-field">
                            <div className="quiz-label">
                                Time Limit
                            </div>
                            <div className="quiz-value">
                                20 minutes
                            </div>
                        </div>
                        <div className="quiz-field">
                            <div className="quiz-label">
                                Multiple Attempts
                            </div>
                            <div className="quiz-value">
                                No
                            </div>
                        </div>
                        <div className="quiz-field">
                            <div className="quiz-label">
                                View Response
                            </div>
                            <div className="quiz-value">
                                Always
                            </div>
                        </div>
                        <div className="quiz-field">
                            <div className="quiz-label">
                                Show Correct Answers
                            </div>
                            <div className="quiz-value">
                                Immediately
                            </div>
                        </div>
                        <div className="quiz-field">
                            <div className="quiz-label">
                                Access Code
                            </div>
                            <div className="quiz-value">
                            </div>
                        </div>
                        <div className="quiz-field">
                            <div className="quiz-label">
                                One Question at a Time
                            </div>
                            <div className="quiz-value">
                                Yes
                            </div>
                        </div>
                        <div className="quiz-field">
                            <div className="quiz-label">
                                Require Respondus LockDown Browser
                            </div>
                            <div className="quiz-value">
                                No
                            </div>
                        </div>
                        <div className="quiz-field">
                            <div className="quiz-label">
                                Required to View Quiz Results
                            </div>
                            <div className="quiz-value">
                                No
                            </div>
                        </div>
                        <div className="quiz-field">
                            <div className="quiz-label">
                                Webcam Required
                            </div>
                            <div className="quiz-value">
                                No
                            </div>
                        </div>
                        <div className="quiz-field">
                            <div className="quiz-label">
                                Lock Questions After Answering
                            </div>
                            <div className="quiz-value">
                                No
                            </div>
                        </div>
                    </div>
                    <div className="quiz-details-table mt-4 ">
                        {/* Due, For, Available from, Until */}
                        {/* Borderless Table, top and bottom border for table body row */}
                        <table className="table table-borderless">
                            <thead>
                                <tr>
                                    <th>Due</th>
                                    <th>For</th>
                                    <th>Available from</th>
                                    <th>Until</th>
                                </tr>
                            </thead>
                            <tbody className="
                        border-top border-bottom                       
                        ">
                                <tr>
                                    <td>1/1/2022 12:00 AM</td>
                                    <td>Everyone</td>
                                    <td>1/1/2022 12:00 AM</td>
                                    <td>1/1/2022 12:00 AM</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default QuizDetails;