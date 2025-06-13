import * as ImagePicker from 'expo-image-picker';
import api from './apiML';

class ImageUploader {
  async pickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') throw new Error('Permissão negada');

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    if (result.canceled) return null;
    if (!result.assets || result.assets.length === 0) {
      throw new Error('Nenhuma imagem selecionada');
    }
    return result.assets[0];
  }

  async uploadProblemReport(data, image) {
    if (!image?.uri) throw new Error('Imagem inválida');

    const form = new FormData();
    form.append('photo', {
      uri: image.uri,
      name: image.uri.split('/').pop(),
      type: image.type || 'image/jpeg',
    });
    Object.entries(data).forEach(([key, val]) => form.append(key, String(val)));

    const response = await api.post('/reports', form, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Upload falhou: ${response.status} - ${text}`);
    }
    return response.data;
  }
}

export const imageUploader = new ImageUploader();