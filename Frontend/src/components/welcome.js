import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

function Welcome({username, imageUser, onPress}){
    return(
        <View>
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <Image style={styles.image} source={imageUser}/>
                <View style={styles.container2}>
                    <Text style={{marginLeft: 3}}>Xin chào</Text>
                    {username && <Text style={styles.username} numberOfLines={1} ellipsizeMode='tail'> {username} </Text>}
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginVertical: 20,
        flexDirection: 'row',
    },
    container2: {
        marginLeft: 5,
        width: 250,
        paddingRight: 20
    },
    image: {
        width: 42,
        height: 42,
        borderRadius: 40,

    },
    username: {
        fontWeight: 'bold',
        color: '#00B060'
    },
    button: {
        width: 80,
        height: 25,
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#00b060',
        marginLeft: -3,
        marginTop: 5
    }
});