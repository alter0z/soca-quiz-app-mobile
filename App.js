import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StarterScreen from './components/StarterScreen.js';
import QuizScreen from './components/QuizScreen.js';
import PlayQuizScreen from './components/PlayQuizScreen.js';
import ResultScreen from './components/ResultScreen.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Starter" component={StarterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Quiz" component={QuizScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Play" component={PlayQuizScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Results" component={ResultScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
