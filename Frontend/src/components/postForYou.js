import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

function PostForYou({title, image, place, author, numLike, numComment, onPress}){
    return(
        <View>
            <TouchableOpacity style={styles.container} onPress={onPress}>                
                <Image style={styles.image} source={image}/> 
                <View style={styles.rectangle}>
                    {title && <Text style={styles.text} numberOfLines={1}> {title} </Text>}
                    {place && <Text style={styles.place} numberOfLines={1} ellipsizeMode='tail'> {place} </Text>} 
                    {author && <Text style={styles.author}> {author} </Text>}
                    <View style={{flexDirection: 'row'}}>
                        {numLike && <Text style={styles.like}> {numLike} </Text>}
                        <Feather name='thumbs-up' style={styles.likeIcon}/>
                        {numComment && <Text style={styles.like}> {numComment} </Text>}
                        <Feather name='message-square' style={styles.commentIcon}/>
                    </View>
                </View>               
            </TouchableOpacity>                       
        </View>
    );
};

export default PostForYou;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 8,
        marginTop: 5,
        marginHorizontal: 10,
        height: 149,
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 2,
        marginBottom: 5
    },
    rectangle: {
        backgroundColor: '#fff',
        width: 200,
        height: 147,
        borderRadius: 8,
        alignItems: 'flex-end',
        marginLeft: -55,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    text: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10, 
        textAlign: 'right'
    },
    place: {
        color: '#000',
        fontStyle: 'italic',
        fontSize: 12,
        marginTop: 0,
        textAlign: 'right'
    },
    author: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'right',
        marginTop: 35
    },
    like: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 14,        
    },
    likeIcon: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 1
    },
    commentIcon: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 2
    },
    image: {
        width: 225,
        height: 147,
        borderColor: '#000',
        borderRadius: 8,
    }
});