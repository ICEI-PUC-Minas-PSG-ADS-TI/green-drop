import React, { useState } from "react";
import { View, TouchableOpacity, Text, TextInput, Alert, SafeAreaView } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useUserContext } from '@/contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/contexts/ThemeContext';
import PersonalHeader from '@/components/PersonalHeader';
import getStyles from './style';
import { colors } from '@/themes/index';

export default function LoginScreen() {
  const navigation = useNavigation();
  const { colorScheme } = useTheme();
  const styles = getStyles(colorScheme);
  const { loginUsuario, loading } = useUserContext();
  const [identificador, setIdentificador] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    const success = await loginUsuario(identificador, senha);
    if (success) {
      Alert.alert('Sucesso', 'Login realizado!');
      navigation.navigate('Perfil');
    } else Alert.alert('Erro', 'Credenciais inválidas');
  };

  const formatTelefone = (text) => {
    const nums = text.replace(/\D/g, '');
    if (nums.length <= 10) return nums.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').trim();
    return nums.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').trim();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <PersonalHeader title="Login" />
        <View style={styles.formBox}>
          <TextInput
            placeholder="E-mail ou telefone"
            placeholderTextColor={colorScheme === 'dark' ? colors.dark.text : colors.light.text}
            value={identificador}
            onChangeText={t => setIdentificador(formatTelefone(t))}
            style={styles.input}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Senha"
            placeholderTextColor={colorScheme === 'dark' ? colors.dark.text : colors.light.text}
            value={senha}
            onChangeText={setSenha}
            style={styles.input}
            secureTextEntry
          />
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Entrando...' : 'Entrar'}</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={styles.linkContainer}>
            <Text style={styles.linkText}>Não tem uma conta? Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}