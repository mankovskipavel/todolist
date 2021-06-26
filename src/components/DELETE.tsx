import {useCallback} from 'react';

export const DelateRequest = () => {
    const delReq = useCallback(async (id: string) => {
        const header: HeadersInit = {
            'Content-Type': 'application/json',
        };
        const myReq: RequestInit = {
            method: 'DELETE',
            headers: header,
        };
        const creq = new Request('http://localhost:7000/' + id, myReq);
        try {
            await fetch(creq);
        } catch (e) {}
    }, []);

    return {delReq};
};
