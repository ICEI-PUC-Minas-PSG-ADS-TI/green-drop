/* eslint-disable no-console*/
/* global console, FormData*/
import { decodeJWT } from '../utils/jwt';
import api from './apiML';

class UsuarioService {
  constructor() {
    this.token = null;
    this.id = null;
    this.mock = {
      displayName: "Usuário de Teste",
      email: "teste@gmail.com",
      telefone: "1234567890",
    };
  }

  setToken(token) {
    this.token = token;
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const decoded = decodeJWT(token);
    console.log("Decoded JWT payload:", decoded);
    this.id = decoded?.sub || decoded?.user_id;
    if (!this.id) {
      console.warn("Nenhum UID (sub/user_id) encontrado no token!");
    }
  }

  clearToken() {
    this.token = null;
    delete api.defaults.headers.common["Authorization"];
    this.id = null;
  }

  async login({ email, senha }) {
    try {
      console.log(email)
      console.log(senha)
      const response = await api.post('/auth/login', { email, password: senha });
      if (response.data.token) {
        this.setToken(response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error("Erro ao logar:", error.response?.data || error.message);
      throw error;
    }
  }

  async cadastro({ nome, email, senha, telefone, imagem }) {
  try {
    const form = new FormData();

    // JSON string
    const userObj = { name: nome, email, phone: telefone, password: senha };
    form.append('user', JSON.stringify(userObj));

    // Foto (se existir)
    if (imagem) {
      form.append('photo', {
        uri: imagem.uri,
        name: imagem.fileName || 'photo.jpg',
        type: imagem.type || 'image/jpeg',
      });
    }

    const response = await api.post('/users', form);

    if (response.status !== 201) {
      throw new Error(`Erro no cadastro: status ${response.status}`);
    }
    return response.data;

  } catch (error) {
    console.error(
      'Erro ao cadastrar usuário:',
      error.response
        ? `${error.response.status} - ${JSON.stringify(error.response.data)}`
        : error.message
    );
    throw error;
  }
}


  async getProfile() {
    if (!this.id) {
      console.warn("ID de usuário não definido. Chame login() antes.");
      return null;
    }
    try {
      const response = await api.get(`/users/${this.id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao obter perfil:", error.response?.data || error.message);
      return null;
    }
  }
}

export const usuarioService = new UsuarioService();
