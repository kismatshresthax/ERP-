import {createContext} from "react";

const UserAuthenticationContext = createContext({
    permissions:"",
    //curr_mod_permission:"",
    //per:""
});

export default UserAuthenticationContext;