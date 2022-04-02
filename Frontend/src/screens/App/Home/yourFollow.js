import React from 'react'
import {Text, View} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import {PostFollowing} from '../../../components/index'
import { useNavigation } from '@react-navigation/native';

function YourFollow() {
    const navigation = useNavigation();

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <PostFollowing 
                title="Gà rán Chicken Plus"
                author="Minh Hiếu"
                time="Vừa xong"
                avatar={require('../../../assets/img/ava.png')}
                image={require('../../../assets/img/sample.png')}
                place="356 Đường 30/4, P. Chánh Nghĩa, Thành Phố Thủ Dầu Một, Bình Dương"
                content="Đây là thương hiệu gà rán nhượng quyền được yêu thích tại Hàn Quốc. Các công thức chế biến độc quyền từ Hàn Quốc sẽ mang lại hương vị tươi mới cho thực"
                numLike="10"
                numComment="10"
                onPress={() => navigation.navigate('DetailPost')}
            />
            <PostFollowing 
                title="Phúc Long Coffee & Tea"
                author="Phước Trung"
                time="1 giờ trước"
                avatar={require('../../../assets/img/ava2.png')}
                image={require('../../../assets/img/phuclong.png')}
                place="44 Nguyễn Đình Chiểu, Phú Cường, Thủ Dầu Một, Bình Dương"
                content="Phúc Long liên tục là thương hiệu tiên phong với nhiều ý tưởng sáng tạo đi đầu trong ngành trà và cà phê. Trải qua hơn 50 năm chắt chiu tinh hoa từ những búp trà xanh và hạt cà phê thượng hạng cùng mong muốn mang lại cho khách hàng những trải nghiệm giá trị nhất khi thưởng thức"
                numLike="10"
                numComment="10"
            />
            <PostFollowing 
                title="Highland Đại lộ Bình Dương"
                author="Minh Nghĩa"
                time="2 giờ trước"
                avatar={require('../../../assets/img/ava3.png')}
                image={require('../../../assets/img/highland.png')}
                place="325 Đại lộ Bình Dương, Phú Thọ, Thủ Dầu Một, Bình Dương"
                content="Highlands Coffee là chuỗi cửa hàng kinh doanh cà phê và các loại đồ ăn nhanh của Việt Nam, do David Thái sáng lập vào năm 1999"
                numLike="10"
                numComment="10"
            />
            <PostFollowing 
                title="Mì cay Sasin Đại lộ Bình Dương"
                author="Thành Đạt"
                time="3 giờ trước"
                avatar={require('../../../assets/img/ava4.png')}
                image={require('../../../assets/img/sasin.png')}
                place="506 Đại Lộ Bình Dương, P. Hiệp Thành, Thành Phố Thủ Dầu Một, Bình Dương"
                content="Mì cay Sasin tự hào là thương hiệu Mì Cay 7 Cấp Độ Hàn Quốc tiên phong và tạo nên cơn sốt hiện nay trong giới trẻ, đặc biệt luôn đặt chất lượng thực phẩm "
                numLike="10"
                numComment="10"
            />
        </ScrollView>
    );
};

export default YourFollow;