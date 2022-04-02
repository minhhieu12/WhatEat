import React from 'react'
import {Text, View} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import {styles} from './style'
import {FoodRecommend} from '../../../components/index'
import {PlaceRecommend} from '../../../components/index';
import {PostForYou} from '../../../components/index';

function ForYou({navigation}) {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Hôm nay ăn gì?</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.foodContainer}>
                <FoodRecommend 
                    title="Phở"
                    image={require('../../../assets/img/pho.png')}
                    onPress={() => navigation.navigate('Food')}
                />
                <FoodRecommend 
                    title="Bún Bò"
                    image={require('../../../assets/img/bunbo.png')}
                    onPress={() => navigation.navigate('Food')}
                />
                <FoodRecommend 
                    title="Bánh Mì"
                    image={require('../../../assets/img/banhmi.png')}
                />
                <FoodRecommend 
                    title="Cơm Tấm"
                    image={require('../../../assets/img/comtam.png')}
                />
                <FoodRecommend 
                    title="Gà Rán"
                    image={require('../../../assets/img/garan.png')}
                />
                <FoodRecommend 
                    title="Trà Sữa"
                    image={require('../../../assets/img/trasua.png')}
                />
            </ScrollView>
            <Text style={styles.title}>Địa điểm nổi bật</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.placeContainer}>
                <PlaceRecommend 
                    title="Chicken Plus"
                    rate='4.5'
                    image={require('../../../assets/img/place.png')}
                    onPress={() => navigation.navigate('PlaceScreen')}
                />
                <PlaceRecommend 
                    title="Trà sữa Đậu"
                    rate='4.5'
                    image={require('../../../assets/img/place.png')}
                />
                <PlaceRecommend 
                    title="Mì cay Seoul"
                    rate='4.5'
                    image={require('../../../assets/img/place.png')}
                />
                <PlaceRecommend 
                    title="Nem nướng Nhã Phương"
                    rate='4.5'
                    image={require('../../../assets/img/place.png')}
                />
            </ScrollView>
            <PostForYou
                title='Gà rán Chicken Plus'
                image={require('../../../assets/img/sample.png')}
                place='356 đường 30/4, phường Chánh Nghĩa, thành phố Thủ Dầu Một, Bình Dương'
                author='Minh Hiếu'
                numLike='10'
                numComment='10'
                onPress={() => navigation.navigate('DetailPost')}
            />
            <PostForYou
                title='Cơm Tấm 68'
                image={require('../../../assets/img/sample2.png')}
                place='309 Thích Quảng Đức, P. Phú Cường, Thị xã Thủ Dầu Một, Bình Dương'
                author='Phước Trung'
                numLike='15'
                numComment='10'
            />
            <PostForYou
                title='Bánh Tráng Trộn Gánh Hàng Rong'
                image={require('../../../assets/img/sample3.png')}
                place='113/108B Đường 30 Tháng 4, P. Phú Hòa, Thị xã Thủ Dầu Một, Bình Dương'
                author='Minh Hiếu'
                numLike='10'
                numComment='10'
            />
            <PostForYou
                title='Phúc Long Nguyễn Đình Chiểu Bình Dương'
                image={require('../../../assets/img/sample4.png')}
                place='44 Nguyễn Đình Chiểu, P. Phú Cường, Thị xã Thủ Dầu Một, Bình Dương'
                author='Minh Hiếu'
                numLike='10'
                numComment='10'
            />
        </ScrollView>
    );
};

export default ForYou;