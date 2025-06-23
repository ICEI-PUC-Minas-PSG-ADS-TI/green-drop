import { describe, it, expect, jest } from '@jest/globals';
import * as usuario from '@/services/Usuario';
import api from '@/services/apiML.js';

jest.mock('@/services/apiML.js', () => ({
  post: jest.fn()
}));

describe('UsuarioService', () => {
  it('should be defined', () => {
    expect(usuario).toBeDefined();
  });

  describe('login', () => {
    it('login bem-sucedido', async () => {
      api.post.mockResolvedValue({ status: 200, data: { user: 'ok' } });
      const res = await usuario.login('a@a.com', '123');
      expect(res).toEqual({ user: 'ok' });
    });
    it('login falha com status diferente de 200', async () => {
      api.post.mockResolvedValue({ status: 401, data: {} });
      await expect(usuario.login('a@a.com', '123')).rejects.toThrow('Erro no login');
    });
    it('login retorna null em erro', async () => {
      api.post.mockRejectedValue(new Error('fail'));
      const res = await usuario.login('a@a.com', '123');
      expect(res).toBeNull();
    });
  });

  describe('cadastro', () => {
    it('cadastro bem-sucedido', async () => {
      api.post.mockResolvedValue({ status: 201, data: { user: 'ok' } });
      const res = await usuario.cadastro('nome', 'a@a.com', '123', '999', 'user');
      expect(res).toEqual({ user: 'ok' });
    });
    it('cadastro falha com status diferente de 201', async () => {
      api.post.mockResolvedValue({ status: 400, data: {} });
      await expect(usuario.cadastro('nome', 'a@a.com', '123', '999', 'user')).rejects.toThrow('Erro no cadastro');
    });
    it('cadastro retorna null em erro', async () => {
      api.post.mockRejectedValue(new Error('fail'));
      const res = await usuario.cadastro('nome', 'a@a.com', '123', '999', 'user');
      expect(res).toBeNull();
    });
  });
});
