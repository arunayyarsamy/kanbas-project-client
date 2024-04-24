import React, { useEffect } from "react";
import QuizEditorDetails from "./QuizEditorDetails";
import QuizEditorQuestion from "./QuizEditorQuestion";
import { FaEllipsisV } from "react-icons/fa";
import '../index.css'
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import * as client from "../client";
import { setQuiz, setQuestions } from "../reducer";

function QuizEditor() {

    const { quizId } = useParams();
    const { courseId } = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

    const currentQuiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

    const currentQuestions = useSelector((state: KanbasState) => state.quizzesReducer.questions);

    const handleFinalSave = (publishStatus: any) => {
        let totalPoints = 0;
        currentQuestions.forEach((question) => {
            totalPoints += question.points;
        });

        if (totalPoints > currentQuiz.points) {
            alert("Total points for questions exceeds total points for quiz");
            return;
        } else {
            if (quizId === "newQuiz") {
                client.createQuiz(courseId, currentQuiz).then((res) => {
                    console.log(res);
                });
            } else {
                client.updateQuiz(currentQuiz).then((res) => {
                    console.log(res);
                });
            }
        }

        if (publishStatus === true) {
            navigate(`/Kanbas/courses/${courseId}/Quizzes`);
        } else {
            navigate(`/Kanbas/courses/${courseId}/Quizzes/${quizId}/details`);
        }

    };

    useEffect(() => {
        if (quizId === "newQuiz") {
            dispatch(setQuiz({
                accessCode: "",
                assignmentGroup: "Quizzes",
                availableDate: "",
                courseId: courseId,
                description: "",
                dueDate: "",
                lockQuestionsAfterAnswering: "No",
                multipleAttempts: "No",
                name: "Default Quiz",
                oneQuestionAtATime: "Yes",
                points: "20",
                published: false,
                questions: [],
                quizType: "Graded Quiz",
                showCorrectAnswers: "No",
                shuffleAnswers: "Yes",
                timeLimit: "20",
                untilDate: "",
                webcamRequired: "No",
                _id: "",
            }));
            dispatch(setQuestions([]));
        } else {
            client.findQuizById(quizId)
                .then((quiz) => {
                    dispatch(setQuiz(quiz));
                });
            client.findQuestionsForQuiz(quizId)
                .then((questions) => {
                    console.log(questions);
                    dispatch(setQuestions(questions));
                });
        }
    }, [quizId]);

    const [activeTab, setActiveTab] = React.useState("details");

    const saveQuiz = (publishStatus: boolean) => {

        if (currentQuiz.name === "") {
            alert("Please enter a name for the quiz");
            return;
        }

        if (publishStatus === true) {
            dispatch(setQuiz({ ...currentQuiz, published: true }));
        } else {
            dispatch(setQuiz({ ...currentQuiz, published: false }));
        }

        client.findQuestionsForQuiz(quizId).then((response) => {
            dispatch(setQuestions(response));
        });

        handleFinalSave(publishStatus);

        // if (quizId === "newQuiz") {
        //     client.createQuiz(courseId, currentQuiz).then((res) => {
        //         console.log(res);
        //     });
        // } else {
        //     client.updateQuiz(currentQuiz).then((res) => {
        //         console.log(res);
        //     });
        // }
        // // navigate(`/Kanbas/courses/${courseId}/quizzes`);
        // if (publishStatus === true) {
        //     navigate(`/Kanbas/courses/${courseId}/Quizzes`);
        // } else {
        //     navigate(`/Kanbas/courses/${courseId}/Quizzes/${quizId}/details`);
        // }

    };

    return (
        <>
            <div className="d-flex flex-column gap-4 ">
                <div className="d-flex flex-row gap-4 align-self-end justify-content-center align-items-center ">
                    <div className="PointsStatus">
                        <span>
                            Points: {quiz.points ? quiz.points : "N/A"}
                        </span>
                    </div>
                    <div className="PublishStatus">
                        <span>
                            Not Published
                        </span>
                    </div>
                    <div className="details-button-grp">
                        <button>
                            <FaEllipsisV />
                        </button>
                    </div>
                </div>
                <hr />
                <nav className="nav nav-tabs mt-2">
                    <button className={
                        activeTab === "details" ? "nav-link active" : "nav-link"
                    } onClick={
                        () => setActiveTab("details")
                    }>
                        Details
                    </button>
                    <button className={
                        activeTab === "Questions" ? "nav-link active" : "nav-link"
                    } onClick={
                        () => setActiveTab("Questions")
                    }>
                        Questions
                    </button>
                </nav>
                <div className="">
                    {
                        activeTab === "details" ? <QuizEditorDetails quizId={quizId} /> : <QuizEditorQuestion quizId={quizId} />
                    }
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
                            <button onClick={
                                () => {
                                    navigate(`/Kanbas/courses/${courseId}/Quizzes`)
                                }
                            }>
                                Cancel
                            </button>
                            <button style={{
                                backgroundColor: "#f5f5f5",
                                color: "black",
                                border: "1px solid #E0E0E0",
                            }} onClick={
                                () => saveQuiz(true)
                            }>
                                Save & Publish
                            </button>
                            <button onClick={
                                () => saveQuiz(false)
                            }>
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

export default QuizEditor;