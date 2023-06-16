import React from 'react';

import styled from 'styled-components/native';

const AddNewsBlock = styled.View`
  z-index: 999;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.7);
`;

const AddNewsButton = styled.Button``;

export const AddBlock = ({ navigation }) => {
  return (
    <AddNewsBlock>
      <AddNewsButton
        title='Добавить новость'
        onPress={() => {
          navigation.navigate('AddForm', {});
        }}
      />
    </AddNewsBlock>
  );
};