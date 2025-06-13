// __tests__/navigation/ContributionNavigator.test.jsx

// ─── 1) POLYFILL ────────────────────────────────────────────────
// Polyfill for react-native-screens (setImmediate / clearImmediate)
global.setImmediate = global.setImmediate || ((fn) => setTimeout(fn, 0));
global.clearImmediate = global.clearImmediate || ((id) => clearTimeout(id));

// ─── 2) REST OF YOUR IMPORTS ───────────────────────────────────────────────
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react-native';
import ContributionNavigator from '../../pages/contribuir/navigation/ContributionNavigator';

// ─── 3) ANY MOCKS YOU ALREADY HAD ──────────────────────────────────────────

describe('ContributionNavigator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
  });

  it('renderiza sem erros', async () => {
    const tree = render(<ContributionNavigator />);
    expect(tree).toBeTruthy();
    // Or you could verify that a certain screen label is present:
    // await waitFor(() => expect(screen.getByText('Algum título na tela inicial')).toBeTruthy());
  });
  it('snapshot de ContributionNavigator', () => {
    const tree = render(<ContributionNavigator />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
