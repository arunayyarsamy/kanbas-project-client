import React from 'react'

const MapFunction = () => {
    let numberArray1 = [1, 2, 3, 4, 5, 6];
    const square = (a: number) => a * a;
    
    const squares = numberArray1.map(square);
    const cubes = numberArray1.map(a => a * a * a);

    return (
        <>
            <h1>
                Map
            </h1>
            <p>
                squares = {squares}
            </p>
            <p>
                cubes = {cubes}
            </p>
        </>
    );

}

export default MapFunction