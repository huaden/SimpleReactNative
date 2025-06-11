import React, { useState } from 'react';
import { 
  View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert
} from 'react-native';

import CircleButton from '@/components/CircleButton/CircleButton';
import TaskItem from '@/components/TaskItem/TaskItem';
import TaskList from '@/components/TaskList/TaskList';
import TaskForm from '@/components/TaskForm/TaskForm';
import ConfirmDelete from '@/components/ConfirmDelete/ConfimDelete';

import { Task } from '@/types/Task';
import { useTasks } from '@/hooks/useTasks';
import { styles } from '@/app/(tabs)/indexStyles'



export default function Index() {

  //see @/hooks/useTasks for implementation details
  const { getFilterTasks, addTask, editTask, handleEdit, toggleComplete, deleteTask, confirmDeleteTask, 
    isFormVisible, setFormVisible, editingTask, setEditingTask, deleteConfirmVisible, 
    setDeleteConfirmVisible } = useTasks()

  const [searchQuery, setSearchQuery] = useState("")


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

        {/* Displays the tasklist in its own scrollable container, see TaskList Compenent for info */}
        <View style={styles.listContainer}>
          <TaskList tasks={[...getFilterTasks(searchQuery)].sort((a, b) => parseInt(b.id) - parseInt(a.id))} onToggle={toggleComplete} onDelete={confirmDeleteTask} onEdit={handleEdit}/>
        </View>


        {/*Task form to add or edit tasks, makes everything else unclickable while visible, see TaskForm Component for Details*/}
        <TaskForm
          visible={isFormVisible}
          initialValueTitle={editingTask?.title || ''}
          initialValueText={editingTask?.text || ''}
          onSubmit={(title, text) => { editingTask ? editTask(editingTask, title, text) : addTask(title, text); }}          
          onClose={() => {
            setFormVisible(false);
            setEditingTask(null);
          }}
        />


        {/*Pop up form that asks user to confirm task deletion, see ConfirmDelete for more info*/}
        <ConfirmDelete
        visible={deleteConfirmVisible}
        message="Are you sure you want to delete this task?"
        onConfirm={deleteTask}
        onCancel={() => setDeleteConfirmVisible(false)}
        />


        {/*Button in bottom left used for adding tasks that is clickable, check CircleButton Component for details*/}
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