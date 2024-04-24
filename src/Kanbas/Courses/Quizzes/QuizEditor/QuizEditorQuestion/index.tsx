import { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaPencilAlt, FaTrash } from "react-icons/fa";
import "../../index.css"
import { Link, useParams } from "react-router-dom";
import * as client from "../../client";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuestion } from "../../reducer";
import { useNavigate } from "react-router-dom";
import { setQuestion } from "../../reducer";

function QuizEditorQuestion(quizId: any) {

    const { courseId } = useParams();
    quizId = quizId.quizId;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const quiz = useSelector((state: any) => state.quizzesReducer.quiz);

    const questions = useSelector((state: any) => state.quizzesReducer.questions);

    useEffect(() => {
        dispatch(
            setQuestion(
                {
                    _id: "",
                    question: "",
                    type: "Multiple Choice",
                    options: [],
                    correctAnswer: "",
                    points: 0
                }
            )
        )
    }, []);

    const [showQuizContextMenu, setShowQuizContextMenu] = useState(false);

    const handleSaveQuiz = () => {
        const response = client.createQuiz(quizId, quiz);
        response.then((data) => {
            setShowQuizContextMenu(!showQuizContextMenu);
            navigate(`/Kanbas/courses/${courseId}/Quizzes/${data._id}/editor`);
        });
    }

    const handleDeleteQuestion = (questionId: any, quizId: any) => {
        client.deleteQuestion(questionId, quizId).then(() => {
            dispatch(deleteQuestion(questionId));
        });
    }

    return (
        <>
            <div
                className={`popupwindow ${showQuizContextMenu ? "d-flex" : "d-none"}`}
            >
                <div className="popupbox-container">
                    <h5>
                        Do you want to save the quiz?
                    </h5>
                    <div className="d-flex flex-row justify-content-end gap-2">
                        <button className="
                        btn btn-primary
                        " onClick={
                            () => {
                                handleSaveQuiz();
                            }
                        }>
                            Save
                        </button>
                        <button className="
                        btn btn-danger
                        " onClick={
                            () => {
                                setShowQuizContextMenu(!showQuizContextMenu)
                            }
                        }>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column gap-5">
                <div className="quiz-questions-grp">
                    {
                        questions.map((question: any) => (
                            <div className="quiz-question-container">
                                <div className="quiz-question-title d-flex flex-row justify-content-between ">
                                    <span>
                                        {question.title}
                                    </span>
                                    <span>
                                        {question.points} pts
                                    </span>
                                </div>
                                <div className="quiz-question-body">
                                    <div className="quiz-question-body-text">
                                        <span>
                                            <p>
                                                {question.question}
                                            </p>
                                        </span>
                                    </div>
                                    <div className="quiz-editor-question-button-grp quiz-question-button-grp
                        d-flex flex-row gap-4">
                                        <Link to={
                                            `/Kanbas/courses/${courseId}/Quizzes/${quizId}/editor/${question._id}`
                                        }>
                                            <button>
                                                <FaPencilAlt />
                                            </button>
                                        </Link>
                                        <button onClick={
                                            () => {
                                                handleDeleteQuestion(question._id, quizId);
                                            }
                                        }>
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
                        {/* <Link to={
                            `/Kanbas/courses/${courseId}/Quizzes/${quizId}/editor/newQuestion`
                        }> */}
                        <button onClick={
                            () => {
                                // setShowQuizContextMenu(!showQuizContextMenu)
                                if (quizId === "newQuiz") {
                                    setShowQuizContextMenu(!showQuizContextMenu)
                                } else {
                                    navigate(`/Kanbas/courses/${courseId}/Quizzes/${quizId}/editor/newQuestion`);
                                }
                            }
                        }>
                            <FaPlus />
                            New Question
                        </button>
                        {/* </Link> */}
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
            </div>
        </>
    )
}

export default QuizEditorQuestion;