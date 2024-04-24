import React, { useEffect } from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import "../../../index.css";
import { Navigate, useNavigate, useParams } from "react-router";
import { Editor } from "@tinymce/tinymce-react";
import { idText } from "typescript";
import * as client from "../../../client";
import { useDispatch, useSelector } from "react-redux";
import { setQuestion } from "../../../reducer";

export const PossibleAnswer = ({
  index,
  answer,
  onChange,
  onDelete,
}: {
  index: any;
  answer: any;
  onChange: any;
  onDelete: any;
}) => {
  return (
    <div className="possible-answer quiz-input-grp">
      <label htmlFor="" className="input-grp">
        <span className="text-danger">Possible Answer</span>
        <input
          type="text"
          value={answer}
          onChange={(e) => onChange(index, e.target.value)}
        />
      </label>
      <button
        onClick={() => onDelete(index)}
        className="
                d-flex
                align-items-center
                justify-content-center
                btn
                btn-danger
            "
      >
        Delete
      </button>
    </div>
  );
};

export const FillInTheBlanks = ({
  index,
  answer,
  onChange,
  onDelete,
}: {
  index: any;
  answer: any;
  onChange: any;
  onDelete: any;
}) => {
  return (
    <div className="possible-answer quiz-input-grp">
      <label htmlFor="" className="input-grp">
        <span className="text-danger">{index + 1}</span>
        <input
          type="text"
          value={answer}
          onChange={(e) => onChange(index, e.target.value)}
        />
      </label>
      <button
        onClick={() => onDelete(index)}
        className="
                d-flex
                align-items-center
                justify-content-center
                btn
                btn-danger
            "
      >
        Delete
      </button>
    </div>
  );
};

export const TrueFalse = ({
  index,
  answer,
  onChange,
}: {
  index: any;
  answer: any;
  onChange: any;
}) => {
  return (
    <div className="possible-answer quiz-input-grp d-flex flex-column gap-4 ">
      <label htmlFor="" className="input-grp">
        <input
          type="radio"
          value={"True"}
          onChange={(e) => onChange(index, e.target.value)}
          name="truefalse"
          // className="w-25"
          style={{
            width: "10%",
          }}
        />
        <span className="text-success">True</span>
      </label>
      <label htmlFor="" className="input-grp">
        <input
          type="radio"
          value={"False"}
          onChange={(e) => onChange(index, e.target.value)}
          name="truefalse"
          // className="w-25"
          style={{
            width: "10%",
          }}
        />
        <span className="text-danger">False</span>
      </label>
    </div>
  );
};

function NewQuestion() {
  const { courseId } = useParams<{ courseId: string }>();
  const { quizId } = useParams<{ quizId: string }>();
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [newQuestion, setNewQuestion] = useState({
    _id: "",
    title: "new Ques",
    points: "0",
    question: "",
    choices: [] as string[],
    questionType: "Multiple Choice",
    answer: [] as string[],
    possibleAnswers: [] as { id: string; answer: string }[],
  });

  const [possibleAnswersLen, setPossibleAnswersLen] = useState(0);
  const [possibleAnswersLimit, setPossibleAnswersLimit] = useState(0);

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
    if (questionId === "newQuestion") {
      setNewQuestion({
        _id: "",
        title: "",
        points: "0",
        question: "",
        choices: [] as string[],
        questionType: "",
        answer: [] as string[],
        possibleAnswers: [] as { id: string; answer: string }[],
      });
    } else {
      client.findQuestionById(quizId, questionId).then((question) => {
        setNewQuestion({
          ...question,
          possibleAnswers: question.choices
            .filter((choice: string) => choice !== question.answer[0])
            .map((choice: string) => ({
              id: `answer_${choice}`,
              answer: choice,
            })),
        });
      });
    }
  }, []);

  useEffect(() => {
    if (newQuestion.questionType === "Multiple Choice") {
      setPossibleAnswersLimit(3);
      setPossibleAnswersLen(0);
    } else if (newQuestion.questionType === "True/False") {
      setPossibleAnswersLimit(1);
      setPossibleAnswersLen(0);
    } else if (newQuestion.questionType === "Fill in the Blank") {
      setPossibleAnswersLimit(100);
      setPossibleAnswersLen(0);
    } else {
      setPossibleAnswersLimit(0);
      setPossibleAnswersLen(0);
    }
    newQuestion.choices = [];
    newQuestion.possibleAnswers = [];
  }, [newQuestion.questionType]);

  const handlePossibleAnswerChange = (index: any, value: any) => {
    const updatedPossibleAnswers = [...newQuestion.possibleAnswers];
    updatedPossibleAnswers[index].answer = value;
    setNewQuestion({ ...newQuestion, possibleAnswers: updatedPossibleAnswers });
  };

  const handleDeletePossibleAnswer = (index: any) => {
    const updatedPossibleAnswers = [...newQuestion.possibleAnswers];
    updatedPossibleAnswers.splice(index, 1);
    setNewQuestion({ ...newQuestion, possibleAnswers: updatedPossibleAnswers });
    setPossibleAnswersLen(possibleAnswersLen - 1);
  };

  const handleAddPossibleAnswer = () => {
    if (possibleAnswersLen < possibleAnswersLimit) {
      setNewQuestion((prevState) => ({
        ...prevState,
        possibleAnswers: [
          ...prevState.possibleAnswers,
          { id: `answer_${prevState.possibleAnswers.length}`, answer: "" },
        ],
      }));
      setPossibleAnswersLen(possibleAnswersLen + 1);
    }
  };

  const saveQuestion = (finalQuestion: any) => {
    console.log("newQuestion", finalQuestion);
    if (questionId === "newQuestion") {
      client.createQuestion(quizId, finalQuestion).then((question) => {
        setNewQuestion(question);
      });
    } else {
      client.updateQuestion(quizId, finalQuestion).then((question) => {
        setNewQuestion(question);
      });
    }
    navigate(`/kanbas/courses/${courseId}/quizzes/${quizId}/editor`);
  };

  const getFinalQuestion = () => {
    if (newQuestion.points === "0") {
      alert("Please provide points");
      return;
    }
    if (newQuestion.question === "") {
      alert("Please provide question");
      return;
    }
    // if (newQuestion.answer.length === 0) {
    //   alert("Please provide answer");
    //   return;
    // }
    if (
      newQuestion.questionType === "Multiple Choice" &&
      newQuestion.possibleAnswers.length < 2
    ) {
      alert("Please provide atleast 2 possible answers");
      return;
    }
    if (
      newQuestion.questionType === "Fill in the Blank" &&
      newQuestion.possibleAnswers.length === 0
    ) {
      alert("Please provide atleast 1 possible answer");
      return;
    }
    if (newQuestion.title === "") {
      alert("Please provide title");
      return;
    }

    if (newQuestion.questionType === "Multiple Choice") {
      const possibleAnswers1 = newQuestion.possibleAnswers.map(
        (possibleAnswer) => possibleAnswer.answer
      );
      const finalChoices = [...possibleAnswers1, ...newQuestion.answer];
      const shuffledChoices = finalChoices.sort(() => Math.random() - 0.5);
      const finalQuestion = {
        ...newQuestion,
        choices: shuffledChoices,
        possibleAnswers: [],
      };
      saveQuestion(finalQuestion);
    } else if (newQuestion.questionType === "True/False") {
      const finalQuestion = {
        ...newQuestion,
        choices: ["True", "False"],
        possibleAnswers: [],
      };
      saveQuestion(finalQuestion);
    } else if (newQuestion.questionType === "Fill in the Blank") {
      const possibleAnswers1 = newQuestion.possibleAnswers.map(
        (possibleAnswer) => possibleAnswer.answer
      );
      const finalQuestion = {
        ...newQuestion,
        answer: possibleAnswers1,
        choices: possibleAnswers1,
        possibleAnswers: [],
      };
      saveQuestion(finalQuestion);
    }
  };

  const question = newQuestion.question;

  return (
    <>
      <div className="d-flex flex-column gap-3 newQuestion-main-grp">
        <div className="d-flex flex-row justify-content-between align-items-center gap-4 ">
          <div className="d-flex flex-row justify-content-start align-items-center gap-4">
            <div className="input-grp">
              <input
                type="text"
                value={newQuestion.title}
                className="form-control"
                onChange={(e) => {
                  setNewQuestion({
                    ...newQuestion,
                    title: e.target.value,
                  });
                }}
              />
            </div>
            <div className="input-grp">
              <select
                name=""
                id=""
                onChange={(e) => {
                  setNewQuestion({
                    ...newQuestion,
                    questionType: e.target.value,
                  });
                }}
                value={newQuestion.questionType}
                className="w-100"
              >
                <option value="Multiple Choice" defaultChecked>
                  Multiple Choice
                </option>
                <option value="True/False">True/False</option>
                <option value="Fill in the Blank">Fill in the Blank</option>
              </select>
            </div>
          </div>
          <div className="input-grp d-flex gap-2 align-items-center ">
            <span>pts: </span>
            <input
              type="text"
              value={newQuestion.points}
              className="form-control"
              onChange={(e) => {
                console.log(e.target.value);
                setNewQuestion({
                  ...newQuestion,
                  points: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <hr />
        <div className="d-flex flex-column gap-4">
          <span className="question-message">
            Enter your question and multiple answers, then select the one
            correct answer.
          </span>
          <div className="newquestion-body d-flex flex-column gap-4 ">
            <div className="newquestion-question-container d-flex flex-column gap-2 ">
              <label htmlFor="" className="newQuestion-heading">
                Question:
              </label>
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
                value={newQuestion.question}
                onEditorChange={(content, editor) => {
                  const plaintext = editor.getContent({ format: "text" });
                  setNewQuestion({
                    ...newQuestion,
                    question: plaintext,
                  });
                }}
              />
            </div>
            <div className="newquestion-answers-grp-container">
              <h6 className="newQuestion-heading">Answers:</h6>
              <div className="newquestion-answer-container d-flex flex-column gap-4">
                {newQuestion.questionType === "Multiple Choice" ? (
                  <div className="correct-answer quiz-input-grp">
                    <label htmlFor="" className="">
                      <span className="text-success">Correct Answer</span>
                      <input
                        type="text"
                        name=""
                        id=""
                        value={newQuestion.answer[0]}
                        onChange={(e) => {
                          setNewQuestion({
                            ...newQuestion,
                            answer: [e.target.value],
                          });
                        }}
                      />
                    </label>
                  </div>
                ) : null}
                {newQuestion.questionType === "Fill in the Blank"
                  ? newQuestion.possibleAnswers.map((possibleAnswer, index) => (
                    <FillInTheBlanks
                      key={possibleAnswer.id}
                      index={index}
                      answer={possibleAnswer.answer}
                      onChange={handlePossibleAnswerChange}
                      onDelete={handleDeletePossibleAnswer}
                    />
                  ))
                  : null}
                {newQuestion.questionType === "Multiple Choice"
                  ? newQuestion.possibleAnswers.map((possibleAnswer, index) => (
                    <PossibleAnswer
                      key={possibleAnswer.id}
                      index={index}
                      answer={possibleAnswer.answer}
                      onChange={handlePossibleAnswerChange}
                      onDelete={handleDeletePossibleAnswer}
                    />
                  ))
                  : null}
                {newQuestion.questionType === "True/False" ? (
                  <TrueFalse
                    key={newQuestion.answer[0]}
                    index={0}
                    answer={newQuestion.answer[0]}
                    onChange={(index: any, value: any) => {
                      setNewQuestion({
                        ...newQuestion,
                        answer: [value],
                      });
                    }}
                  />
                ) : null}
              </div>
            </div>
          </div>
          {newQuestion.questionType !== "True/False" ? (
            <div className="newQuestionButtonContainer">
              <button
                disabled={possibleAnswersLen === possibleAnswersLimit}
                onClick={() => handleAddPossibleAnswer()}
              >
                <FaPlus />
                Add Another Answer
              </button>
            </div>
          ) : null}
        </div>
        <div
          className="submission-button-grp
                        d-flex gap-3
                        "
        >
          <button onClick={
            () => {
              navigate(`/kanbas/courses/${courseId}/quizzes/${quizId}/editor`);
            }
          }>
            Cancel
          </button>
          <button
            onClick={() => {
              getFinalQuestion();
            }}
          >
            Update Question
          </button>
        </div>
      </div>
    </>
  );
}

export default NewQuestion;