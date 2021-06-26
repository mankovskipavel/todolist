import {useCallback} from 'react';

export const PostRequest = () => {
    const request = useCallback(async (task) => {
        const mybody: BodyInit = JSON.stringify({
            message: task,
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
        const creq = new Request('http://localhost:7000/', myReq);
        try {
            await fetch(creq);
        } catch (e) {}
    }, []);

    return {request};
};
