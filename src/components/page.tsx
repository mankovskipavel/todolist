import React, {useRef} from 'react';
//import {PostRequest} from './POST';
import Get from './GET';
import {useHTTP} from './HTTP';
const StartPage = () => {
    const {request} = useHTTP();
    //const {request} = PostRequest();
    const inputRef = useRef(null);
    // const hanlderAdd = () => {
    //     if (inputRef.current.value !== '') {
    //         request(inputRef.current.value);
    //         inputRef.current.value = null;
    //     }
    // };

    const handlerAdd = () => {
        try {
            if (inputRef.current.value !== '') {
                console.log('add');
                request('http://localhost:7000/', 'POST', {
                    message: inputRef.current.value,
                    completed: false,
                });
                inputRef.current.value = null;
                //console.log(data.message);
            }
        } catch (e) {}
    };

    return (
        <div className="container">
            <div className="addToDo">
                <input type="text" className="task-input" ref={inputRef} />
                <button onClick={handlerAdd} className="btn btn_addTask">
                    +
                </button>
            </div>
            <Get />
        </div>
    );
};

export default StartPage;
