import React, { useContext, useState } from 'react';
import { Button } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

import { AppContext } from '../store/AppContext';
import { useSendPost } from '../hooks/useSendPost';

import styled from 'styled-components/native';

const Dialog = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.7);
`;

const DialogBlock = styled.TouchableOpacity`
  width: 83%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background-color: white;
  border-radius: 10px;
`;

const TextInputField = styled.TextInput`
  width: 90%;
  padding: 6px;
  margin-bottom: 10px;
  border-width: 2px;
  border-color: rgba(0, 0, 0, 0.2);
  border-style: solid;
  border-radius: 5px;
  font-size: 16px;
`;

export const DialogWindow = () => {
  const { categories, setIsDialogShow } = useContext(AppContext);
  const { addNews } = useSendPost();

  const [postTitle, setPostTitle] = useState(''); // название новости
  const [postText, setPostText] = useState(''); // текст новости
  const [postImageUrl, setPostImageUrl] = useState(''); // ссылка на картинку новости
  const [catId, setCatId] = useState(0); // ID категории новости

  const onAddNewNews = () => {
    const categoryId = categories.indexOf(catId);

    addNews(postTitle, postText, postImageUrl, categoryId);
    setPostTitle('');
    setPostText('');
    setPostImageUrl('');
    setCatId(0);
    setIsDialogShow(false);
  };

  const onClickDialog = (e) => {
    e.StopPropagation();
  };

  return (
    <Dialog onPress={() => setIsDialogShow(false)}>
      {/* для закрытия формы, при клике вне этой формы */}
      <DialogBlock
        onPress={() => onClickDialog}
        activeOpacity={1}>
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
          inputStyles={{ fontSize: 16, color: 'rgba(0,0,0,0.4)', width: '80%' }}
          dropdownStyles={{
            marginBottom: 15,
            width: 245,
            borderWidth: 2,
            borderColor: 'rgba(0,0,0,0.2)',
          }}
          dropdownTextStyles={{ fontSize: 16, color: 'rgba(0,0,0,0.4)' }}
          placeholder='Выберите категорию'
        />
        <Button
          title='Добавить новость'
          onPress={onAddNewNews}
        />
      </DialogBlock>
    </Dialog>
  );
};
