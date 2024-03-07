import React from 'react';
import {render} from '@testing-library/react-native';
import Container from '@components/Common/Container/Container';
import {ColorPalette} from '@themes/Scales';

const mockTheme = {
  colors: {
    MAIN_BACKGROUND: ColorPalette.WHITE,
  },
};

jest.mock('@screens/../Themes/Scales', () => ({
  ...jest.requireActual('@screens/../Themes/Scales'),
  SemanticColors: mockTheme?.colors,
}));

describe('<Container /> snapshot', () => {
  it('matches the snapshot', () => {
    const {toJSON} = render(
      <Container>
        <></>
      </Container>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
