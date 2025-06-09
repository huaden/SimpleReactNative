import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { Task } from '@/types/Task';

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
};

export default function TaskItem({ task, onToggle, onDelete, onEdit }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.titleRow}>
        <Text style={[styles.taskTitle, task.completed && styles.completedTask]}>
          {task.title}
        </Text>
        <Text style={styles.dropdownSymbol}>{expanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.descriptionContainer}>
          <Text style={[styles.taskDescription, task.completed && styles.completedTask]}>
            {task.text?.trim() ? task.text : 'No description provided.'}
          </Text>
        </View>
      )}

      <View style={styles.buttonRow}>
        <Button title="Edit" onPress={() => onEdit(task)} />
        <Button title="Delete" onPress={() => onDelete(task.id)} />
        <Button title={task.completed ? 'Undo' : 'Done'} onPress={() => onToggle(task.id)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 16,
    color: '#555',
    marginTop: 8,
    marginBottom: 4,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  dropdownSymbol: {
    fontSize: 18,
    color: '#666',
  },
  descriptionContainer: {
    paddingTop: 6,
    paddingLeft: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});
