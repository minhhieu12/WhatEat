import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

function FoodPrice({title, image, price, onPress}){
    return(        
        <View>
            <TouchableOpacity style={styles.container} onPress={onPress}>                
                <Image style={styles.image} source={image}/> 
                <View style={{width: 260}}>
                    {title && <Text style={styles.text} numberOfLines={1} ellipsizeMode='tail'> {title} </Text>}
                    {price && <Text style={styles.price}> {price} </Text>} 
                </View>               
            </TouchableOpacity>                       
        </View>
    );
};

export default FoodPrice;

const styles = StyleSheet.create({
    container: {
        width: 372, 
        marginHorizontal: 10, 
        borderWidth: 0.5, 
        borderRadius: 8, 
        borderColor: 'grey', 
        flexDirection: 'row',
        marginVertical: 5
    },
    text: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 25, 
        textAlign: 'left',
        marginLeft: 10,
    },
    price: {
        color: '#000',
        fontStyle: 'italic',
        fontSize: 14,
        marginVertical: 2,
        textAlign: 'left',
        marginLeft: 12,
    },
    phone: {
        color: '#000',
        fontStyle: 'italic',
        fontSize: 14,
        marginTop: 0,
        textAlign: 'left',
        marginLeft: 10,
    },
    author: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'right',
        marginTop: 35
    },
    image: {
        width: 94,
        height: 94,
        borderColor: '#000',
        borderRadius: 8,
    }
});