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
    title: {
        color: '#00B060',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        alignSelf: 'center'
    },
    ava: {
      width: 72,
      height: 72,
      borderRadius: 50,
      alignSelf: 'center',
      marginTop: 15
    },
    username: {
      fontSize: 14,
      marginTop: 10,
      textAlign: 'center',
      alignSelf: 'center'
    },
    countContain: {
      alignItems: 'center', 
      marginHorizontal: 10
    },
    count: {
      fontSize: 18, 
      color: '#00b060', 
      fontWeight: 'bold'
    },
    button: {
      alignSelf: 'center',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 2,
      marginTop: 10
    },
    buttonTabActive: {
      alignSelf: 'center',
      color: 'black',
      paddingVertical: 2
    },
    buttonTabInActive: {
      alignSelf: 'center',
      color: 'grey',
      paddingVertical: 2
    },
    image: {
      width: 126,
      height: 126,
      marginHorizontal: 2,  
      marginTop: 4    
    },


    containerPlace: {
      width: 380, 
      marginHorizontal: 10, 
      borderWidth: 0.5, 
      borderRadius: 8, 
      borderColor: 'grey', 
      flexDirection: 'row',
      marginVertical: 5
    },
    imagePlace: {
      width: 94,
      height: 91,
      borderRadius: 8,
    },
    textPlace: {
      flexDirection: 'column',
      marginLeft: 10,
      marginVertical: 7
    },
    namePlace: {
      fontWeight: 'bold', 
      fontSize: 16, 
      color: '#00b060'
    },
    address: {
      width: 265, 
      marginVertical: 3, 
      fontStyle: 'italic'
    }
});