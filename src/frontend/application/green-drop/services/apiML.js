/* eslint-disable no-console */
// apiML.js
/* global console, FormData */
import axios from "axios";

const api = axios.create({
  baseURL: "https://0a83-2804-d45-997c-c600-bc38-f29-bec9-47ef.ngrok-free.app/v1",
  headers: {
    "Accept": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
  timeout: 30000,
});

api.interceptors.request.use(config => {
  // Logs para debug
  console.log('Enviando requisição para:', config.url);
  console.log('Método:', config.method);
  console.log('Headers:', config.headers);
  
  // Log detalhado do FormData
  if (config.data instanceof FormData) {
    console.log('FormData content:');
    config.data._parts.forEach((part, i) => {
      console.log(`Part ${i}: ${part[0]} = ${typeof part[1] === 'string' ? part[1] : '[Object]'}`);
    });
  }
  
  return config;
}, error => Promise.reject(error));

api.interceptors.response.use(response => response, error => {
  if (error.response) {
    console.log('Resposta de erro:', error.response.status, error.response.data);
  } else {
    console.log('Erro de rede:', error.message);
  }
  return Promise.reject(error);
});

export default api;