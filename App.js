import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import axios from 'axios';

import { AppContext } from './store/AppContext';

import { Navigation } from './screens/Navigations';

// общее хранилище данных

export default function App() {
  const [isDialogShow, setIsDialogShow] = useState(false); // состояние для показа диалогового окна
  const [isLoading, setIsLoading] = useState(false); // состояние загрузки
  const [news, setNews] = useState([]); // объект для хранения всех новостей

  // зарузка всех постов с сервера
  const fetchPost = async () => {
    setIsLoading(true);
    await axios
      .get('https://6489ff4a5fa58521cab099c9.mockapi.io/news')
      .then(({ data }) => {
        setNews(data);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert('Ошибка', 'Ошибка при получении статей');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // при первой загрузке подгружаем посты
  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <AppContext.Provider
      value={{ news, setNews, isLoading, setIsLoading, fetchPost, isDialogShow, setIsDialogShow }}>
      <Navigation />
    </AppContext.Provider>
  );
}
