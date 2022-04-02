import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

function Comment({author,content, image}){
    return(        
        <View style={styles.container}>
            <Image style={styles.image} source={image}/>
            <View style={styles.rectangle}>
                {author && <Text style={styles.author}> {author} </Text>}
                {content && <Text style={styles.content}> {content} </Text>}
            </View>
        </View>
    );
};

export default Comment;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',  
        marginHorizontal: 20,
        marginVertical: 5,
    },
    rectangle: {
        backgroundColor: '#E5E8E8',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginLeft: 5,
    },
    author: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 14,
    },
    content: {
        color: 'black',
        fontSize: 14,
        width: 320,
    },
    image: {
        width: 32,
        height: 32,
        borderColor: '#000',
        borderRadius: 50,
    }
});