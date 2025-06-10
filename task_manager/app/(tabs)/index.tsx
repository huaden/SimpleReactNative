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
  const [searchQuery, setSearchQuery] = useState('');
  const [taskText, setTaskText] = useState<string>('');
  const [isFormVisible, setFormVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [taskToDelete, setTaskToDelete] = useState<String | null>(null);
  const [delteConfirmVisible, setDeleteConfirmVisible] = useState(false)


  const getFilterTasks = () => {
    const filteredTasks = tasks.filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredTasks
  }

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
        <Text style={styles.title}> Current Tasks</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search tasks..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCorrect={false}
          clearButtonMode="while-editing"
        />
        <View style={styles.listContainer}>
          <TaskList tasks={[...getFilterTasks()].sort((a, b) => parseInt(b.id) - parseInt(a.id))} onToggle={toggleComplete} onDelete={confirmDeleteTask} onEdit={handleEdit}/>
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
        <TouchableOpacity style={styles.footerRow} onPress={() => {
              setEditingTask(null);
              setSearchQuery("");
              setFormVisible(!isFormVisible);
            }}>
            <CircleButton onPress={() => {
              setEditingTask(null);
              setFormVisible(!isFormVisible);
            }} />
            <Text>New Task</Text>
        </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'left',
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
    justifyContent: 'flex-start'
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // No need for justifyContent, default is 'flex-start'
    // Add marginTop if you want space above the footer
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
