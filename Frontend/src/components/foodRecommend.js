import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

function FoodRecommend({title, image, onPress}){
    return(        
        <View style={styles.container}>
            <TouchableOpacity style={styles.rectangle} onPress={onPress}>
                <Image style={styles.image} source={image}/>
                {title && <Text style={styles.text}> {title} </Text>}
            </TouchableOpacity>
        </View>
    );
};

export default FoodRecommend;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 111,
        height: 138,
        borderRadius: 8,
        marginLeft: 10,
    },
    rectangle: {
        backgroundColor: '#fff',
        width: 109,
        height: 123,
        borderRadius: 8,
        marginTop: 13,
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
        fontSize: 18,
        marginTop: 11
    },
    image: {
        width: 90,
        height: 90,
        borderColor: '#000',
        borderRadius: 50,
        marginTop: -14,
    }
});