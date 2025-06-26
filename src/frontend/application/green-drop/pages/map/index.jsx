import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  View, 
  ActivityIndicator, 
  Image, 
  TouchableOpacity, 
  Text,
  Alert,
  Platform
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import useCurrentLocation from '@/components/useCurrentLocation';
import { locationService } from '@/services/Location';
import getStyles from './style';
import { useNavigation } from '@react-navigation/native';
import BottomBar from "@/components/BottomBar";
import { useTheme } from '@/contexts/ThemeContext';
import { mapStyles } from '@/themes/index';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/themes/index';

const fetchNearbyLocations = async (latitude, longitude, radius = 5000) => {
  try {
    return await locationService.getNearbyLocations(latitude, longitude, radius);
  } catch (error) {
    Alert.alert(
      'Erro de Conexão',
      'Não foi possível carregar os locais próximos. Verifique sua conexão.'
    );
    throw error;
  }
};

const MapScreen = ({ initialMarkers = [] }) => {
  // Use useRef for the map reference
  const mapRef = useRef(null);
  const { colorScheme } = useTheme();
  const styles = getStyles(colorScheme);
  const navigation = useNavigation();
  
  // Get location data with proper structure handling
  const { location: locationData, loading: locationLoading, error: locationError, refreshLocation } = useCurrentLocation({
    watchPosition: true,
    distanceInterval: 50
  });

  const [markers, setMarkers] = useState(initialMarkers);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [region, setRegion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Extract coordinates correctly from the location data
  const location = locationData?.coords ? locationData : null;
  
  // Update region based on current location
  useEffect(() => {
    if (location && location.coords) {
      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(newRegion);
    }
  }, [location]);

  // Function to fetch nearby locations
  const fetchNearbyLocationsHandler = useCallback(async (lat, lng) => {
    if (!lat || !lng) return;
    
    try {
      setIsLoading(true);
      const nearbyLocations = await fetchNearbyLocations(lat, lng);
      setMarkers(nearbyLocations);
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível carregar os locais próximos. Tente novamente mais tarde.'
      )
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load nearby locations when location is obtained
  useEffect(() => {
    if (location && location.coords) {
      fetchNearbyLocationsHandler(
        location.coords.latitude, 
        location.coords.longitude
      );
    }
  }, [location, fetchNearbyLocationsHandler]);

  // Center map on user's position
  const centerOnUser = () => {
    if (location?.coords && mapRef.current) {
      const userRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      
      mapRef.current.animateToRegion(userRegion, 1000);
    }
  };

  // Update markers in visible region
  const onRegionChangeComplete = (newRegion) => {
    setRegion(newRegion);
  };

  const refreshCurrentArea = () => {
    if (region) {
      fetchNearbyLocationsHandler(region.latitude, region.longitude);
    } else if (location?.coords) {
      fetchNearbyLocationsHandler(
        location.coords.latitude, 
        location.coords.longitude
      );
    }
  };

  // Handle marker press
  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
  };

  // Componente para controlar a visibilidade dos marcadores baseado no zoom
const ZoomAwareMarkers = ({ region, markers, onPress }) => {
  // Limite de zoom onde os marcadores ficam visíveis (latitudeDelta)
  const MAX_VISIBLE_ZOOM = 0.1;
  
  // Verifica se o zoom atual permite mostrar marcadores
  const shouldShowMarkers = region && region.latitudeDelta <= MAX_VISIBLE_ZOOM;

  if (!shouldShowMarkers) return null;

  return markers?.map((marker) => (
    <Marker
      key={marker.id || `marker-${marker.latitude}-${marker.longitude}`}
      coordinate={{
        latitude: parseFloat(marker.latitude),
        longitude: parseFloat(marker.longitude),
      }}
      title={marker.name}
      description={marker.category}
      onPress={() => onPress(marker)}
    />
  ));
};

  // Display loading indicator when getting location
  if (locationLoading && !location) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Obtendo sua localização...</Text>
      </View>
    );
  }

  // Display error message if location couldn't be obtained
  if (locationError && !location) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <MaterialIcons name="location-off" size={48} color="red" />
        <Text style={{ marginTop: 10, textAlign: 'center' }}>
          Não foi possível obter sua localização. Verifique as permissões do aplicativo.
        </Text>
        <TouchableOpacity
          style={{
            marginTop: 20,
            backgroundColor: '#1e88e5',
            padding: 10,
            borderRadius: 5,
          }}
          onPress={refreshLocation}
        >
          <Text style={{ color: 'white' }}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          ref={mapRef}
          testID="map-view"
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={region}
          customMapStyle={colorScheme === 'dark' ? mapStyles.items.dark : mapStyles.items.light}
          showsUserLocation
          showsMyLocationButton={false}
          showsCompass
          onRegionChangeComplete={onRegionChangeComplete}
        >
          {/* Markers for each location */}
          <ZoomAwareMarkers 
            region={region}
            markers={markers}
            onPress={handleMarkerPress}
          />
        </MapView>
      )}

      {/* Action buttons on map */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.mapButton}
          onPress={centerOnUser}
        >
          <MaterialIcons name="my-location" size={40} color={colorScheme === 'dark' ? colors.dark.text : "#404040"} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.mapButton}
          onPress={refreshCurrentArea}
          disabled={isLoading}
          testID="refresh-button"
        >
          <MaterialIcons name="refresh" size={40} color={colorScheme === 'dark' ? colors.dark.text : "#404040"} />
        </TouchableOpacity>
      </View>

      {/* Loading indicator for location search */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="small" color={colorScheme === 'dark' ? "#00ADB5" : "#0000ff"} />
          <Text style={{ marginLeft: 10, color: colorScheme === 'dark' ? colors.dark.text : colors.light.text }}>
            Buscando locais...
          </Text>
        </View>
      )}

      {/* Selected marker details */}
      {selectedMarker && (
        <View style={styles.markerDetailCard}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setSelectedMarker(null)}
          >
            <MaterialIcons 
              name="close" 
              size={24} 
              color={colorScheme === 'dark' ? colors.dark.text : "#404040"} 
            />
          </TouchableOpacity>
          
          <Text style={styles.markerTitle}>
            {selectedMarker.name}
          </Text>
          
          <Text style={styles.markerCategory}>
            {selectedMarker.category}
          </Text>
          
          <Text style={styles.markerDescription}>
            {selectedMarker.description}
          </Text>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => {
              // Navigate to details screen or other action
              Alert.alert('Ação', `Você selecionou: ${selectedMarker.name}`);
              setSelectedMarker(null);
            }}
          >
            <Text style={styles.actionButtonText}>Ver detalhes</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Profile button at the top */}
      <TouchableOpacity 
        style={styles.icon}
        onPress={() => navigation.navigate('Conta')}
      >
        <Image
          source={require('@/assets/UserPlaceholder.png')}
          style={styles.iconImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
      
      <BottomBar />
    </View>
  );
};

export default MapScreen;