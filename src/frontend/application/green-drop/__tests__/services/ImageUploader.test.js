import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import * as ImagePicker from 'expo-image-picker';
import api from '@/services/apiML.js';
import { imageUploader } from '@/services/ImageUploader.js';

jest.mock('expo-image-picker');
jest.mock('@/services/apiML.js', () => ({
  post: jest.fn()
}));

describe('ImageUploader', () => {
  it('deve existir', () => {
    expect(imageUploader).toBeDefined();
  });

  it('pickImage retorna imagem selecionada', async () => {
    ImagePicker.requestMediaLibraryPermissionsAsync.mockResolvedValue({ status: 'granted' });
    ImagePicker.launchImageLibraryAsync.mockResolvedValue({
      canceled: false,
      assets: [{ uri: 'file://img.jpg', type: 'image/jpeg' }]
    });
    const img = await imageUploader.pickImage();
    expect(img).toEqual({ uri: 'file://img.jpg', type: 'image/jpeg' });
  });

  it('pickImage lança erro se permissão negada', async () => {
    ImagePicker.requestMediaLibraryPermissionsAsync.mockResolvedValue({ status: 'denied' });
    await expect(imageUploader.pickImage()).rejects.toThrow('Permissão negada');
  });

  it('uploadProblemReport faz upload com sucesso', async () => {
    api.post.mockResolvedValue({ ok: true, data: { id: 1 } });
    const data = { foo: 'bar' };
    const image = { uri: 'file://img.jpg', type: 'image/jpeg' };
    const res = await imageUploader.uploadProblemReport(data, image);
    expect(api.post).toHaveBeenCalled();
    expect(res).toEqual({ id: 1 });
  });

  it('uploadProblemReport lança erro se imagem inválida', async () => {
    await expect(imageUploader.uploadProblemReport({}, null)).rejects.toThrow('Imagem inválida');
  });

  it('uploadProblemReport lança erro se upload falhar', async () => {
    api.post.mockResolvedValue({ ok: false, status: 500, text: async () => 'fail' });
    const image = { uri: 'file://img.jpg', type: 'image/jpeg' };
    await expect(imageUploader.uploadProblemReport({}, image)).rejects.toThrow(/Upload falhou/);
  });
});
