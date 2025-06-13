import React from 'react';
import { render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import Final from '../../pages/contribuir/final/index.jsx';

describe('<Final />', () => {
it('renderiza corretamente', () => {
render(<Final />);
});

it('snapshot de Final', () => {
const tree = renderer.create(<Final />).toJSON();
expect(tree).toMatchSnapshot();
});
});
