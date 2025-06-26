import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert,
    ActivityIndicator
} from 'react-native';
import { CameraView } from 'expo-camera';
import { useCameraPermissions } from 'expo-camera';
import useCurrentLocation from '../useCurrentLocation';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import getStyles from './style';

// eslint-disable-next-line react/prop-types
export default function CameraComponent({ onPhotoTaken }) {
    const [permission, requestPermission] = useCameraPermissions();
    const [facing, setFacing] = useState('back');
    const [photo, setPhoto] = useState(null);
    const [flash, setFlash] = useState('off');
    const [loading, setLoading] = useState(false);
    const cameraRef = useRef(null);
    const { location, refreshLocation } = useCurrentLocation({ enableHighAccuracy: true });
    const { colorScheme } = useTheme();
    const isDarkMode = colorScheme === 'dark';
    const styles = getStyles(colorScheme);

    const MAX_PHOTO_SIZE_BYTES = 10 * 1024 * 1024;

    useEffect(() => {
        if (permission && !permission.granted) requestPermission();
    }, [permission]);
    

    const toggleFacing = () => setFacing(prev => prev === 'back' ? 'front' : 'back');
    const toggleFlash = () => setFlash(prev => prev === 'off' ? 'on' : prev === 'on' ? 'auto' : 'off');

    const takePhoto = async () => {
        if (!permission?.granted) await requestPermission();
        if (cameraRef.current) {
            try {
                setLoading(true);
                const result = await cameraRef.current.takePictureAsync({
                    quality: 0.2,
                    exif: true,
                    base64: true,
                });
                
                // Verificar o tamanho da foto
                if (result.base64) {
                    // Calcula tamanho aproximado em bytes: (base64Length * 3) / 4
                    const base64Length = result.base64.length;
                    const sizeInBytes = Math.floor((base64Length * 3) / 4);
                    
                    if (sizeInBytes > MAX_PHOTO_SIZE_BYTES) {
                        Alert.alert(
                            'Foto muito grande',
                            `A foto tem ${Math.round(sizeInBytes / (1024 * 1024))} MB. O tamanho máximo é 10 MB.`,
                            [{ text: 'OK', onPress: () => setLoading(false) }]
                        );
                        return;
                    }
                }
                
                setPhoto(result);
            } catch (err) {
                Alert.alert('Erro', 'Não foi possível tirar a foto.');
            } finally {
                setLoading(false);
            }
        }
    };

    const retakePhoto = () => setPhoto(null);

    const acceptPhoto = async () => {
        if (!photo) return;
        setLoading(true);
        try {
            await refreshLocation();
            if (!location) throw new Error('Localização não disponível');
            const coords = location.coords;
            onPhotoTaken({
                uri: photo.uri,
                location: coords,
            });
        } catch (err) {
            Alert.alert('Erro', err.message || 'Não foi possível obter localização.');
        } finally {
            setLoading(false);
            cameraRef.current.pausePreview()
        }
    };

    const getFlashIcon = () => {
        switch(flash) {
            case 'on': return 'flash';
            case 'off': return 'flash-off';
            case 'auto': return 'flash-outline';
            default: return 'flash-off';
        }
    };

  // Se estiver carregando, mostrar indicador
  if (!permission) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>
          Carregando câmera...
        </Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.loading}>
        <Ionicons name="camera-off" size={50} color={isDarkMode ? '#cccccc' : '#666666'} />
        <Text style={styles.loadingText}>
          Permissão para câmera negada.
        </Text>
      </View>
    );
  }

  if (photo) {
    return (
      <View style={styles.previewContainer}>
        <Image source={{ uri: photo.uri }} style={styles.previewImage} resizeMode="cover" />
        <View style={styles.previewControls}>
          <TouchableOpacity onPress={retakePhoto} style={styles.previewButton}>
            <Ionicons name="camera" size={20} color="white" />
            <Text style={styles.previewButtonText}>Nova Foto</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={acceptPhoto} style={styles.previewButton} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Ionicons name="checkmark" size={20} color="white" />
                <Text style={styles.previewButtonText}>Usar Foto</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        ref={cameraRef}
        facing={facing}
        flashMode={flash}
      >
        <View style={styles.sideControls}>
          <TouchableOpacity style={styles.controlButton} onPress={toggleFacing}>
            <Ionicons name="camera-reverse" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={toggleFlash}>
            <Ionicons name={getFlashIcon()} size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.controls}>
          <TouchableOpacity style={styles.shutterButton} onPress={takePhoto} disabled={loading}>
            <View style={styles.shutterInner} />
          </TouchableOpacity>
        </View>
        
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="white" />
          </View>
        )}
      </CameraView>
    </View>
  );
}
