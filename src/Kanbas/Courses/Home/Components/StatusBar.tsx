import "./index.css"
import { FaBan, FaCheck, FaFileImport, FaHome, FaComments, FaBullhorn, FaChartLine, FaBell, FaCalendar, FaCheckCircle } from "react-icons/fa"

const StatusBar = () => {
    return (
        <>
            <div className="flex-grow-0 d-none d-lg-block p-2 pt-0" style={{
                width: "250px",
            }}>
                <h3 style={{
                    fontSize: "1.5rem",
                }}>Course Status</h3>
                <div className="course-status-button-group w-100 d-flex flex-row">
                    <button className="w-100 p-2 ">
                        <FaBan />
                        Unpublish
                    </button>
                    <button className="w-100 p-2 ">
                        <FaCheck />
                        Published
                    </button>
                </div>
                <ul className="
                      course-status-list d-flex flex-column w-100 p-0 gap-1 mt-3 fs-6
                      ">
                    <li className="w-100 p-2">
                        <FaFileImport />
                        Import Existing Content</li>
                    <li className="w-100 p-2">
                        <FaFileImport />

                        Import from Commons</li>
                    <li className="w-100 p-2">
                        <FaHome />

                        Choose Home Page</li>
                    <li className="w-100 p-2">
                        <FaComments />
                        View Course Stream</li>
                    <li className="w-100 p-2">
                        <FaBullhorn />
                        New Announcement</li>
                    <li className="w-100 p-2">
                        <FaChartLine />
                        New Analytics</li>
                    <li className="w-100 p-2">
                        <FaBell />
                        Course Notifications</li>
                </ul>
                <br />
                <div>
                    <div>
                        <div className="
                            d-flex flex-row justify-content-between
                            ">
                            <h2 className="fs-6 fw-bold m-0 text-center ">
                                To Do
                            </h2>
                        </div>
                        <hr className="m-0 " />
                        <ul className="comming-up-list" style={{
                            paddingLeft: "0px",
                        }}>
                            <li className="d-flex gap-2 pt-2 ">
                                {/* <i className="
                                    fa fa-check-circle
                                    pt-2 text-red" style={{
                                        color: "#D41B2C",
                                    }}></i> */}
                                <FaCheckCircle className="pt-2 text-red fs-3" style={{
                                    color: "#D41B2C",
                                }} />
                                <div className="d-flex flex-column gap-0 ">
                                    <span className='red-link p-0'>
                                        <button className="p-0">
                                            Grade A1 - ENV + HTML
                                        </button>
                                    </span>
                                    <span>
                                        100pts | Sep 7 at 6:00pm
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <br />
                    <div>
                        <div className="
                            d-flex flex-row justify-content-between
                            ">
                            <h2 className="fs-6 fw-bold m-0 text-center ">
                                Comming Up
                            </h2>
                            <span className='red-link'>
                                <button>
                                    {/* <i className="
                                    fa fa-calendar
                                    " style={{
                                            color: "#9c9c9c",
                                        }}></i> */}
                                    {/* <FaCalendar style={{
                                        color: "#9c9c9c",
                                    }} /> */}
                                    View Calendar
                                </button>
                            </span>
                        </div>
                        <hr className="m-0 " />
                        <ul className="comming-up-list d-flex flex-column gap-2 pt-2 " style={{
                            paddingLeft: "0px",
                        }}>
                            <li className="d-flex gap-2 ">
                                <FaCalendar className="pt-2 fs-4" />
                                <div className="d-flex flex-column gap-0 ">
                                    <span className="red-link">
                                        <button>
                                            CS5610.12631.2024
                                        </button>
                                    </span>
                                    <span>
                                        Sep 7 at 6:00pm
                                    </span>
                                </div>
                            </li>
                            <li className="d-flex gap-2">
                                <FaCalendar className="pt-2 fs-4" />
                                <div className="d-flex flex-column gap-0 ">
                                    <span className="red-link">
                                        <button>
                                            CS5610.12631.2024
                                        </button>
                                    </span>
                                    <span>
                                        Sep 9 at 6:00pm
                                    </span>
                                </div>
                            </li>
                            <li className="d-flex gap-2">
                                <FaCalendar className="pt-2 fs-4" />
                                <div className="d-flex flex-column gap-0 ">
                                    <span className="red-link">
                                        <button>
                                            CS5610.12631.2024
                                        </button>
                                    </span>
                                    <span>
                                        Sep 14 at 6:00pm
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StatusBar