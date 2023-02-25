import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function StarterScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Quiz App</Text>
      <Button title="Start" onPress={() => navigation.navigate('Quiz')} color="#2196F3" />
      <StatusBar style="auto" />
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
  title: {
    color: '#4F565E',
    fontSize: 30,
    fontWeight: 'bold',
    marginStart: 60,
    marginEnd: 60,
    textAlign: 'center',
    paddingBottom: 30,
  },
});
