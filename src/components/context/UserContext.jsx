import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";


const UserContext = createContext()

export const UserProvider = ({ children }) => {

    const [registeredUser, setRegisteredUser] = useState(() => {
        const users = localStorage.getItem("skymart_users");
        return users? JSON.parse(users) : [];
    })

    const [currentUser, setCurrentUser] = useState(() => {
        const session = localStorage.getItem("skymart_session");
        return session ? JSON.parse(session) : null;
    })

    const registerUser = (userData) => {
        const newUsers = [...registeredUser, userData]
        setRegisteredUser(newUsers)
        setCurrentUser(userData)

        localStorage.setItem("skymart_users", JSON.stringify(newUsers))
        localStorage.setItem('skymart_session', JSON.stringify(userData));
    }

    const login = (email, password) => {
        const user = registeredUser.find((u) => u.email === email && u.password === password);

        if (user) {
            setCurrentUser(user);
            localStorage.setItem('skymart_session', JSON.stringify(user));
            return true;
        }
        return false;
    }

    const logout = () => {
        setCurrentUser(null)
        localStorage.removeItem("skymart_session")
    }

    return (<UserContext
        value={{ currentUser, registeredUser, login, registerUser, logout }}
    >
        {children}
    </UserContext>)
}

export const useUser = () => useContext(UserContext);