import React, { useState } from 'react'
import {Text, View, Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { styles } from './style';
import {PickPlace}  from '../../../components/index'
import { useNavigation } from '@react-navigation/native';

function Place() {
    const navigation = useNavigation();
    
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    return (
        <View>
            <View style={{flexDirection: 'row', marginTop: 4, flex: 1, flexWrap: 'wrap', marginLeft: 1}}>
                <PickPlace
                    title="Chicken Plus"
                    image={require('../../../assets/img/sample.png')}
                    address="356 đường 30/4, phường Chánh Nghĩa, thành phố Thủ Dầu Một, Bình Dương"
                    phone="0346489037"
                    onPress={() => navigation.navigate('PlaceScreen')}
                />
                <PickPlace
                    title="Cơm Tấm 68"
                    image={require('../../../assets/img/sample2.png')}
                    address="309 Thích Quảng Đức, P. Phú Cường, Thị xã Thủ Dầu Một, Bình Dương"
                    phone="0346489037"
                />
                <PickPlace
                    title="Bánh Tráng Trộn Gánh Hàng Rong"
                    image={require('../../../assets/img/sample3.png')}
                    address="113/108B Đường 30 Tháng 4, P. Phú Hòa, Thị xã Thủ Dầu Một, Bình Dương"
                    phone="0346489037"
                />
                <PickPlace
                    title="Phúc Long Nguyễn Đình Chiểu Bình Dương"
                    image={require('../../../assets/img/sample4.png')}
                    address="44 Nguyễn Đình Chiểu, P. Phú Cường, Thị xã Thủ Dầu Một, Bình Dương"
                    phone="0346489037"
                />
                <PickPlace
                    title="Bún Đậu Mắm Tôm Thị Nở"
                    image={require('../../../assets/img/sample5.png')}
                    address="126 Hoàng Văn Thụ, P. Chánh Nghĩa, Thị xã Thủ Dầu Một, Bình Dương"
                    phone="0346489037"
                />
                <PickPlace
                    title="Al Fresco's - Pizza, Mỳ Ý, Sườn, Steak Bò Bít Tết"
                    image={require('../../../assets/img/sample6.png')}
                    address="G-26, Tầng Trệt AEON MALL Bình Dương,1 Đại Lộ Bình Dương, KP. Bình Giao, P. Thuận Giao, Thuận An, Bình Dương"
                    phone="0346489037"
                />
                <PickPlace
                    title="Ông Chủ Nhí Milk Tea"
                    image={require('../../../assets/img/sample7.png')}
                    address="79 Lý Thường Kiệt, P. Chánh Nghĩa, Thị xã Thủ Dầu Một, Bình Dương"
                    phone="0346489037"
                />
            </View> 
        </View>
    );
};

export default Place;