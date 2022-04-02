import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

function NotiFollow({username, imageUser, onPress}){
    return(
        <View>
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <Image style={styles.image} source={imageUser}/>
                <View style={styles.container2}>
                    {username && <Text style={styles.username} numberOfLines={1} ellipsizeMode='tail'> {username} </Text>}
                    <Text style={{marginLeft: 3}}>Đã bắt đầu theo dõi bạn</Text>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={{color: 'white', marginTop: 2}}>Theo dõi</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    );
};

export default NotiFollow;

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
        fontWeight: 'bold'
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