import React, { useEffect } from "react";
import QuizEditorDetails from "./QuizEditorDetails";
import QuizEditorQuestion from "./QuizEditorQuestion";
import { FaEllipsisV } from "react-icons/fa";
import '../index.css'
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import * as client from "../client";
import { setQuiz, setQuestions } from "../reducer";

// {"_id":{"$oid":"6622072ef0f53d357cdca334"},"name":"Quiz 1","courseId":"RS101","description":"This is a quiz","quizType":"Graded Quiz","points":{"$numberInt":"10"},"assignmentGroup":"Quizzes","shuffleAnswers":"Yes","timeLimit":{"$numberInt":"20"},"multipleAttempts":"No","showCorrectAnswers":"No","accessCode":"","oneQuestionAtATime":"Yes","webcamRequired":"No","lockQuestionsAfterAnswering":"No","dueDate":"2021-12-31T23:59:59.999Z","availableDate":"2021-12-01T00:00:00.000Z","untilDate":"2021-12-31T23:59:59.999Z","published":true,"questions":[{"$oid":"6625421ba499f29a7a4734a5"}],"__v":{"$numberInt":"1"}}

function QuizEditor() {

    const { quizId } = useParams();

    const dispatch = useDispatch();
    
    const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

    useEffect(() => {
        if (quizId === "newQuiz") {
            dispatch(setQuiz({
                accessCode: "",
                assignmentGroup: "",
                availableDate: "",
                courseId: "",
                description: "",
                dueDate: "",
                lockQuestionsAfterAnswering: "",
                multipleAttempts: "",
                name: "",
                oneQuestionAtATime: "",
                points: "",
                published: "",
                questions: [],
                quizType: "",
                showCorrectAnswers: "",
                shuffleAnswers: "",
                timeLimit: "",
                untilDate: "",
                webcamRequired: "",
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

    return (
        <>
            <div className="d-flex flex-column gap-4 ">
                <div className="d-flex flex-row gap-4 align-self-end justify-content-center align-items-center ">
                    <div className="PointsStatus">
                        <span>
                            Points: 0
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
            </div>
        </>
    )
}

export default QuizEditor;