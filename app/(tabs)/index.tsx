import React, { useState } from "react";
import {
  Alert, // for user to type a task
  Button, // to add a task
  FlatList, // for showing sweet quotes when a task is completed
  Keyboard, // to make each task clickable
  StyleSheet, // a container (like <div> in HTML)
  Text, // for displaying text
  TextInput, // efficient list rendering
  TouchableOpacity,
  View
} from 'react-native';
const sweetQuotes = [
    "To infinity and beyond! ",
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
    "People say nothing is impossible, but I do nothing every day"
];

type task = {
  id: string;
  text: string;
};

export default function HomeScreen(){
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState<task[]>([]);
    const addTask = () => {  //function to add a task to the list
        //I want to add only non empty tasks
        if(task.trim()){
            //Adding a new task to the array of tasks with a unique ID (time stamp should be good)
            setTasks([...tasks, {id: Date.now().toString(), text: task}]);
            setTask('');
            Keyboard.dismiss();
        }
    };

    const completeTask = (id: string) => { //function to mark a task as complete
        setTasks(tasks.filter((t) => t.id !== id));
        const random_quote = sweetQuotes[Math.floor(Math.random() * sweetQuotes.length)];
        Alert.alert("✨✨✨", random_quote);
    };

    //Layout of the screen:
    return (
    <View style={styles.container}>
      <Text style={styles.title}>✨ Sweet Tasks ✨</Text>

      {/* Input + Add Button */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          value={task}
          onChangeText={setTask} // Update task state as user types
          onSubmitEditing={addTask}
          returnKeyType = "done"
        />
        <Button title="Add" onPress={addTask} />
      </View>

      {/* List of tasks */}
      <FlatList
        data={tasks}                            // the task array
        keyExtractor={(item) => item.id}        // unique key for each item
        renderItem={({ item }) => (             // how to render each item
          <TouchableOpacity onPress={() => completeTask(item.id)}>
            <Text style={styles.task}>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// CSS-like styling for the app
const styles = StyleSheet.create({
  container: {
    flex: 1,                   // fill the entire screen
    padding: 24,               // space around the content
    paddingTop: 60,            // extra space at the top
    backgroundColor: '#fff'    // white background
  },
  title: {
    fontSize: 28,              // big title
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  inputContainer: {
    flexDirection: 'row',      // input + button side by side
    marginBottom: 20
  },
  input: {
    flex: 1,                   // input takes all space except button
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 10,
    padding: 8,
    borderRadius: 5
  },
  task: {
    fontSize: 18,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    marginBottom: 10
  }
});
