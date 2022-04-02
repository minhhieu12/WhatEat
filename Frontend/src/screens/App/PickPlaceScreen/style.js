import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        flex: 1
    },
    searchContainer: {
        height: 60,
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 8,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 2,
        flexDirection: 'row'
    },
    textInput: {
        borderWidth: 0.5,
        borderColor: 'grey',
        borderRadius: 8,
        marginVertical: 10,
        marginLeft: 10,
        width: 314
    },
    icon: {
        marginTop: 15,
        marginLeft: 10
    },
    container2: {
        alignSelf: 'center',
        marginTop: 5
    }
});