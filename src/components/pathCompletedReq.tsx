import {useCallback} from 'react';

export const PathhCompletedRequest = () => {
    const pathCompletedReq = useCallback(async (id, comleteValue) => {
        const mybody: BodyInit = JSON.stringify({
            _id: id,
            completed: comleteValue,
        });
        const header: HeadersInit = {
            'Content-Type': 'application/json',
        };
        const myReq: RequestInit = {
            method: 'PATCH',
            body: mybody,
            headers: header,
        };
        const creq = new Request('http://localhost:7000/' + id, myReq);
        try {
            await fetch(creq);
        } catch (e) {}
    }, []);

    return {pathCompletedReq};
};
