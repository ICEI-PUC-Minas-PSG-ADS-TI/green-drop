/* eslint-disable no-console */
/* global __DEV__, console */
import api from './apiML';

class LocationService {
  constructor() {
    this.mock = [
      { id: 1, name: 'Parque Central', latitude: -23.561, longitude: -46.656, distance: 1200 },
      { id: 2, name: 'Museu da Cidade', latitude: -23.558, longitude: -46.660, distance: 2300 },
      { id: 3, name: 'Praça da Liberdade', latitude: -23.563, longitude: -46.655, distance: 3400 },
    ];
  }

  async getNearbyLocations(lat, lng, radius = 5000) {
    //if (__DEV__) return this.mock;
    try {
      /* const response = await api.get(`/locations/nearby`, {
        params: { latitude: lat, longitude: lng, radius }, //desabilitado
      }); */
      const response = await api.get(`/reports`)
      return response.data;
    } catch (error) {
      console.error('Erro na API de localização:', error);
      throw new Error('Não foi possível buscar locais próximos');
    }
  }
}

export const locationService = new LocationService();