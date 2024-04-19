import React, { useEffect, useState } from "react";
import axios from "axios";

function EncodingParametersInURLs() {

    const API_BASE = process.env.REACT_APP_API_BASE;

    const [a, setA] = useState(34);
    const [b, setB] = useState(23);
    const [welcome, setWelcome] = useState("");
    const fetchWelcome = async () => {
        const response = await axios.get(API_BASE + "/a5/welcome");
        setWelcome(response.data);
    };
    const [result, setResult] = useState(0);
    const fetchSum = async (a: any, b: any) => {
        const response = await
            // axios.get(`http://localhost:4000/a5/add/${a}/${b}`);
            axios.get(API_BASE + `/a5/add/${a}/${b}`);
        setResult(response.data);
    };
    const fetchSubtraction = async (a: any, b: any) => {
        const response = await axios.get(
            // `http://localhost:4000/a5/subtract/${a}/${b}`);
            API_BASE + `/a5/subtract/${a}/${b}`);
        setResult(response.data);
    };

    useEffect(() => {
        fetchWelcome();
    });

    return (
        <div>
            <h3>Encoding Parameters In URLs</h3>
            <h5>Integrating React with APIs</h5>
            <h5>Fetching Welcome</h5>
            <h6>{welcome}</h6>
            <h4>Calculator</h4>
            <input className="
                form-control
            " type="number" value={a}
                onChange={(e) => setA(Number(e.target.value))} />
            <br />
            <input className="
                form-control
            " type="number"
                onChange={(e) => setB(Number(e.target.value))} value={b} />
            <br />
            <h3>Path Parameters</h3>
            {/* <a href={`http://localhost:4000/a5/add/${a}/${b}`}> */}
            <a href={`${API_BASE}/a5/add/${a}/${b}`}>
                <button className="btn btn-primary">
                    Add {a} + {b}
                </button>
            </a>
            <br /><br />
            {/* <a href={`http://localhost:4000/a5/subtract/${a}/${b}`}> */}
            <a href={`${API_BASE}/a5/subtract/${a}/${b}`}>
                <button className="btn btn-danger">
                    Subtract {a} - {b}
                </button>
            </a>
            <br /><br />
            <h3>Query Parameters</h3>
            <a className="btn btn-primary"
                // href={`http://localhost:4000/a5/calculator?operation=add&a=${a}&b=${b}`}>
                href={`${API_BASE}/a5/calculator?operation=add&a=${a}&b=${b}`}>
                Add {a} + {b}
            </a>
            <br /><br />
            <a className="btn btn-danger"
                // href={`http://localhost:4000/a5/calculator?operation=subtract&a=${a}&b=${b}`}>
                href={`${API_BASE}/a5/calculator?operation=subtract&a=${a}&b=${b}`}>
                Substract {a} - {b}
            </a>
            <br /><br />
            <h3>
                Multiply and Divide encoded in the request's path
            </h3>
            <a className="btn btn-primary" 
            // href={`http://localhost:4000/a5/multiply/${a}/${b}`}>
            href={`${API_BASE}/a5/multiply/${a}/${b}`}>
                Multiply {a} * {b}
            </a>
            <br /><br />
            <a className="btn btn-danger"
            // href={`http://localhost:4000/a5/divide/${a}/${b}`}>
            href={`${API_BASE}/a5/divide/${a}/${b}`}>
                Divide {a} / {b}
            </a>
            <br /><br />
            <h3>
                Multiply and Divide encoded in the query string
            </h3>
            <a className="
            btn btn-primary" 
            // href={`http://localhost:4000/a5/calculator?operation=multiply&a=${a}&b=${b}`}>
            href={`${API_BASE}/a5/calculator?operation=multiply&a=${a}&b=${b}`}>
                Multiply {a} * {b}
            </a>
            <br /><br />
            <a className="
            btn btn-danger" 
            // href={`http://localhost:4000/a5/calculator?operation=divide&a=${a}&b=${b}`}>
            href={`${API_BASE}/a5/calculator?operation=divide&a=${a}&b=${b}`}>
                Divide {a} / {b}
            </a>
            <br /><br />
            <h4>
                Using React to fetch the result
            </h4>
            <input value={result} type="number" readOnly />
            <h3>Fetch Result</h3>
            <button className="
            btn btn-primary
            " onClick={() => fetchSum(a, b)} >
                Fetch Sum of {a} + {b}
            </button>
            <br /><br />
            <button className="
            btn btn-danger
            " onClick={() => fetchSubtraction(a, b)} >
                Fetch Substraction of {a} - {b}
            </button>


        </div>
    );
}
export default EncodingParametersInURLs;