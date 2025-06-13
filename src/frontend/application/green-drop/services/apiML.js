import axios from "axios";
const api = axios.create({
    baseURL: "https://a8fb-186-248-79-98.ngrok-free.app/v1",
});

export default api;