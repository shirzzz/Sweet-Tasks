import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// import type { RootStackParamList } from "./.. .";

// type Props = NativeStackScreenProps<RootStackParamList, "WeekPlanner">;

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const colors = [  
  "#B72828",
  "#FF9933",
  "#119B1F",
  "#214ACE",
  "#6C63FF",
  "#972DD4",
  "#F36FD9"
];
// Make sure colors array length aligns with days length. Adjust as preferred.

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

type Task = {
  id: string;
  text: string;
  day: string; // one of days[]
  color: string;
  completed: boolean;
};

const STORAGE_KEY = "@WeekPlanner:tasks";

export default function WeekPlannerScreen() {
  const [taskText, setTaskText] = useState("");
  const [selectedDay, setSelectedDay] = useState(days[0]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Utility: get color for a given day
  const getColorForDay = (day: string) => {
    const idx = days.indexOf(day);
    return idx >= 0 && idx < colors.length ? colors[idx] : "#999";
  };

  // Load tasks from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) {
          const parsed: unknown = JSON.parse(json);
          if (Array.isArray(parsed)) {
            setTasks(parsed as Task[]);
          }
        }
      } catch (e) {
        console.warn("Failed to load tasks:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Save tasks to AsyncStorage whenever tasks change
  useEffect(() => {
    if (loading) return;
    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      } catch (e) {
        console.warn("Failed to save tasks:", e);
      }
    })();
  }, [tasks, loading]);

  // Add a new task
  const addTask = () => {
    const trimmed = taskText.trim();
    if (!trimmed) {
      Alert.alert("Empty Task", "Please enter a non-empty task");
      return;
    }
    const newTask: Task = {
      id: Date.now().toString(),
      text: trimmed,
      day: selectedDay,
      color: getColorForDay(selectedDay),
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
    setTaskText("");
  };

  // Toggle complete status
  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: !t.completed,
            }
          : t
      )
    );
    const randomQuote =
      sweetQuotes[Math.floor(Math.random() * sweetQuotes.length)];
    Alert.alert("✨ Great Job! ✨", randomQuote);
  };

  // Delete a task
  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Prepare sections for SectionList: one section per day
  const sections = days.map((d) => ({
    title: d,
    data: tasks.filter((t) => t.day === d),
  }));

  // Key extractor
  const keyExtractor = useCallback((item: Task) => item.id, []);

  // Render one task item
  const renderItem = useCallback(
    ({ item }: { item: Task }) => (
      <View style={styles.taskItem}>
        <TouchableOpacity
          onPress={() => toggleComplete(item.id)}
          style={[
            styles.taskButton,
            { backgroundColor: item.color },
            item.completed && styles.taskButtonCompleted,
          ]}
        >
          <Text
            style={[
              styles.taskText,
              item.completed && styles.completedTaskText,
            ]}
          >
            {item.text}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTask(item.id)}>
          <Text style={styles.deleteButton}>❌</Text>
        </TouchableOpacity>
      </View>
    ),
    []
  );

  // Render section header
  const renderSectionHeader = useCallback(
    ({ section }: { section: { title: string; data: Task[] } }) => (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{section.title}</Text>
      </View>
    ),
    []
  );

  // If still loading from storage, we could return null or a loading indicator
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading tasks...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
        style={{ flex: 1 }}
      >
        <Text style={styles.title}>🗓 Plan Your Week</Text>

        <View style={styles.inputRow}>
          <TextInput
            placeholder="New Task"
            value={taskText}
            onChangeText={setTaskText}
            style={styles.input}
            onSubmitEditing={addTask}
            returnKeyType="done"
          />
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedDay}
              onValueChange={setSelectedDay}
              style={styles.picker}
            >
              {days.map((d) => (
                <Picker.Item key={d} label={d} value={d} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.addButton}>
          <Button title="Add Task" onPress={addTask} color="#6C63FF" />
        </View>

        <SectionList
          sections={sections}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No tasks yet. Add one above!
              </Text>
            </View>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  loadingText: {
    marginTop: 50,
    textAlign: "center",
    fontSize: 16,
    color: "#666",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  input: {
    flex: 2,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    marginRight: 8,
  },
  pickerContainer: {
    flex: 1,
    borderWidth: Platform.OS === "android" ? 1 : 0,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
  },
  picker: {
    flex: 1,
  },
  addButton: {
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 40,
  },
  sectionHeader: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginTop: 12,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: "600",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
    marginHorizontal: 4,
  },
  taskButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
  },
  taskButtonCompleted: {
    opacity: 0.6,
  },
  taskText: {
    fontSize: 16,
    color: "#fff",
  },
  completedTaskText: {
    textDecorationLine: "line-through",
  },
  deleteButton: {
    fontSize: 18,
    marginLeft: 12,
    color: "#ff4444",
  },
  emptyContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
});
