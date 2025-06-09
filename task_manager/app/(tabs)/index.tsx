import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';

import CircleButton from '@/components/CircleButton';
import TaskItem from '@/components/TaskItem';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';


type Task = {
  id: string;
  text: string;
  completed: boolean;
};

export default function Index() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState<string>('');
  const [isFormVisible, setFormVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);


  const addTask = (text: string) => {
    if (text.trim() === '') return;
    setTasks([
      ...tasks, 
      { id: Date.now().toString(), text, completed: false }
    ]);
    setTaskText('');
  };


  const editTask = (text: string) => {
    if (!editingTask) return;
    setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, text: text } : t));
    setEditingTask(null);
    setFormVisible(false);
    console.log(tasks)
  }
  
  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setFormVisible(true);
  };
  

  const toggleComplete = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Task Manager</Text>
        <View style={styles.listContainer}>
          <TaskList tasks={tasks} onToggle={toggleComplete} onDelete={deleteTask} onEdit={handleEdit}/>
        </View>
        <TaskForm
          visible={isFormVisible}
          initialValue={editingTask?.text || ''}
          onSubmit={editingTask ? editTask : addTask}
          onClose={() => {
            setFormVisible(false);
            setEditingTask(null);
          }}
        />
      <View style={styles.circleButtonContainer}>
        <CircleButton onPress={() => {
          setEditingTask(null);
          setFormVisible(!isFormVisible);
        }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  taskText: {
    fontSize: 18,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  circleButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  listContainer: {
    flex: 1, // or a fixed height, e.g., height: 300
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#fafafa',
  },
});
