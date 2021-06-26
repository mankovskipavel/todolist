import React, {useRef, useState} from 'react';
import {PostRequest} from './POST';

const StartPage = () => {
    const {request} = PostRequest();
    const [task, setTask] = useState({
        message: '',
        completed: false,
    });

    const inputRef = useRef(null);
    const hanlderAdd = () => {
        if (inputRef.current.value !== '') {
            setTask(() => {
                const mes: string = inputRef.current.value;
                return {
                    message: mes,
                    completed: false,
                };
            });
            request(inputRef.current.value);
        }
    };

    return (
        <div className="container">
            <div className="addToDo">
                <input type="text" className="inputTask" ref={inputRef} />
                <button onClick={hanlderAdd} className="btn btn_addTask">
                    +
                </button>
                <p>input value:{task.completed.toString()}</p>
            </div>
        </div>
    );
};

export default StartPage;
