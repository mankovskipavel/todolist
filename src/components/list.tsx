import React, {useState, useEffect, useRef} from 'react';
//import StartPage from './inputTask';
//import length from './length';

import {useHTTP} from './HTTP';

function Get() {
    const [page, setPage] = useState(1);
    const {request} = useHTTP();
    const left = '<';
    const right = '>';
    const limit = 10;
    const [leftAvailable, setLeftAvailable] = useState(true);
    const [rightAvailable, setRightAvailable] = useState(true);
    const [len, setLen] = useState(0);
    //   const [limit,setLimit] = useState(10);
    const [action, setAction] = useState(true);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const inputRef = useRef(null);

    useEffect(() => {
        request('http://localhost:7000/len', 'GET')
            .then((res) => res.json())
            .then((data) => setLen(data.length));
        if (len > limit) {
            setRightAvailable(false);
        }
    }, [action, len, request]);

    const handleRight = () => {
        setPage(page + 1);
        // setLeftAvailable(false);
        // console.log('len', len);
        // console.log('page', page);
        // console.log('okrug', Math.ceil(len / limit));
        if (page < 2) {
            setLeftAvailable(false);
        }
        if (Math.ceil(len / limit) <= page + 1) {
            setRightAvailable(true);
        }
    };

    const handleLeft = () => {
        setPage(page - 1);
        console.log(page);
        if (page - 1 == 1) {
            setLeftAvailable(true);
        }
        if (Math.floor(len / limit) < page) {
            setRightAvailable(false);
        }
    };
    const hendlerDelete = (id: string) => {
        request('http://localhost:7000/' + id, 'DELETE');
        setAction(!action);
    };

    const handlerChangeCompleted = async (
        id: string,
        completeValue: boolean,
    ) => {
        setAction(!action);
        await request('http://localhost:7000/' + id, 'PATCH', {
            completed: completeValue,
        });
    };

    const handlerTaskUpdate = async (id, task) => {
        setAction(!action);
        console.log(inputRef.current);
        await request('http://localhost:7000/' + id, 'PATCH', {
            message: task,
        });
    };

    const reciveData = () => {
        request('http://localhost:7000/' + '?page=' + page + '&limit=10')
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                },
            );
    };

    useEffect(reciveData, [action, page, request]);

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div className="list-wrapper">
                <ul>
                    {items.map((item) => (
                        <li key={item._id} className="list">
                            <div className="list-item">
                                <div className="list__input-wrapper-container">
                                    <input
                                        type="checkbox"
                                        name={item._id}
                                        checked={item.completed}
                                        ref={inputRef}
                                        onChange={(e) =>
                                            handlerChangeCompleted(
                                                e.currentTarget.name,
                                                e.currentTarget.checked,
                                            )
                                        }
                                    />
                                    <input
                                        className="inputTask"
                                        type="text"
                                        name={item._id}
                                        /* defaultValue={item.message} */
                                        /*  readOnly={readOnly} */
                                        value={item.message}
                                        /* ref={inputRef} */
                                        onChange={(e) =>
                                            handlerTaskUpdate(
                                                e.currentTarget.name,
                                                e.currentTarget.value,
                                            )
                                        }
                                    />
                                </div>
                                <div className="list__btn-wrapper-container">
                                    {/*                                     <button
                                        className="btn btn-list btn-list-update"
                                   >
                                        UP
                                    </button> */}
                                    <button
                                        className="btn btn-list btn-list-delete"
                                        data-id={item._id}
                                        onClick={(e) =>
                                            hendlerDelete(
                                                e.currentTarget.dataset.id,
                                            )
                                        }>
                                        DELETE
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="arrow-container">
                    <button
                        className="arrow arrow-left"
                        onClick={handleLeft}
                        disabled={leftAvailable}>
                        {left}
                    </button>
                    <button
                        className="arrow arrow-right"
                        onClick={handleRight}
                        disabled={rightAvailable}>
                        {right}
                    </button>
                </div>
            </div>
        );
    }
}

export default Get;
