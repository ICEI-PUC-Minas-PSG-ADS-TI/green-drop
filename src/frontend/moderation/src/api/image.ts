import { api } from '../lib/axios';

export async function getImageBase64(fullUrl: string) {
  try {
    const response = await api.get(fullUrl, {
      responseType: 'text',
      baseURL: ''
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao carregar imagem:', error);
    throw error;
  }
}