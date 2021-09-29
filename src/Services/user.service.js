import axios from 'axios';


const apiUrl = '';
const BettingAPI = axios.create({
    baseURL: apiUrl
});

const FreeOnlineAPI = axios.create({
    baseURL: 'https://fakestoreapi.com/'
})

const RegisterUser = async (username, password) => {
    const newPost = {
        userName: username,
        password: password
    };
    try {
        const resp = await axios.post('punters/login', newPost);
        console.log(resp.data)
        return resp.data;
    } catch (err) {
        return err;
        
    }
};

const LoginUser = async (username, password) => {
    const newPost = {
        userName: username,
        password: password
    };
    try {
        const resp = await (await axios.post('punters/login', newPost)).data;
        console.log('error ' + resp)
        if(resp.responseObject === -1){
            return resp.responseMessage;
        }
        sessionStorage.setItem('BettingToken', JSON.stringify(resp.data.responseObject.accessToken));
        sessionStorage.setItem('BettingUser', username);
        return resp;
    } catch (err) {
        console.log('error ' + err)
        return err;
        
    }
};

const LogOut = () => {
    sessionStorage.removeItem('BettingToken');
    sessionStorage.removeItem('BettingUser');
}

const AutHeader = () => {
    let token = JSON.parse(sessionStorage.getItem('BettingToken'));
    if (token) {
        return {
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + token.access_token 
        };
    } else {
        return {};
    }
}

const GetLoginUser = () => {
    let username = sessionStorage.getItem('BettingUser');
    return username;
}

const IsLogin = () =>{
    const user = sessionStorage.getItem('BettingUser');  
    return (user != null) ? true : false;
}

export const userService = {
    RegisterUser,
    LoginUser,
    LogOut,
    AutHeader,
    IsLogin,
    GetLoginUser,
    BettingAPI,
    FreeOnlineAPI
};