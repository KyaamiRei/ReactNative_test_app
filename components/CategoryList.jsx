import React, { useContext } from 'react';
import { Text } from 'react-native';

import { AppContext } from '../store/AppContext';

import styled from 'styled-components/native';

const CategoryListBlock = styled.View`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
`;

const CategoryItem = styled.TouchableOpacity`
  width: 85px;
  height: 40px;
  display: flex;
  margin-left: 15px;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 20px;
  border-width: 1px;
  border-style: solid;
`;

const CategoryText = styled.Text`
  font-weight: 600;
`;

export const CategoryList = () => {
  const { activeCategory, categories, setActiveCategory } = useContext(AppContext);

  const setCategory = (id) => {
    setActiveCategory(id);
  };

  return (
    <CategoryListBlock>
      {categories.map((category, index) => (
        <CategoryItem
          onPress={() => setCategory(index)}
          key={index}
          style={activeCategory === index ? { backgroundColor: 'black' } : ''}>
          <CategoryText style={activeCategory === index ? { color: 'white' } : ''}>
            {category}
          </CategoryText>
        </CategoryItem>
      ))}
    </CategoryListBlock>
  );
};
