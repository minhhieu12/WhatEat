import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        flex: 1,
        alignItems: 'center'
    },
    container1: {
        flexDirection: 'row',
        marginVertical: 20
    },
    container2: {
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        color: '#00b060',
        fontWeight: 'bold',
        marginHorizontal: 80,
        marginTop: 4,
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
        width: 330,
        marginLeft: 10
    },
});