import { useContext } from 'react';
import { FlatList, RefreshControl, TouchableOpacity, Text } from 'react-native';

import { AppContext } from '../store/AppContext';

import { Post } from '../components/Post';
import { Loading } from '../components/Loading';
import { AddBlock } from '../components/AddBlock';
import { DialogWindow } from '../components/DialogWindow';
import { CategoryList } from '../components/CategoryList';

import styled from 'styled-components/native';

const HomeScreen = styled.View`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

// TODO:

export const Home = ({ navigation }) => {
  const { news, filteredNews, isLoading, isDialogShow, fetchPost } = useContext(AppContext); // забираем из общего хранилища, нужные данные

  const onPressPost = (id, title) => {
    navigation.navigate('DetailPost', { id: item.id, title: item.title });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <HomeScreen>
      {/* условная отрисовка диалогового окна */}
      {isDialogShow ? <DialogWindow /> : ''}
      {/* Список категорий */}
      <Text style={{ marginTop: 15 }}>
        <CategoryList />;
      </Text>
      {/* Отрисовка списка новостей */}
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={fetchPost}
          />
        }
        data={filteredNews}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPressPost(item.id, item.title)}>
            <Post {...item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      {/* Меню с кнопками */}
      <AddBlock navigation={navigation} />
    </HomeScreen>
  );
};
