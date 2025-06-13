import React from 'react';
import { render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@/contexts/ThemeContext.js';
import { UserProvider } from '@/contexts/UserContext';
import PerfilPage from '../../pages/perfil/index.jsx';

describe('<PerfilPage />', () => {
  it('renderiza corretamente', () => {
    render(
      <SafeAreaProvider>
      <ThemeProvider>
        <UserProvider>
          <NavigationContainer>
            <PerfilPage />
          </NavigationContainer>
        </UserProvider>
      </ThemeProvider>
      </SafeAreaProvider>
    );
  });

  it('snapshot de PerfilPage', () => {
    const tree = renderer.create(
      <SafeAreaProvider>
      <ThemeProvider>
        <UserProvider>
          <NavigationContainer>
            <PerfilPage />
          </NavigationContainer>
        </UserProvider>
      </ThemeProvider>
      </SafeAreaProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
