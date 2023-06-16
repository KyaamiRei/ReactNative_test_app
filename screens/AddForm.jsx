import React, { useState } from 'react';
import { Alert, Button } from 'react-native';

import axios from 'axios';

import 'react-native-get-random-values';
import { v1 } from 'uuid';

import styled from 'styled-components/native';

const Form = styled.View`
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextInputField = styled.TextInput`
  width: 100%;
  padding: 6px;
  margin-bottom: 10px;
  border-width: 2px;
  border-color: rgba(0, 0, 0, 0.2);
  border-style: solid;
  font-size: 16px;
`;

export const AddForm = ({ navigation }) => {
  const [postTitle, setPostTitle] = useState('');
  const [postText, setPostText] = useState('');
  const [postImageUrl, setPostImageUrl] = useState('');

  const addNews = async () => {
    try {
      if (postTitle !== '' && postText !== '' && postImageUrl !== '') {
        await axios.post('https://6489ff4a5fa58521cab099c9.mockapi.io/news', {
          title: postTitle,
          createdAt: new Date().getTime(),
          imageUrl: postImageUrl,
          text: postText,
        });
        setPostTitle('');
        setPostText('');
        setPostImageUrl('');
        navigation.navigate('Home');
      } else {
        Alert.alert('Ошибка', 'Ошибка при заполнении формы');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Ошибка', 'Ошибка при отправке формы');
    }
  };

  return (
    <Form>
      <TextInputField
        placeholder='Название новости'
        value={postTitle}
        onChangeText={setPostTitle}
      />
      <TextInputField
        placeholder='Текст новости'
        value={postText}
        onChangeText={setPostText}
      />
      <TextInputField
        placeholder='Ссылка на картинку'
        value={postImageUrl}
        onChangeText={setPostImageUrl}
      />
      <Button
        title='Добавить новость'
        onPress={addNews}
      />
    </Form>
  );
};
