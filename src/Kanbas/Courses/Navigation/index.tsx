import { Link, useLocation, useNavigate } from "react-router-dom";
import "./index.css";
import { CourseNavContext } from "..";
import { useContext } from "react";
import { FaHome, FaPlug, FaPencilRuler, FaRocketchat, FaBookReader,
    FaPeopleArrows, FaCogs, FaAddressBook, FaFileArchive, FaBookOpen
} from "react-icons/fa";


function CourseNavigation() {
    const links = [
        "Home", "Modules", "Piazza", "Grades", "Assignments",
        "Quizzes", "Files", "Syllabus", "Outcomes", "People",
        "Pages", "Collaborations",
        "Rubrics", "New Analytics", "Settings"
    ];

    const links_small_screen = [
        { label: "Home", icon: <FaHome className="fs-6" /> },
        { label: "Modules", icon: <FaPlug className="fs-6" /> },
        { label: "Piazza", icon: <FaRocketchat className="fs-6" /> },
        { label: "Grades", icon: <FaPencilRuler className="fs-6" /> },
        { label: "Assignments", icon: <FaBookOpen className="fs-6" /> },
        { label: "Quizzes", icon: <FaBookReader className="fs-6" /> },
        { label: "Files", icon: <FaFileArchive className="fs-6" /> },
        { label: "Syllabus", icon: <FaBookReader className="fs-6" /> },
        { label: "Outcomes", icon: <FaBookReader className="fs-6" /> },
        { label: "People", icon: <FaPeopleArrows className="fs-6" /> },
        { label: "Collaborations", icon: <FaBookReader className="fs-6" /> },
        { label: "Conferences", icon: <FaAddressBook className="fs-6" /> },
        { label: "Settings", icon: <FaCogs className="fs-6" /> },

    ];

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleNav = (link: string) => {
        navigate("/kanbas/courses/" + link);
    };

    const { openMobileCourseNav, setOpenMobileCourseNav } = useContext(CourseNavContext);

    const handleCourseNavClick = () => {
        setOpenMobileCourseNav(!openMobileCourseNav);
    }

    return (
        <>
            <div className="d-none d-md-block h-100 ">
                <ul className="wd-navigation">
                    {
                        links.map((link, index) => (
                            <li key={index}
                                className={pathname.includes(link) ? "wd-active" : ""}>
                                <Link onClick={
                                    () => handleNav(link.toLowerCase())
                                } to={link}>{link}</Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="course-nav-small-screen d-md-none p-5 flex-grow-1 ">
                <ul className="h-100">
                    {
                        links_small_screen.map((link, index) => (
                            <li key={index} className={pathname.includes(link.label.toLowerCase()) ? "active" : ""}>
                                <Link to={link.label} onClick={
                                    () => handleCourseNavClick()
                                }>
                                    <div className="d-flex flex-row gap-2 justify-content-center align-items-center ">
                                    {link.icon}
                                    {link.label}
                                    </div>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    );
}

export default CourseNavigation;