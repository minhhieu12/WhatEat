import React from 'react'
import {Text, View, Image, TouchableOpacity} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { styles } from './style';
import PostProfile from '../../../components/postProfile';
import { useNavigation } from '@react-navigation/native';

function Follower() {
    const navigation = useNavigation();
    
    return (
        <View>
            <View style={{flexDirection: 'row', marginVertical: 5}}>
                <TouchableOpacity style={{flexDirection: 'row'}}>
                    <Image source={require('../../../assets/img/ava2.png')} style={{width: 52, height: 52, borderRadius: 40}}/>
                    <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 15, marginLeft: 5, width: 240}}>Phước Trung</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: '#00b060', paddingHorizontal: 15, height: 25, borderRadius: 8, marginTop: 15}}>
                    <Text style={{color: 'white', marginTop: 2}}>Theo dõi</Text>
                </TouchableOpacity>
            </View> 
            <View style={{flexDirection: 'row', marginVertical: 5}}>
                <TouchableOpacity style={{flexDirection: 'row'}}>
                    <Image source={require('../../../assets/img/ava3.png')} style={{width: 52, height: 52, borderRadius: 40}}/>
                    <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 15, marginLeft: 5, width: 240}}>Minh Nghĩa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: '#00b060', paddingHorizontal: 15, height: 25, borderRadius: 8, marginTop: 15}}>
                    <Text style={{color: 'white', marginTop: 2}}>Theo dõi</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', marginVertical: 5}}>
                <TouchableOpacity style={{flexDirection: 'row'}}>
                    <Image source={require('../../../assets/img/ava4.png')} style={{width: 52, height: 52, borderRadius: 40}}/>
                    <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 15, marginLeft: 5, width: 240}}>Thành Đạt</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: '#00b060', paddingHorizontal: 15, height: 25, borderRadius: 8, marginTop: 15}}>
                    <Text style={{color: 'white', marginTop: 2}}>Theo dõi</Text>
                </TouchableOpacity>
            </View>       
        </View>
    );
};

export default Follower;