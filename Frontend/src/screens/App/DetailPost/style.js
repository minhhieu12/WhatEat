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
      width: 300,
    },
    title: {
        color: '#00B060',
        fontSize: 16,
        fontWeight: 'bold',
    },
    titlePost: {
      textAlign: 'left',
      marginHorizontal: 20,
      fontWeight: 'bold',
      marginTop: 10,
      fontSize: 18
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
      width: 380,
      height: 64,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      position: 'absolute',
      bottom: 70,
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
      marginHorizontal: 30
    },
    iconUnlike: {
      fontSize: 32,
      marginHorizontal: 30
    },
    iconLike: {
      fontSize: 32,
      marginHorizontal: 30,
      color: 'red'
    },
    iconUnSave: {
      fontSize: 32,
      marginHorizontal: 30
    },
    iconSave: {
      fontSize: 32,
      marginHorizontal: 34.5,
      color: '#00b060'
    },
    content: {
      textAlign: 'left',
      marginHorizontal: 20,
      marginTop: 10
    },
    place: {
      marginHorizontal: 18,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10
    },
    placeName: {
      fontWeight: 'bold'
    },
    placeAddress: {
      fontStyle: 'italic',
      width: 350
    },
    image: {
      width: 200,
      height: 200,
      borderRadius: 8,
      marginHorizontal: 5
    },
    rate: {
      marginHorizontal: 18,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10
    },
});