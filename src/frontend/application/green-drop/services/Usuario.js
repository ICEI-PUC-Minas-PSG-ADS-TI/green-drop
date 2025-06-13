import api from "./apiML";

class UsuarioService {
  async login({ email, telefone, senha }) {
    const payload = {
      password: senha,
      ...(email ? { email } : {}),
      ...(telefone ? { phoneNumber: telefone } : {}),
    };
    try {
      const response = await api.post('/users/login', payload);
      if (response.status !== 200) throw new Error('Erro no login');
      return response.data;

    } catch (error) {
      console.error("Erro ao logar:", error);
      return null;

    }
  }

  async cadastro({ nome, email, senha, telefone, role = 'user' }) {
    try {
      const response = await api.post(`/users/${role}`, {
        displayName: nome,
        email,
        password: senha,
        phoneNumber: telefone,
      });
      if (response.status !== 201) throw new Error('Erro no cadastro');
      return response.data;
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      return null;
    }
  }
}

  export const usuarioService = new UsuarioService();

