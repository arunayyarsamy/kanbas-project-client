import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { addAnsweredQuestion } from "../reducer";
import * as client from "../client";
import { find } from "@reduxjs/toolkit/dist/utils";

export function TrueFalseComponent(props: any) {
  const answeredQuestions = useSelector(
    (state: any) => state.quizzesReducer.answeredQuestions
  );
  const currentQuestion = useSelector(
    (state: any) => state.quizzesReducer.question
  );
  const dispatch = useDispatch();

  return (
    <div className="preview-choices w-100">
      {props.choices.map((choice: any, index: any) => {
        return (
          <>
            <hr className="m-0" />
            <label htmlFor="">
              <input
                type="radio"
                name="answer"
                id=""
                value={choice}
                onChange={(e) => {
                  // handleAnswerQuestion(e.target.value);
                }}
                checked={answeredQuestions
                  .find(
                    (answeredQuestion: any) =>
                      answeredQuestion._id === currentQuestion._id
                  )
                  ?.chosenAnswer.includes(choice)}
              />
              <span>{choice}</span>
            </label>
          </>
        );
      })}
    </div>
  );
}

export function FillInTheBlankComponent(props: any) {
  const answeredQuestions = useSelector(
    (state: any) => state.quizzesReducer.answeredQuestions
  );
  const currentQuestion = useSelector(
    (state: any) => state.quizzesReducer.question
  );
  const dispatch = useDispatch();
  const [possibleAnswers, setPossibleAnswers] = useState<any>([]);

  useEffect(() => {
    let possibleAnswers = currentQuestion.choices.map(
      (choice: any, index: any) => {
        return {
          answerIndex: index,
          answer: "",
        };
      }
    );
    setPossibleAnswers(possibleAnswers);
  }, [currentQuestion]);

  return (
    <>
      <div className="preview-choices w-100">
        {props.choices.map((choice: any, index: any) => {
          return (
            <>
              <hr className="m-0" />
              <label
                htmlFor=""
                className="
                                fillintheblank
                                d-flex flex-row justify-content-start align-items-center
                                "
              >
                <span>{index + 1}</span>
                <input
                  type="text"
                  name="answer"
                  id=""
                  value={
                    possibleAnswers.find(
                      (answerObj: any) => answerObj.answerIndex === index
                    )?.answer
                  }
                  onChange={(e) => {
                    // handleAnswerQuestion(e, index);
                  }}
                />
              </label>
            </>
          );
        })}
      </div>
    </>
  );
}

export function MultipleChoiceOptionsComponent(props: any) {
  const answeredQuestions = useSelector(
    (state: any) => state.quizzesReducer.answeredQuestions
  );
  const currentQuestion = useSelector(
    (state: any) => state.quizzesReducer.question
  );
  const dispatch = useDispatch();

  return (
    <div className="preview-choices w-100">
      {props.choices.map((choice: any, index: any) => {
        return (
          <>
            <hr className="m-0" />
            <label htmlFor="">
              <input
                type="radio"
                name="answer"
                id=""
                value={choice}
                onChange={(e) => {
                  // handleAnswerQuestion(e.target.value);
                }}
                checked={answeredQuestions
                  .find(
                    (answeredQuestion: any) =>
                      answeredQuestion._id === currentQuestion._id
                  )
                  ?.chosenAnswer.includes(choice)}
              />
              <span>{choice}</span>
            </label>
          </>
        );
      })}
    </div>
  );
}

function QuizPreviewResult() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courseId, quizId } = useParams();

  const FinalAnswers = useState<any>([]);

  const answeredQuestions = useSelector(
    (state: any) => state.quizzesReducer.answeredQuestions
  );

  const [finalScore, setFinalScore] = useState(0);

  const [chosenResponses, setChosenResponses] = useState<any>({});

  // const [chosenResponses, setChosenResponses] = useState<any>({});
  const [questionResponses, setQuestionResponses] = useState<any[]>([]);
  const [finalAnswers, setFinalAnswers] = useState<any[]>([]);

  // let chosenResponses: any;
  // let questionResponses: any;

  const handleFinalAnswers = () => {
    // chosenResponses :// {"_id":{"$oid":"6629156213ee537db9f61b37"},"quizId":{"$oid":"6622072ef0f53d357cdca33c"},"username":"iron_man","score":{"$numberInt":"14"},"chosenAnswers":[{"_id":"6623e991d450586ae92108ab","chosenAnswer":["Paris"]},{"_id":"662732611806e3a77f662b87","chosenAnswer":["Captain America"]},{"_id":"6627e7900a2775ac5d001d44","chosenAnswer":[]},{"_id":"6628a6b513ee537db9f61905","chosenAnswer":["False"]}],"__v":{"$numberInt":"0"}}
    // questionResponses :// {"_id":{"$oid":"6628a6b513ee537db9f61905"},"title":"true","points":{"$numberInt":"2"},"question":"true","choices":["True","False"],"questionType":"True/False","answer":["True"],"__v":{"$numberInt":"0"}}
    // console.log(chosenResponses);
    // console.log(questionResponses);
    setFinalAnswers(
      questionResponses.map((question: any) => {
        return {
          questionId: question._id,
          question: question.question,
          questionType: question.questionType,
          points: question.points,
          answer: question.answer,
          choices: question.choices,
          chosenAnswer: chosenResponses.chosenAnswers.find(
            (answer: any) => answer._id === question._id
          )?.chosenAnswer,
        };
      })
    );
  };

  useEffect(() => {
    const findChosenResponses = async () => {
      const chosenResponses = await client.findAttemptsForQuiz(quizId);
      console.log(chosenResponses);
      setChosenResponses(chosenResponses);
    };
    findChosenResponses();

    const findQuestions = async () => {
      const questions = await client.findQuestionsForQuiz(quizId);
      console.log(questions);
      setQuestionResponses(questions);
    };

    findQuestions();

    handleFinalAnswers();
  }, []);

  return (
    <>
      <div className="quiz-preview-result-container w-100">
        <div className="quiz-preview-result-header w-100">
          <span>Quiz Results</span>
          <span>{finalScore}</span>
        </div>
      </div>
      <div className="preview-question-container w-75">
        {/* {answeredQuestions.map((question: any, index: any) => {
          return (
            <div className="preview-question w-100">
              <div className="preview-question-header w-100 d-flex flex-row justify-content-between align-items-center">
                <span>{index + 1}</span>
                <span>{question.points}</span>
              </div>
              <div className="preview-question-body w-100">
                <span>{question.question}</span>
                {question.type === "Multiple Choice" ? (
                  <MultipleChoiceOptionsComponent choices={question.choices} />
                ) : question.type === "Fill in the Blank" ? (
                  <FillInTheBlankComponent choices={question.choices} />
                ) : (
                  <TrueFalseComponent choices={question.choices} />
                )}
              </div>
            </div>
          );
        })} */}
        {questionResponses.map((question: any, index: any) => {
          return (
            <div className="preview-question w-100">
              <div className="preview-question-header w-100 d-flex flex-row justify-content-between align-items-center">
                <span>{index + 1}</span>
                <span>
                  correct answer
                  {
                    finalAnswers.find(
                      (answer: any) => answer.questionId === question._id
                    )?.answer
                  }
                </span>
              </div>
              <div className="">
                Chosen Answer:
                {question.questionType !== "Fill in the blank"
                  ? (finalAnswers.find(
                      (answer: any) => answer.questionId === question._id
                    )?.chosenAnswer[0])
                  : (
                    "hello"
                    // finalAnswers.find(
                    //   (answer: any) => answer.questionId === question._id
                    // )?.map((ans:any) => {
                    //     <h2>{ans}</h2>
                    // })
                    )}
              </div>
              {/* <div className="">
                            Chosen Answer: {
                                qu
                            }
                        </div> */}
              {/* <div className="preview-question-body w-100">
                            <span>{question.question}</span>
                            {question.questionType === "Multiple Choice" ? (
                                <MultipleChoiceOptionsComponent choices={question.choices} />
                            ) : question.questionType === "Fill in the Blank" ? (
                                <FillInTheBlankComponent choices={question.choices} />
                            ) : (
                                <TrueFalseComponent choices={question.choices} />
                            )}
                        </div> */}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default QuizPreviewResult;
