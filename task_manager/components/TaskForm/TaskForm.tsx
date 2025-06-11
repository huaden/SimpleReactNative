import React, { useState, useEffect } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { styles } from "@/components/TaskForm/TaskFormStyles"

type Props = {
  visible: boolean;
  initialValueText?: string;
  initialValueTitle: string // add value here as well
  onSubmit: (title: string, text: string) => void; //update on submit to contain new info
  onClose: () => void;
};



//onSubmit call addTask or editTask depending on the which button was pressed, see @hooks/useTask for implementation
export default function TaskForm({ visible, initialValueText = '', initialValueTitle, onSubmit, onClose }: Props) {
    const [text, setText] = useState(initialValueText);
    const [title, setTitle] = useState(initialValueTitle)

    // Reset text when modal opens/closes or initialValue changes
    useEffect(() => {
        setText(initialValueText);
        setTitle(initialValueTitle)
    }, [visible, initialValueText, initialValueTitle]);

    return (
        <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
        >
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
            <Text style={styles.label}>Task:</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter task..."
            />
            <TextInput
                style={styles.input}
                value={text}
                onChangeText={setText}
                placeholder="Enter Description (optional)..."
            />
            <View style={styles.buttonRow}>
                <Button title="Cancel" onPress={onClose} />
                <Button
                title="Save"
                onPress={() => {
                    onSubmit(title.trim(), text.trim());
                    onClose();
                }}
                disabled={!title.trim()}
                />
            </View>
            </View>
        </View>
        </Modal>
    );
}