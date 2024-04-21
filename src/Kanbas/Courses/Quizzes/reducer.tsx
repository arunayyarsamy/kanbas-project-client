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
    questions: [],
    question: {
        _id: "",
        title: "new Ques",
        points: "1",
        question: "",
        choices: [] as string[],
        questionType: "",
        answer: [] as string[],
        possibleAnswers: [] as { id: string, answer: string }[]
    }
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

            const question = state.questions.filter(
                (question: any) => question._id === action.payload
            );
            console.log("question", question);
            // const newQuestion = {
            //     question[0],
            //     possibleAnswers: finalQuestion.choices
            //         .filter((choice: string) => choice !== finalQuestion.answer[0])
            //         .map((choice: string) => ({ id: `answer_${choice}`, answer: choice })),
            // };

            // state.question = newQuestion;

            // state.question = question[0];1``
        },

        updateQuestion: (state, action) => {
            state.question = action.payload;
        },

    },
});

export const { addQuiz, deleteQuiz, setQuiz, setQuizzes
    , setQuestions, updateQuestions, addQuestion, deleteQuestion,
    setQuestion, updateQuestion, setQuestionFromId
} = quizzeqce.acti[0]ons;

export default quizzesSlice.reducer;