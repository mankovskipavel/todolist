import React, {useState, useEffect /* useCallback */} from 'react';
import delReq from './DELETE';
// import {PathhCompletedRequest} from './pathCompletedReq';
function Get() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const hendlerDelete = (id: string) => {
        delReq(id);
    };
    // const handlerChangeCompleted = (id: string, completeValue) => {
    //     console.log(completeValue);
    //     const {pathCompletedReq} = PathhCompletedRequest();
    //     pathCompletedReq(id, completeValue);
    // };

    //console.log(items);
    useEffect(() => {
        fetch('http://localhost:7000/')
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                },
            );
    }),
        [];

    //console.log(items);
    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <ul>
                {items.map((item) => (
                    <li key={item._id} className="list">
                        <div className="list-item">
                            <div className="list__input-wrapper-container">
                                <input
                                    type="checkbox"
                                    name={item._id}
                                    checked={item.completed}
                                    onClick={
                                        () => console.log('click')
                                        /* (e) => console.log(e.currentTarget) */
                                        /*        handlerChangeCompleted(
                                            e.currentTarget.dataset.name,
                                            e.currentTarget.checked,
                                        ) */
                                    }
                                />
                                <p>{item.message}</p>
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
        );
    }
}

export default Get;
