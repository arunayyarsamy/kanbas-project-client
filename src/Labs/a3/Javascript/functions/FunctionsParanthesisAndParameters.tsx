import React from 'react'

const square = (a: number) => a * a;
const plusOne = (a: number) => a + 1;
const twoSquared = square(2);
const threePlusOne = plusOne(3);

const FunctionsParanthesisAndParameters = () => {
    return (
        <div>
            <h2>Functions: Paranthesis and Parameters</h2>
            <p>twoSquared: {twoSquared}</p>
            <p>square(2): {square(2)}</p>
            <p>threePlusOne: {threePlusOne}</p>
            <p>plusOne(3): {plusOne(3)}</p>
        </div>
    )
}

export default FunctionsParanthesisAndParameters