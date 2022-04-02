import React from 'react'
import {Text, View, Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { styles } from './style';
import {FoodPrice} from '../../../components/index';
import { useNavigation } from '@react-navigation/native';

function PlaceFood() {
    const navigation = useNavigation();
    return (
        <View>
            <View style={{flexDirection: 'row', marginTop: 4, flex: 1, flexWrap: 'wrap', marginLeft: 1}}>
                <FoodPrice
                    title="CÁNH GÀ SỐT NGŨ VỊ (10 MIẾNG)"
                    price="149.000đ"
                    image={require('../../../assets/img/garan1.png')}
                />
                <FoodPrice
                    title="GÀ NỬA CON TRUYỀN THỐNG"
                    price="119.000đ"
                    image={require('../../../assets/img/garan2.png')}
                />
                <FoodPrice
                    title="LẨU TOKBOKKI 7 PHÚT "
                    price="119.000đ"
                    image={require('../../../assets/img/garan3.png')}
                />
            </View>            
        </View>
    );
};

export default PlaceFood;