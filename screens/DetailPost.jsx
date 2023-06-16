import React, { useState, useEffect } from 'react';
import { Alert, View } from 'react-native';
import axios from 'axios';

import styled from 'styled-components/native';

import { Loading } from '../components/Loading';

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
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  const { id, title } = route.params;

  const fetchPostById = () => { 
    setIsLoading(true);
    axios
      .get(`https://6489ff4a5fa58521cab099c9.mockapi.io/news/${id}`)
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert('Ошибка', 'He удалось получить статью');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    navigation.setOptions(
      {
        title
      }
    )
    fetchPostById();
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
