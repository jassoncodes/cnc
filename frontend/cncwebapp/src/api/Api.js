import axios from "axios";

const api_host = import.meta.VITE_API_HOST;
const api_port = import.meta.VITE_API_PORT;
const api_root = import.meta.VITE_API_ROOT;

const API_URL = `${api_host}:${api_port}/${api_root}`;

const Api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Permite enviar cookies como el JWT almacenado
});

Api.interceptors.request.use(
  (config) => {
    // Puedes agregar lógica adicional si necesitas manipular el token
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default Api;
