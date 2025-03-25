import React from "react";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi, registerApi } from "../services/AuthService";
import { toast } from "react-toastify";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) =>
{
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() =>
    {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (user && token)
        {
            setUser(JSON.parse(user));
            setToken(token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        }
        setIsReady(true);
    }, []);

    const registerUser = async (username, email, password) =>
    {
        await registerApi(username, email, password)
            .then((res) =>
            {
                if (res)
                {
                    localStorage.setItem("token", res.data.token);
                    const userObj = {
                        userName: res.data.userName,
                        email: res.data.email
                    }
                    localStorage.setItem("user", JSON.stringify(userObj));
                    setToken(res.data.token);
                    setUser(userObj);
                    toast.success("Login Success!")
                    navigate("/")
                }
            })
            .catch((e) => toast.warning(`Server error occurred: ${e}`));
    }

    const loginUser = async (username, password) =>
    {
        await loginApi(username, password)
            .then((res) =>
            {
                if (res)
                {
                    localStorage.setItem("token", res.data.token);
                    const userObj = {
                        userName: res.data.userName,
                        email: res.data.email
                    }
                    localStorage.setItem("user", JSON.stringify(userObj));
                    setToken(res.data.token);
                    setUser(userObj);
                    toast.success("Login Success!")
                    navigate("/")
                }
            }).catch((e) => toast.warning("Server error occurred"));
    }

    /**
     * Function to validate if user is logged in
     * @returns 
     */
    const isLoggedIn = () =>
    {
        return !!user;
    }

    /**
     * Logs out user by removing token and user info from local storage
     */
    const logout = () =>
    {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken(null);
        navigate("/")
    }

    return (
        <UserContext.Provider value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}>
            {isReady ? children : null}
        </UserContext.Provider>
    );

}

export const useAuth = () => React.useContext(UserContext);