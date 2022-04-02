import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'white',
      height: 800
    },
    logo: {
        width: 100,
        height: 110,
        alignSelf: 'center',
        marginTop: 50
    },
    title: {
        alignSelf: 'center',
        color: '#00B060',
        fontSize: 22,
        fontWeight: 'bold'
    },
    secondContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        marginTop: -20,
    },
    buttonGreen: {
        backgroundColor: '#00B060',
        width: 140,
        height: 40,
        alignItems: 'center',
        paddingTop: 10,
        marginLeft: 13,
        borderRadius: 8
    },
    buttonGrey: {
        backgroundColor: '#C4C4C4',
        width: 140,
        height: 40,        
        alignItems: 'center',
        paddingTop: 10,
        marginRight: 13,
        borderRadius: 8
    },
    textInput: {
        borderWidth: 0.5, 
        borderRadius: 8,
        flexDirection: 'row'
    }
  });