import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { Task } from '@/types/Task';
import { useFonts } from 'expo-font';
import { styles } from "@/components/TaskItem/TaskItemStyles"

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
};


//onToggle sets the task to be done or not, then changes style to be crossed out
//onDelete call confirmDelete  from /hooks/useTasks currently
export default function TaskItem({ task, onToggle, onDelete, onEdit }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.taskItem}>
        <View style={styles.titleRow}>
            <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.titleContainer}>
            <Text style={[styles.taskTitle, task.completed && styles.completedTask]}>
                {task.title}
            </Text>
            <Text style={styles.dropdownSymbol}>{expanded ? '▼' : '▲'}</Text>
            </TouchableOpacity>

            <View style={styles.topButtonRow}>
            <Button title={task.completed ? 'Undo' : 'Done'} onPress={() => onToggle(task.id)} />
            </View>
        </View>


      {/*If the user wants to see more details then display the extra info with edit and delete buttons now available */}
      {expanded && (
        <View style={styles.descriptionContainer}>
            <Text style={[styles.taskDescription, task.completed && styles.completedTask]}>
                {task.text?.trim() ? task.text : 'No description provided.'}
            </Text>
            {!task.completed && (
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.smallButton} onPress={() => onEdit(task)}>
                <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallButton} onPress={() => onDelete(task.id)}>
                <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
            )}
        </View>
      )}


    </View>
  );
}