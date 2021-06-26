const delReq = async (id: string) => {
    const objectId: string = id;
    const header: HeadersInit = {
        'Content-Type': 'application/json',
    };
    const myReq: RequestInit = {
        method: 'DELETE',
        headers: header,
    };
    const creq = new Request('http://localhost:7000/' + objectId, myReq);
    try {
        await fetch(creq);
    } catch (e) {}
};

export default delReq;
