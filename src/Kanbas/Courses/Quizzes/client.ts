import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}/api/courses`;
const QUIZZES_API = `${API_BASE}/api/quizzes`;

export const deleteQuiz = async (quizId: any) => {
  const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const createQuiz = async (courseId: any, quiz: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/quizzes`, quiz
  );
  return response.data;
};

export const findQuizzesForCourse = async (courseId: any) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};

export const updateQuiz = async (quiz: any) => {
  const response = await axios.put(
    `${QUIZZES_API}/${quiz._id}`,
    quiz
  );
  return response.data;
};

export const findQuizById = async (quizId: any) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
}

export const findQuestionsForQuiz = async (quizId: any) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
  return response.data;
}

export const findQuestionById = async (quizId:any, questionId: any) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/questions/${questionId}`);
  return response.data;
}

export const createQuestion = async (quizId: any, question: any) => {
  const response = await axios.post(`${QUIZZES_API}/${quizId}/questions`, question);
  return response.data;
}

export const updateQuestion = async (quizId: any, question: any) => {
  const response = await axios.put(`${QUIZZES_API}/${quizId}/questions/${question._id}`, question);
  return response.data;
}

export const deleteQuestion = async (questionId: any, quizId: any) => {
  const response = await axios.delete(`${QUIZZES_API}/${quizId}/questions/${questionId}`);
  return response.data;
}