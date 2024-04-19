import EncodingParametersInURLs from "./EncodingParametersInURLs";
import WorkingWithObjects from "./WorkingWithObjects";
import WorkingWithArrays from "./WorkingWithArrays";

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Assignment5() {

    const API_BASE = process.env.REACT_APP_API_BASE;

    return (
        <div className="p-4">
            <h1>Assignment 5</h1>
            <a href={API_BASE + "/a5/welcome"}>
                Welcome
            </a>
            <hr />
            <EncodingParametersInURLs />
            <hr />
            <WorkingWithObjects />
            <hr />
            <WorkingWithArrays />
        </div>
    );
}
export default Assignment5;