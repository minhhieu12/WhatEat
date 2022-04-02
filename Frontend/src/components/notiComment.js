import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

function NotiComment({username, imageUser, imagePost, onPress}){
    return(
        <View>
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <Image style={styles.image} source={imageUser}/>
                <View style={styles.container2}>
                    {username && <Text style={styles.username} numberOfLines={1} ellipsizeMode='tail'> {username} </Text>}
                    <Text style={{marginLeft: 3}}>Bình luận vào bài viết của bạn</Text>
                </View>
                <Image style={styles.imagePost} source={imagePost}/>
            </TouchableOpacity>
        </View>
    );
};

export default NotiComment;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginTop: 10,
        flexDirection: 'row'
    },
    container2: {
        marginLeft: 5,
        width: 286,
        paddingRight: 80
    },
    image: {
        width: 42,
        height: 42,
        borderRadius: 40,

    },
    username: {
        fontWeight: 'bold'
    },
    imagePost: {
        width: 42,
        height: 42,
        borderRadius: 8,
        marginTop: -3,
    },
});