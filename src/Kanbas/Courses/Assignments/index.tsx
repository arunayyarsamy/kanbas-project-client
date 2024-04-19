import {
    FaCheckCircle, FaEllipsisV, FaPlusCircle,
    FaList, FaCaretDown, FaPlus, FaTrash, FaPen
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import "./index.css"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";
import { KanbasState } from "../../store";
import { useState } from "react";
import { setAssignments } from "./reducer";
import * as client from "./client";

function Assignments() {

    const { courseId } = useParams();
    const [showPopup, setShowPopup] = useState(false);
    const [assignmentToBeDeleted, setAssignmentToBeDeleted] = useState("");
    const assignmentList = useSelector((state: KanbasState) =>
        state.assignmentReducer.assignments);
    const dispatch = useDispatch();
    useEffect(() => {
        client.findAssignmentsForCourse(courseId)
            .then((assignments) => {
                dispatch(setAssignments(assignments));
            });
    }, [courseId, dispatch]);
    const handleDeleteAssignment = (assignmentId: string) => {
        client.deleteAssignment(assignmentId).then(() => {
            dispatch(deleteAssignment(assignmentId));
        });
    }

    return (
        <>
            <div className={
                `popupwindow ${showPopup ? "d-flex" : "d-none"}`
            }>
                <div className="popupbox-container">
                    <h5>
                        Confirmation
                    </h5>
                    <p>
                        Are you sure you want to delete this assignment?
                    </p>
                    <div className="d-flex flex-row justify-content-end gap-2">
                        <button className="btn btn-secondary"
                        onClick={() => setShowPopup(!showPopup)}>
                            Cancel
                        </button>
                        <button className="btn btn-danger"
                        onClick={() => {
                            // dispatch(deleteAssignment(assignmentToBeDeleted));
                            handleDeleteAssignment(assignmentToBeDeleted);
                            setShowPopup(!showPopup);
                        }}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-md-row flex-column justify-content-start justify-content-md-between align-items-md-center align-items-start gap-4 ">
                <input className="assignment-search-input" type="text" placeholder="Search for Assignments" />
                <div className="assiginments-button-grp d-flex gap-2 ">
                    <button className="p-2 px-4">
                        <FaPlus />
                        Group
                    </button>
                    <Link className="text-decoration-none" to={`/Kanbas/courses/${courseId}/Assignments/newAssignment`}>
                        <button className="add-assignment p-2 px-4">
                            <FaPlus />
                            Assignment
                        </button>
                    </Link>
                    <button className="p-2">
                        <FaEllipsisV />
                    </button>
                </div>
            </div>
            <hr />
            {/* {< !--Add buttons and other fields here -->} */}
            <ul className="list-group wd-modules">
                <li className="list-group-item" key={0}>
                    <div className="d-flex flex-row justify-content-between align-items-center p-2">
                        <div className="d-flex flex-row justify-content-between align-items-center gap-2">
                            <FaEllipsisV />
                            <FaCaretDown />
                            <h3 className="fs-5 fw-bold ">
                                Assignments
                            </h3>
                        </div>
                        <span className="float-end d-flex justify-content-center align-items-center gap-2">
                            <div className="
                                            p-2
                                            border
                                            border-1
                                            rounded-4
                                            ">
                                40% of Total
                            </div>
                            <FaCheckCircle className="text-success" />
                            <FaPlusCircle />
                            <FaEllipsisV />
                        </span>
                    </div>

                    <ul className="list-group">
                        {assignmentList
                            .filter((assignment) => assignment.course === courseId)
                            .map((assignment, index) => (
                                <li className="d-flex flex-row flex-grow-1 w-100 justify-content-between align-items-center p-2 px-2 bg-white " key={index}>
                                    <div className="d-flex flex-row justify-content-center align-items-center gap-4">
                                        <FaEllipsisV />
                                        <FaList />
                                        <div className="assignment-title-link d-flex flex-column">
                                            <Link to={`/Kanbas/courses/${courseId}/Assignments/${assignment._id}`}>{assignment.title}</Link>
                                            <span>{
                                                assignment.due ? "Due " + assignment.due : "No due date"
                                            } | {assignment.points ? assignment.points : "N/A"} pts </span>
                                        </div>
                                    </div>
                                    <span className="d-flex flex-row gap-3 align-items-center ">
                                        <FaCheckCircle className="text-success" />
                                        <Link to={`/kanbas/courses/${courseId}/Assignments/${assignment._id}`} className="text-black">
                                            <FaPen />
                                        </Link>
                                        <FaTrash onClick={
                                            () => {
                                                setShowPopup(!showPopup);
                                                setAssignmentToBeDeleted(assignment._id);
                                            }
                                        } style={{
                                            cursor: "pointer"
                                        }} />
                                    </span>
                                </li>
                            ))
                        }
                    </ul>
                </li>
            </ul>
        </>
    );
}

export default Assignments;