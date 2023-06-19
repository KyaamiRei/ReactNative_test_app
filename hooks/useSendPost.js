import { useContext } from 'react';
import { Alert } from 'react-native';

import axios from 'axios';

import { AppContext } from '../store/AppContext';

export const useSendPost = () => {
  const { setNews } = useContext(AppContext);

  // добавление новой новости, загрузка ее на сервер и обновление состояния
  const addNews = async (postTitle, postText, postImageUrl, catId) => {
    try {
      let newPost = {
        title: postTitle,
        createdAt: new Date().getTime(),
        imageUrl: postImageUrl,
        text: postText,
        catId: catId,
      };
      if (postTitle !== '' && postText !== '' && postImageUrl !== '') {
        await axios.post('https://6489ff4a5fa58521cab099c9.mockapi.io/news', newPost);
        setNews((prev) => [...prev, newPost]);
      } else {
        Alert.alert('Ошибка', 'Ошибка при заполнении формы');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Ошибка', 'Ошибка при отправке формы');
    }
  };

  return { addNews };
};

const addNewNews = () => {
  addNews(postTitle, postText, postImageUrl);
  setPostTitle('');
  setPostText('');
  setPostImageUrl('');
};
