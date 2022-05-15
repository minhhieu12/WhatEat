import {StyleSheet}  from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    logo: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 50
    },
    title: {
        alignSelf: 'center',
        color: '#00B060',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 4
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
        width: 334,
        height: 50,
        alignItems: 'center',
        paddingTop: 15,
        borderRadius: 8,
        marginTop: 20
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
    },
    errMessage: {
        color: 'red',
        fontStyle: 'italic',
        paddingBottom: 5
    },
})

export default styles