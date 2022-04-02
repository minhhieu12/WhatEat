import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#F2F2F2',
    },
    container2: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: null,
    },
    title: {
        color: '#00B060',
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10
    },
    timeNew: {
      color: '#000',
      fontWeight: 'bold',
      fontSize: 16,
      textAlign: 'left',
      marginLeft: 15,
      marginBottom: 10,
    },
    timeOld: {
      color: 'grey',
      fontWeight: 'bold',
      fontSize: 14,
      marginTop: 20,
      textAlign: 'left',
      marginLeft: 15
    },
});