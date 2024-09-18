import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Checkbox, Button, Switch } from 'react-native-paper';

// Define a type for each task object
interface Task {
  key: string;
  text: string;
  completed: boolean;
}

const Layout: React.FC = () => {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const themeStyles = isDarkMode ? darkTheme : lightTheme;

  // Function to add a new task
  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, { key: Date.now().toString(), text: task, completed: false }]);
      setTask(''); // Clear the input after adding the task
    }
  };

  // Function to toggle task completion
  const toggleTaskCompletion = (taskKey: string) => {
    setTasks(
      tasks.map((task) =>
        task.key === taskKey ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to delete a task
  const deleteTask = (taskKey: string) => {
    setTasks(tasks.filter((task) => task.key !== taskKey));
  };

  return (
    <View style={[styles.container, themeStyles.container]}>
      <Text style={[styles.title, themeStyles.text]}>To-Do List</Text>

      {/* Night Mode Toggle */}
      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, themeStyles.text]}>
          {isDarkMode ? 'Night Mode' : 'Light Mode'}
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={() => setIsDarkMode(!isDarkMode)}
        />
      </View>

      {/* Task input field */}
      <TextInput
        style={[styles.input, themeStyles.input]}
        placeholder="Add a new task"
        placeholderTextColor={isDarkMode ? '#ddd' : '#555'}
        value={task}
        onChangeText={setTask}
      />
      
      {/* Add Task button */}
      <Button 
        mode="contained" 
        onPress={addTask} 
        style={[styles.addButton, { backgroundColor: '#89CFF0' }]} // Set background color to cyan
      >
        Add Task
      </Button>

      {/* Task List */}
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={[styles.taskContainer, themeStyles.taskContainer]}>
            <Checkbox
              status={item.completed ? 'checked' : 'unchecked'}
              onPress={() => toggleTaskCompletion(item.key)}
              color={isDarkMode ? '#fff' : '#000'}
            />
            <Text style={[styles.taskText, item.completed && styles.completedTask, themeStyles.text]}>
              {item.text}
            </Text>

            {/* Delete Button */}
            <TouchableOpacity onPress={() => deleteTask(item.key)} style={styles.deleteButton}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

export default Layout;

const lightTheme = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF', // Peach background for Light Mode
  },
  text: {
    color: '#333', // Dark text for contrast on peach
  },
  input: {
    backgroundColor: '#FFE5CC', // Lighter peach for input background
  },
  taskContainer: {
    borderBottomColor: '#E5E5E5', // Light border for tasks
  },
});

const darkTheme = StyleSheet.create({
  container: {
    backgroundColor: '#000000', // Black background for Dark Mode
  },
  text: {
    color: '#FFFFFF', // White text for Dark Mode
  },
  input: {
    backgroundColor: '#333333', // Dark input background for Dark Mode
  },
  taskContainer: {
    borderBottomColor: '#555555', // Subtle border color for Dark Mode
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginBottom: 10,
  },
  addButton: {
    marginBottom: 20,
    borderRadius: 5,
    paddingVertical: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  taskText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
