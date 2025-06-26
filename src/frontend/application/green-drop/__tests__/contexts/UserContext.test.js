import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { UserContext, UserContextProvider } from '@/contexts/UserContext';

describe('UserContext', () => {
  it('provider rende componentes filhos', () => {
    const { getByText } = render(
      <UserContextProvider>
        <UserContext.Consumer>
          {value => <Text>{JSON.stringify(value)}</Text>}
        </UserContext.Consumer>
      </UserContextProvider>
    );
    expect(getByText(/./)).toBeTruthy();
  });
});
