import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

function PostFollowing({title, image, avatar, time, place, author, content, numLike, numComment, onPress}){
    return(
        <View>
            <View style={styles.container}> 
                <View style={{flexDirection: 'row', marginHorizontal: 15}}>
                    <Image style={styles.ava} source={avatar}/>
                    <View style={{flexDirection: 'column', marginLeft: 4, marginTop: -6}}>
                        {author && <Text style={styles.author}> {author} </Text>}
                        {time && <Text style={styles.time}> {time} </Text>}
                    </View>
                    <TouchableOpacity>
                        <Feather name='more-vertical' style={{fontSize: 14, marginTop: 10, marginLeft: 240}}/>    
                    </TouchableOpacity>                       
                </View>               
                <TouchableOpacity style={styles.container2} onPress={onPress}>
                    <Image style={styles.image} source={image}/> 
                    <View style={styles.rectangle}>
                        {title && <Text style={styles.title}> {title} </Text>}
                        {place && <Text style={styles.place} numberOfLines={1} ellipsizeMode='tail'> {place} </Text>} 
                        {content && <Text style={styles.content} numberOfLines={2} ellipsizeMode='tail'> {content} </Text>}
                        <View style={{flexDirection: 'row'}}>
                            {numLike && <Text style={styles.like}> {numLike} </Text>}
                            <Feather name='thumbs-up' style={styles.likeIcon}/>
                            {numComment && <Text style={styles.like}> {numComment} </Text>}
                            <Feather name='message-square' style={styles.commentIcon}/>
                        </View>
                    </View>    
                </TouchableOpacity>               
            </View>                       
        </View>
    );
};

export default PostFollowing;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 8,
        marginTop: 15,
        height: 344,
        flexDirection: 'column',
    },
    container2: {
        flex: 1,
        borderRadius: 8,
        marginTop: 10,
        flexDirection: 'column',
        width: null,
        marginHorizontal: 5
    },
    rectangle: {
        backgroundColor: '#fff',
        width: null,
        height: 145,
        borderRadius: 8,
        alignItems: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: -10
    },
    author: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 4, 
        textAlign: 'left',
    },
    title: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 4, 
        textAlign: 'left'
    },
    place: {
        color: '#000',
        fontSize: 12,
        textAlign: 'left'
    },
    content: {
        color: '#000',
        fontStyle: 'italic',
        fontSize: 14,
        textAlign: 'left',
        marginVertical: 10
    },
    time: {
        color: '#000',
        fontStyle: 'italic',
        fontSize: 12,
        marginTop: 0,
        textAlign: 'left'
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
        width: null,
        height: 157,
        borderColor: '#000',
        borderRadius: 8,
    },
    ava: {
        width: 32,
        height: 32,
        borderRadius: 50,
    }
});