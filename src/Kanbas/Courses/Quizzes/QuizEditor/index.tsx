import React from "react";
import QuizEditorDetails from "./QuizEditorDetails";
import QuizEditorQuestion from "./QuizEditorQuestion";
import { FaEllipsisV } from "react-icons/fa";
import '../index.css'
import { useParams } from "react-router";

function QuizEditor() {

    const { quizId } = useParams();
    
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