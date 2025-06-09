import React from 'react';
import { FlatList, View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

import TaskItem from './TaskItem';
import { Task } from '@/types/Task';


type Props = {
    tasks: Task[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (task: Task) => void;
};


export default function TaskList({ tasks, onToggle, onDelete, onEdit }: Props) {
    return (
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={onToggle} onDelete={onDelete} onEdit={() => onEdit(item)} />
        )}
        ListEmptyComponent={
          <View style={{ padding: 16 }}>
            <Text style={{ textAlign: 'center' }}>No tasks yet.</Text>
          </View>
        }
      />
    );
  }