import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 12,
      backgroundColor: '#fff',
    },
    searchInput: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      marginVertical: 12,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginVertical: 16,
      textAlign: 'left',
    },
    inputContainer: {
      flexDirection: 'row',
      marginBottom: 16,
      alignItems: 'center',
    },
    input: {
      flex: 1,
      borderColor: '#aaa',
      borderWidth: 1,
      borderRadius: 4,
      padding: 8,
      marginRight: 8,
    },
    taskItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
      justifyContent: 'space-between',
    },
    taskText: {
      fontSize: 18,
    },
    completedTask: {
      textDecorationLine: 'line-through',
      color: '#aaa',
    },
    circleButtonContainer: {
      justifyContent: 'flex-start'
    },
    footerRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    listContainer: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#eee',
      borderRadius: 8,
      padding: 8,
      backgroundColor: '#fafafa',
    },
});