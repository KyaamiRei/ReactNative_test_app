import React, { useState, useEffect, useContext } from 'react';
import { Alert, View } from 'react-native';
import axios from 'axios';

import styled from 'styled-components/native';

import { Loading } from '../components/Loading';
import { AppContext } from '../store/AppContext';

const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
`;

const PostText = styled.Text`
  font-size: 18px;
  line-height: 24px;
`;

export const DetailPost = ({ route, navigation }) => {
  const { news, isLoading, setIsLoading } = useContext(AppContext); // загрузка данных из общего хранилища

  const [data, setData] = useState({}); // состояние для загруженного поста

  const { id, title } = route.params; // параметры взятые из пути

  // при первой загрузке устанавливаем название страницы и подгружаем новость с сервера
  useEffect(() => {
    navigation.setOptions({
      title,
    });
    setData(news.find((item) => item.id === id));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={{ padding: 20 }}>
      <PostImage
        source={{
          uri: data.imageUrl,
        }}
      />
      <PostText>{data.text}</PostText>
    </View>
  );
};
