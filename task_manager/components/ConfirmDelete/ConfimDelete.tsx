import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';
import {styles} from "@/components/ConfirmDelete/ConfirmDeleteStyles"

type Props = {
  visible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

//onConfirm currently calls deleteTask in @/hooks/useTasks
//onCancel sets the taskForm to no longer be visible and doesn't delete the item
export default function ConfirmDelete({ visible, message, onConfirm, onCancel }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonRow}>
            <Button title="Cancel" onPress={onCancel} />
            <Button title="Delete" onPress={onConfirm} color="red" />
          </View>
        </View>
      </View>
    </Modal>
  );
}