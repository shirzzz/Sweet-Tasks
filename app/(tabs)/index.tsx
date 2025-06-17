import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';
import React from 'react';

import FridayPlannerScreen from './FridayPlannerScreen';
import HomeScreen from './HomeScreen';
import MondayPlannerScreen from './MondayPlannerScreen';
import SaturdayPlannerScreen from './SaturdayPlannerScreen';
import SundayPlannerScreen from './SundayPlannerScreen';
import ThursdayPlannerScreen from './ThursdayPlannerScreen';
import TuesdayPlannerScreen from './TuesdayPlannerScreen';
import WednesdayPlannerScreen from './WednesdayPlannerScreen';
import WeekPlannerScreen from './WeekPlannerScreen';

export type RootStackParamList = {
  Home: undefined
  Sunday: undefined
  Monday: undefined
  Tuesday: undefined
  Wednesday: undefined
  Thursday: undefined
  Friday: undefined
  Saturday: undefined
  WeekPlanner: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Sunday" component={SundayPlannerScreen} />
        <Stack.Screen name="Monday" component={MondayPlannerScreen} />
        <Stack.Screen name="Tuesday" component={TuesdayPlannerScreen} />
        <Stack.Screen name="Wednesday" component={WednesdayPlannerScreen} />
        <Stack.Screen name="Thursday" component={ThursdayPlannerScreen} />
        <Stack.Screen name="Friday" component={FridayPlannerScreen} />
        <Stack.Screen name="Saturday" component={SaturdayPlannerScreen} />
        <Stack.Screen name="WeekPlanner" component={WeekPlannerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default registerRootComponent(App);
