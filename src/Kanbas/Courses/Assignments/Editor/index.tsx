import { useNavigate, useParams } from "react-router-dom";
import "../index.css";
import { FaCheckCircle, FaEllipsisV, FaPlus } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import {
    addAssignment,
    setAssignment,
    updateAssignment,
} from "../reducer";
import { KanbasState } from "../../../store";
import { useEffect } from "react";
import * as client from "../client";

function AssignmentEditor() {

    const assignmentList = useSelector((state: KanbasState) =>
        state.assignmentReducer.assignments);
    const { assignmentId } = useParams();
    const { courseId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const assignmentNew = useSelector((state: KanbasState) =>
        state.assignmentReducer.assignment);

    useEffect(() => {
        if (assignmentId !== "newAssignment") {
            const assignment = assignmentList.find(
                (assignment) => assignment._id === assignmentId);
            if (assignment) {
                dispatch(setAssignment(assignment));
            }
        }
        else {
            dispatch(setAssignment({
                title: "New Assignment",
                description: "New Description",
                points: 100,
                due: "2023-12-15",
                availableFromDate: "2023-12-15",
                availableUntilDate: "2023-12-15"
            }));
        }
    }, [assignmentId, assignmentList, dispatch])

    const handleAddAssignment = () => {
        client.createAssignment(courseId, assignmentNew).then((assignment) => {
            dispatch(addAssignment(assignment));
        });
    }

    const handleUpdateAssignment = async () => {
        const status = await client.updateAssignment(assignmentNew);
        if (status === 200){}
        dispatch(updateAssignment(assignmentNew));
    }

    const handleSave = () => {
        if (assignmentId === "newAssignment") {
            // dispatch(addAssignment({
            //     ...assignmentNew,
            //     course: courseId
            // }));
            handleAddAssignment();
        }
        else if (assignmentId !== "newAssignment") {
            // dispatch(updateAssignment(assignmentNew));
            handleUpdateAssignment();
        }
        navigate(`/Kanbas/courses/${courseId}/Assignments`);
    };

    return (
        <div>
            <div className="d-flex flex-column">
                <div className="d-flex flex-row justify-content-end align-items-center gap-4 ">
                    <h3 className="icon-button m-0 fs-6 text-green bg-transparent border-0 ">
                        <FaCheckCircle />
                        Published
                    </h3>
                    <button className="icon-button p-2 px-3 ">
                        <FaEllipsisV />
                    </button>
                </div>
                <hr />
                <div className="d-flex flex-column gap-4 p-4 pt-0 ">
                    <label htmlFor="assignment-name w-100">
                        Assignment Name
                        <br />
                        <input className="input-tags"
                            type="text" name="assignment-name"
                            id="assignment-name"
                            value={assignmentNew?.title}
                            placeholder="Enter the Assignment Title"
                            onChange={(e) => {
                                dispatch(setAssignment({
                                    ...assignmentNew,
                                    title: e.target.value,
                                }));
                            }}
                        />
                    </label>
                    <textarea className="input-tags" name="" id="" cols={30}
                        rows={5}
                        onChange={(e) => {
                            dispatch(setAssignment({
                                ...assignmentNew,
                                description: e.target.value,
                            }));
                        }}
                        value={assignmentNew?.description}
                    >
                    </textarea>
                </div>
                <div className="input-label-grps d-flex flex-column gap-2 ">
                    <div className="input-grp">
                        <label htmlFor="points">
                            Points
                        </label>
                        <input type="number" name="points" id="points"
                            value={assignmentNew?.points}
                            onChange={(e) => {
                                dispatch(setAssignment({
                                    ...assignmentNew,
                                    points: e.target.value,
                                }));
                            }}
                        />
                    </div>
                    <div className="input-grp">
                        <label htmlFor="assignment-group">
                            Assignment Group
                        </label>
                        <input type="text" name="assignment-group" id="assignment-group"
                            value="ASSIGNMENTS" />
                    </div>
                    <div className="input-grp">
                        <label htmlFor="display-grade-as">
                            Display Grade as
                        </label>
                        <input type="text" name="display-grade-as" id="display-grade-as" value="Points" />
                    </div>
                    <div className="input-grp gap-0 " >
                        <label htmlFor=""></label>
                        <label htmlFor="count-grade" className="
                        w-50 p-0 text-start
                        ">
                            <input type="checkbox" name="count-grade" id="count-grade" style={{ width: "7%" }} />
                            Do not count this assignment towards the final grade
                        </label>
                    </div>
                    <br />
                    <div className="input-grp">
                        <label>
                            Assign
                        </label>
                        <div className="d-flex flex-column w-50">
                            <div className="special-input-box w-100 p-4 ">
                                <div className="special-input-grp">
                                    <div className="w-100">
                                        <select name="" id="">
                                            <option value="Online" selected>
                                                Online
                                            </option>
                                            <option value="On Paper">
                                                On Paper
                                            </option>
                                            <option value="No Submission">
                                                No Submission
                                            </option>
                                        </select>
                                    </div>
                                    <div className="w-100">
                                        <label htmlFor="" className="fw-medium ">
                                            Online Entry Options
                                        </label>
                                        <label htmlFor="">
                                            <input type="checkbox" className="w-25 " name="" id="" checked />
                                            Text Entry
                                        </label>
                                        <label htmlFor="">
                                            <input type="checkbox" className="w-25 " name="" id="" checked />
                                            Website URL
                                        </label>
                                        <label htmlFor="">
                                            <input type="checkbox" className="w-25 " name="" id="" checked />
                                            Media Recordings
                                        </label>
                                        <label htmlFor="">
                                            <input type="checkbox" className="w-25 " name="" id="" />
                                            Student Annotation
                                        </label>
                                        <label htmlFor="">
                                            <input type="checkbox" className="w-25 " name="" id="" />
                                            File Uploads
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <button className="secondary-button" style={{
                                width: "100%",
                                backgroundColor: "#f5f5f5",
                                color: "black",
                                textAlign: "center",
                                borderTopLeftRadius: "0%",
                                borderTopRightRadius: "0%",
                                border: "1px solid #E0E0E0",
                                borderTop: "none"
                            }}>
                                <FaPlus />
                                Add
                            </button>
                        </div>
                    </div>
                    <br />
                    <div className="input-grp">
                        <label>
                            Assign
                        </label>
                        <div className="d-flex flex-column w-50 ">
                            <div className="special-input-box w-100 p-4 ">
                                <div className="special-input-grp">
                                    <div className="w-100">
                                        <label htmlFor="">
                                            Assign to
                                        </label>
                                        <div className="
                                                    nested-input p-2
                                                    ">
                                            <div className="p-2 py-1 ">
                                                <span>
                                                    Everyone
                                                </span>
                                                <IoCloseSharp />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-100">
                                        <label htmlFor="">
                                            Due
                                        </label>
                                        <input type="date" value={assignmentNew?.due}
                                            onChange={(e) => {
                                                dispatch(setAssignment({
                                                    ...assignmentNew,
                                                    due: e.target.value,
                                                }));
                                            }}
                                        />
                                    </div>
                                    <div className="w-100 d-flex gap-2 ">
                                        <div className="w-50">
                                            <label htmlFor="">
                                                Available From
                                            </label>
                                            <input type="date" value="2023-09-06"
                                                onChange={(e) => {
                                                    dispatch(setAssignment({
                                                        ...assignmentNew,
                                                        availableFromDate: e.target.value,
                                                    }));
                                                }}
                                            />
                                        </div>
                                        <div className="w-50">
                                            <label htmlFor="">
                                                Until
                                            </label>
                                            <input type="date" value="2023-09-20"
                                                onChange={(e) => {
                                                    dispatch(setAssignment({
                                                        ...assignmentNew,
                                                        availableUntilDate: e.target.value,
                                                    }));
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button style={{
                                width: "100%",
                                backgroundColor: "#f5f5f5",
                                color: "black",
                                textAlign: "center",
                                borderTopLeftRadius: "0%",
                                borderTopRightRadius: "0%",
                                border: "1px solid #E0E0E0",
                                borderTop: "none"
                            }} className="">
                                <FaPlus />
                                Add
                            </button>
                        </div>
                    </div>
                </div>
                <div className="">
                    <hr />
                    <div className="d-flex flex-md-row flex-column justify-content-between align-items-md-start align-items-center gap-4 fs-6 ">
                        <label htmlFor="" className="fs-6 h-100  d-flex align-items-center justify-content-center gap-3 ">
                            <input type="checkbox" name="" id="" />
                            Notify users that this content has changed
                        </label>
                        <div className="submission-button-grp
                        d-flex gap-3
                        ">
                            <button onClick={() => {
                                navigate(`/Kanbas/courses/${courseId}/Assignments`);
                            }}>
                                Cancel
                            </button>
                            <button onClick={() => handleSave()}>
                                Save
                            </button>
                        </div>
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    );
}

export default AssignmentEditor;