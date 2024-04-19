import React from "react";
import QuizEditorDetails from "./QuizEditorDetails";
import QuizEditorQuestion from "./QuizEditorQuestion";
import { FaEllipsisV } from "react-icons/fa";
import '../index.css'

function QuizEditor() {
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
                <div className="">
                    <QuizEditorDetails />
                </div>
            </div>
            {/* <QuizEditorQuestion /> */}
        </>
    )
}

export default QuizEditor;