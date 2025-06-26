import React from 'react';
import { render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import ContribuirLayout from '../../pages/contribuir/components/ContribuirLayout.jsx';

describe('<ContribuirLayout />', () => {
it('renderiza corretamente', () => {
render(<ContribuirLayout />);
});

it('snapshot de ContribuirLayout', () => {
const tree = renderer.create(<ContribuirLayout />).toJSON();
expect(tree).toMatchSnapshot();
});
});
