import React, {useState, useEffect} from 'react';
import {DelateRequest} from './DELETE';
function MyComponent() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    function hendlerDelate(id: string) {
        const delReq = DelateRequest();
        console.log(id);
        delReq(id);
        // const url = 'http://localhost:7000/' + id;
        // console.log(url);
        // fetch(url, {method: 'POST'});
    }

    // Примечание: пустой массив зависимостей [] означает, что
    // этот useEffect будет запущен один раз
    // аналогично componentDidMount()
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
    }, []);

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
                                        hendlerDelate(
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

export default MyComponent;
