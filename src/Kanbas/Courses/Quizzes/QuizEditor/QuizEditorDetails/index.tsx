import React from "react";
import '../../index.css'

function QuizEditorDetails() {
    return (
        <>
            <div className="d-flex flex-column gap-4">
                <input type="text" value={"Unnamed Quiz"} className="w-50" />
                <div className="quizEditor-main-input-grp">
                    <label>Instructions</label>
                    <textarea></textarea>
                </div>
                <div className="">
                    <div className="input-label-grps d-flex flex-column gap-2 ">
                        <div className="input-grp">
                            <label htmlFor="points">
                                Quiz Type
                            </label>
                            {/* <input type="number" name="points" id="points" /> */}
                            <select name="" id="">
                                <option value="Graded Quiz">Graded Quiz</option>
                                <option value="Practice Quiz">Practice Quiz</option>
                            </select>
                        </div>
                        <div className="input-grp">
                            <label>
                                Assignment Group
                            </label>
                            {/* <input type="number" name="points" id="points" /> */}
                            <select name="" id="">
                                <option value="Quizzes">Quizzes</option>
                                <option value="Assignments">Assignments</option>
                                <option value="Discussions">Discussions</option>
                            </select>
                        </div>
                        <div className="input-grp">
                            <label>
                            </label>
                            {/* <input type="number" name="points" id="points" /> */}
                            <div className="quiz-options d-flex flex-column ">
                                <div className="quiz-option">
                                    <label htmlFor="" className="w-100">
                                        <input type="checkbox" name="" id="" className=""/>
                                        Shuffle Answers
                                    </label>
                                </div>
                                <div className="d-flex flex-row ">
                                    <div className="quiz-option">
                                        <label htmlFor="" className="w-100">
                                            <input type="checkbox" name="" id="" className="w-100" />
                                            Time Limit
                                        </label>
                                    </div>
                                    <div className="quiz-option">
                                        <input type="number" />
                                        <label htmlFor="">Minutes</label>
                                    </div>
                                </div>
                                <div className="quiz-option">
                                    <label htmlFor="" className="w-100">
                                        <input type="checkbox" name="" id="" />
                                        Multiple Attempts
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="quizEditor-input-grp">
                        <div className="quizEditor-details-label">
                            Quiz Type
                        </div>
                        <div className="quizEditor-details-value">
                            <select name="" id="">
                                <option value="Graded Quiz">Graded Quiz</option>
                                <option value="Practice Quiz">Practice Quiz</option>
                            </select>
                        </div>
                    </div>
                    <div className="quizEditor-input-grp">
                        
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default QuizEditorDetails;