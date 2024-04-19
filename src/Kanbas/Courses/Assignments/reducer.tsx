import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";

const initialState = {
    assignments: assignments,
    assignment: {
        title: "New Assignment",
        description: "New Description",
        points: 100,
        due: "2023-12-15",
        availableFromDate: "2023-12-15",
        availableUntilDate: "2023-12-15"
    },
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        setAssignments: (state, action) => {
            state.assignments = action.payload;
        },
        // addAssignment: (state, action) => {
        //     state.assignments = [
        //         { ...action.payload, _id: new Date().getTime().toString() },
        //         ...state.assignments,
        //     ];
        // },
        addAssignment: (state, action) => {
            state.assignments = [action.payload, ...state.assignments];
        },
        deleteAssignment: (state, action) => {
            state.assignments = state.assignments.filter(
                (assignment) => assignment._id !== action.payload
            );
        },
        updateAssignment: (state, action) => {
            state.assignments = state.assignments.map((assignment) => {
                if (assignment._id === action.payload._id) {
                    return action.payload;
                } else {
                    return assignment;
                }
            });
        },
        setAssignment: (state, action) => {
            state.assignment = action.payload;
        },
    },
});

export const { addAssignment, deleteAssignment,
    updateAssignment, setAssignment, setAssignments } = assignmentsSlice.actions;

export default assignmentsSlice.reducer;