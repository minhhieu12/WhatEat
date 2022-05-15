import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image, 
    TouchableOpacity
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

function PlaceRecommend({title, image, rate, onPress}){
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.rectangle} onPress={onPress}>
                <Image style={styles.image} source={image}/>
                {title && <Text style={styles.text} numberOfLines={1} ellipsizeMode='tail'> {title} </Text>}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {rate && <Text style={styles.rate}> {rate} </Text>}
                    <Feather name='star' style={styles.star}/>
                </View>
            </TouchableOpacity>            
        </View>
    );
};

export default PlaceRecommend;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 160,
        height: 155,
        borderRadius: 8,
        marginLeft: 10
    },
    rectangle: {
        backgroundColor: '#fff',
        width: 160,
        height: 135,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    text: {
        color: '#00b060',
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 4
    },
    rate: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 0
    },
    star: {
        color: '#F3C111',
        fontSize: 16,
    },
    image: {
        width: 160,
        height: 80,
        borderColor: '#000',
        borderRadius: 8,
        marginTop: 0,
    }
});