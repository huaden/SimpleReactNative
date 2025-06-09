import React, { useState, useEffect } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Text } from 'react-native';

type Props = {
  visible: boolean;
  initialValueText?: string;
  initialValueTitle: string // add value here as well
  onSubmit: (title: string, text: string) => void; //update on submit to contain new info
  onClose: () => void;
};



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

const styles = StyleSheet.create({
modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
},
modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
},
label: {
    fontSize: 16,
    marginBottom: 8,
},
input: {
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginBottom: 16,
},
buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
},
});