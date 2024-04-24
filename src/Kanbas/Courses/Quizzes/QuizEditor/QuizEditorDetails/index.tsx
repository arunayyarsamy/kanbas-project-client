import React, { useEffect, useState } from "react";
import "../../index.css";
import { FaPlus } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { setQuiz } from "../../reducer";
import * as client from "../../client";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router-dom";

function QuizEditorDetails(quizId: any) {

  const { courseId } = useParams();
  const dispatch = useDispatch();

  const currentQuiz = useSelector((state: any) => state.quizzesReducer.quiz);

  const [showQuizContextMenu, setShowQuizContextMenu] = useState(false);

  const navigate = useNavigate();

  const assignmentGroupOptions = ["Assignments", "Quizzes", "Exams", "Project"];
  const quizTypeOptions = [
    "Practice Quiz",
    "Graded Quiz",
    "Graded Survey",
    "Ungraded Survey",
  ];

  const formatDate = (date: any) => {
    if (date === "") {
      return "";
    }
    return new Date(date).toISOString().split("T")[0];
  };

  const checkNewQuiz = () => {
    if (quizId === "newQuiz") {
      setShowQuizContextMenu(true);
    }
    return false;
  };

  return (
    <>
      <div
        className={`popupwindow ${showQuizContextMenu ? "d-flex" : "d-none"}`}
      >
        <div className="popupbox-container">
          <h5>
            Please save the basic quiz information before adding questions.
          </h5>
          <button>Save & Continue</button>
        </div>
      </div>
      <div className="">
        <div className="d-flex flex-column gap-4 p-4 pt-0 ">
          <input
            type="text"
            className="input-tags"
            value={currentQuiz.name}
            onChange={(e) => {
              dispatch(
                setQuiz({
                  ...currentQuiz,
                  name: e.target.value,
                })
              );
            }}
          />
          <Editor
                apiKey="9cwhor0h9kuvm0z028tcchgsf8v7mi7f3r2fh16a89rtp1z5"
                init={{
                  plugins:
                    "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
                  toolbar:
                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                  tinycomments_mode: "embedded",
                  tinycomments_author: "Author name",
                  mergetags_list: [
                    { value: "First.Name", title: "First Name" },
                    { value: "Email", title: "Email" },
                  ],
                }}
                value={currentQuiz.description}
                onEditorChange={(content: any, editor: any) => {
                  const plaintext = editor.getContent({ format: "text" });
                  dispatch(
                    setQuiz({
                      ...currentQuiz,
                      description: plaintext,
                    })
                  );
                }}
              />
          <div className="quiz-input-grp">
            <div className="quiz-input-label">Quiz Type</div>
            <div className="quiz-input-cont">
              <select
                name=""
                id="quiz-select"
                className="form-select"
                value={currentQuiz.quizType}
                onChange={(e) => {
                  dispatch(
                    setQuiz({
                      ...currentQuiz,
                      quizType: e.target.value,
                    })
                  );
                }}
              >
                {quizTypeOptions.map((quizType) => {
                  return (
                    <option
                      selected={
                        currentQuiz.quizType === quizType ? true : false
                      }
                      key={quizType}
                      value={quizType}
                    >
                      {quizType}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="quiz-input-grp">
            <div className="quiz-input-label">Points</div>
            <div className="quiz-input-cont">
              <input
                type="number"
                className="input-tags w-25 "
                value={currentQuiz.points}
                onChange={(e) => {
                  dispatch(
                    setQuiz({
                      ...currentQuiz,
                      points: e.target.value,
                    })
                  );
                }}
                min={0}
                max={100}
              />
            </div>
          </div>
          <div className="quiz-input-grp">
            <div className="quiz-input-label">Assignment Group</div>
            <div className="quiz-input-cont">
              <select
                name=""
                id=""
                className="input-tags form-select"
                onChange={(e) => {
                  dispatch(
                    setQuiz({
                      ...currentQuiz,
                      assignmentGroup: e.target.value,
                    })
                  );
                }}
              >
                {assignmentGroupOptions.map((assignmentGroup) => {
                  return (
                    <option
                      selected={
                        currentQuiz.assignmentGroup === assignmentGroup
                          ? true
                          : false
                      }
                      key={assignmentGroup}
                      value={assignmentGroup}
                    >
                      {assignmentGroup}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="quiz-input-grp">
            <div className="quiz-input-label"></div>
            <div className="quiz-input-cont">
              <span>Options</span>
              <br />
              <br />
              <div className="quiz-inner-input-cont">
                <div className="">
                  <label htmlFor="">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      checked={
                        currentQuiz.shuffleAnswers === "Yes" ? true : false
                      }
                      onChange={(e) => {
                        dispatch(
                          setQuiz({
                            ...currentQuiz,
                            shuffleAnswers: e.target.checked ? "Yes" : "No",
                          })
                        );
                      }}
                    />
                    <span>Shuffle Answers</span>
                  </label>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-start gap-4">
                  <label htmlFor="">
                    <input type="checkbox" name="
                    timeLimit
                    " id="" />
                    <span>Time Limit</span>
                  </label>
                  <label htmlFor="">
                    <input
                      type="number"
                      name=""
                      id=""
                      className="w-25"
                      value={currentQuiz.timeLimit}
                      onChange={(e) => {
                        dispatch(
                          setQuiz({
                            ...currentQuiz,
                            timeLimit: e.target.value,
                          })
                        );
                      }}
                      min={0}
                      max={240}
                    />
                    <span>Minutes</span>
                  </label>
                </div>
                <div className="border border-gray-300 p-3 rounded d-flex flex-row align-items-center  gap-4">
                  <label htmlFor="">
                    <input
                      type="checkbox"
                      name="multipleAttempts"
                      id=""
                      checked={
                        currentQuiz.multipleAttempts === "Yes" ? true : false
                      }
                      onChange={(e) => {
                        dispatch(
                          setQuiz({
                            ...currentQuiz,
                            multipleAttempts: e.target.checked ? "Yes" : "No",
                          })
                        );
                      }}
                    />
                    <span>Allow Multiple Attempts</span>
                  </label>
                  <input type="number" min={0} max={240} disabled={
                    currentQuiz.multipleAttempts === "Yes" ? false : true
                  }/>
                </div>
                <div className="">
                  <label htmlFor="">
                    <input
                      type="checkbox"
                      name="showCorrectAnswers"
                      id="showCorrectAnswers"
                      checked={
                        currentQuiz.showCorrectAnswers === "Yes" ? true : false
                      }
                      onChange={(e) => {
                        dispatch(
                          setQuiz({
                            ...currentQuiz,
                            showCorrectAnswers: e.target.checked ? "Yes" : "No",
                          })
                        );
                      }}
                    />
                    <span>Show Correct Answers</span>
                  </label>
                </div>
                <div className="">
                  <label htmlFor="">
                    <span> Access Code</span>
                    <div className="quiz-input-cont">
                      <input
                        type="number"
                        name="accessCode"
                        id="accessCode"
                        value={currentQuiz.accessCode}
                        onChange={(e) => {
                          dispatch(
                            setQuiz({
                              ...currentQuiz,
                              accessCode: e.target.value,
                            })
                          );
                        }}
                        min={0}
                        max={9999}
                      />
                    </div>
                  </label>
                </div>
                <div className="">
                  <label htmlFor="">
                    <input
                      type="checkbox"
                      name="oneQuestionAtATime"
                      id="oneQuestionAtATime"
                      checked={
                        currentQuiz.oneQuestionAtATime === "Yes" ? true : false
                      }
                      onChange={(e) => {
                        dispatch(
                          setQuiz({
                            ...currentQuiz,
                            oneQuestionAtATime: e.target.checked ? "Yes" : "No",
                          })
                        );
                      }}
                    />
                    <span>One Question at a Time</span>
                  </label>
                </div>
                <div className="">
                  <label htmlFor="webCamRequired">
                    <input
                      type="checkbox"
                      name="webCamRequired"
                      id="webCamRequired"
                      checked={
                        currentQuiz.webCamRequired === "Yes" ? true : false
                      }
                      onChange={(e) => {
                        dispatch(
                          setQuiz({
                            ...currentQuiz,
                            webCamRequired: e.target.checked ? "Yes" : "No",
                          })
                        );
                      }}
                    />
                    <span>Web Cam Required</span>
                  </label>
                </div>
                <div className="">
                  <label htmlFor="lockQuestionsAfterAnswering">
                    <input
                      type="checkbox"
                      name="lockQuestionsAfterAnswering"
                      id="lockQuestionsAfterAnswering"
                      checked={
                        currentQuiz.lockQuestionsAfterAnswering === "Yes"
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        dispatch(
                          setQuiz({
                            ...currentQuiz,
                            lockQuestionsAfterAnswering: e.target.checked
                              ? "Yes"
                              : "No",
                          })
                        );
                      }}
                    />
                    <span>Lock Questions After Answering</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="quiz-input-grp">
            <div className="quiz-input-label"></div>
            <div className="input-grp">
              <label>Assign</label>
              <div className="d-flex flex-column w-100 ">
                <div className="special-input-box w-100 p-4 ">
                  <div className="special-input-grp">
                    <div className="w-100">
                      <label htmlFor="">Assign to</label>
                      <div
                        className="
                                                    nested-input p-2
                                                    "
                      >
                        <div className="p-2 py-1 ">
                          <span>Everyone</span>
                          <IoCloseSharp />
                        </div>
                      </div>
                    </div>
                    <div className="w-100">
                      <label htmlFor="">Due</label>
                      <input
                        type="date"
                        value={formatDate(currentQuiz.dueDate)}
                        onChange={(e) => {
                          dispatch(
                            setQuiz({
                              ...currentQuiz,
                              dueDate: e.target.value,
                            })
                          );
                        }}
                      />
                    </div>
                    <div className="w-100 d-flex gap-2 ">
                      <div className="w-50">
                        <label htmlFor="">Available From</label>
                        <input
                          type="date"
                          value={formatDate(currentQuiz.availableDate)}
                          onChange={(e) => {
                            dispatch(
                              setQuiz({
                                ...currentQuiz,
                                availableDate: e.target.value,
                              })
                            );
                          }}
                        />
                      </div>
                      <div className="w-50">
                        <label htmlFor="">Until</label>
                        <input
                          type="date"
                          value={formatDate(currentQuiz.untilDate)}
                          onChange={(e) => {
                            dispatch(
                              setQuiz({
                                ...currentQuiz,
                                untilDate: e.target.value,
                              })
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  style={{
                    width: "100%",
                    backgroundColor: "#f5f5f5",
                    color: "black",
                    textAlign: "center",
                    borderTopLeftRadius: "0%",
                    borderTopRightRadius: "0%",
                    border: "1px solid #E0E0E0",
                    borderTop: "none",
                  }}
                  className=""
                >
                  <FaPlus />
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizEditorDetails;
