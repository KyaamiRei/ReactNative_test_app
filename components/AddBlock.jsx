import React, { useContext } from 'react';

import { AppContext } from '../store/AppContext';

import styled from 'styled-components/native';

const AddNewsBlock = styled.View`
  z-index: 999;
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.4);
`;

const AddNewsButton = styled.Button``;
const ShowDialog = styled.Button`
  height: 35px;
  background-color: red;
  margin-left: 16px;
`;

export const AddBlock = ({ navigation }) => {
  const { setIsDialogShow } = useContext(AppContext);
  return (
    <AddNewsBlock>
      <AddNewsButton
        title='Добавить новость'
        onPress={() => {
          navigation.navigate('AddForm', {});
        }}
      />
      <ShowDialog
        title='Диалоговое окно'
        onPress={() => setIsDialogShow(true)}></ShowDialog>
    </AddNewsBlock>
  );
};
