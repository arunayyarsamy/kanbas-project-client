import ModuleList from "../Modules/List";
import StatusBar from "./Components/StatusBar";
import "./index.css";

function Home() {
    return (
        <div className="
        d-flex flex-row flex-grow-1 gap-4
        ">
            <ModuleList />
            <StatusBar />
        </div>
    );
}

export default Home;