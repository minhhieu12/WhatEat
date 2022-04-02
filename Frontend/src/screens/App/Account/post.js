import React from 'react'
import {Text, View, Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { styles } from './style';
import PostProfile from '../../../components/postProfile';
import { useNavigation } from '@react-navigation/native';

function Post() {
    const navigation = useNavigation();
    
    return (
        <View>
            <View style={{flexDirection: 'row', marginTop: 4, flex: 1, flexWrap: 'wrap', marginLeft: 1}}>
                <PostProfile 
                    title="Chicken Plus"
                    image={require('../../../assets/img/sample.png')}
                    rate="4.5"
                    onPress={() => navigation.navigate('DetailPost')}
                />
                <PostProfile 
                    title="Cơm Tấm 68"
                    image={require('../../../assets/img/sample2.png')}
                    rate="4.5"
                />
                <PostProfile 
                    title="Bánh Tráng Trộn Gánh Hàng Rong"
                    image={require('../../../assets/img/sample3.png')}
                    rate="4.5"
                />
                <PostProfile 
                    title="Phúc Long Nguyễn Đình Chiểu Bình Dương"
                    image={require('../../../assets/img/sample4.png')}
                    rate="4.5"
                />
                <PostProfile 
                    title="Bún Đậu Mắm Tôm Thị Nở"
                    image={require('../../../assets/img/sample5.png')}
                    rate="4.5"
                />
                <PostProfile 
                    title="Al Fresco's - Pizza, Mỳ Ý, Sườn, Steak Bò Bít Tết"
                    image={require('../../../assets/img/sample6.png')}
                    rate="4.5"
                />
                <PostProfile 
                    title="Ông Chủ Nhí Milk Tea"
                    image={require('../../../assets/img/sample7.png')}
                    rate="4.5"
                />
            </View>            
        </View>
    );
};

export default Post;