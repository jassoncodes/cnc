import axios from "axios"
import Api from "../api/api";

const api_host = import.meta.env.VITE_API_HOST;
const api_port = import.meta.env.VITE_API_PORT;
const api_root = import.meta.env.VITE_API_ROOT;

const api_base = `${api_host}:${api_port}/${api_root}`;

export const getPacientesAsync = async (route) =>
{
    let apiRoute = `${api_base}/${route}`;

    try
    {
        const data = await Api.get(apiRoute, { withCredentials: true });
        return data;
    } catch (error)
    {
        console.log(`error message: ${error.message}`);
    }
}

export const getPacientesByIdAsync = async (route, pacienteId) =>
{
    const apiRoute = `${api_base}/${route}/${pacienteId}`;
    try
    {
        const data = await Api.get(apiRoute, { withCredentials: true });
        return data;
    } catch (error)
    {
        console.log(`error message: ${error.message}`);
    }
}

export const createPacienteAsync = async (route, paciente) =>
{

    const apiRoute = `${api_base}/${route}`;

    try
    {
        const data = await Api.post(apiRoute, paciente, { withCredentials: true });
        return data;
    } catch (error)
    {
        console.log(`error message: ${error.message}`);
    }
}

