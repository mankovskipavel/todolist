import React, {useRef} from 'react';
import {PostRequest} from './POST';
import GET from './GET';

const StartPage = () => {
    const {request} = PostRequest();
    const inputRef = useRef(null);
    const hanlderAdd = () => {
        if (inputRef.current.value !== '') {
            request(inputRef.current.value);
            inputRef.current.value = null;
        }
    };

    return (
        <div className="container">
            <div className="addToDo">
                <input type="text" className="inputTask" ref={inputRef} />
                <button onClick={hanlderAdd} className="btn btn_addTask">
                    +
                </button>
            </div>
            <GET />
        </div>
    );
};

export default StartPage;
