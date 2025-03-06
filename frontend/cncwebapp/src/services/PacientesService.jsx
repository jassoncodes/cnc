import axios from "axios"
import Api from "../api/api";

const api_host = import.meta.env.VITE_API_HOST;
const api_port = import.meta.env.VITE_API_PORT;
const api_root = import.meta.env.VITE_API_ROOT;
const api_pacientes = import.meta.env.VITE_API_PACIENTES

// http://localhost:[port]/api/pacientes
const api_url = `${api_host}:${api_port}${api_root}${api_pacientes}`;

export const getPacientesAsync = async () =>
{
    try
    {
        const data = await Api.get(api_url, { withCredentials: true });
        return data;
    } catch (error)
    {
        console.error(`error message: ${error.message}`);
    }
}

export const getPacientesByIdAsync = async (pacienteId) =>
{
    try
    {
        const data = await Api.get(`${api_url}/${pacienteId}`, { withCredentials: true });
        return data;
    } catch (error)
    {
        console.error(`error message: ${error.message}`);
    }
}

export const createPacienteAsync = async (paciente) =>
{
    try
    {
        const data = await Api.post(api_url, paciente, { withCredentials: true });
        return data;
    } catch (error)
    {
        console.error(`error message: ${error.message}`);
    }
}

export const updatePacienteAsync = async (pacienteId, pacienteData) =>
{
    try
    {
        const editResult = await Api.put(`${api_url}/${pacienteId}`, pacienteData);
        return editResult;
    } catch (error)
    {
        console.error(`error message: ${error}`)
    }
}

export const deactivatePacienteAsync = async (pacienteId) =>
{
    try
    {
        const deactivateResult = await Api.patch(`${api_url}/disable/${pacienteId}`)
        return deactivateResult;
    } catch (error)
    {
        console.error(`error message: ${error}`)
    }
}