import React from 'react';
import { render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@/contexts/ThemeContext.js';
import { UserProvider } from '@/contexts/UserContext';
import LoginPage from '../../pages/login/index.jsx';

describe('<LoginPage />', () => {
  it('renderiza corretamente', () => {
    render(
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
  });

  it('snapshot de LoginPage', () => {
    const tree = renderer.create(
      <SafeAreaProvider>
        <ThemeProvider>
          <UserProvider>
            <NavigationContainer>
              <LoginPage />
            </NavigationContainer>
          </UserProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
