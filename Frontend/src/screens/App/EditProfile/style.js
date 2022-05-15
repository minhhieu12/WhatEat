import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        flex: 1,
        alignItems: 'center'
    },
    container1: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        marginVertical: 20
    },
    container2: {
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        color: '#00b060',
        fontWeight: 'bold',
        marginTop: 4,
        marginLeft: 70,
        marginRight: 90
    },
    image: {
        width: 81,
        height: 81,
        borderRadius: 50
    },
    button: {
        backgroundColor: '#f2f2f2',
        marginTop: -25,
        marginLeft: 50,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 30
    },
    textInputContainer: {
        borderBottomWidth: 1,
        marginTop: 10,
        borderRadius: 8,
        borderColor: 'grey',
        flexDirection: 'row',
    },
    icon: {
        marginTop: 8,
    },
    textInput: {
        borderWidth: 0.5, 
        borderRadius: 8,
        flexDirection: 'row',
        width: 353,
        marginLeft: -10
    },
    inputContainer: {
        flexDirection: 'row',
        borderRadius: 8,
        borderWidth: 0.5,
        width: 353,
        alignItems: 'center',
        paddingLeft: 5,
        marginLeft: -10
    },
    buttonGreen: {
        backgroundColor: '#00B060',
        width: 353,
        height: 50,
        alignItems: 'center',
        paddingTop: 15,
        marginLeft: -10,
        borderRadius: 8,
        marginTop: 20
    },
});