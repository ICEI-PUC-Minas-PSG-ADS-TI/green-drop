/*global __DEV__*/
import api from './apiML';

class GameService {
  constructor() {
    this.mock = {
      userStats: { pontos: 150 },
      conquistas: [
        { id: 1, titulo: "Primeiros Passos", descricao: "Faça sua primeira contribuição", completo: true },
        { id: 2, titulo: "Explorador Nato", descricao: "Visite 50 locais diferentes", completo: false },
      ],
      desafios: [
        { id: 1, titulo: "Explorador Iniciante", descricao: "Adicione 5 novos locais", progresso: "3/5", completo: false },
        { id: 2, titulo: "Contribuidor Ativo", descricao: "Faça 10 contribuições este mês", progresso: "7/10", completo: false },
      ],
      historico: [
        {
          id: 1,
          category: 'infra',                    // id da categoria
          status: 'Accepted',                   // situação atual
          problemType: 'Calçadas Danificadas',  // tipo específico
          relevance: 3,                         // nível de relevância (1–5)
          description: 'Calçada quebrada na Rua das Flores, dificultando passagem de pedestres.',
          photo: { uri: 'https://picsum.photos/200/200' }
        },
        {
          id: 2,
          category: 'infra',
          status: 'Pending',
        problemType: 'Buracos na Via',
          relevance: 2,
          description: 'Avenida Principal com vários buracos, risco de acidentes.',
          photo: { uri: 'https://picsum.photos/id/237/200/200' }
        },
        {
          id: 3,
          category: 'servicos',
          status: 'Rejected',
          problemType: 'Quedas de Energia Elétrica',
          relevance: 4,
          description: 'Frequentes quedas de energia no bairro Nova Vista durante a noite.',
          photo: { uri: 'https://picsum.photos/id/297/200/200' }
        },
      ],
    };
  }

  async getUserStats() {
    if (__DEV__) return this.mock.userStats;
    const response = await api.get('/game/userStats');
    return response.data;
  }

  async getConquistas() {
    if (__DEV__) return this.mock.conquistas;
    const response = await api.get('/game/conquistas');
    return response.data;
  }

  async getDesafios() {
    if (__DEV__) return this.mock.desafios;
    const response = await api.get('/game/desafios');
    return response.data;
  }

  async getHistorico() {
    if (__DEV__) return this.mock.historico;
    const response = await api.get('/game/historico');
    return response.data;
  }
}

export const gameService = new GameService();
