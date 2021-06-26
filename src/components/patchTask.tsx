const pathTaskReq = async (id, task) => {
    console.log(id);
    const mybody: BodyInit = JSON.stringify({
        message: task,
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
    console.log(creq);
    try {
        await fetch(creq);
    } catch (e) {}
};

export default pathTaskReq;
