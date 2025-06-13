import React from 'react';
import { render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import ProgressHeader from '../../pages/contribuir/components/ProgressHeader.jsx';

describe('<ProgressHeader />', () => {
it('renderiza corretamente', () => {
render(<ProgressHeader />);
});

it('snapshot de ProgressHeader', () => {
const tree = renderer.create(<ProgressHeader />).toJSON();
expect(tree).toMatchSnapshot();
});
});
