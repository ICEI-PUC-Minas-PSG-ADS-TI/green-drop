// __tests__/components/cameraComponent.test.jsx

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react-native';
jest.mock('expo-camera', () => {
  return {
    useCameraPermissions: jest.fn(() => [{ granted: true }, jest.fn()]),
    Camera: {
      requestPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted' }),
      takePictureAsync: jest.fn().mockResolvedValue({ uri: 'file://dummy.jpg' }),
    },
  };
});
import { Camera } from 'expo-camera';
import CameraComponent from '@/components/cameraComponent';

// ─── MOCKS ──────────────────────────────────────────────────────────────────
// 1) If CameraComponent calls `useCurrentLocation` internally, mock that hook:
//    (note: point to the real hook file, which is probably "useCurrentLocation.js")
const mockLocation = { coords: { latitude: -23.5, longitude: -46.6 } };
jest.mock('@/components/useCurrentLocation', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    location: mockLocation,
    loading: false,
    error: null,
    refreshLocation: jest.fn(),
    requestPermission: jest.fn(),
  })),
}));

// 2) Mock any other modules used inside CameraComponent (e.g., expo-camera)
jest.mock('expo-camera', () => ({
  Camera: {
    // we can export a barebones stub for Camera
    requestPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted' }),
    takePictureAsync: jest.fn().mockResolvedValue({ uri: 'file://fake-photo.jpg' }),
  },
}));

describe('<CameraComponent />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the camera preview when permission is granted', async () => {
    // If CameraComponent does something like Camera.requestPermissionsAsync() on mount:
    Camera.requestPermissionsAsync.mockResolvedValue({ status: 'granted' });

    render(<CameraComponent />);

    // CameraComponent might show a <Text> asking for permissions initially, then render the preview
    await waitFor(() => {
      // For example, maybe it renders something with testID="camera-preview"
      expect(screen.getByTestId('camera-preview')).toBeTruthy();
    });
  });

  it('should show an error message when location is not available', () => {
    // Force the hook to return an error
    const useCurrentLocation = require('@/components/useCurrentLocation').default;
    useCurrentLocation.mockReturnValue({
      location: null,
      loading: false,
      error: 'Erro de localização',
      refreshLocation: jest.fn(),
      requestPermission: jest.fn(),
    });

    render(<CameraComponent />);

    // Maybe CameraComponent displays a <Text> with /Erro de localização/
    expect(screen.getByText(/erro de localização/i)).toBeTruthy();
  });

  it('should take a picture when the shutter button is pressed', async () => {
    Camera.requestPermissionsAsync.mockResolvedValue({ status: 'granted' });

    render(<CameraComponent />);

    // Assume your CameraComponent has a button with testID="shutter-button"
    const shutterBtn = screen.getByTestId('shutter-button');
    await act(async () => {
      fireEvent.press(shutterBtn);
    });

    // After pressing, it should call Camera.takePictureAsync()
    expect(Camera.takePictureAsync).toHaveBeenCalled();
  });
});
