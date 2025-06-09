import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet,
  Alert
} from 'react-native';

import CircleButton from '@/components/CircleButton';
import TaskItem from '@/components/TaskItem';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';
import ConfirmDelete from '@/components/ConfimDelete';

import { Task } from '@/types/Task';

export default function Index() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState<string>('');
  const [isFormVisible, setFormVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [taskToDelete, setTaskToDelete] = useState<String | null>(null);
  const [delteConfirmVisible, setDeleteConfirmVisible] = useState(false)


  const addTask = (title: string, text: string) => {
    if (title.trim() === '') return;
    setTasks([
      ...tasks, 
      { id: Date.now().toString(), title, text, completed: false }
    ]);
    setTaskText('');
  };


  const editTask = (title: string, text: string) => {
    if (!editingTask) return;
    setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, title: title, text: text} : t));
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

  const deleteTask = () => {
    if (taskToDelete){
      setTasks(tasks.filter(task => task.id !== taskToDelete));
      setTaskToDelete(null);
      setDeleteConfirmVisible(false);
    }
  };


  const confirmDeleteTask = (id: string) => {
    setTaskToDelete(id);
    setDeleteConfirmVisible(true);
};

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Task Manager</Text>
        <View style={styles.listContainer}>
          <TaskList tasks={tasks} onToggle={toggleComplete} onDelete={confirmDeleteTask} onEdit={handleEdit}/>
        </View>
        <TaskForm
          visible={isFormVisible}
          initialValueTitle={editingTask?.title || ''} //add line here for new part of form
          initialValueText={editingTask?.text || ''}
          onSubmit={editingTask ? editTask : addTask}
          onClose={() => {
            setFormVisible(false);
            setEditingTask(null);
          }}
        />
        <ConfirmDelete
        visible={delteConfirmVisible}
        message="Are you sure you want to delete this task?"
        onConfirm={deleteTask}
        onCancel={() => setDeleteConfirmVisible(false)}
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
