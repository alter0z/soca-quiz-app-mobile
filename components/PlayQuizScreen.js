import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function QuizScreen({ route, navigation }) {
  const { item } = route.params;
  const [questions, setQuestions] = useState([
    {
      id: '',
      quiz_id: '',
      question: '',
      option_a: '',
      option_b: '',
      option_c: '',
      option_d: '',
      correct_answer: '',
      attachment_url: '',
      score: 0,
      time: 0,
    },
  ]);
  // const [questionsTmp, setQuestionsTmp] = useState([]);
  const [dataSize, setDataSize] = useState();
  // const [arr, setArr] = useState([]);
  // const [timerCount, setTimer] = useState();
  const [counter, setCounter] = useState(10);
  const [index, setIndex] = useState(0);
  const [optaBgColor, setOptaBgColor] = useState('#DBEDFB');
  const [optbBgColor, setOptbBgColor] = useState('#DBEDFB');
  const [optcBgColor, setOptcBgColor] = useState('#DBEDFB');
  const [optdBgColor, setOptdBgColor] = useState('#DBEDFB');
  const [optaTxtColor, setOptaTxtColor] = useState('#2196F3');
  const [optbTxtColor, setOptbTxtColor] = useState('#2196F3');
  const [optcTxtColor, setOptcTxtColor] = useState('#2196F3');
  const [optdTxtColor, setOptdTxtColor] = useState('#2196F3');
  const [isAnswered, setIsAnswered] = useState(false);
  // const [isFirstTime, setIsFirstTime] = useState(false);
  const [correctAnswers, setCorrectAnsers] = useState(0);
  const [point, setPoint] = useState(0);

  let interval = null;
  // let mIndex = 0;

  const getQuestions = () => {
    // let arr = [];
    axios({
      method: 'GET',
      url: 'http://192.168.2.189:8080/api/questions/' + item.id,
      headers: {},
    })
      .then((response) => {
        setDataSize(response.data.data_size - 1);
        // for (let i = 0; i < dataSize; i++) {
        //   const newItem = {
        // id: response.data.data[i].id,
        // quiz_id: response.data.data[i].quiz_id,
        // question: response.data.data[i].question,
        // option_a: response.data.data[i].option_a,
        // option_b: response.data.data[i].option_b,
        // option_c: response.data.data[i].option_c,
        // option_d: response.data.data[i].option_d,
        // correct_answer: response.data.data[i].correct_answer,
        // attachment_url: response.data.data[i].attachment_url,
        // score: response.data.data[i].score,
        // time: response.data.data[i].time,
        //   };
        //   arr.push(newItem);
        // }
        setQuestions(response.data.data);
        // setCounter(questions[index].time);
        // setIsFirstTime(true);
        // console.log(mIndex + ' ' + questions.id);
        // console.log(index + ' ' + questions[index].id);
        // console.log(questions);
        console.log(questions);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getQuestions();
  }, []);

  useEffect(() => {
    const mInterval = () => {
      if (counter >= 1) {
        setCounter((state) => state - 1);
      }
      if (counter === 0) {
        // if (index == 1) setIsFirstTime(false);
        setOptaBgColor('#DBEDFB');
        setOptbBgColor('#DBEDFB');
        setOptcBgColor('#DBEDFB');
        setOptdBgColor('#DBEDFB');
        setOptaTxtColor('#2196F3');
        setOptbTxtColor('#2196F3');
        setOptcTxtColor('#2196F3');
        setOptdTxtColor('#2196F3');
        setIsAnswered(false);
        // mIndex++;
        // getQuestions();
        setCounter(questions[index].time);
        // if (!isFirstTime) setIndex(index + 1);
        setIndex(index + 1);
        // console.log(index + ' ' + questions[index].id);
        // setQuestionsTmp(questions[mIndex]);
        // console.log(mIndex + ' ' + questions[mIndex].id);
        // console.log(questions);
      }
    };

    interval = setTimeout(mInterval, 1000);

    return () => {
      clearTimeout(interval);
    };
  }, [counter]);

  useEffect(() => {
    if (index + 1 > dataSize) {
      clearTimeout(interval);
      setIndex(0);
      // setCounter(1);
      // setQuestions([
      //   {
      //     id: '',
      //     quiz_id: '',
      //     question: '',
      //     option_a: '',
      //     option_b: '',
      //     option_c: '',
      //     option_d: '',
      //     correct_answer: '',
      //     attachment_url: '',
      //     score: 0,
      //     time: 0,
      //   },
      // ]);
      navigation.navigate('Results', {
        answers: correctAnswers,
        points: point,
        questions: dataSize,
      });
    }
  }, [index]);

  useEffect(() => {
    if (!interval) {
      setCounter(questions[index].time);
    }
  }, [index]);

  const checkAnswerOpta = () => {
    if (!isAnswered) {
      setOptaTxtColor('#fff');
      if (questions[index].option_a === questions[index].correct_answer) {
        setOptaBgColor('#4caf50');
        setPoint(point + questions[index].score);
        setCorrectAnsers(correctAnswers + 1);
      } else {
        setOptaBgColor('#ff0015');
        checkAnotherOptionCorrectAnswer();
      }
      setIsAnswered(true);
    }
  };
  const checkAnswerOptb = () => {
    if (!isAnswered) {
      setOptbTxtColor('#fff');
      if (questions[index].option_b === questions[index].correct_answer) {
        setOptbBgColor('#4caf50');
        setPoint(point + questions[index].score);
        setCorrectAnsers(correctAnswers + 1);
      } else {
        setOptbBgColor('#ff0015');
        checkAnotherOptionCorrectAnswer();
      }
      setIsAnswered(true);
    }
  };
  const checkAnswerOptc = () => {
    if (!isAnswered) {
      setOptcTxtColor('#fff');
      if (questions[index].option_c === questions[index].correct_answer) {
        setOptcBgColor('#4caf50');
        setPoint(point + questions[index].score);
        setCorrectAnsers(correctAnswers + 1);
      } else {
        setOptcBgColor('#ff0015');
        checkAnotherOptionCorrectAnswer();
      }
      setIsAnswered(true);
    }
  };
  const checkAnswerOptd = () => {
    if (!isAnswered) {
      setOptdTxtColor('#fff');
      if (questions[index].option_d === questions[index].correct_answer) {
        setOptdBgColor('#4caf50');
        setPoint(point + questions[index].score);
        setCorrectAnsers(correctAnswers + 1);
      } else {
        setOptdBgColor('#ff0015');
        checkAnotherOptionCorrectAnswer();
      }
      setIsAnswered(true);
    }
  };

  const checkAnotherOptionCorrectAnswer = () => {
    if (questions[index].option_a === questions[index].correct_answer) {
      setOptaBgColor('#4caf50');
      setOptaTxtColor('#fff');
    } else if (questions[index].option_b === questions[index].correct_answer) {
      setOptbBgColor('#4caf50');
      setOptbTxtColor('#fff');
    } else if (questions[index].option_c === questions[index].correct_answer) {
      setOptcBgColor('#4caf50');
      setOptcTxtColor('#fff');
    } else if (questions[index].option_d === questions[index].correct_answer) {
      setOptdBgColor('#4caf50');
      setOptdTxtColor('#fff');
    }
  };

  // const renderItem = ({ item }) => {
  //   return (
  //     <View style={styles.item}>
  //       <Text style={styles.quizTitle}>{item?.question}</Text>
  //       <Text>answer: {item.correct_answer}</Text>
  //     </View>
  //   );
  // };

  if (dataSize + 1 == 0)
    return (
      <View style={styles.oopsContainer}>
        <Text style={styles.oopsTitle}>Oops. This Quiz has no Question</Text>
        <Button title="Back" onPress={() => navigation.navigate('Quiz')} color="#2196F3" />
        <StatusBar style="auto" />
      </View>
    );

  // console.log(questions[0]);

  if (dataSize + 1 > 0)
    return (
      // <SafeAreaView style={styles.container}>
      //   <FlatList data={questions} renderItem={renderItem} keyExtractor={(item) => item.id} />
      // </SafeAreaView>
      <View style={styles.container}>
        <View style={styles.countBox}>
          <Text style={styles.textCounter}>{counter}</Text>
        </View>
        <Text style={styles.indexIndicator}>
          Question {index + 1} of {dataSize}
        </Text>
        <Text style={styles.questionText}>{questions[index].question}</Text>
        <TouchableOpacity style={[styles.answer, { backgroundColor: optaBgColor }]} onPress={() => checkAnswerOpta()}>
          <Text style={[styles.answerText, { color: optaTxtColor }]}>A. {questions[index].option_a}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.answer, { backgroundColor: optbBgColor }]} onPress={() => checkAnswerOptb()}>
          <Text style={[styles.answerText, { color: optbTxtColor }]}>B. {questions[index].option_b}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.answer, { backgroundColor: optcBgColor }]} onPress={() => checkAnswerOptc()}>
          <Text style={[styles.answerText, { color: optcTxtColor }]}>C. {questions[index].option_c}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.answer, { backgroundColor: optdBgColor }]} onPress={() => checkAnswerOptd()}>
          <Text style={[styles.answerText, { color: optdTxtColor }]}>D. {questions[index].option_d}</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: StatusBar.currentHeight || 0,
  },
  oopsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  oopsTitle: {
    color: '#4F565E',
    fontSize: 30,
    fontWeight: 'bold',
    marginStart: 60,
    marginEnd: 60,
    textAlign: 'center',
    paddingBottom: 30,
  },
  questionText: {
    color: '#2196F3',
    fontSize: 20,
    marginVertical: 20,
    marginHorizontal: 16,
    fontWeight: 'bold',
  },
  answerText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: '600',
  },
  indexIndicator: {
    fontSize: 16,
    marginStart: 20,
    fontWeight: '500',
  },
  countBox: {
    width: 56,
    height: 56,
    marginTop: 70,
    alignSelf: 'flex-end',
    marginEnd: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DBEDFB',
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
  textCounter: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2196F3',
  },
  answer: {
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
});
