import React, {useCallback, useState} from 'react';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {StyleSheet, Keyboard} from 'react-native';
import useKeyboardStatus from '@components/Common/Hooks/useKeyBoardStatus';

const BottomSheetHelper = ({
  children,
  bottomSheetRef,
  getSheetStatus,
  isFocsued,
}) => {
  const isKeyboardVisible = useKeyboardStatus();
  const onSheetClose = useCallback(() => {
    if (isFocsued) {
      Keyboard.dismiss();
    }
  }, [isKeyboardVisible, isFocsued]);

  const handleSheetChange = useCallback(
    (index: number) => {
      if (index > -1) {
        getSheetStatus?.(true);
      } else {
        getSheetStatus?.(false);
      }
    },
    [getSheetStatus],
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      onClose={onSheetClose}
      onChange={handleSheetChange}
      snapPoints={['80%']}
      enableOverDrag={false}>
      <BottomSheetView style={styles.contentContainer}>
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
};

export default BottomSheetHelper;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});
