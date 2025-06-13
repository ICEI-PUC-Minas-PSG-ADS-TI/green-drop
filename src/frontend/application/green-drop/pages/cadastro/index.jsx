import React, { useState } from "react";
import { View, TouchableOpacity, Text, TextInput, Alert, SafeAreaView } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useUserContext } from '@/contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/contexts/ThemeContext';
import PersonalHeader from '@/components/PersonalHeader';
import getStyles from './style';

export default function CadastroScreen() {
  const navigation = useNavigation();
  const { colorScheme } = useTheme();
  const styles = getStyles(colorScheme);
  const { cadastrarUsuario, loading } = useUserContext();
  const [form, setForm] = useState({ nome: '', email: '', senha: '', confirmarSenha: '', telefone: '' });

  const handleCadastro = async () => {
    if (form.senha !== form.confirmarSenha) {
      return Alert.alert('Erro', 'As senhas não coincidem');
    }
    const success = await cadastrarUsuario(form);
    if (success) {
      Alert.alert('Sucesso', 'Cadastro realizado!');
      navigation.navigate('Login');
    } else {
      Alert.alert('Erro', 'Falha no cadastro');
    }
  };

  const onChange = (key) => (text) => setForm({ ...form, [key]: text });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <PersonalHeader title="Cadastro" />
        <View style={styles.formBox}>
          <TextInput placeholder="Nome" value={form.nome} onChangeText={onChange('nome')} style={styles.input} />
          <TextInput placeholder="E-mail" value={form.email} onChangeText={onChange('email')} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
          <TextInput placeholder="Senha" value={form.senha} onChangeText={onChange('senha')} style={styles.input} secureTextEntry />
          <TextInput placeholder="Confirmar senha" value={form.confirmarSenha} onChangeText={onChange('confirmarSenha')} style={styles.input} secureTextEntry />
          <TextInput placeholder="Telefone" value={form.telefone} onChangeText={onChange('telefone')} style={styles.input} keyboardType="phone-pad" />
          <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={handleCadastro} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Cadastrando...' : 'Cadastrar'}</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.linkContainer}>
            <Text style={styles.linkText}>Já tem uma conta? Faça login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}