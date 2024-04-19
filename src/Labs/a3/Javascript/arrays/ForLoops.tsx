import React from 'react'

const ForLoops = () => {
    let stringArray1 = ['string1', 'string3'];
    let stringArray2 = [];
    for (let i = 0;
         i < stringArray1.length;
         i++) {
      const string1 = stringArray1[i];
      stringArray2.push(
        string1.toUpperCase());
    }
    
    return (
        <>
            <h1>
                Looping Through Arrays
            </h1>
            <p>
                stringArray2: {stringArray2}
            </p>
        </>
    );
    
}

export default ForLoops