import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@/contexts/ThemeContext.js';
import { UserProvider } from '@/contexts/UserContext';
import LoginPage from '../../pages/login/index.jsx';

describe('Fluxo completo de Login', () => {
  it('usuário faz login e vê perfil', async () => {
    const { getByPlaceholderText, getByText } = render(
      <SafeAreaProvider>
        <ThemeProvider>
          <UserProvider>
            <NavigationContainer>
              <LoginPage />
            </NavigationContainer>
          </UserProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    );
    fireEvent.changeText(getByPlaceholderText('Usuário'), 'summer');
    fireEvent.changeText(getByPlaceholderText('Senha'), '1234');
    fireEvent.press(getByText('Entrar'));
    // TODO: validar navegação
  });
});
