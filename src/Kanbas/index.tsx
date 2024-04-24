import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import { useState, useEffect } from "react";
import axios from "axios";
import store from "./store";
import { Provider } from "react-redux";
import Account from "./Account";

const API_BASE = process.env.REACT_APP_API_BASE;

function Kanbas() {
    const [courses, setCourses] = useState<any[]>([]);
    const [course, setCourse] = useState({
        _id: "1234", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15",
        image: "reactjs.jpg"
    });

    console.log("API_BASE", API_BASE);

    const [refresh, setRefresh] = useState(false);

    // const COURSES_API = "https://kanbas-node-server-app-0rgn.onrender.com/api/courses"
    const COURSES_API = `${API_BASE}/api/courses`;

    // const COURSES_API = "http://localhost:4000/api/courses";
    // const COURSES_API = "https://kanbas-node-server-app-0rgn.onrender.com/api/courses";
    // const COURSES_API = `${API_BASE}/courses`;
    // const findAllCourses = async () => {
    //     const response = await axios.get(COURSES_API);
    //     setCourses(response.data);
    // };
    useEffect(() => {
        const findAllCourses = async () => {
            const response = await axios.get(COURSES_API);
            setCourses(response.data);
        };
        findAllCourses();
    }, [refresh]);

    const addNewCourse = async () => {
        // const response = await axios.post(COURSES_API, course);
        // setCourses([ ...courses, response.data ]);
        const response = await axios.post(
          COURSES_API,
          course
        );
        setCourses([ ...courses, response.data ]);
    };    
    const deleteCourse = async (courseId: string) => {
        const response = await axios.delete(
          `${COURSES_API}/${courseId}`
        );
        // use response somehow
        // console.log(response.data);
        if (response.status === 200) {}
        setCourses(courses.filter(
          (c) => c._id !== courseId));
    };    
    const updateCourse = async () => {
        const response = await axios.put(
          `${COURSES_API}/${course._id}`,
          course
        );
        // use response somehow
        // console.log(response.data);
        if (response.status === 200) {}
        setCourses(
          courses.map((c) => {
            if (c._id === course._id) {
              return course;
            }
            return c;
          })
        );
    };    
    return (
        <Provider store={store}>
            <div className="d-flex" style={{
                height: "100vh",
            }}>
                <div className="d-none d-md-block ">
                    <KanbasNavigation />
                </div>
                <div style={{
                    flexGrow: 1,
                    height: "100%",
                    overflowY: "scroll",
                }}>
                    <Routes>
                        <Route path="/" element={<Navigate to="dashboard" />} />
                        {/* <Route path="Account" element={<h1>Account</h1>} /> */}
                        <Route path="/Account/*" element={<Account />} />
                        <Route path="Dashboard" element={<Dashboard
                            courses={courses}
                            course={course}
                            setCourse={setCourse}
                            addNewCourse={addNewCourse}
                            deleteCourse={deleteCourse}
                            updateCourse={updateCourse}
                            refresh={refresh}
                            setRefresh={setRefresh} />} />
                        <Route path="Courses/:courseId/*" element={<Courses />} />
                    </Routes>
                </div>
            </div>
        </Provider>
    );
}

export default Kanbas;