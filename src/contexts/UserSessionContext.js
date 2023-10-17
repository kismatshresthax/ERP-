import {createContext} from "react";


const UserSessionContext = createContext({
    token:"",
    user:"",
    setToken:e=>{}
});

export default UserSessionContext