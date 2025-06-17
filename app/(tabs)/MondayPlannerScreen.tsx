import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from './index'; // or './App'

type Props = NativeStackScreenProps<RootStackParamList, 'Monday'>;

const sweetQuotes = [
  "To infinity and beyond!",
  "If you can dream it you can do it!",
  "Adventure is out there!",
  "Remember, you're the one who can fill the world with sunshine!",
  "You're mad. Bonkers. Off your head. But I'll tell you a secret... all the best people are!",
  "All our dreams can come true, if we have the courage to pursue them.",
  "It's kind of fun to do the impossible.",
  "Laughter is timeless, imagination has no age, dreams are forever.",
  "When you believe in a thing, believe in it all the way, implicitly and unquestionable.",
  "The more you like yourself, the less you are like anyone else, which makes you unique.",
  "First, think. Second, believe. Third, dream. And finally, dare.",
  "You're braver than you believe, stronger than you seem, and smarter than you think.",
  "Just keep swimming.",
  "Even miracles take a little time.",
  "Sometimes the right path is not the easiest one.",
  "You control your destiny - you don't need magic to do it",
  "Life is a journey to be experienced, not a problem to be solved.",
  "In every job that must be done, there is an element of fun.",
  "You must try things that may not work, and you must not let anyone define your limits because of where you come from.",
  "The only thing predictable about life is its unpredictability.",
  "The things that make me different are the things that make me.",
  "You're never too old to be young",
  "Change is good",
  "Don't just fly, soar",
  "The very things that hold you down are going to lift you up.",
  "You don't lose hope, love. If you do, you lose everything",
  "Your identity is your most valuable possession. Protect it.",
  "All it takes is faith and trust",
  "If watching is all you're going to do, then you're going to watch your life go by without you",
  "Believe you can, then you will",
  "If you focus on what you left behind, you will never see what lies ahead",
  "The problem is not the problem. The problem is your attitude about the problem",
  "Your only limit is your soul",
  "I never look back, darling! It distracts from the now",
  "You don't have time to be timid. You must be bold, daring.",
  "Have courage and be kind",
  "Sometimes the smallest things take up the most room in your heart",
  "Any day spent with you is my favorite day. So, today is my new favorite day",
  "You can’t stay in your corner of the Forest waiting for others to come to you. You have to go to them sometimes.",
  "It is more fun to talk with someone who doesn’t use long, difficult words but rather short, easy words like, What about lunch?",
  "I am short, fat, and proud of that.",
  "Nobody can be uncheered with a balloon.",
  "People say nothing is impossible, but I do nothing every day",
];

const dayColors: Record<string, string> = {
  Sunday: "#B72828",
  Monday: "#FF9933",
  Tuesday: "#119B1F",
  Wednesday: "#214ACE",
  Thursday: "#214ACE",
  Friday: "#972DD4",
  Saturday: "#F36FD9",
};

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

type AllTasks = Record<string, Task[]>;
const STORAGE_KEY = `@WeekPlanner:tasks`;

export default function MondayPlannerScreen({ route }: any) {
  // Safely get day param, fallback if undefined
  const day = "Monday";
  
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);


   // Load tasks for this day on mount
  useEffect(() => {
    (async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (jsonValue != null) {
          const allTasks: AllTasks = JSON.parse(jsonValue);
          setTasks(allTasks[day] || []);
        }
      } catch (e) {
        console.warn("Error loading tasks:", e);
      }
    })();
  }, [day]);

  // Save tasks for this day on change
  useEffect(() => {
    (async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        const allTasks: AllTasks = jsonValue ? JSON.parse(jsonValue) : {};
        allTasks[day] = tasks;
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(allTasks));
      } catch (e) {
        console.error("Error saving tasks:", e);
      }
    })();
  }, [tasks, day]);

  // Add a new task only if input is not empty or whitespace
  const addTask = () => {
    if (task.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now().toString(), text: task.trim(), completed: false },
      ]);
      setTask(""); // clear input after adding
    }
  };

  // Toggle task completed status
  const toggleCompleteTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );

    // Show a random sweet quote when marking as completed
    const toggledTask = tasks.find((t) => t.id === id);
    if (toggledTask && !toggledTask.completed) {
      const randomQuote =
        sweetQuotes[Math.floor(Math.random() * sweetQuotes.length)];
      Alert.alert("✨ Great Job! ✨", randomQuote);
    }
  };

  // Remove a task by id
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: dayColors[day] || "#000" }]}>
        {day}'s Tasks
      </Text>

      {/* Input for new task + Add button */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          value={task}
          onChangeText={setTask}
          onSubmitEditing={addTask}
          returnKeyType="done"
        />
        <Button title="Add" onPress={addTask} color="#c6c7ff" />
      </View>

      {/* Task list */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskRow}>
            <TouchableOpacity
              onPress={() => toggleCompleteTask(item.id)}
              style={{ flex: 1 }}
            >
              <Text
                style={[
                  styles.task,
                  item.completed && styles.completedTask,
                ]}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteTask(item.id)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // fill the whole screen
    padding: 24,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row", // input and button in a row
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    marginRight: 10,
    padding: 8,
    borderRadius: 5,
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  task: {
    fontSize: 18,
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  deleteButton: {
    marginLeft: 10,
  },
  deleteButtonText: {
    fontSize: 18,
    color: "#ff4444",
  },
});
