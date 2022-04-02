import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      backgroundColor: '#F2F2F2',
      marginTop: 10,
      paddingBottom: 80
    },
    container2: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: null,
    },
    title: {
        color: '#00B060',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 20,
        marginVertical: 10
    }
});