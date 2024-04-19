import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/reducer";
import assignmentReducer from "../Courses/Assignments/reducer";
import quizzesReducer from "../Courses/Quizzes/reducer";

export interface KanbasState {
  modulesReducer: {
    modules: any[];
    module: any;
  };
  assignmentReducer: {
    assignments: any[];
    assignment: any;
  };
  quizzesReducer: {
    quizzes: any[];
    quiz: any;
  };
}

const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentReducer,
    quizzesReducer,
  },
});

export default store;