import React from 'react'
import {Text, View, Image, TouchableOpacity} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { styles } from './style';
import PostProfile from '../../../components/postProfile';
import { useNavigation } from '@react-navigation/native';

function Following() {
    const navigation = useNavigation();
    
    return (
        <View>
            <View style={{flexDirection: 'row', marginVertical: 5}}>
                <TouchableOpacity style={{flexDirection: 'row'}}>
                    <Image source={require('../../../assets/img/ava2.png')} style={{width: 52, height: 52, borderRadius: 40}}/>
                    <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 15, marginLeft: 5, width: 215}}>Phước Trung</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{paddingHorizontal: 15, height: 25, borderRadius: 8, marginTop: 15, borderColor: 'red', borderWidth: 0.5}}>
                    <Text style={{marginTop: 2}}>Huỷ theo dõi</Text>
                </TouchableOpacity>
            </View> 
            <View style={{flexDirection: 'row', marginVertical: 5}}>
                <TouchableOpacity style={{flexDirection: 'row'}}>
                    <Image source={require('../../../assets/img/ava3.png')} style={{width: 52, height: 52, borderRadius: 40}}/>
                    <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 15, marginLeft: 5, width: 215}}>Minh Nghĩa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{paddingHorizontal: 15, height: 25, borderRadius: 8, marginTop: 15, borderColor: 'red', borderWidth: 0.5}}>
                    <Text style={{marginTop: 2}}>Huỷ theo dõi</Text>
                </TouchableOpacity>
            </View> 
            <View style={{flexDirection: 'row', marginVertical: 5}}>
                <TouchableOpacity style={{flexDirection: 'row'}}>
                    <Image source={require('../../../assets/img/ava4.png')} style={{width: 52, height: 52, borderRadius: 40}}/>
                    <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 15, marginLeft: 5, width: 215}}>Thành Đạt</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{paddingHorizontal: 15, height: 25, borderRadius: 8, marginTop: 15, borderColor: 'red', borderWidth: 0.5}}>
                    <Text style={{marginTop: 2}}>Huỷ theo dõi</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Following;