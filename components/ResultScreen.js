import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function ResultScreen({ route, navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.percent}>{Math.floor((route.params.answers / route.params.questions) * 100)}%</Text>
      <Text style={styles.score}>Your Score {route.params.points}</Text>
      <Text style={styles.correcAnswer}>
        Your Answer {route.params.answers} Correct of {route.params.questions} Questions.
      </Text>
      <TouchableOpacity style={styles.playButton} onPress={() => navigation.navigate('Quiz')}>
        <Text style={styles.buttonText}>Play Again</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percent: {
    color: '#f4f4f4',
    fontSize: 80,
    fontWeight: 'bold',
    marginStart: 60,
    marginEnd: 60,
    textAlign: 'center',
  },
  score: {
    color: '#f4f4f4',
    fontSize: 20,
    fontWeight: 'bold',
    marginStart: 60,
    marginEnd: 60,
    textAlign: 'center',
  },
  correcAnswer: {
    color: '#f4f4f4',
    fontSize: 16,
    marginStart: 60,
    marginEnd: 60,
    textAlign: 'center',
    marginTop: 20,
  },
  playButton: {
    marginTop: 100,
    height: 50,
    width: 100,
    padding: 14,
    backgroundColor: '#f4f4f4',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2196F3',
  },
});
