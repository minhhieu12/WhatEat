import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

function PickPlace({title, image, address, phone, onPress}){
    return(
        <View>
            <TouchableOpacity style={styles.container} onPress={onPress}>                
                <Image style={styles.image} source={image}/> 
                <View>
                    {title && <Text style={styles.text} numberOfLines={1} ellipsizeMode='tail'> {title} </Text>}
                    {address && <Text style={styles.place} numberOfLines={1} ellipsizeMode='tail'> {address} </Text>} 
                    {phone && <Text style={styles.phone}> {phone} </Text>}
                </View>               
            </TouchableOpacity>                       
        </View>
    );
};

export default PickPlace;

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
        color: '#00b060',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10, 
        textAlign: 'left',
        marginLeft: 10,
        width: 280
    },
    place: {
        color: '#000',
        fontStyle: 'italic',
        fontSize: 14,
        marginVertical: 5,
        textAlign: 'left',
        marginLeft: 10,
        width: 270
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