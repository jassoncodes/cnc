import axios from "axios";
import { handleError } from "../utils";
import Api from "../api/api";

const api_host = import.meta.env.VITE_API_HOST;
const api_port = import.meta.env.VITE_API_PORT;
const api_root = import.meta.env.VITE_API_ROOT;

const api_base = `${api_host}:${api_port}/${api_root}`;

export const loginApi = async (username, password) =>
{
    try
    {
        const data = await Api.post(
            api_base + "/account/login",
            { userName: username, password: password },
            { withCredentials: true });
        return data;
    } catch (error)
    {
        handleError(error)
    }
}

export const registerApi = async (username, email, password) =>
{
    try
    {
        const data = await Api.post(
            api_base + "/account/register",
            { userName: username, email: email, password: password },
            { withCredentials: true });
        return data;
    } catch (error)
    {
        handleError(error)
    }
}