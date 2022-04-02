import React from 'react'
import {Text, View, Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { styles } from './style';
import {PickPlace} from '../../../components/index';
import { useNavigation } from '@react-navigation/native';

function Place() {
    const navigation = useNavigation();
    return (
        <View>
            <View style={{flexDirection: 'row', marginTop: 4, flex: 1, flexWrap: 'wrap', marginLeft: 1}}>
                <PickPlace
                    title="Phở Pasteur"
                    image={require('../../../assets/img/pho1.png')}
                    address="232 Cách Mạng Tháng 8, P. Phú Cường, Thành Phố Thủ Dầu Một, Bình Dương"
                    phone="0346489037"
                />
                <PickPlace
                    title="Phở Dạ"
                    image={require('../../../assets/img/pho2.png')}
                    address="8 Nguyễn Trãi, P. Phú Cường, Thành Phố Thủ Dầu Một, Bình Dương"
                    phone="0346489037"
                />
                <PickPlace
                    title="Phở Anh Vũ"
                    image={require('../../../assets/img/pho3.png')}
                    address="288 Huỳnh Văn Lũy, P. Phú Lợi, Thành Phố Thủ Dầu Một, Bình Dương"
                    phone="0346489037"
                />
                <PickPlace
                    title="Phở Cô Bảy"
                    image={require('../../../assets/img/pho4.png')}
                    address="400 Đại Lộ Bình Dương , Thành Phố Thủ Dầu Một, Bình Dương"
                    phone="0346489037"
                />
            </View>            
        </View>
    );
};

export default Place;