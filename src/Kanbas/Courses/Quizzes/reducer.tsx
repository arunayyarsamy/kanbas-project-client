import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizzes: [],
    quiz: {
        accessCode: "",
        assignmentGroup: "Quizzes",
        availableDate: "",
        courseId: "",
        description: "",
        dueDate: "",
        lockQuestionsAfterAnswering: "No",
        multipleAttempts: "No",
        name: "",
        oneQuestionAtATime: "Yes",
        points: "0",
        published: "",
        questions: [],
        quizType: "Graded Quiz",
        showCorrectAnswers: "No",
        shuffleAnswers: "Yes",
        timeLimit: "",
        untilDate: "",
        webcamRequired: "No",
        _id: "",
    },
    questions: [],
    question: {
        _id: "",
        title: "",
        points: "0",
        question: "",
        choices: [] as string[],
        questionType: "",
        answer: [] as string[],
        possibleAnswers: [] as { id: string, answer: string }[]
    },
    answeredQuestions: [],
};

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        },
        addQuiz: (state, action) => {
            state.quizzes = [action.payload, ...state.quizzes] as typeof state.quizzes;
        },
        deleteQuiz: (state, action) => {
            state.quizzes = state.quizzes.filter(
                (quiz: any) => quiz._id !== action.payload
            );
        },
        // updateQuiz: (state, action) => {
        //     state.quizzes = state.quizzes.map((quiz: any) => { // Add type annotation for 'quiz'
        //         if (quiz._id === action.payload._id) {
        //             return action.payload;
        //         } else {
        //             return quiz;
        //         }
        //     });
        // },
        setQuiz: (state, action) => {
            state.quiz = action.payload;
        },

        setQuestions: (state, action) => {
            state.questions = action.payload;
        },

        updateQuestions: (state, action) => {
            state.questions = state.questions.map((question: any) => { // Add type annotation for 'question'
                if (question._id === action.payload._id) {
                    return action.payload;
                } else {
                    return question;
                }
            }) as typeof state.questions;
        },

        addQuestion: (state, action) => {
            state.questions = [...state.questions, action.payload,] as typeof state.questions;
        },

        deleteQuestion: (state, action) => {
            state.questions = state.questions.filter(
                (question: any) => question._id !== action.payload
            );
        },

        setQuestion: (state, action) => {
            state.question = action.payload;
        },

        setQuestionFromId: (state, action) => {

            let question = state.questions.filter(
                (question: any) => question._id === action.payload
            );

            state.question = question[0];

        },

        updateQuestion: (state, action) => {
            state.question = action.payload;
        },

        addAnsweredQuestion: (state, action) => {
            state.answeredQuestions = [...state.answeredQuestions, action.payload] as typeof state.answeredQuestions;
        },

    },
});

export const { addQuiz, deleteQuiz, setQuiz, setQuizzes
    , setQuestions, updateQuestions, addQuestion, deleteQuestion,
    setQuestion, updateQuestion, setQuestionFromId, addAnsweredQuestion
} = quizzesSlice.actions;

export default quizzesSlice.reducer;