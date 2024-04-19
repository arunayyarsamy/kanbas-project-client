import { assignments, enrollments, grades, users } from "../../Database";
import { useParams } from "react-router-dom";
import { FaFile, FaCogs, FaSearch, FaFilter, FaCaretDown } from "react-icons/fa";
import "./index.css";

function Grades() {
    const { courseId } = useParams();
    const as = assignments.filter((assignment) => assignment.course === courseId);
    const es = enrollments.filter((enrollment) => enrollment.course === courseId);
    return (
        <div>
            <div className="flex-fill flex-grow-1 p-2 w-md-100 w-100">
                <div className="d-flex flex-column flex-grow-1 gap-3 ">
                    <div className="additional-button-grp">
                        <div className="float-end d-flex gap-3">
                            <button>
                                <FaFile />
                                Import
                            </button>
                            <button>
                                <FaFile />
                                Export
                                <FaCaretDown />
                            </button>
                            <button>
                                <FaCogs />
                            </button>
                        </div>
                    </div>
                    <div className="d-flex flex-column w-100 flex-md-row justify-content-start align-items-md-center align-items-start gap-4  w-100 ">
                        <div className="input-groups flex-grow-1 d-flex flex-column ">
                            <label htmlFor="student">
                                <h6>
                                    Student Names
                                </h6>
                            </label>
                            <div className="input-group mb-3 ">
                                <span
                                    className="input-group-text"
                                    id="basic-addon1">
                                    <FaSearch />
                                </span>
                                <input type="text" className="form-control" placeholder="Search Students" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                        <div className="input-groups flex-grow-1 ">
                            <label htmlFor="student">
                                <h6>
                                    Assignment Names
                                </h6>
                            </label>
                            <div className="input-group mb-3 ">
                                <span
                                    className="input-group-text"
                                    id="basic-addon1">
                                    <FaSearch />
                                </span>
                                <input type="text" className="form-control" placeholder="Search Students" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                    </div>
                    <div className="additional-button-grp" style={{
                        float: "left",
                    }}>
                        <button>
                            <FaFilter />
                            Apply Filters
                        </button>
                    </div>
                </div>
                <hr />
                <div className="gradesTable w-100 ">
                    <table>
                        <thead>
                            <th>
                                Student Name
                            </th>
                            {as.map((assignment) => (<th>{assignment.title}</th>))}
                        </thead>
                        <tbody>
                            {es.map((enrollment) => {
                                const user = users.find((user) => user._id === enrollment.user);
                                return (
                                    <tr>
                                        <td>{user?.firstName} {user?.lastName}</td>
                                        {assignments.map((assignment) => {
                                            const grade = grades.find(
                                                (grade) => grade.student === enrollment.user && grade.assignment === assignment._id);
                                            if (grade) {
                                                return (<td>{grade.grade}</td>);
                                            } else if (assignment.course === courseId) {
                                                return (<td></td>);
                                            }
                                            return null;
                                        })}
                                    </tr>);
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Grades;