const getToken = async() => {
    try {
    const token = localStorage.getItem("Token")
    console.log(token,'888888888888888888888888888888888888888888888888888888')
    if(token){
        return token
    }else{
        return null
    }
    } catch (error) {
        console.log(error.message)
    }
}

const getAuthHeader = async() => {
    const token = await getToken()
    console.log(token,'dddddddddddddddddddddd')
    return token ? {"Authorization": `Bearer ${token}`}: {}
}
export default getAuthHeader