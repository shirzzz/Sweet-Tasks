import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo'; // ✅ ייבוא
import React from 'react';

import FridayPlannerScreen from './app/(tabs)/FridayPlannerScreen';
import HomeScreen from './app/(tabs)/HomeScreen';
import MondayPlannerScreen from './app/(tabs)/MondayPlannerScreen';
import SaturdayPlannerScreen from './app/(tabs)/SaturdayPlannerScreen';
import SundayPlannerScreen from './app/(tabs)/SundayPlannerScreen';
import ThursdayPlannerScreen from './app/(tabs)/ThursdayPlannerScreen';
import TuesdayPlannerScreen from './app/(tabs)/TuesdayPlannerScreen';
import WednesdayPlannerScreen from './app/(tabs)/WednesdayPlannerScreen';
import WeekPlannerScreen from './app/(tabs)/WeekPlannerScreen';

export type RootStackParamList = {
  Home: undefined;
  Sunday: undefined;
  Monday: undefined;
  Tuesday: undefined;
  Wednesday: undefined;
  Thursday: undefined;
  Friday: undefined;
  Saturday: undefined;
  WeekPlanner: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WeekPlanner">
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

// 👇 מאוד חשוב: זה רושם את הקומפוננטה שלך בתור ה־entry של האפליקציה
export default registerRootComponent(App);
