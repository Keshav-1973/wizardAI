import React from 'react';
import renderer from 'react-test-renderer';
import BottomSheetHelper from '@components/Common/BottomSheet/BottomSheet';

// Mocking useKeyboardStatus hook
jest.mock('@components/Common/Hooks/useKeyBoardStatus', () => () => false);

// Mocking @gorhom/bottom-sheet module
jest.mock('@gorhom/bottom-sheet', () => ({
  __esModule: true,
  default: jest.fn(),
  BottomSheetView: jest.fn().mockImplementation(({children}) => children),
}));

describe('BottomSheetHelper', () => {
  it('matches snapshot', () => {
    const props = {
      children: <></>, // Provide any children here
      bottomSheetRef: jest.fn(), // Mock bottomSheetRef function
      getSheetStatus: jest.fn(), // Mock getSheetStatus function
    };

    const tree = renderer.create(<BottomSheetHelper {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
