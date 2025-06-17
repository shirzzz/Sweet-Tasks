import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';
import React from 'react';

import DayPlannerScreen from './DayPlannerScreen';
import HomeScreen from './HomeScreen';
import WeekPlannerScreen from './WeekPlannerScreen';

export type RootStackParamList = {
  Home: undefined;
  DayPlanner: { day: string };
  WeekPlanner: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="DayPlanner"
          component={DayPlannerScreen}
          options={({ route }) => ({
            title: route.params.day, // shows the day name in the top bar
          })}
        />
        <Stack.Screen
          name="WeekPlanner"
          component={WeekPlannerScreen}
          options={{ title: 'Week Planner' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default registerRootComponent(App);
