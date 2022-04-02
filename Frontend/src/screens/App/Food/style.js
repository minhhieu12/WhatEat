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
    container3: {
      flexDirection: 'column',
      width: null,
      marginTop: 20
    },
    title: {
        color: '#00B060',
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5
    },
    image: {
      width: 150,
      height: 150,
      borderRadius: 100,
      alignSelf: 'center'
    },
    description: {
      marginHorizontal: 15,
      marginVertical: 10,
      fontSize: 16,
      textAlign: 'left',
      alignSelf: 'center'
    },

    buttonTabActive: {
      alignSelf: 'center',
      color: 'black',
      paddingVertical: 2,
      fontSize: 18,
      fontWeight: 'bold',
    },
    buttonTabInActive: {
      alignSelf: 'center',
      color: 'grey',
      paddingVertical: 2,
      fontSize: 18,
    },

});