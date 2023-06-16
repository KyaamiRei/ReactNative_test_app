import { Alert, View, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';

import axios from 'axios';

import { Post } from '../components/Post';
import { Loading } from '../components/Loading';
import { AddBlock } from '../components/AddBlock';

import styled from 'styled-components/native';

const HomeScreen = styled.View`
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
`;

export const Home = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [news, setNews] = useState([]);

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

  useEffect(() => {
    fetchPost();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <HomeScreen>
      <AddBlock navigation={navigation} />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={fetchPost}
          />
        }
        data={news}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DetailPost', { id: item.id, title: item.title });
            }}>
            <Post
              title={item.title}
              createdAt={item.createdAt}
              imageUrl={item.imageUrl}
            />
          </TouchableOpacity>
        )}
      />
    </HomeScreen>
  );
};
