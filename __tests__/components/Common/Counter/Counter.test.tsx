import React from 'react';
import {render} from '@testing-library/react-native';
import Counter from '@components/Common/Counter/Counter';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {rootReducer} from '@helpers/AppStore/Reducers/Reducers';
import {ThemeTypes} from '@themes/redux/ThemeConstant';
import {ColorPalette} from '@themes/Scales';
const mockTheme = {
  colors: {
    PRIMARY_BUTTON: ColorPalette.DARK_GREEN,
  },
};

jest.mock('@screens/../Themes/Scales', () => ({
  ...jest.requireActual('@screens/../Themes/Scales'),
  SemanticColors: mockTheme?.colors,
}));
describe('<Counter /> snapshot', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer, // Pass your root reducer here
      preloadedState: {
        // Mock the initial state as needed
        theme: {
          currentTheme: ThemeTypes.LIGHT,
        },
      },
    });
  });
  it('matches the snapshot', () => {
    const getCountMock = jest.fn();
    const initialValue = 0;

    const {toJSON} = render(
      <Provider store={store}>
        <Counter getCount={getCountMock} initialValue={initialValue} />
      </Provider>,
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
