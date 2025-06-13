import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import getStyles from './style';
import ContribuirLayout from '../components/ContribuirLayout';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useCameraPermissions } from 'expo-camera';
import CameraComponent from '@/components/cameraComponent';

const CameraScreen = () => {
  const { colorScheme } = useTheme();
  const styles = getStyles(colorScheme);
  const navigation = useNavigation();
  const [permission, requestPermission] = useCameraPermissions();
  const [photoData, setPhotoData] = useState(null);
  const isDarkMode = colorScheme === 'dark';

  // Verificar permissões da câmera automaticamente
  useEffect(() => {
    (async () => {
      if (permission && !permission.granted) {
        const cameraPermission = await requestPermission();
        if (!cameraPermission.granted) {
          Alert.alert(
            "Permissão Necessária",
            "Precisamos de acesso à câmera para tirar a foto do problema. Por favor, vá em Configurações e permita acesso à câmera para o aplicativo.",
            [{ text: "OK", onPress: () => navigation.goBack() }]
          );
        }
      }
    })();
  }, [permission, requestPermission, navigation]);

  // Navegar automaticamente quando uma foto é capturada e aceita
  useEffect(() => {
    if (photoData) {
      navigation.navigate('Final', { photoData });
    }
  }, [photoData, navigation]);

  const handlePhotoCapture = photo => {
    setPhotoData({
      uri: photo.uri,
      location: photo.location,
    });
  };

  const handleBackStep = () => {
    navigation.goBack();
  };

  return (
    <ContribuirLayout currentStep={1} style={styles.container}>
      <View style={[styles.cameraContainer, { paddingHorizontal: 16 }]}>
        <View style={[styles.instructionText, { marginTop: 16, marginBottom: 8 }]}>
          <Ionicons name="camera" style={styles.infoIcon} />
          <Text style={[styles.infoText, { fontSize: 16, fontWeight: '600' }]}>
            Tire uma foto clara {"\n"} do problema que deseja relatar
          </Text>
        </View>
        
        {/* Camera component with fixed sizing and proper display */}
        <View style={{
          width: '100%',
          height: '70%', // Explicit height
          borderRadius: 12,
          overflow: 'hidden',
          marginVertical: 16,
          borderWidth: 2,
          borderColor: isDarkMode ? '#444' : '#ddd',
          backgroundColor: '#000', // Ensure visible background
          elevation: 5, // Android shadow
          shadowColor: '#000', // iOS shadow
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
        }}>
          <CameraComponent onPhotoTaken={handlePhotoCapture} />
        </View>
      </View>
      
      <View style={[styles.buttonContainer, { paddingVertical: 20 }]}>
        <TouchableOpacity 
          style={[styles.cancelButton, { 
            borderWidth: 1, 
            borderColor: isDarkMode ? '#444' : '#ccc',
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
          }]} 
          onPress={handleBackStep}
        >
          <Ionicons name="arrow-back" size={20} color={isDarkMode ? '#e0e0e0' : '#333333'} />
          <Text style={styles.cancelText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </ContribuirLayout>
  );
};

export default CameraScreen;