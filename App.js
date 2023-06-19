import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import axios from 'axios';

import { AppContext } from './store/AppContext';

import { Navigation } from './screens/Navigations';

// общее хранилище данных

export default function App() {
  const [news, setNews] = useState([]); // объект для хранения всех новостей
  const [filteredNews, setFilteredNews] = useState([]); // объект для хранения отфильтрованых новостей
  const [activeCategory, setActiveCategory] = useState(0); // состояние для активной категории
  const [isDialogShow, setIsDialogShow] = useState(false); // состояние для показа диалогового окна
  const [isLoading, setIsLoading] = useState(false); // состояние загрузки

  const categories = ['Все', 'Городские', 'Другие'];

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
    setFilteredNews(news);
  }, []);

  // генерация списка новостей на основе фильтра
  useEffect(() => {
    if (activeCategory > 0) {
      setFilteredNews(news.filter((item) => item.catId === activeCategory));
    } else {
      setFilteredNews(news);
    }
  }, [activeCategory, news]);

  return (
    <AppContext.Provider
      value={{
        news,
        filteredNews,
        categories,
        setNews,
        isLoading,
        setIsLoading,
        fetchPost,
        isDialogShow,
        setIsDialogShow,
        activeCategory,
        setActiveCategory,
      }}>
      <Navigation />
    </AppContext.Provider>
  );
}
