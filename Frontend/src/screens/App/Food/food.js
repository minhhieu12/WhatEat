import React from 'react'
import {Text, View, Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { styles } from './style';
import {PostForYou} from '../../../components/index';
import { useNavigation } from '@react-navigation/native';

function FoodPost() {
    const navigation = useNavigation();
    return (
        <View>
            <View style={{flexDirection: 'row', marginTop: 4, flex: 1, flexWrap: 'wrap', marginLeft: 1}}>
                <PostForYou
                    title='Phở Pasteur'
                    image={require('../../../assets/img/pho1.png')}
                    place='232 Cách Mạng Tháng 8, P. Phú Cường, Thành Phố Thủ Dầu Một, Bình Dương'
                    author='Minh Hiếu'
                    numLike='10'
                    numComment='10'
                    onPress={() => navigation.navigate('DetailPost')}
                />
                <PostForYou
                    title='Phở Dạ'
                    image={require('../../../assets/img/pho2.png')}
                    place='8 Nguyễn Trãi, P. Phú Cường, Thành Phố Thủ Dầu Một, Bình Dương'
                    author='Minh Hiếu'
                    numLike='10'
                    numComment='10'
                    onPress={() => navigation.navigate('DetailPost')}
                />
                <PostForYou
                    title='Phở Anh Vũ'
                    image={require('../../../assets/img/pho3.png')}
                    place='288 Huỳnh Văn Lũy, P. Phú Lợi, Thành Phố Thủ Dầu Một, Bình Dương'
                    author='Minh Hiếu'
                    numLike='10'
                    numComment='10'
                    onPress={() => navigation.navigate('DetailPost')}
                />
                <PostForYou
                    title='Phở Cô Bảy'
                    image={require('../../../assets/img/pho4.png')}
                    place='400 Đại Lộ Bình Dương , Thành Phố Thủ Dầu Một, Bình Dương'
                    author='Minh Hiếu'
                    numLike='10'
                    numComment='10'
                    onPress={() => navigation.navigate('DetailPost')}
                />
            </View>            
        </View>
    );
};

export default FoodPost;