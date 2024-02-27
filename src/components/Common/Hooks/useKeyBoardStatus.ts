import { useState, useEffect, useCallback } from 'react';
import { Keyboard } from 'react-native';

const useKeyboardStatus = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const keyboardDidShow = useCallback(() => {
    setIsKeyboardVisible(true);
  }, []);

  const keyboardDidHide = useCallback(() => {
    setIsKeyboardVisible(false);
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [keyboardDidShow, keyboardDidHide]);

  return isKeyboardVisible;
};

export default useKeyboardStatus;
