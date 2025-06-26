/* eslint-disable no-console */
/* global console, FormData */
import api from './apiML';

class ReporteService {
  constructor() {
    this.mockResponse = { status: 'success' };
  }

  async uploadProblemReport(data, image) {
    //if (__DEV__) return this.mockResponse;
    if (!image?.uri) throw new Error('Imagem inválida');

    const form = new FormData();
    form.append('photo', {
      uri: image.uri,
      name: image.uri.split('/').pop(),
      type: image.type || 'image/jpeg',
    });
    form.append('report', {
      userId: data.userId,
      description: data.description,
      createdAt: data.createdAt,
      latitude: data.latitude,
      longitude: data.longitude,
      category: data.category,
      problemType: data.problemType,
      relevance: data.relevance,
      status: data.status,
    })
    console.log(form);
    const response = await api.post('/reports', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (response.status < 200 || response.status >= 300) {
      const text = await response.text();
      throw new Error(`Upload falhou: ${response.status} - ${text}`);
    }
    return;
  }
}

export const reporteService = new ReporteService();