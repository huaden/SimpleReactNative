import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    taskItem: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 12,
      marginBottom: 10,
      elevation: 2,
    },
    taskDescription: {
      fontSize: 12,
      color: '#555',
      marginTop: 8,
      marginBottom: 4,
    },
    completedTask: {
      textDecorationLine: 'line-through',
      color: '#aaa',
    },
    dropdownSymbol: {
      fontSize: 14,
      color: '#666',
    },
    descriptionContainer: {
      paddingTop: 6,
      paddingLeft: 4,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginTop: 10,
      gap: 8,
    },
    titleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 8,
    },
    
    titleContainer: {
      flex: 1, // allow title to take remaining space
    },
    taskTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      flexShrink: 1, // prevent overflow
      flexWrap: 'wrap', // allow wrapping
      fontFamily: 'Inter'
    },
    
    topButtonRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flexShrink: 0, // prevent shrinking
      gap: 8,
    },
    smallButton: {
      paddingVertical: 4,
      paddingHorizontal: 10,
      backgroundColor: '#007AFF',
      borderRadius: 6,
      marginRight: 8,
    },
    
    buttonText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: '500',
    },
});