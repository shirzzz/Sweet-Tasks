import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
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

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const colors = ["#B72828", "#FF9933", "#119B1F", "#119B1F", "#214ACE", "#972DD4", "#F36FD9"];
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
  day: string;
  color: string;
  completed: boolean;
};

export default function WeekPlannerScreen({navigation}: any) {
  const [task, setTask] = useState('');
  const [day, setDay] = useState("Sunday");
  const [color, setColor] = useState(colors[0]);
  const [tasks, setTasks] = useState<Task[]>([]);

function getColorForDay(day: string){
    const index = days.indexOf(day);
    if(index == -1) return "#FFFFFF";
    return colors[index]
}

  const addTask = () => {
    if (task.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now().toString(),
          text: task,
          day,
          color: getColorForDay(day),
          completed: false,
        },
      ]);
      setTask('');
    }
  };

  const toggleComplete = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
      const randomQuote =
        sweetQuotes[Math.floor(Math.random() * sweetQuotes.length)];
      Alert.alert("✨ Great Job! ✨", randomQuote);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🗓 Plan Your Week</Text>

      <TextInput
        placeholder="New Task"
        value={task}
        onChangeText={setTask}
        style={styles.input}
        onSubmitEditing={addTask}
        returnKeyType="done"
      />

      <View style={styles.pickers}>
        <Picker
          selectedValue={day}
          onValueChange={setDay}
          style={styles.picker}
        >
          {days.map(d => (
            <Picker.Item key={d} label={d} value={d} />
          ))}
        </Picker>
      </View>

      <Button title="Add Task" onPress={addTask} color="#c6c7ff" />

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.taskItem}>
            <TouchableOpacity
              onPress={() => toggleComplete(item.id)}
              style={[styles.taskButton, { backgroundColor: item.color }]}
            >
              <Text
                style={[styles.taskText, item.completed && styles.completedTask]}
              >
                {item.day}: {item.text}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteButton}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  pickers: {
    flexDirection: "row",
    marginBottom: 10,
  },
  picker: {
    flex: 1,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  taskButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
  },
  taskText: {
    fontSize: 16,
    color: "#fff",
  },
  completedTask: {
    textDecorationLine: "line-through",
    opacity: 0.6,
  },
  deleteButton: {
    fontSize: 18,
    marginLeft: 10,
    color: "#ff4444",
  },
});
