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
      width: null
    },
    title: {
        color: '#00B060',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        width: 290,
        marginLeft: 10
    },
    ava: {
      width: 33,
      height: 33,
      borderRadius: 50,
    },
    author: {
      color: '#000',
      fontWeight: 'bold',
      fontSize: 14,
      marginTop: 4, 
      textAlign: 'left'
    },
    time: {
      color: '#000',
      fontStyle: 'italic',
      fontSize: 12,
      marginTop: 0,
      textAlign: 'left'
    },
    follow: {
      borderRadius: 8,
      backgroundColor: '#00b060',
      paddingHorizontal: 10,
      marginLeft: 150
    },
    unfollow: {

    },
    bottonTab: {
      flexDirection: 'row',
      backgroundColor: 'white',
      width: 370,
      height: 64,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      position: 'absolute',
      bottom: 80,
      flex: 1,
      borderRadius: 8,
      shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    icon: {
      fontSize: 32,
      marginHorizontal: 40
    },
    content: {
      textAlign: 'left',
      marginHorizontal: 10,
      borderWidth: 1,
      borderColor: 'lightgrey',
      borderRadius: 8,
      paddingHorizontal: 10,
      marginTop: 10
    },
    titlePost: {
      textAlign: 'left',
      marginHorizontal: 10,
      fontWeight: 'bold',
      borderWidth: 1,
      borderColor: 'lightgrey',
      borderRadius: 8,
      paddingHorizontal: 10,
    },
    place: {
      marginHorizontal: 10,
      marginVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'lightgrey',
      borderRadius: 8,
      paddingHorizontal: 10,
      marginTop: 10,
      paddingVertical: 10
    },
    rate: {
      marginHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'lightgrey',
      borderRadius: 8,
      paddingHorizontal: 10,
    },
    placeName: {
      fontWeight: 'bold'
    },
    placeAddress: {
      fontStyle: 'italic',
      width: 320
    },
    image: {
      width: 150,
      height: 150,
      borderRadius: 8,
      marginHorizontal: 5
    }
});