import { createContext, useContext, useEffect, useState } from 'react';
import { login, logout, onUserStateChange } from '../api/firebase';


const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState();
    useEffect(() => {
        onUserStateChange(user => {
            console.log(user);
            setUser(user);
        });
        // onUserStateChange((user) => {etUser(user);}); 인자가 동일해서 참조값만 적어도 됨.
    }, []);//처음으로 마운트 됐을 때만


    return (
        <AuthContext.Provider value={{ user, uid: user && user.uid, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    return useContext(AuthContext);

}