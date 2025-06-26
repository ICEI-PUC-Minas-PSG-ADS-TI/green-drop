import axios from "axios";
const api = axios.create({
    baseURL: "https://d77d-2804-d45-9962-300-9a8-7d40-f342-b081.ngrok-free.app/v1",
});

export default api;