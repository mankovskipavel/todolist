import React, {useState, useEffect} from 'react';
//import delReq from './DELETE';
// import length from './length';
//import pathCompletedReq from './patchCompleted';
//import pathTaskReq from './patchTask';

import {useHTTP} from './HTTP';

function Get() {
    const {request} = useHTTP();
    const left = '<';
    const right = '>';
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const hendlerDelete = async (id: string) => {
        await request('http://localhost:7000/' + id, 'DELETE');
    };

    const handlerChangeCompleted = async (
        id: string,
        completeValue: boolean,
    ) => {
        await request('http://localhost:7000/' + id, 'PATCH', {
            completed: completeValue,
        });
    };

    const handlerTaskUpdate = async (id: string, task: string) => {
        await request('http://localhost:7000/' + id, 'PATCH', {message: task});
    };

    useEffect(() => {
        request('http://localhost:7000/').then(
            (result) => {
                setIsLoaded(true);
                setItems(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            },
        );
    });

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
                                        type="text"
                                        name={item._id}
                                        value={item.message}
                                        onChange={(e) =>
                                            handlerTaskUpdate(
                                                e.currentTarget.name,
                                                e.currentTarget.value,
                                            )
                                        }
                                    />
                                </div>
                                <div className="list__btn-wrapper-container">
                                    {/*                                     <button className="btn btn-list btn-list-update">
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
                    <button className="arrow arrow-left">{left}</button>
                    <button className="arrow arrow-right">{right}</button>
                </div>
            </div>
        );
    }
}

export default Get;
