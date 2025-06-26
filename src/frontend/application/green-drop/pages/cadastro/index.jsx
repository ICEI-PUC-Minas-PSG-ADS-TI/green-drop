import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
  SafeAreaView,
  Image,
  Platform
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useUserContext } from '@/contexts/UserContext';
import * as ImagePicker from 'expo-image-picker';
import { Blob } from 'blob-polyfill';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/contexts/ThemeContext';
import { colors } from "@/themes/index";
import PersonalHeader from '@/components/PersonalHeader';
import getStyles from './style';
import { MaterialIcons } from '@expo/vector-icons';

export default function CadastroScreen() {
  const navigation = useNavigation();
  const { colorScheme } = useTheme();
  const styles = getStyles(colorScheme);
  const { cadastrarUsuario, loading } = useUserContext();

  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    telefone: '',
    imagem: null
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const placeholder = require('@/assets/UserPlaceholder.png');

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permissão negada', 'Precisamos de acesso à galeria.');
        }
      }
    })();
  }, []);

  // Função para selecionar imagem com verificação de tamanho
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        // Verifica se o tamanho da imagem excede 10 MB
        if (asset.fileSize && asset.fileSize > 10 * 1024 * 1024) {
          Alert.alert('Imagem muito grande', 'Selecione uma imagem de até 10 MB');
          return;
        }
        setForm({ ...form, imagem: asset });
      }
    } catch (err) {
      console.error('Erro ao selecionar imagem:', err);
    }
  };

  const formatDisplayTelefone = text => {
    const nums = text.replace(/\D/g, '');
    if (nums.length <= 10)
      return nums.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').trim();
    return nums.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').trim();
  };

  const formatSendTelefone = text => {
    const nums = text.replace(/\D/g, '');
    return nums.startsWith('55') ? `+${nums}` : `+55${nums}`;
  };

  const onChange = key => text => {
    let value = text;
    if (key === 'telefone') {
      value = formatDisplayTelefone(text);
    }
    setForm({ ...form, [key]: value });
  };

  const handleCadastro = async () => {
    // Verificação de campos obrigatórios
    const requiredFields = ['nome', 'email', 'senha', 'confirmarSenha', 'telefone'];
    const fieldNames = {
      nome: 'Nome',
      email: 'E-mail',
      senha: 'Senha',
      confirmarSenha: 'Confirmar Senha',
      telefone: 'Telefone'
    };

    for (const field of requiredFields) {
      if (!form[field].trim()) {
        Alert.alert('Campo obrigatório', `Por favor, preencha o campo ${fieldNames[field]}`);
        return;
      }
    }

    if (form.senha !== form.confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    const payload = {
    nome: form.nome,
    email: form.email,
    senha: form.senha,
    telefone: formatSendTelefone(form.telefone),
    imagem: form.imagem || null
  };

    const success = await cadastrarUsuario(payload);
    if (success) {
      Alert.alert('Sucesso', 'Cadastro realizado!');
      navigation.navigate('Login');
    } else {
      Alert.alert('Erro', 'Falha no cadastro');
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <PersonalHeader title="Cadastro" />
        <View style={styles.formBox}>
          <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
            <Image
              source={form.imagem ? { uri: form.imagem.uri } : placeholder}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.imageText}>Adicionar Foto (10MB)</Text>
          </TouchableOpacity>

          <TextInput
            placeholder="Nome"
            placeholderTextColor={colors[colorScheme].text}
            value={form.nome}
            onChangeText={onChange('nome')}
            style={styles.input}
          />
          
          <TextInput
            placeholder="E-mail"
            placeholderTextColor={colors[colorScheme].text}
            value={form.email}
            onChangeText={onChange('email')}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          {/* Campo de senha com botão de visibilidade */}
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Senha"
              placeholderTextColor={colors[colorScheme].text}
              value={form.senha}
              onChangeText={onChange('senha')}
              style={[styles.input, styles.passwordInput]}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              <MaterialIcons 
                name={showPassword ? 'visibility' : 'visibility-off'} 
                size={24} 
                color={colors[colorScheme].text} 
              />
            </TouchableOpacity>
          </View>
          
          {/* Campo de confirmação de senha com botão de visibilidade */}
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Confirmar senha"
              placeholderTextColor={colors[colorScheme].text}
              value={form.confirmarSenha}
              onChangeText={onChange('confirmarSenha')}
              style={[styles.input, styles.passwordInput]}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeButton}
            >
              <MaterialIcons 
                name={showConfirmPassword ? 'visibility' : 'visibility-off'} 
                size={24} 
                color={colors[colorScheme].text} 
              />
            </TouchableOpacity>
          </View>
          
          <TextInput
            placeholder="Telefone"
            placeholderTextColor={colors[colorScheme].text}
            value={form.telefone}
            onChangeText={onChange('telefone')}
            style={styles.input}
            keyboardType="phone-pad"
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleCadastro}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.linkContainer}
          >
            <Text style={styles.linkText}>Já tem uma conta? Faça login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
