import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    filterRow: {
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'center',
        // Top left by default in flexbox
    },
    filterButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        backgroundColor: '#eee',
        marginRight: 8,
    },
    activeFilter: {
        backgroundColor: '#007AFF',
    },
    filterText: {
        color: '#222',
        fontWeight: 'bold',
    },
});
    