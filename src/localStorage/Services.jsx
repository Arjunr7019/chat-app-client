const setUser = async()=>{
    await localStorage.setItem('ChatAppUserData', JSON.stringify(value))
}

const getUser = async()=>{
    const value = await localStorage.getItem('ChatAppUserData');
    return JSON.parse(value);
}

const Logout = ()=>{
    localStorage.clear();
}

export default {
    setUser,
    getUser,
    Logout
}