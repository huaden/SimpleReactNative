import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: '#fff',
      padding: 24,
      borderRadius: 8,
      width: '80%',
      maxWidth: 320,
    },
    message: {
      fontSize: 18,
      marginBottom: 24,
      textAlign: 'center',
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });