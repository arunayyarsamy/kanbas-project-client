import { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaPencilAlt, FaTrash } from "react-icons/fa";
import "../../index.css"
import { Link, useParams } from "react-router-dom";
import * as client from "../../client";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuestion } from "../../reducer";

function QuizEditorQuestion(quizId: any) {

    const { courseId } = useParams();
    quizId = quizId.quizId;

    const dispatch = useDispatch();

    // const [questions, setQuestions] = useState([]);

    const questions = useSelector((state: any) => state.quizzesReducer.questions);

    // useEffect(() => {
    //     if (quizId === "newQuiz") {
    //         // setQuestions({
    //         //     _id: "",
    //         //     title: "",
    //         //     points: "",
    //         //     description: "",
    //         //     questionType: "",
    //         //     multipleAnswers: "",
    //         //     correctAnswer: "",
    //         //     choices: [],
            
    //         // });
    //     } else {
    //         client.findQuestionsForQuiz(quizId)
    //             .then((questions) => {
    //                 setQuestions(questions);
    //             });
    //     }
    // }, [quizId]);

    const [showQuizContextMenu, setShowQuizContextMenu] = useState(false);

    const handleSaveQuiz = () => {
    }

    return (
        <>
            <div className="d-flex flex-column gap-5">
                <div className="quiz-questions-grp">
                    {
                        questions.map((question:any) => (
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
                                                dispatch(deleteQuestion(question._id));
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
                        <Link to={
                            `/Kanbas/courses/${courseId}/Quizzes/${quizId}/editor/newQuestion`
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
            </div>
        </>
    )
}

export default QuizEditorQuestion;