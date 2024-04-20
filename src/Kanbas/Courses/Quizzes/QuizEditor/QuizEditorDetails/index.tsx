import React from "react";
import '../../index.css'
import { FaPlus } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function QuizEditorDetails() {
    return (
        <>
            <div className="">
                <div className="d-flex flex-column gap-4 p-4 pt-0 ">
                    <input type="text" className="input-tags" value={"Unnamed Quiz"} />
                    <textarea className="input-tags" name="" id="" cols={30}
                        rows={5}
                    >
                    </textarea>
                    <div className="quiz-input-grp">
                        <div className="quiz-input-label">
                            Quiz Type
                        </div>
                        <div className="quiz-input-cont">
                            <select name="" id="quiz-select" className="input-tags">
                                <option value="">Practice Quiz</option>
                                <option value="">Graded Quiz</option>
                            </select>
                        </div>
                    </div>
                    <div className="quiz-input-grp">
                        <div className="quiz-input-label">
                            Assignment Group
                        </div>
                        <div className="quiz-input-cont">
                            <select name="" id="" className="input-tags">
                                <option value="">ASSIGNMENT</option>
                                <option value="">QUIZ</option>
                            </select>
                        </div>
                    </div>
                    <div className="quiz-input-grp">
                        <div className="quiz-input-label">
                        </div>
                        <div className="quiz-input-cont">
                            <span>
                                Options
                            </span>
                            <div className="quiz-inner-input-cont">
                                <div className="">
                                    <label htmlFor="">
                                        <input type="checkbox" name="" id="" />
                                        <span>
                                            Shuffle Questions
                                        </span>
                                    </label>
                                </div>
                                <div className="d-flex flex-row align-items-center justify-content-start gap-4">
                                    <label htmlFor="">
                                        <input type="checkbox" name="" id="" />
                                        <span>
                                            Time Limit
                                        </span>
                                    </label>
                                    <label htmlFor="">
                                        <input type="number" name="" id="" className="w-25" />
                                        <span>
                                            Minutes
                                        </span>
                                    </label>
                                </div>
                                <div className="
                                border border-gray-300 p-3 rounded
                                ">
                                    <label htmlFor="">
                                        <input type="checkbox" name="" id="" />
                                        <span>
                                            Allow Multiple Attempts
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="quiz-input-grp">
                        <div className="quiz-input-label">
                        </div>
                        <div className="input-grp">
                            <label>
                                Assign
                            </label>
                            <div className="d-flex flex-column w-100 ">
                                <div className="special-input-box w-100 p-4 ">
                                    <div className="special-input-grp">
                                        <div className="w-100">
                                            <label htmlFor="">
                                                Assign to
                                            </label>
                                            <div className="
                                                    nested-input p-2
                                                    ">
                                                <div className="p-2 py-1 ">
                                                    <span>
                                                        Everyone
                                                    </span>
                                                    <IoCloseSharp />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-100">
                                            <label htmlFor="">
                                                Due
                                            </label>
                                            <input type="date"
                                            // onChange={(e) => {
                                            //     dispatch(setAssignment({
                                            //         ...assignmentNew,
                                            //         due: e.target.value,
                                            //     }));
                                            // }}
                                            />
                                        </div>
                                        <div className="w-100 d-flex gap-2 ">
                                            <div className="w-50">
                                                <label htmlFor="">
                                                    Available From
                                                </label>
                                                <input type="date" value="2023-09-06"
                                                // onChange={(e) => {
                                                //     dispatch(setAssignment({
                                                //         ...assignmentNew,
                                                //         availableFromDate: e.target.value,
                                                //     }));
                                                // }}
                                                />
                                            </div>
                                            <div className="w-50">
                                                <label htmlFor="">
                                                    Until
                                                </label>
                                                <input type="date" value="2023-09-20"
                                                // onChange={(e) => {
                                                //     dispatch(setAssignment({
                                                //         ...assignmentNew,
                                                //         availableUntilDate: e.target.value,
                                                //     }));
                                                // }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button style={{
                                    width: "100%",
                                    backgroundColor: "#f5f5f5",
                                    color: "black",
                                    textAlign: "center",
                                    borderTopLeftRadius: "0%",
                                    borderTopRightRadius: "0%",
                                    border: "1px solid #E0E0E0",
                                    borderTop: "none"
                                }} className="">
                                    <FaPlus />
                                    Add
                                </button>
                            </div>
                        </div>
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

export default QuizEditorDetails;