import React, {useState} from 'react';

const ComponentWithUseState = () => {
    const [count, setCount] = useState(0);
    const incrementCount = () => setCount(count + 1);

    return (
        <div>
            {/* <button onClick={() => setCount(count - 1)}>Decrement</button> */}
            <button onClick={incrementCount}>GEt</button>
            <p>{count}</p>
        </div>
    );
};

export default ComponentWithUseState;
