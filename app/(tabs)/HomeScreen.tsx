import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { RootStackParamList } from './../../App.tsx'; // this must point to where your RootStackParamList is declared

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>✨ Sweet Tasks ✨</Text>

      <View style={styles.buttonGroup}>
        <Button
          title="🗓 Organize the Whole Week"
          onPress={() => navigation.navigate('WeekPlanner')}
          color="#6C63FF"
        />
      </View>

      <Text style={styles.subtitle}>Or choose a specific day:</Text>

      {days.map(day => (
        <View key={day} style={styles.buttonGroup}>
          <Button
            title={`📅 ${day}`}
            onPress={() => navigation.navigate(day as keyof RootStackParamList)}
            color="#c6c7ff"
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 30,
    marginBottom: 10,
  },
  buttonGroup: {
    marginBottom: 12,
  },
});
