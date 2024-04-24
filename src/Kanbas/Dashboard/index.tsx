import { Link } from "react-router-dom";
import { FaFileInvoice } from "react-icons/fa";
import "./index.css";
import { useEffect } from "react";

function Dashboard(
    { courses, course, setCourse, addNewCourse,
        deleteCourse, updateCourse, refresh, setRefresh }: {
            courses: any[]; course: any; setCourse: (course: any) => void;
            addNewCourse: () => void; deleteCourse: (course: any) => void;
            updateCourse: () => void; refresh: any; setRefresh: any;
    }) {

    useEffect(() => {
        setRefresh(!refresh);
    }, []);

    return (
        <>
            <div className="p-4">
                <h1>Dashboard</h1>
                <hr />
                <div className="w-50 d-flex flex-column gap-2 p-4">
                    <h5>
                        Add New Course | Update Course
                        <hr className="m-0 mt-2 " />
                    </h5>
                    <input value={course.name} className="form-control"
                        title="Course Name"
                        onChange={(e) => setCourse({ ...course, name: e.target.value })} />
                    <input value={course.number} className="form-control"
                        onChange={(e) => setCourse({ ...course, number: e.target.value })} />
                    <input value={course.startDate} className="form-control" type="date"
                        onChange={(e) => setCourse({ ...course, startDate: e.target.value })} />
                    <input value={course.endDate} className="form-control" type="date"
                        onChange={(e) => setCourse({ ...course, endDate: e.target.value })} />
                    <div className="w-50 d-flex flex-row
                    justify-content-start gap-2 align-items-center
                    ">
                        <button
                            className="btn btn-primary w-50"
                            onClick={addNewCourse}>
                            Add New Course
                        </button>
                        <button
                            className="btn btn-success w-50"
                            onClick={updateCourse} >
                            Update
                        </button>
                    </div>
                </div>
                <hr className="m-0 mt-4" />
                <br />

                <h2>Published Courses ({courses.length})
                </h2>
                <hr />
                <div className="row overflow-auto">
                    <div className="row row-cols-1 row-cols-md-5 g-4 mt-0 ">
                        {
                            courses.map((course) => {
                                return (
                                    <div className="col">
                                        <div className="card">
                                            <img src={
                                                `/assets/images/${course.image}`
                                            } className="card-img-top" style={{
                                                height: "150px"
                                            }} alt="course-banner" />
                                            <div className="card-body">
                                                <Link to={`/kanbas/courses/${course.id}`} className="text-black">
                                                    {course.name}
                                                </Link>
                                                <p className="card-text">
                                                    {course.number}
                                                    <br />
                                                    {course.startDate} | {course.endDate}
                                                </p>
                                                <div className="
                                                d-flex
                                                flex-row
                                                justify-content-between
                                                align-items-center
                                                gap-2
                                                ">
                                                    <Link to={`/kanbas/courses/${course._id}`}>
                                                        <FaFileInvoice />
                                                    </Link>
                                                    <div className="
                                                    d-flex
                                                    flex-row
                                                    justify-content-between
                                                    align-items-center
                                                    gap-2
                                                    ">
                                                        <button
                                                        className="btn btn-primary"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            setCourse(course);
                                                        }}>
                                                            Edit
                                                        </button>
                                                        <button 
                                                        className="btn btn-danger"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            deleteCourse(course._id);
                                                        }}>
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;