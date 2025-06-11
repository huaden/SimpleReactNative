import React from 'react';
import { FlatList, View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

import TaskItem from '../TaskItem/TaskItem';
import { Task } from '@/types/Task';
import { useState } from 'react';
import { styles } from "@/components/TaskList/TaskListStyles"


type Props = {
    tasks: Task[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (task: Task) => void;
};

type Filter = 'all' | 'completed' | 'uncompleted';


export default function TaskList({ tasks, onToggle, onDelete, onEdit }: Props) {
    const [filter, setFilter] = useState<Filter>('all');

    //returns the list with the filtered tasks depending on what the user clicks/wants
    const getFilteredTasks = () => {
      if (filter === 'completed') return tasks.filter(t => t.completed);
      if (filter === 'uncompleted') return tasks.filter(t => !t.completed);
      return tasks;
    };


    return (
        <View>

            <View style={styles.filterRow}>
                <TouchableOpacity
                style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
                onPress={() => setFilter('all')}
                >
                <Text style={styles.filterText}>All</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={[styles.filterButton, filter === 'completed' && styles.activeFilter]}
                onPress={() => setFilter('completed')}
                >
                <Text style={styles.filterText}>Completed</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={[styles.filterButton, filter === 'uncompleted' && styles.activeFilter]}
                onPress={() => setFilter('uncompleted')}
                >
                <Text style={styles.filterText}>Uncompleted</Text>
                </TouchableOpacity>
            </View>


            <FlatList
            data={getFilteredTasks()}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TaskItem task={item} onToggle={onToggle} onDelete={onDelete} onEdit={() => onEdit(item)} />
            )}
            ListEmptyComponent={
                <View style={{ padding: 16 }}>
                <Text style={{ textAlign: 'center' }}>{filter == "all" ? "No tasks yet." : filter == "completed" ? "No completed tasks yet." : "All tasks completed"}</Text>
                </View>
            }
            />
        </View>
    );
}