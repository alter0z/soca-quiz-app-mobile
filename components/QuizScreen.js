import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, FlatList, ScrollView, Button } from 'react-native';
import React from 'react';
import axios from 'axios';
import { Rating } from 'react-native-stock-star-rating';

export default function QuizScreen({ navigation }) {
  const [quizzes, setQuizzes] = React.useState();

  const getQuizzes = () => {
    axios({
      method: 'GET',
      url: 'http://192.168.2.189:8080/api/quizzes',
      headers: {},
    })
      .then((response) => {
        setQuizzes(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useState(() => {
    getQuizzes();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.quizTitle}>{item.quiz_name}</Text>
        <Text>By {item.author}</Text>
        <View style={styles.ratingView}>
          <Rating stars={item.rating} maxStars={5} size={20} />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
        <Button title="Play" color="#2196F3" onPress={() => navigation.navigate('Play', { item: item })} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.subtitle}>Choose a Quiz you like</Text>
        <FlatList data={quizzes} renderItem={renderItem} keyExtractor={(item) => item.id} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: StatusBar.currentHeight || 0,
  },
  quizTitle: {
    color: '#2196F3',
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  item: {
    backgroundColor: '#DBEDFB',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
    shadowColor: '#cdcdcd',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 5.65,

    elevation: 6,
  },
  ratingView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  ratingText: {
    marginStart: 8,
  },
  subtitle: {
    marginTop: 30,
    marginBottom: 20,
    marginStart: 16,
    fontSize: 16,
    color: '#4F565E',
    fontWeight: '500',
  },
});
