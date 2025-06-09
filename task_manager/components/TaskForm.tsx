import React, { useState, useEffect } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Text } from 'react-native';

type Props = {
  visible: boolean;
  initialValue?: string;
  onSubmit: (text: string) => void;
  onClose: () => void;
};



export default function TaskForm({ visible, initialValue = '', onSubmit, onClose }: Props) {
    const [text, setText] = useState(initialValue);

    // Reset text when modal opens/closes or initialValue changes
    useEffect(() => {
        setText(initialValue);
    }, [visible, initialValue]);

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
                value={text}
                onChangeText={setText}
                placeholder="Enter task..."
            />
            <View style={styles.buttonRow}>
                <Button title="Cancel" onPress={onClose} />
                <Button
                title="Save"
                onPress={() => {
                    onSubmit(text.trim());
                    onClose();
                }}
                disabled={!text.trim()}
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