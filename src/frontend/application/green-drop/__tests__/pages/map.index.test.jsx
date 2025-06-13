// __tests__/pages/map.index.test.jsx

// 1) Mock react-native-maps so <MapView testID="map-view" /> is a simple View with testID
jest.mock('react-native-maps', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  const MockMapView = ({ children, testID }) => <View testID={testID}>{children}</View>;
  MockMapView.Marker = ({ title }) => <Text>{title}</Text>;
  return {
    __esModule: true,
    default: MockMapView,
  };
});

// 2) Mock expo-location and the custom hook
jest.mock('expo-location');
jest.mock('@/components/useCurrentLocation');

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react-native';
import MapScreen from '../../pages/map/index.jsx'; // ensure this matches default export
import { LocationService } from '@/services/Location';
import useCurrentLocation from '@/components/useCurrentLocation';

// 3) Stub useNavigation (MapScreen uses navigation.navigate)
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ navigate: jest.fn() }),
}));

describe('<MapScreen />', () => {
  const fakeCoords = { latitude: -23.5505, longitude: -46.6333 };
  const fakeLocationObj = { coords: fakeCoords };
  const fakeNearbyLocations = [
    { id: '1', name: 'Local Teste 1', latitude: -23.5505, longitude: -46.6333, description: 'Descrição teste', category: 'Cat A' },
    { id: '2', name: 'Local Teste 2', latitude: -23.5600, longitude: -46.6400, description: 'Descrição teste 2', category: 'Cat B' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    // Always pretend the hook has resolved
    useCurrentLocation.mockReturnValue({
      location: fakeLocationObj,
      loading: false,
      error: null,
      refreshLocation: jest.fn(),
      requestPermission: jest.fn(),
    });

    // And pretend the service returns two locations
    LocationService.getNearbyLocations.mockResolvedValue(fakeNearbyLocations);
  });

  it('combina com snapshot', () => {
    const tree = render(<MapScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('deve lidar com situação de sucesso', async () => {
    const { getByTestId, getByText } = render(<MapScreen />);
    await waitFor(() => {
      // Now <MapView testID="map-view" /> is rendered by our mock,
      // and the first Marker is a <Text> “Local Teste 1”
      expect(getByTestId('map-view')).toBeTruthy();
      expect(getByText('Local Teste 1')).toBeTruthy();
    });
  });

  it('exibe loading durante busca de locais', async () => {
    // 1) Hook says “done loading” so that MapView / markers can appear…
    useCurrentLocation.mockReturnValue({
      location: fakeLocationObj,
      loading: false,
      error: null,
      refreshLocation: jest.fn(),
      requestPermission: jest.fn(),
    });
    // 2) But service is still pending
    let resolveNearby;
    const pending = new Promise((res) => { resolveNearby = res; });
    LocationService.getNearbyLocations.mockReturnValue(pending);

    const { getByText } = render(<MapScreen />);
    // Since service is pending, isLoading === true, so “Buscando locais…” should show
    expect(getByText('Buscando locais...')).toBeTruthy();

    // Now resolve and wait for markers
    await act(async () => {
      resolveNearby(fakeNearbyLocations);
    });
    await waitFor(() => {
      expect(getByText('Local Teste 1')).toBeTruthy();
    });
  });

  it('mostra erro de localização', () => {
    useCurrentLocation.mockReturnValue({
      location: null,
      loading: false,
      error: 'Verifique as permissões',
      refreshLocation: jest.fn(),
      requestPermission: jest.fn(),
    });

    const { getByText } = render(<MapScreen />);
    expect(getByText(/verifique as permissões/i)).toBeTruthy();
  });

  it('atualiza região ao buscar novos locais', async () => {
    const mockRefresh = jest.fn();
    useCurrentLocation.mockReturnValue({
      location: fakeLocationObj,
      loading: false,
      error: null,
      refreshLocation: mockRefresh,
      requestPermission: jest.fn(),
    });
    LocationService.getNearbyLocations.mockResolvedValue(fakeNearbyLocations);

    const { getByTestId, getByText } = render(<MapScreen />);
    await waitFor(() => {
      expect(getByTestId('map-view')).toBeTruthy();
    });

    fireEvent.press(getByTestId('refresh-button'));
    expect(mockRefresh).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(getByText('Local Teste 1')).toBeTruthy();
    });
  });

  it('mostra detalhes do marcador ao clicar', async () => {
    const { getByText, findByText } = render(<MapScreen />);
    await waitFor(() => {
      expect(getByText('Local Teste 1')).toBeTruthy();
    });
    fireEvent.press(await findByText('Local Teste 1'));
    expect(getByText('Descrição teste')).toBeTruthy();
  });
});
