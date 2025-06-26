
// Polyfill for react-native-screens (setImmediate / clearImmediate)
global.setImmediate = global.setImmediate || ((fn) => setTimeout(fn, 0));
global.clearImmediate = global.clearImmediate || ((id) => clearTimeout(id));
import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { UserProvider } from '@/contexts/UserContext';
import AppNavigator from '../../navigation/AppNavigator';

describe('AppNavigator', () => {
  it('renderiza sem erros', () => {
    render(
      <ThemeProvider>
        <UserProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </UserProvider>
      </ThemeProvider>
    );
  });
});
