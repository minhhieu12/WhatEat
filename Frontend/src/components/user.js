import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

function User({fullName, imageUser, onPress, userName}){
    return(
        <View>
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <Image style={styles.image} source={imageUser}/>
                <View style={styles.container2}>
                    {fullName && <Text style={styles.username} numberOfLines={1} ellipsizeMode='tail'> {fullName} </Text>}
                    {userName && <Text style={{marginLeft: 3, fontStyle: 'italic', fontSize: 10}}>@{userName}</Text>}
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default User;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginTop: 10,
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