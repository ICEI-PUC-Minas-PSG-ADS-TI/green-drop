/* eslint-disable no-console*/
/* global console, FormData, fetch*/
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
    this.id = decoded?.id;
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

  async logout() {
    try {
      this.clearToken()
      const response = await api.post('/auth/logout');
      return;
    } catch (error) {
      console.error("Erro ao deslogar:", error.response?.data || error.message);
      throw error;
    }
  }

  async cadastro({ nome, email, senha, telefone, imagem }) {
    try {
      const form = new FormData();

      // Campo user como string JSON
      form.append('user', JSON.stringify({
        name: nome,
        email,
        phone: telefone,
        password: senha,
      }));

      // Tratamento especial para imagens
      if (imagem) {
        // A propriedade 'type' do objeto File já contém o MIME type correto (ex: 'image/jpeg').
        // O terceiro argumento do append é opcional e serve para especificar o nome do arquivo no servidor.
        // Não precisamos de um objeto de configuração aqui.
        form.append('image', imagem, imagem.name);
      }

      console.log('Enviando formulário:', JSON.stringify(form, null, 2));

      const response = await api.post('/users', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Erro detalhado:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: error.config
      });
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
      console.log(response)
      return response.data;
    } catch (error) {
      console.error("Erro ao obter perfil:", error.response?.data || error.message);
      return null;
    }
  }
  async getHistorico() {
    if (!this.id) {
      console.warn("Usuário não logado");
      return null;
    }
    try {
      const response = await api.get(`/reports/user/${this.id}`);
      console.log(response)
      console.log('carregou')
      return response.data;
    } catch (error) {
      console.error("Erro ao obter historico:", error.response?.data || error.message);
      return null;
    }
  }
}

export const usuarioService = new UsuarioService();
