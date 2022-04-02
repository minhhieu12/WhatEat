import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

function PostStored({title, image, rate, onPress, author}){
    return(
        <View>
            <TouchableOpacity style={styles.container} onPress={onPress}>                
                <Image style={styles.image} source={image}/> 
                <LinearGradient colors={['transparent', '#000']} style={styles.container2}>
                    {author && <Text style={styles.author} numberOfLines={1} ellipsizeMode='tail'> {author} </Text>}
                    <View style={styles.container3}>
                        {title && <Text style={styles.text} numberOfLines={1} ellipsizeMode='tail'> {title} </Text>}
                        {rate && <Text style={styles.rate}> {rate} </Text>}
                        <Feather name='star' style={styles.star}/>
                    </View>
                </LinearGradient>               
            </TouchableOpacity>                       
        </View>
    );
};

export default PostStored;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 8,
        flexDirection: 'column',
        marginHorizontal: 2,
        marginVertical: 2,
    },
    image: {
        width: 124,
        height: 124,
        borderColor: '#000',
        borderRadius: 8,
    },
    container2: {
        flexDirection: 'column',
        height: 52,
        marginTop: -50,
        borderRadius: 8,
    },
    container3: {
        flexDirection: 'row',
        height: 52,
        borderRadius: 8,
        bottom: -10
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14, 
        textAlign: 'left',
        width: 70,
        marginRight: 11,
        marginBottom: -15
    },
    author: {
        color: '#fff',
        fontSize: 12, 
        textAlign: 'left',
        width: 70,
        bottom: -10
    },
    rate: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: -15        
    },
    star: {
        color: 'yellow',
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 1,
        marginBottom: -15
    },
    
});