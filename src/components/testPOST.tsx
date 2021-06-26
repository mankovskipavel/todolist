import React, {useState} from 'react';

function MyComponent() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const mybody: BodyInit = JSON.stringify({
        message: 'task 2200',
        completed: false,
    });
    const header: HeadersInit = {
        'Content-Type': 'application/json',
    };
    const myReq: RequestInit = {
        method: 'POST',
        body: mybody,
        headers: header,
    };
    /*
    const customReq = JSON.stringify({
        method: 'POST',
        body: {
            message: 'task 22',
            completed: false,
        },
    });*/
    const creq = new Request('http://localhost:7000/', myReq);
    // Примечание: пустой массив зависимостей [] означает, что
    // этот useEffect будет запущен один раз
    // аналогично componentDidMount()
    useState(() => {
        //fetch('http://localhost:7000/', creq)
        fetch(creq)
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
    });

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <ul>
                {items.map((item) => (
                    <li key={item._id}>
                        {item.message} {item.completed}
                    </li>
                ))}
            </ul>
        );
    }
}

export default MyComponent;
