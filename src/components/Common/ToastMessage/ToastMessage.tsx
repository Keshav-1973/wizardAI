import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import {SUCCESS_TOAST} from '@components/Common/ToastManager/InAppToastManager';
import TextComponent from '@components/Common/TextComponent/TextComponent';
import {SemanticColors} from '@themes/Scales';
import ViewComponent from '@components/Common/ViewComponent/ViewComponent';

interface Props {
  title: string;
  desc: string;
  type: string;
}

const ToastMessage = (props: Props) => {
  const {title, desc, type} = props || {};
  return (
    <ViewComponent
      pointerEvents="none"
      style={[
        styles.toastContainer,
        type === SUCCESS_TOAST ? styles.toastSuccess : styles.toastError,
      ]}>
      <TextComponent variant={SemanticColors.PRIMARY_BUTTON_TEXT}>
        {title}
      </TextComponent>
      {!!desc && <TextComponent>{desc}</TextComponent>}
    </ViewComponent>
  );
};

export default ToastMessage;
