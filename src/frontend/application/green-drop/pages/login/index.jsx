import React, { useState } from "react";
import { View, TouchableOpacity, Text, TextInput, Alert, SafeAreaView } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useUserContext } from '@/contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/contexts/ThemeContext';
import PersonalHeader from '@/components/PersonalHeader';
import getStyles from './style';
import { colors } from '@/themes/index';
import { MaterialIcons } from '@expo/vector-icons';

export default function LoginScreen() {
  const navigation = useNavigation();
  const { colorScheme } = useTheme();
  const styles = getStyles(colorScheme);
  const { loginUsuario, loading } = useUserContext();
  const [email, setEmail] = useState(''); 
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    // Verificação de campos obrigatórios
    if (!email.trim()) {
      Alert.alert('Campo obrigatório', 'Por favor, preencha o e-mail');
      return;
    }
    
    if (!senha.trim()) {
      Alert.alert('Campo obrigatório', 'Por favor, preencha a senha');
      return;
    }

    const success = await loginUsuario(email, senha); 
    if (success) {
      Alert.alert('Sucesso', 'Login realizado!');
      navigation.navigate('Mapa');
    } else Alert.alert('Erro', 'Credenciais inválidas');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <PersonalHeader title="Login" />
        <View style={styles.formBox}>
          <TextInput
            placeholder="E-mail"
            placeholderTextColor={colorScheme === 'dark' ? colors.dark.text : colors.light.text}
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          
          {/* Campo de senha com botão de visibilidade */}
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Senha"
              placeholderTextColor={colorScheme === 'dark' ? colors.dark.text : colors.light.text}
              value={senha}
              onChangeText={setSenha}
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
          
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin} 
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? 'Entrando...' : 'Entrar'}</Text>
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity 
            onPress={() => navigation.navigate('Cadastro')} 
            style={styles.linkContainer}
          >
            <Text style={styles.linkText}>Não tem uma conta? Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}