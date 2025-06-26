import React from 'react';
import { render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import Layout from '../../layout/index.jsx';

describe('<Layout />', () => {
it('renderiza sem crashar', () => {
render(<Layout />);
});

it('combina com snapshot', () => {
const tree = renderer.create(<Layout />).toJSON();
expect(tree).toMatchSnapshot();
});
});
