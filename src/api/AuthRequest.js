import axios from "axios";

const API = axios.create({ baseURL: "https://server-bt-tasks.onrender.com" });

export const logIn = (FormData) => API.post("/auth/login", FormData);

//export const logIn = (FormData) => API.post("/auth/login", FormData);
