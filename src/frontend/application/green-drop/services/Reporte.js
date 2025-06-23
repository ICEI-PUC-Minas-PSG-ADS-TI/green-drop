/* global __DEV__, FormData */
import api from './apiML';

class ReporteService {
  constructor() {
    this.mockResponse = { reportId: 123, status: 'success', message: 'Relatório enviado (mock)' };
  }

  async uploadProblemReport(data, image) {
    if (__DEV__) return this.mockResponse;
    if (!image?.uri) throw new Error('Imagem inválida');

    const form = new FormData();
    form.append('photo', {
      uri: image.uri,
      name: image.uri.split('/').pop(),
      type: image.type || 'image/jpeg',
    });
    Object.entries(data).forEach(([key, val]) => form.append(key, String(val)));

    const response = await api.post('/reports', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (response.status < 200 || response.status >= 300) {
      const text = await response.text();
      throw new Error(`Upload falhou: ${response.status} - ${text}`);
    }
    return response.data;
  }
}

export const reporteService = new ReporteService();