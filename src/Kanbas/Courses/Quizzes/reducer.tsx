import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizzes: [],
    quiz: {
        accessCode: "",
        assignmentGroup: "",
        availableDate: "",
        courseId: "",
        description: "",
        dueDate: "",
        lockQuestionsAfterAnswering: "",
        multipleAttempts: "",
        name: "",
        oneQuestionAtATime: "",
        points: "",
        published: "",
        questions: [],
        quizType: "",
        showCorrectAnswers: "",
        shuffleAnswers: "",
        timeLimit: "",
        untilDate: "",
        webcamRequired: "",
        _id: "",
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