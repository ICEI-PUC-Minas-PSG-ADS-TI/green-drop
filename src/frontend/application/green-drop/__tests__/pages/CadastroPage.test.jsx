import React from 'react';
import { render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@/contexts/ThemeContext.js';
import { UserProvider } from '@/contexts/UserContext';
import CadastroPage from '../../pages/cadastro/index.jsx';

describe('<CadastroPage />', () => {
    it('renderiza corretamente', () => {
        render(
            <SafeAreaProvider>
                <ThemeProvider>
                    <UserProvider>
                        <NavigationContainer>
                            <CadastroPage />
                        </NavigationContainer>
                    </UserProvider>
                </ThemeProvider>
            </SafeAreaProvider>
        );
    });

    it('snapshot de CadastroPage', () => {
        const tree = renderer.create(
            <SafeAreaProvider>
                <ThemeProvider>
                    <UserProvider>
                        <NavigationContainer>
                            <CadastroPage />
                        </NavigationContainer>
                    </UserProvider>
                </ThemeProvider>
            </SafeAreaProvider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
