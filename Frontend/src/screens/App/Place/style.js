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
      marginTop: 10
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
      width: 250,
      height: 250,
      borderRadius: 8,
      alignSelf: 'center',
      marginLeft: 10,
    },
    icon: {
      fontSize: 24,
      
    },
    text: {
      marginLeft: 10,
      marginTop: 3,
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