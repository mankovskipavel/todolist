import React, {useState, useEffect} from 'react';
import delReq from './DELETE';
import length from './length';
import pathCompletedReq from './patchCompleted';
import pathTaskReq from './patchTask';
function Get() {
    const left = '<';
    const right = '>';
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    // const [query, setQuery] = useState('');
    // setQuery('?page=1&limit=10');

    //const [len, setLen] = useState(0);
    const len = length();
    //setLen(length());
    console.log(len);
    //setLen(items.length);
    // console.log(len, query);
    const hendlerDelete = (id: string) => {
        delReq(id);
    };
    const handlerChangeCompleted = (id: string, completeValue: boolean) => {
        pathCompletedReq(id, completeValue);
    };

    const handlerTaskCompleted = (id: string, task: string) => {
        pathTaskReq(id, task);
    };

    useEffect(() => {
        fetch('http://localhost:7000/' + '?page=1&limit=10')
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
    }, []);

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
                                            handlerTaskCompleted(
                                                e.currentTarget.name,
                                                e.currentTarget.value,
                                            )
                                        }
                                    />
                                </div>
                                <div className="list__btn-wrapper-container">
                                    <button className="btn btn-list btn-list-update">
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
                    <button className="arrow arrow-left">{left}</button>
                    <button className="arrow arrow-right">{right}</button>
                </div>
            </div>
        );
    }
}

export default Get;
