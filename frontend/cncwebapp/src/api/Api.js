import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:5000/api",
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
