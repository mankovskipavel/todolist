import {useState, useCallback} from 'react';

export const useHTTP = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null) => {
        setLoading(true);
        try {
            if (body) {
                body = JSON.stringify(body);
            }
            const header: HeadersInit = {
                'Content-Type': 'application/json',
            };
            const req = new Request(url, {
                method,
                headers: header,
                body,
            });
            //await fetch(req);
            const response = await fetch(req);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так');
            }

            setLoading(false);

            return data;
        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return {loading, request, error, clearError};
};
