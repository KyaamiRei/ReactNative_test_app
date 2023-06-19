import React, { useContext, useState } from 'react';
import { Button } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

import { AppContext } from '../store/AppContext';
import { useSendPost } from '../hooks/useSendPost';

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
  padding-left: 20px;
  border-width: 2px;
  border-color: rgba(0, 0, 0, 0.2);
  border-style: solid;
  border-radius: 20px;
  font-size: 16px;
`;

export const AddForm = ({ navigation }) => {
  const { categories } = useContext(AppContext);
  const { addNews } = useSendPost(); // функция для изменения состояние всех постов

  const [postTitle, setPostTitle] = useState(''); // название новости
  const [postText, setPostText] = useState(''); // текст новости
  const [postImageUrl, setPostImageUrl] = useState(''); // ссылка на картинку новости
  const [catId, setCatId] = useState(0); // ID категории новости

  // добавление новой новости, загрузка ее на сервер и обновление состояния
  const addNewNews = () => {
    const categoryId = categories.indexOf(catId);

    addNews(postTitle, postText, postImageUrl, categoryId);
    setPostTitle('');
    setPostText('');
    setPostImageUrl('');
    setCatId(0);
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
      <SelectList
        data={categories}
        setSelected={setCatId}
        boxStyles={{
          borderWidth: 2,
          borderColor: 'rgba(0,0,0,0.2)',
          marginBottom: 15,
          borderRadius: 23,
        }}
        inputStyles={{ fontSize: 16, color: 'rgba(0,0,0,0.4)', width: '92%' }}
        dropdownStyles={{
          marginBottom: 15,
          width: 330,
          borderWidth: 2,
          borderColor: 'rgba(0,0,0,0.2)',
        }}
        dropdownTextStyles={{ fontSize: 16, color: 'rgba(0,0,0,0.4)' }}
        placeholder='Выберите категорию'
      />
      <Button
        title='Добавить новость'
        onPress={addNewNews}
      />
    </Form>
  );
};
