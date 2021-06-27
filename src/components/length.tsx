const length = async () => {
    const header: HeadersInit = {
        'Content-Type': 'application/json',
    };
    const myReq: RequestInit = {
        method: 'GET',
        headers: header,
    };
    const creq = new Request('http://localhost:7000/len', myReq);
    try {
        await fetch(creq);
    } catch (e) {}
};

export default length;
