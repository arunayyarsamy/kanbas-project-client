import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizzes: [],
    quiz: {
        _id: "",
        title: "New Quiz",
        course: "",
        points: 10,
        due: "2023-09-18",
        available: "2023-09-11",
        publishStatus: 0,
        numQuestions: 0,
        questions: []
    },
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
    },
});

export const { addQuiz, deleteQuiz, setQuiz, setQuizzes } = quizzesSlice.actions;

export default quizzesSlice.reducer;