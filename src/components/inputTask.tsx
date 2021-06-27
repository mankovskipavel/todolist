import React, {useRef} from 'react';

import {useHTTP} from './HTTP';
const InputTask = () => {
    const {request} = useHTTP();

    const inputRef = useRef(null);
    const handlerAdd = () => {
        try {
            if (inputRef.current.value !== '') {
                console.log('add');
                request('http://localhost:7000/', 'POST', {
                    message: inputRef.current.value,
                    completed: false,
                });
                inputRef.current.value = null;
            }
        } catch (e) {}
    };

    return (
        <div className="addToDo">
            <input type="text" className="task-input" ref={inputRef} />
            <button onClick={handlerAdd} className="btn btn_addTask">
                +
            </button>
        </div>
    );
};

export default InputTask;
