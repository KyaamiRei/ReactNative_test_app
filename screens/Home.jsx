import { FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { useContext } from 'react';

import { AppContext } from '../store/AppContext';

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
  const { news, isLoading, fetchPost } = useContext(AppContext); // забираем из общего хранилища, нужные данные

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
