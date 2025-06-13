// components/useCurrentLocation.js

import { useState, useEffect, useCallback, useRef } from 'react';
import * as Location from 'expo-location';
import { Alert, Platform } from 'react-native';

const LOCATION_PERMISSION_MESSAGE =
  'Precisamos de acesso à sua localização para fornecer funcionalidades baseadas em GPS.';

export default function useCurrentLocation(options = {}) {
  const subscriberRef = useRef(null);

  // 1) Initial state: location=null, error=null, loading=true
  const [state, setState] = useState({
    location: null,
    error: null,
    loading: true,
  });

  // 2) Pull out any options with defaults
  const {
    enableHighAccuracy = true,
    timeout = 15000,
    maximumAge = 10000,
    watchPosition = false,
    distanceInterval = 10,
    autoRequest = true,
    timeInterval = 5000,
  } = options;

  // 3) Ask the OS for foreground‐location permission
  const requestPermission = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === 'granted';
    } catch (err) {
      // If the native permission API fails, show an alert (tests suppress alerts)
      Alert.alert('Erro de permissão', LOCATION_PERMISSION_MESSAGE);
      return false;
    }
  }, []);

  // 4) The main “get current location” function. It does exactly one setState on success or failure.
  const getCurrentLocation = useCallback(
    async (suppressAlert = false) => {
      try {
        // a) Ask for permission
        const hasPermission = await requestPermission();
        if (!hasPermission) {
          // If permission is denied, set error + loading = false in one shot:
          const errorMessage = 'Permissão negada. ' + LOCATION_PERMISSION_MESSAGE;
          setState({
            location: null,
            error: errorMessage,
            loading: false,
          });
          if (!suppressAlert) {
            Alert.alert('Permissão necessária', LOCATION_PERMISSION_MESSAGE);
          }
          return;
        }

        // b) Permission granted → fetch the GPS position
        const pos = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          enableHighAccuracy,
          timeout,
          maximumAge,
        });

        // c) Got a position → set it exactly once, with loading=false
        setState({
          location: pos,
          error: null,
          loading: false,
        });
        return pos;
      } catch (err) {
        // d) getCurrentPositionAsync threw (GPS off, timeout, etc.)
        const errorMessage = Platform.select({
          ios: 'Ative os serviços de localização nas configurações.',
          android: 'Habilite a localização precisa nas configurações do dispositivo.',
        });
        setState({
          location: null,
          error: errorMessage,
          loading: false,
        });
        if (!suppressAlert) {
          Alert.alert('Localização indisponível', errorMessage);
        }
        // Re‐throw so tests that expect a rejection can catch it
        throw err;
      }
    },
    [enableHighAccuracy, timeout, maximumAge, requestPermission]
  );

  useEffect(() => {
    // 5) On mount (if autoRequest), immediately call getCurrentLocation(true)
    if (autoRequest) {
      getCurrentLocation(true);
    }

    // 6) If watchPosition = true, subscribe to continuous updates
    if (watchPosition) {
      Location.watchPositionAsync(
        {
          enableHighAccuracy,
          timeInterval,
          distanceInterval,
        },
        newLoc => {
          // Only update “location” (no loading or error)
          setState(prev => ({
            ...prev,
            location: newLoc,
          }));
        }
      )
        .then(sub => {
          subscriberRef.current = sub;
        })
        .catch(err => {
          // If subscribing fails immediately, record error + loading=false
          setState(prev => ({
            ...prev,
            error: err.message,
            loading: false,
          }));
        });
    }

    return () => {
      // 7) On unmount, if we have a subscription, remove it
      if (
        subscriberRef.current &&
        typeof subscriberRef.current.remove === 'function'
      ) {
        subscriberRef.current.remove();
      }
    };
  }, [
    watchPosition,
    distanceInterval,
    autoRequest,
    timeInterval,
    enableHighAccuracy,
    getCurrentLocation,
  ]);

  // 8) Expose exactly what callers/tests expect
  return {
    location: state.location,
    error: state.error,
    loading: state.loading,
    refreshLocation: getCurrentLocation,
    requestPermission,
  };
}
