import React from 'react'
import {
  ActivityIndicator,
  View,
  Text,
} from 'react-native';

export const Loading = () => {
  return (
    <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size='large' />
        <Text
          style={{
            marginTop: 10,
          }}>
          Loading...
        </Text>
      </View>
  )
}
