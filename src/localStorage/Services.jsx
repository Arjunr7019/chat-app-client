const setUser = async()=>{
    await localStorage.setItem('userData', JSON.stringify(value))
}

const getUser = async()=>{
    const value = await localStorage.getItem('userData');
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