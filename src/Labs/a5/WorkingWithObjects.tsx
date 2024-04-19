import React, { useEffect, useState } from "react";
import axios from "axios";

function WorkingWithObjects() {

    const API_BASE = process.env.REACT_APP_API_BASE;

    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });

    const [module, setModule] = useState({
        id: 1, name: "NodeJS", description: "NodeJS with ExpressJS",
        course: "CS572"
    });

    const fetchAssignment = async () => {
        const response = await axios.get(`${ASSIGNMENT_URL}`);
        setAssignment(response.data);
    };

    const updateTitle = async () => {
        const response = await axios
            .get(`${ASSIGNMENT_URL}/title/${assignment.title}`);
        setAssignment(response.data);
    };

    useEffect(() => {
        fetchAssignment();
    });


    // const ASSIGNMENT_URL = "http://localhost:4000/a5/assignment"
    const ASSIGNMENT_URL = `${API_BASE}/a5/assignment`;

    return (
        <div>
            <h3>Working With Objects</h3>

            <h4>Retrieving Objects</h4>
            <a className="
                btn btn-primary"
                // href="http://localhost:4000/a5/assignment">
                href={`${ASSIGNMENT_URL}`}>
                Get Assignment
            </a>
            <br /><br />
            <h4>Retrieving Properties</h4>
            <a className="
                btn btn-primary"
                // href="http://localhost:4000/a5/assignment/title">
                href={`${ASSIGNMENT_URL}/title`}>
                Get Title
            </a>
            <br /><br />
            <h4>
                updating Score
            </h4>
            <input className="
                form-control
            " type="number"
                onChange={(e) => setAssignment({
                    ...assignment,
                    score: parseInt(e.target.value)
                })}
                value={assignment.score} />
            <br />
            <a className="
                btn btn-primary
            " href={`${ASSIGNMENT_URL}/score/${assignment.score}`}>
                Update Score
            </a>
            <br /><br />
            <h4>
                updating Completed
            </h4>
            <input type="checkbox"
                onChange={(e) => setAssignment({
                    ...assignment,
                    completed: e.target.checked
                })}
                checked={assignment.completed} />

            <a className="
                btn btn-primary
            " href={`${ASSIGNMENT_URL}/completed/${assignment.completed}`}>
                Update Completed
            </a>
            <br /><br />
            <h4>Modifying Properties</h4>
            <input className="
                form-control
            " type="text"
                onChange={(e) => setAssignment({
                    ...assignment,
                    title: e.target.value
                })}
                value={assignment.title} />
            <br />
            <a className="
                btn btn-primary
            " href={`${ASSIGNMENT_URL}/title/${assignment.title}`}>
                Update Title
            </a>
            <br /><br />
            <h4>
                Module Object
            </h4>

            <a className="
                btn btn-primary" 
                // href="http://localhost:4000/a5/module">
                href={`${API_BASE}/a5/module`}>
                Get Module
            </a>
            <br /><br />
            <a className="
                btn btn-primary" 
                // href="http://localhost:4000/a5/module/name">
                href={`${API_BASE}/a5/module/name`}>
                Get Module Name
            </a>
            <br /><br />
            <input className="
                form-control
            " type="text"
                onChange={(e) => setModule({
                    ...module,
                    name: e.target.value
                })}
                value={module.name} />
            <br />
            <a className="
                btn btn-primary" 
                // href={`http://localhost:4000/a5/module/name/${module.name}`}>
                href={`${API_BASE}/a5/module/name/${module.name}`}>
                Update Module Name
            </a>
            <br /><br />
            <h4>
                Module Description
            </h4>
            <a className="
                btn btn-primary" 
                // href="http://localhost:4000/a5/module/description">
                href={`${API_BASE}/a5/module/description`}>
                Get Module Description
            </a>
            <br /><br />
            <input className="
                form-control
            " type="text"
                onChange={(e) => setModule({
                    ...module,
                    description: e.target.value
                })}
                value={module.description} />
            <br />
            <a className="
                btn btn-primary" 
                // href={`http://localhost:4000/a5/module/description/${module.description}`}>
                href={`${API_BASE}/a5/module/description/${module.description}`}>
                Update Module Description
            </a>
            <br /><br />
            <h3>Modifying Properties</h3>
            <input className="
                form-control
            " onChange={(e) => setAssignment({
                ...assignment, title: e.target.value
            })}
                value={assignment.title} type="text" />
            <br />
            <button className="
                btn btn-primary
            " onClick={updateTitle} >
                Update Title to: {assignment.title}
            </button>
            <br /><br />
            <button className="
                btn btn-primary
            " onClick={fetchAssignment} >
                Fetch Assignment
            </button>

        </div>
    );
}

export default WorkingWithObjects;