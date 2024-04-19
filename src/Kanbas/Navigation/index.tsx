import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { FaTachometerAlt, FaRegUserCircle, FaBook, FaRegCalendarAlt } from "react-icons/fa";
function KanbasNavigation() {
    const links = [
        { label: "Account", icon: <FaRegUserCircle className="fs-2 text-white " /> },
        { label: "Dashboard", icon: <FaTachometerAlt className="fs-2" style={{
            color: "D41B2C"
        }} /> },
        { label: "Courses", icon: <FaBook className="fs-2" style={{
            color: "D41B2C"
        }} /> },
        { label: "Calendar", icon: <FaRegCalendarAlt className="fs-2" style={{
            color: "D41B2C"
        }} /> },
    ];
    const { pathname } = useLocation();
    return (
        <>
            <div className="d-none d-md-block ">
                <ul className="wd-kanbas-navigation">
                    <li className="main-logo-container">
                        <li>
                            <a href="https://northeastern.edu">
                                <img src="/assets/icons/NU_main_logo.png" alt="" />
                            </a>
                        </li>
                    </li>
                    <br />
                    <ul className="wd-kanbas-navigation main-options">
                        {
                            links.map((link, index) => (
                                <li key={index} className={pathname.includes(link.label.toLowerCase()) ? "active" : ""}>
                                    <Link to={`/kanbas/${link.label.toLowerCase()}`}>
                                        {link.icon}
                                        {link.label}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </ul>
            </div>
            <div className="wd-navigation-small-screen d-md-none d-flex flex-column justify-content-center  align-items-center w-100 p-4">
                <div className="d-flex flex-row justify-content-between align-items-center w-100">
                    <div className="logo-container">
                        <img src="/assets/icons/mobile-global-nav-logo.png" alt="" />
                    </div>
                    <a href="/Kanbas/courses/home/screen.html">
                        <i className="fa fa-close text-red"></i>
                    </a>
                </div>
                <ul className="p-5 list-unstyled m-0 d-flex flex-column justify-content-start gap-5 h-100 w-100 ">
                    {
                        links.map((link, index) => (
                            <li key={index} className={pathname.includes(link.label.toLowerCase()) ? "active" : ""}>
                                <Link to={`/kanbas/${link.label.toLowerCase()}`}>
                                    {link.icon}
                                    {link.label}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    );
}

export default KanbasNavigation;