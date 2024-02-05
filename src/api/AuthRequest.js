import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:5001" });
const API = axios.create({ baseURL: "http://localhost:8080" });
export const logIn = (FormData) => API.post("/auth/login", FormData);

//export const logIn = (FormData) => API.post("/auth/login", FormData);
