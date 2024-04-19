import React, { useState } from "react";
function Counter() {
    // let count = 7;
    const [count, setCount] = useState(7);
    console.log(count);
    return (
        <div>
            <h2>Counter: {count}</h2>
            {/* <button
                onClick={() => { count++; console.log(count); }}>
                Up
            </button> */}
            <button
                onClick={() => setCount(count + 1)}>
                Up
            </button>
            {/* <button
                onClick={() => { count--; console.log(count); }}>
                Down
            </button> */}
            <button
                onClick={() => {setCount(count - 1)}}>
                Down
            </button>
        </div>
    );
}

export default Counter;