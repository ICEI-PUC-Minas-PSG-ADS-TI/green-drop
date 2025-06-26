import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { ThemeContextProvider, ThemeContext } from '@/contexts/ThemeContext';

describe('ThemeContext', () => {
it('provider rende componentes filhos', () => {
const { getByText } = render(
<ThemeContextProvider>
<ThemeContext.Consumer>
{value => <Text>{JSON.stringify(value)}</Text>}
</ThemeContext.Consumer>
</ThemeContextProvider>
);
expect(getByText(/./)).toBeTruthy();
});
});
