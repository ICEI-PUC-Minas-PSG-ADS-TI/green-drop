import api from './apiML';

class LocationService {
  async getNearbyLocations(lat, lng, radius = 5000) {
    try {
      const response = await api.get(`/locations/nearby`, {
        params: {
          latitude: lat,
          longitude: lng,
          radius,
        }
      });
      return response.data.locations;
    } catch (error) {
      // eslint-disable-next-line no-console, no-undef
      console.error('Erro na API de localização:', error);
      throw new Error('Não foi possível buscar locais próximos');
    }
  }
}

export const locationService = new LocationService();