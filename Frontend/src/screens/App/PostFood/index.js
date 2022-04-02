import React from 'react'
import {Text, View, Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { styles } from './style';
import {PostForYou} from '../../../components/index';
import { useNavigation } from '@react-navigation/native';

function PostFoodScreen() {
    const navigation = useNavigation();
    return (
        <View>
            <View style={{flexDirection: 'row', marginTop: 4, flex: 1, flexWrap: 'wrap', marginLeft: 1}}>
                <PostForYou
                    title='Gà rán Chicken Plus'
                    image={require('../../../assets/img/sample.png')}
                    place='Số 6, Trần Văn Ơn, TDM, Bình Dương'
                    author='Minh Hiếu'
                    numLike='10'
                    numComment='10'
                    onPress={() => navigation.navigate('DetailPost')}
                />
                <PostForYou
                    title='Gà rán Chicken Plus'
                    image={require('../../../assets/img/sample.png')}
                    place='Số 6, Trần Văn Ơn, TDM, Bình Dương'
                    author='Minh Hiếu'
                    numLike='10'
                    numComment='10'
                    onPress={() => navigation.navigate('DetailPost')}
                />
                <PostForYou
                    title='Gà rán Chicken Plus'
                    image={require('../../../assets/img/sample.png')}
                    place='Số 6, Trần Văn Ơn, TDM, Bình Dương'
                    author='Minh Hiếu'
                    numLike='10'
                    numComment='10'
                    onPress={() => navigation.navigate('DetailPost')}
                />
                <PostForYou
                    title='Gà rán Chicken Plus'
                    image={require('../../../assets/img/sample.png')}
                    place='Số 6, Trần Văn Ơn, TDM, Bình Dương'
                    author='Minh Hiếu'
                    numLike='10'
                    numComment='10'
                    onPress={() => navigation.navigate('DetailPost')}
                />
            </View>            
        </View>
    );
};

export default PostFoodScreen;