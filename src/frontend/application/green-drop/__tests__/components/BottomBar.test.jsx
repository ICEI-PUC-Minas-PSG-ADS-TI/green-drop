import React from 'react';
import { render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@/contexts/ThemeContext';
import BottomBar from '@/components/BottomBar/index.jsx';

describe('<BottomBar />', () => {
  it('renderiza sem crashar', () => {
    render(
      <ThemeProvider>
        <NavigationContainer>
          <BottomBar />
        </NavigationContainer>
      </ThemeProvider>
    );
  });

  it('combina com snapshot', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <NavigationContainer>
          <BottomBar />
        </NavigationContainer>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
