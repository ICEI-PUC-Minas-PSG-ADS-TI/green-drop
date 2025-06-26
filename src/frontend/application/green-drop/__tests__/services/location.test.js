import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { LocationService } from '@/services/Location';
import axios from 'axios';


jest.mock('axios');

describe('LocationService', () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  it('busca locais próximos com sucesso', async () => {
    // 1) Mock axios.get to resolve with a fake response
    const fakeData = [ { id: 1, name: 'Local A' }, { id: 2, name: 'Local B' } ];
    axios.get = jest.fn().mockResolvedValue({ data: fakeData });

    // 2) Now call getNearbyLocations; it should return fakeData
    const result = await LocationService.getNearbyLocations(-23.5, -46.6, 1000);
    expect(result).toEqual(mockData.locations);
    expect(axios.get).toHaveBeenCalledWith(
      'https://api.greendrop.com/v1/locations/nearby',
      {
        params: {
          latitude: -23.55,
          longitude: -46.63,
          radius: 5000,
          limit: 20
        }
      }
    );
  });

  it('lança erro na falha da API', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));
    
    await expect(LocationService.getNearbyLocations(0, 0))
      .rejects
      .toThrow('Não foi possível buscar locais próximos');
  });
});