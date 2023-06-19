import { FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { useContext } from 'react';

import { AppContext } from '../store/AppContext';

import { Post } from '../components/Post';
import { Loading } from '../components/Loading';
import { AddBlock } from '../components/AddBlock';

import styled from 'styled-components/native';
import { DialogWindow } from '../components/DialogWindow';

const HomeScreen = styled.View`
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
`;

export const Home = ({ navigation }) => {
  const { news, isLoading, isDialogShow, fetchPost } = useContext(AppContext); // забираем из общего хранилища, нужные данные

  if (isLoading) {
    return <Loading />;
  }

  return (
    <HomeScreen>
      {isDialogShow ? <DialogWindow /> : ''}

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
            key={item.title}
            onPress={() => {
              navigation.navigate('DetailPost', { id: item.id, title: item.title });
            }}>
            <Post
              key={item.title}
              {...item}
            />
          </TouchableOpacity>
        )}
      />
    </HomeScreen>
  );
};
