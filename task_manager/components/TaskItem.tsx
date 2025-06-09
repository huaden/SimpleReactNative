import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;

};

  
export default function TaskItem({ task, onToggle, onDelete, onEdit }: Props) {
    return (
      <View style={styles.taskItem}>
        <TouchableOpacity onPress={() => onToggle(task.id)}>
          <Text style={[styles.taskText, task.completed && styles.completedTask]}>
            {task.text}
          </Text>
        </TouchableOpacity>
        <Button title='Edit' onPress={() => onEdit(task.text)} />
        <Button title="Delete" onPress={() => onDelete(task.id)} />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
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
  });