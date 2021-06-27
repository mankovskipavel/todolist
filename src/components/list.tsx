import React, {useState, useEffect} from 'react';

const url = 'https://dry-waters-58905.herokuapp.com/';

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
    const [action, setAction] = useState(true);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [chengedTask, setchengedTaskId] = useState({_id: '', message: ''});

    useEffect(() => {
        request(url + 'len', 'GET')
            .then((res) => res.json())
            .then((data) => setLen(data.length));
        if (len > limit) {
            setRightAvailable(false);
        }
    }, [action, len, request]);

    const handleRight = () => {
        setPage(page + 1);
        if (page < 2) {
            setLeftAvailable(false);
        }
        if (Math.ceil(len / limit) <= page + 1) {
            setRightAvailable(true);
        }
    };

    const handleLeft = () => {
        setPage(page - 1);
        if (page - 1 == 1) {
            setLeftAvailable(true);
        }
        if (Math.floor(len / limit) < page) {
            setRightAvailable(false);
        }
    };
    const hendlerDelete = (id: string) => {
        request(url + id, 'DELETE');
        setAction(!action);
    };

    const handlerChangeCompleted = async (
        id: string,
        completeValue: boolean,
    ) => {
        await request(url + id, 'PATCH', {
            completed: completeValue,
        });
        setAction(!action);
    };

    const handlerTaskUpdate = async (id: string) => {
        if (chengedTask._id == id) {
            await request(url + chengedTask._id, 'PATCH', {
                message: chengedTask.message,
            });
        }
    };

    const hadleChange = (id, value) => {
        setchengedTaskId({_id: id, message: value});
    };
    const reciveData = () => {
        request(url + '?page=' + page + '&limit=10')
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
                                        onChange={(e) =>
                                            handlerChangeCompleted(
                                                e.currentTarget.name,
                                                e.currentTarget.checked,
                                            )
                                        }
                                    />
                                    <input
                                        className="inputTask"
                                        name={item._id}
                                        defaultValue={item.message}
                                        onChange={(e) =>
                                            hadleChange(
                                                e.currentTarget.name,
                                                e.currentTarget.value,
                                            )
                                        }
                                    />
                                </div>
                                <div className="list__btn-wrapper-container">
                                    <button
                                        className="btn btn-list btn-list-update"
                                        name={item._id}
                                        onClick={(e) =>
                                            handlerTaskUpdate(
                                                e.currentTarget.name,
                                            )
                                        }>
                                        UP
                                    </button>
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
