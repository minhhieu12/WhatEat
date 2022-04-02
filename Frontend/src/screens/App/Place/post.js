import React from 'react'
import {Text, View, Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { styles } from './style';
import {PostForYou} from '../../../components/index';
import { useNavigation } from '@react-navigation/native';

function PlacePost() {
    const navigation = useNavigation();
    return (
        <View>
            <View style={{flexDirection: 'row', marginTop: 4, flex: 1, flexWrap: 'wrap', marginLeft: 1}}>
                <PostForYou
                    title='Chicken Plus - Thủ Dầu Một'
                    image={require('../../../assets/img/cp2.png')}
                    place='356 Đường 30/4, P. Chánh Nghĩa, Thị xã Thủ Dầu Một, Bình Dương'
                    author='Minh Hiếu'
                    numLike='10'
                    numComment='10'
                    onPress={() => navigation.navigate('DetailPost')}
                />
                <PostForYou
                    title='Chicken Plus - Thủ Dầu Một'
                    image={require('../../../assets/img/sample.png')}
                    place='356 Đường 30/4, P. Chánh Nghĩa, Thị xã Thủ Dầu Một, Bình Dương'
                    author='Phước Trung'
                    numLike='10'
                    numComment='10'
                    onPress={() => navigation.navigate('DetailPost')}
                />
                <PostForYou
                    title='Chicken Plus - Thủ Dầu Một'
                    image={require('../../../assets/img/cp3.png')}
                    place='356 Đường 30/4, P. Chánh Nghĩa, Thị xã Thủ Dầu Một, Bình Dương'
                    author='Thành Đạt'
                    numLike='10'
                    numComment='10'
                    onPress={() => navigation.navigate('DetailPost')}
                />
                <PostForYou
                    title='Chicken Plus - Thủ Dầu Một'
                    image={require('../../../assets/img/cp4.png')}
                    place='356 Đường 30/4, P. Chánh Nghĩa, Thị xã Thủ Dầu Một, Bình Dương'
                    author='Minh Nghĩa'
                    numLike='10'
                    numComment='10'
                    onPress={() => navigation.navigate('DetailPost')}
                />
            </View>            
        </View>
    );
};

export default PlacePost;