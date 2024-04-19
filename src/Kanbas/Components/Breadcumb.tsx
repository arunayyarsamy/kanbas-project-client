import { HiMiniBars3 } from "react-icons/hi2";
import { FaCaretDown } from "react-icons/fa";
import { courses } from "../../Kanbas/Database";
import { Link, useParams } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import CourseNavigation from "../Courses/Navigation";
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import './index.css';
import { useState } from "react";

const Breadcumb = () => {

    const [open, setOpen] = useState(false);
    const { courseId } = useParams();
    const course = courses.find((course) => course._id === courseId);

    return (
        <>
            <div className="bc p-2 d-md-flex flex-row gap-4 align-items-center d-none " >
                <HiMiniBars3 />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb
                        m-0
                        ">
                        <li className="breadcrumb-item m-0 ">
                            {course?._id}
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <Routes>
                                <Route path="/" element={<Navigate to="Home" />} />
                                <Route path="Home" element={<span>Home</span>} />
                                <Route path="Modules" element={<span>Modules</span>} />
                                <Route path="Piazza" element={<span>Piazza</span>} />
                                <Route path="Assignments" element={<span>Assignments</span>} />
                                <Route path="Assignments/:assignmentId" element={<span>Assignment Editor</span>} />
                                <Route path="Grades" element={<span>Grades</span>} />
                            </Routes>
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="d-md-none d-flex flex-row justify-content-between align-items-center bg-black text-white px-4">
                <a href="/kanbas/navigation/index.html" className="text-white">
                    <HiMiniBars3 />
                </a>
                <div className="p-2">
                    <h6 className="m-0" style={{
                        textAlign: "center"
                    }}>
                        {course?._id}
                        <br />
                        <Routes>
                            <Route path="/" element={<Navigate to="Home" />} />
                            <Route path="Home" element={<span>Home</span>} />
                            <Route path="Modules" element={<span>Modules</span>} />
                            <Route path="Piazza" element={<span>Piazza</span>} />
                            <Route path="Assignments" element={<span>Assignments</span>} />
                            <Route path="Assignments/:assignmentId" element={<span>Assignment Editor</span>} />
                            <Route path="Grades" element={<span>Grades</span>} />
                        </Routes>
                    </h6>
                </div>
                <div>
                    {/* <a href="/Kanbas/courses/navigation/index.html" className="text-white ">
                        <FaCaretDown />
                    </a> */}
                    {/* <Link to="/kanbas/courses/navigation/index.tsx">
                        <FaCaretDown />
                    </Link> */}
                    <Button
                        onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                    >
                        click
                    </Button>
                    <Collapse in={open}>
                        <div id="example-collapse-text">
                            <CourseNavigation />
                        </div>
                    </Collapse>
                </div>
            </div>
        </>
    )
}

export default Breadcumb