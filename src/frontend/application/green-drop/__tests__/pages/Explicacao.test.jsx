import React from 'react';
import { render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import Explicacao from '../../pages/contribuir/explicação/index.jsx';

describe('<Explicacao />', () => {
it('renderiza corretamente', () => {
render(<Explicacao />);
});

it('snapshot de Explicacao', () => {
const tree = renderer.create(<Explicacao />).toJSON();
expect(tree).toMatchSnapshot();
});
});
