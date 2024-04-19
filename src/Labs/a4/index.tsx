import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import ReduxExamples from "./ReduxExamples";
import TodoList from "./ReduxExamples/todos/TodoList";

const Assignment4 = () => {

    function sayHello() {
        alert("Hello");
    }

    return (
        <>
            <div className="
            p-4
            ">
                <h1>Assignment 4</h1>
                <hr />
                <ClickEvent />
                <hr />
                <PassingDataOnEvent />
                <hr />
                <PassingFunctions theFunction={sayHello} />
                <hr />
                <EventObject />
                <hr />
                <Counter />
                <hr />
                <BooleanStateVariables />
                <hr />
                <StringStateVariables />
                <hr />
                <DateStateVariable />
                <hr />
                <ObjectStateVariable />
                <hr />
                <ArrayStateVariable />
                <hr />
                <ParentStateComponent />
                <hr />
                <ReduxExamples />
                <hr />
                <TodoList />
                <hr />
                <br />
            </div>
        </>
    );
};

export default Assignment4;