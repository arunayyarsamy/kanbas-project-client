import React, { useEffect } from "react";
import { FaEllipsisV, FaCheckCircle, FaPencilAlt } from "react-icons/fa";
import "../index.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import * as client from "../client";
import { AiOutlineStop } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function QuizDetails() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = React.useState({} as any);
  const navigate = useNavigate();

  useEffect(() => {
    client.findQuizById(quizId).then((quiz) => {
      setQuiz(quiz);
    });
  }, []);

  return (
    <>
      <div className="details-button-grp float-end d-flex gap-3">
        {quiz.published ? (
          <>
            <button
              onClick={() => {
                client.publishQuiz(quizId, false).then(() => {
                  setQuiz({ ...quiz, published: false });
                });
              }}
            >
              <FaCheckCircle style={{ color: "green" }} />
              Published
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                client.publishQuiz(quizId, true).then(() => {
                  setQuiz({ ...quiz, published: true });
                });
              }}
            >
              <AiOutlineStop style={{ color: "red" }} />
              Unpublished
            </button>
          </>
        )}
        <button onClick={
          () => {
            navigate(`/Kanbas/courses/${quiz.courseId}/Quizzes/${quizId}/preview`);
          }
        }>
          Preview
        </button>
        <button>
          <FaPencilAlt />
          Edit
        </button>
        <button>
          <FaEllipsisV />
        </button>
      </div>
      <br />
      <br />
      <hr />
      <div className="quiz-details-main-container px-5 ">
        <h1>{quiz.name}</h1>
        <div className="d-flex flex-column gap-4 w-100 mt-4">
          <div className="quiz-details d-flex w-50 flex-column gap-2">
            <div className="quiz-field">
              <div className="quiz-label">Quiz Type</div>
              <div className="quiz-value">{quiz.quizType}</div>
            </div>
            <div className="quiz-field">
              <div className="quiz-label">Points</div>
              <div className="quiz-value">{quiz.points}</div>
            </div>
            <div className="quiz-field">
              <div className="quiz-label">Assignment Group</div>
              <div className="quiz-value">{quiz.assignmentGroup}</div>
            </div>
            <div className="quiz-field">
              <div className="quiz-label">Shuffle Answers</div>
              <div className="quiz-value">{quiz.shuffleAnswers}</div>
            </div>
            <div className="quiz-field">
              <div className="quiz-label">Time Limit</div>
              <div className="quiz-value">{quiz.timeLimit} minutes</div>
            </div>
            <div className="quiz-field">
              <div className="quiz-label">Multiple Attempts</div>
              <div className="quiz-value">{quiz.multipleAttempts}</div>
            </div>
            <div className="quiz-field">
              <div className="quiz-label">View Response</div>
              <div className="quiz-value">Always</div>
            </div>
            <div className="quiz-field">
              <div className="quiz-label">Show Correct Answers</div>
              <div className="quiz-value">{quiz.showCorrectAnswers}</div>
            </div>
            <div className="quiz-field">
              <div className="quiz-label">Access Code</div>
              <div className="quiz-value">{quiz.accessCode}</div>
            </div>
            <div className="quiz-field">
              <div className="quiz-label">One Question at a Time</div>
              <div className="quiz-value">{quiz.oneQuestionAtATime}</div>
            </div>
            <div className="quiz-field">
              <div className="quiz-label">
                Require Respondus LockDown Browser
              </div>
              <div className="quiz-value">
                {quiz.lockQuestionsAfterAnswering}
              </div>
            </div>
            <div className="quiz-field">
              <div className="quiz-label">Required to View Quiz Results</div>
              <div className="quiz-value">No</div>
            </div>
            <div className="quiz-field">
              <div className="quiz-label">Webcam Required</div>
              <div className="quiz-value">{quiz.webcamRequired}</div>
            </div>
            <div className="quiz-field">
              <div className="quiz-label">Lock Questions After Answering</div>
              <div className="quiz-value">
                {quiz.lockQuestionsAfterAnswering}
              </div>
            </div>
          </div>
          <div className="quiz-details-table mt-4 ">
            {/* Due, For, Available from, Until */}
            {/* Borderless Table, top and bottom border for table body row */}
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th>Due</th>
                  <th>For</th>
                  <th>Available from</th>
                  <th>Until</th>
                </tr>
              </thead>
              <tbody
                className="
                        border-top border-bottom                       
                        "
              >
                <tr>
                  <td>{new Date(quiz.dueDate).toDateString()}</td>
                  <td>Everyone</td>
                  <td>{new Date(quiz.availableDate).toDateString()}</td>
                  <td>{new Date(quiz.untilDate).toDateString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizDetails;
