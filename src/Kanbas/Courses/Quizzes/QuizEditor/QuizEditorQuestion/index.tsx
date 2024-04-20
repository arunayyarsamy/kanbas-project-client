import { useState } from "react";
import { FaPlus, FaSearch, FaPencilAlt, FaTrash } from "react-icons/fa";
import "../../index.css"
import { Link, useParams } from "react-router-dom";

function QuizEditorQuestion(quizId: any) {

    const { courseId } = useParams();
    console.log(quizId.quizId);
    console.log(courseId);

    const [questions, setQuestions] = useState([
        {
            id: 1,
            title: "What is the capital of France?"
        },
        {
            id: 2,
            title: "What is the capital of France?"
        },
        {
            id: 3,
            title: "What is the capital of France?"
        },
        {
            id: 4,
            title: "What is the capital of France?"
        },
        {
            id: 5,
            title: "What is the capital of France?"
        },
        {
            id: 6,
            title: "What is the capital of France?"
        },
    ])

    if (quizId === "newQuiz") {
    } else {
    }

    const [showQuizContextMenu, setShowQuizContextMenu] = useState(false);

    const handleSaveQuiz = () => {
    }

    return (
        <>
            <div className="d-flex flex-column gap-5">
                <div className="quiz-questions-grp">
                    {
                        questions.map((question) => (
                            <div className="quiz-question-container">
                                <div className="quiz-question-title d-flex flex-row justify-content-between ">
                                    <span>
                                        Question 1
                                    </span>
                                    <span>
                                        1 pts
                                    </span>
                                </div>
                                <div className="quiz-question-body">
                                    <div className="quiz-question-body-text">
                                        <span>
                                            <p>
                                                What is the capital of France?
                                            </p>
                                        </span>
                                    </div>
                                    <div className="quiz-editor-question-button-grp quiz-question-button-grp
                        d-flex flex-row gap-4">
                                        <button>
                                            <FaPencilAlt />
                                        </button>
                                        <button>
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="quiz-editor-question-button-grp d-flex flex-md-row flex-column justify-content-end align-items-md-start align-items-center gap-4 fs-6 ">
                    <div className="
                        d-flex gap-3
                        ">
                        <Link to={
                            `/Kanbas/courses/${courseId}/Quizzes/${quizId.quizId}/editor/newQuestion`
                        }>
                            <button>
                                <FaPlus />
                                New Question
                            </button>
                        </Link>
                        <button>
                            <FaPlus />
                            New Question Group
                        </button>
                        <button>
                            <FaSearch />
                            Find Questions
                        </button>
                    </div>
                </div>
                <div className="">
                    <hr />
                    <div className="d-flex flex-md-row flex-column justify-content-between align-items-md-start align-items-center gap-4 fs-6 ">
                        <label htmlFor="" className="fs-6 h-100  d-flex align-items-center justify-content-center gap-3 ">
                            <input type="checkbox" name="" id="" />
                            Notify users that this content has changed
                        </label>
                        <div className="submission-button-grp
                        d-flex gap-3
                        ">
                            <button>
                                Cancel
                            </button>
                            <button style={{
                                backgroundColor: "#f5f5f5",
                                color: "black",
                                border: "1px solid #E0E0E0",
                            }}>
                                Save & Publish
                            </button>
                            <button>
                                Save
                            </button>
                        </div>
                    </div>
                    <hr />
                </div>
            </div>
        </>
    )
}

export default QuizEditorQuestion;