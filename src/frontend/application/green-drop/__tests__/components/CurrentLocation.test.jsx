// __tests__/components/CurrentLocation.test.jsx

import { renderHook, act } from '@testing-library/react-hooks';
import { Alert, Platform } from 'react-native';
import useCurrentLocation from '@/components/useCurrentLocation';

jest.mock('expo-location', () => {
  return {
    __esModule: true,
    Accuracy: {
      High: 'high',
      Balanced: 'balanced',
      Low: 'low',
    },
    requestForegroundPermissionsAsync: jest.fn(),
    getCurrentPositionAsync: jest.fn(),
    watchPositionAsync: jest.fn(),
  };
});

import * as Location from 'expo-location';

jest.spyOn(Alert, 'alert').mockImplementation(() => {});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('useCurrentLocation', () => {
  const fakeCoords = { latitude: -23.5505, longitude: -46.6333, accuracy: 5 };
  const fakeLocation = { coords: fakeCoords };

  it('deve iniciar com estado de loading', async () => {
    Location.requestForegroundPermissionsAsync.mockResolvedValue({
      status: 'granted',
    });
    Location.getCurrentPositionAsync.mockResolvedValue(fakeLocation);

    const { result, waitForNextUpdate } = renderHook(() => useCurrentLocation());

    expect(result.current.loading).toBe(true);
    expect(result.current.location).toBeNull();
    expect(result.current.error).toBeNull();

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.location).toEqual(fakeLocation);
    expect(result.current.error).toBeNull();
  });

  it('deve lidar com permissão concedida', async () => {
    Location.requestForegroundPermissionsAsync.mockResolvedValue({
      status: 'granted',
    });
    Location.getCurrentPositionAsync.mockResolvedValue(fakeLocation);

    const { result, waitForNextUpdate } = renderHook(() => useCurrentLocation());

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.location).toEqual(fakeLocation);
    expect(result.current.error).toBeNull();
  });

  it('deve lidar com permissão negada', async () => {
    Location.requestForegroundPermissionsAsync.mockResolvedValue({
      status: 'denied',
    });

    const { result, waitForNextUpdate } = renderHook(() => useCurrentLocation());

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.location).toBeNull();
    expect(result.current.error).toMatch(/Permissão negada/);
  });

  it('deve atualizar localização quando watchPosition é true', async () => {
    Location.requestForegroundPermissionsAsync.mockResolvedValue({
      status: 'granted',
    });
    Location.getCurrentPositionAsync.mockResolvedValue(fakeLocation);

    const newFakeLoc = {
      coords: { latitude: -23.5510, longitude: -46.6330, accuracy: 4 },
    };
    
    let watchCallback;
    const mockRemove = jest.fn();
    Location.watchPositionAsync.mockImplementation((opts, callback) => {
      watchCallback = callback;
      return Promise.resolve({
        remove: mockRemove
      });
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useCurrentLocation({ watchPosition: true })
    );

    // Esperar posição inicial
    await waitForNextUpdate();

    // Simular nova posição
    act(() => {
      watchCallback(newFakeLoc);
    });

    // Verificar atualização
    expect(result.current.location.coords).toEqual(newFakeLoc.coords);
  });

  it('deve lidar com erro de localização', async () => {
    // Forçar plataforma Android
    jest.spyOn(Platform, 'select').mockImplementation(config => config.android);

    Location.requestForegroundPermissionsAsync.mockResolvedValue({
      status: 'granted',
    });
    Location.getCurrentPositionAsync.mockRejectedValue(
      new Error('GPS desligado')
    );

    const { result, waitForNextUpdate } = renderHook(() => useCurrentLocation());

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.location).toBeNull();
    expect(result.current.error).toMatch(/Habilite a localização precisa/);
  });

  it('deve cancelar watchPosition no unmount', async () => {
    Location.requestForegroundPermissionsAsync.mockResolvedValue({
      status: 'granted',
    });
    Location.getCurrentPositionAsync.mockResolvedValue(fakeLocation);
    
    const mockRemove = jest.fn();
    Location.watchPositionAsync.mockResolvedValue({
      remove: mockRemove,
    });

    const { unmount, waitForNextUpdate } = renderHook(() =>
      useCurrentLocation({ watchPosition: true })
    );

    await waitForNextUpdate();
    unmount();
    expect(mockRemove).toHaveBeenCalled();
  });
});