import React, { useContext, useState } from 'react';
import { Alert, Button } from 'react-native';

import axios from 'axios';

import styled from 'styled-components/native';
import { useSendPost } from '../hooks/useSendPost';

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
  const { addNews } = useSendPost(); // функция для изменения состояние всех постов

  const [postTitle, setPostTitle] = useState(''); // название новости
  const [postText, setPostText] = useState(''); // текст новости
  const [postImageUrl, setPostImageUrl] = useState(''); // ссылка на картинку новости
  const [catId, setCatId] = useState(''); // ID категории новости


  // добавление новой новости, загрузка ее на сервер и обновление состояния
  const addNewNews = () => {
    addNews(postTitle, postText, postImageUrl);
    setPostTitle('');
    setPostText('');
    setPostImageUrl('');
    setCatId('')
    navigation.navigate('Home');
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
        onPress={addNewNews}
      />
    </Form>
  );
};
