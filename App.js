import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);

  const plus = () => {
    setCount((count) => count + 1);
  };
  const minus = () => {
    setCount((count) => count - 1);
  };

  return (
    <View style={styles.container}>
      <Text>Count: {count}</Text>
      <View style={styles.buttonContainer}>
        <Button
          onPress={plus}
          style={styles.button}
          title='+'
        />
        <Button
          onPress={minus}
          style={styles.button}
          title='-'
        />
      </View>

      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    width: 100,
  },
  button: {
    width: 200,
  },
});
