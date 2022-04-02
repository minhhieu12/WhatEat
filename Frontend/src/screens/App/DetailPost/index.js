import React, { useState } from 'react'
import {Text, View, Image} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {styles} from '../DetailPost/style'
import {Comment} from '../../../components/index'
import { Rating, AirbnbRating } from 'react-native-ratings';

function DetailPost({navigation}) {
    const [isLike, setIsLike] = useState(false);
    const [isSave, setIsSave] = useState(false);

    const [rating, setRating] = useState(4.5);

    const touchLike = () => {
        setIsLike(!isLike);
    }
    const touchSave = () => {
        setIsSave(!isSave);
    }

    return (
        <View>                          
                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
                    <TouchableOpacity 
                        style={{}}
                        onPress={() => navigation.goBack()}
                    >
                        <Feather name="chevron-left" style={{fontSize: 32}}/>                    
                    </TouchableOpacity>          
                    <View style={styles.container2}>                               
                        <Text style={styles.title}>Bài viết của Minh Hiếu</Text>
                    </View>
                    <TouchableOpacity style={{marginTop: 5}}>
                        <Feather name='more-vertical' size={24}/>
                    </TouchableOpacity>
                </View>            
                <View>
                    <ScrollView>
                        <View style={{flexDirection: 'row', marginHorizontal: 20, alignItems: 'center', marginTop: 20,}}>
                                <Image source={require('../../../assets/img/ava.png')} style={styles.ava}/>
                                <View style={{flexDirection: 'column', marginLeft: 4, marginTop: -6}}>
                                    <Text style={styles.author}>Minh Hiếu</Text>
                                    <Text style={styles.time}>Vừa xong</Text>
                                </View>                       
                        </View>
                        <View style={{paddingBottom: 180, flexDirection: 'column'}}>
                            <Text style={styles.content}>
                            Chicken Plus là một thương hiệu gà rán được yêu thích tại Hàn Quốc. Chúng ta vẫn hay gọi Hàn Quốc là xứ sở kim chi. Người ta đã quen thuộc một nền ẩm thực Hàn Quốc chỉ có kim chi. Dù vậy, ẩm thực Hàn Quốc thật sự là một thế giới thu hút các tín đồ sành ăn và đam mê tìm kiếm những điều tươi mới. Với sự tận tâm và đam mê đối với nền ẩm thực quốc gia. Các đầu bếp của Chicken Plus luôn trăn trở để tìm ra được công thức cho món gà rán độc quyền mang hương vị của phong cách Hàn Quốc. Nhờ vào những kinh nghiệm dày dặn và công nghệ chế biến hiện đại, họ đã lựa chọn và mang đến Việt Nam những gì tinh túy nhất với mong muốn mang đến cho thực khách Việt Nam một trải nghiệm hoàn hảo mang xu hướng vừa truyền thống vừa hiện đại. 
                            </Text>
                            <View style={styles.place}>
                                <Feather name="map-pin" style={{fontSize: 24}}/>
                                <View style={{marginLeft: 10}}>
                                    <Text style={styles.placeName}>Gà rán Chicken Plus</Text>
                                    <Text style={styles.placeAddress}>356 đường 30/4, phường Chánh Nghĩa, thành phố Thủ Dầu Một, Bình Dương</Text>
                                </View>                                
                            </View>
                            <View style={styles.rate}>
                                <Feather name="star" style={{fontSize: 24}}/>
                                <View style={{marginLeft: 10, flexDirection: 'row'}}>
                                    <Text style={{fontWeight: 'bold', marginRight: 5, marginTop: 15, fontSize: 16}}>{rating}</Text>
                                    <Rating
                                        type='custom'
                                        style={{ paddingVertical: 10, }}
                                        fractions={1}
                                        tintColor='#f2f2f2'
                                        imageSize={32}
                                        startingValue={4.5}
                                    />
                                </View>                                
                            </View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginHorizontal: 5}}>
                                <Image source={require('../../../assets/img/sample.png')} style={styles.image}/>
                                <Image source={require('../../../assets/img/cp2.png')} style={styles.image}/>
                                <Image source={require('../../../assets/img/cp3.png')} style={styles.image}/>
                                <Image source={require('../../../assets/img/cp4.png')} style={styles.image}/>
                            </ScrollView>
                            <View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 10}}>
                                <Text style={{marginHorizontal: 90, textAlign: 'left', fontWeight: 'bold'}}>10 lượt thích</Text>
                                <Text style={{marginHorizontal: 90, textAlign: 'right', fontWeight: 'bold'}}>10 bình luận</Text>                              
                            </View>
                            <Comment
                                author="Phước Trung"
                                image={require('../../../assets/img/ava2.png')}
                                content="74k 5 miếng nhìn muốn trầm cảm"
                            />
                            <Comment
                                author="Minh Nghĩa"
                                image={require('../../../assets/img/ava3.png')}
                                content="Tối qua mình có lại ăn một phần gà nửa con, với mấy phần món thêm. Lúc mình bước vô, trong quán có tận 4 nhân viên nhưng chẳng ai lại hỏi mình hay sao cả, có ngước lên nhìn xong vẫn tiếp tục tụ lại nói chuyện. Mình đang coi món thì nhân viên lại hỏi mình xong chưa, thái độ thì không vui vẻ, bao tay để xé gà thì không thay mới, nhạc bật quá to đến mức không nói chuyện được. Đồ ăn thì làm được. Mình đề nghị quán nên xem lại thái độ nhân viên."
                            />
                            <Comment
                                author="Thành Đạt"
                                image={require('../../../assets/img/ava4.png')}
                                content="Đi ngang qua thấy đông nên ghé vào ăn thử. Mọi người gửi xe ở cái hẻm nằm bên phải quán nha, giữ xe miễn phí. Mình và bạn kêu ra 1/2 gà kẹo nổ mà ăn ko nổi luôn. Gà siêu to luôn ấy. Kẹo nổ ăn kèm thấy ko hợp nên mọi người đừng kêu nha. Có thể refill cơm và rong biển để vo lại ăn kèm gà, nước cũng refill nếu mua nha mọi người ơi. Quán hơi chật và nóng"
                            />
                            <Comment
                                author="Phú Nghĩa"
                                image={require('../../../assets/img/ava.png')}
                                content="Mình ăn gà sốt ngũ vị loại nhỏ(2 đùi) giá ở menu 60k nhưng tính bill 139k :))))"
                            />
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.bottonTab}>
                    {!isLike ? (
                        <TouchableOpacity onPress={touchLike}>
                            <Feather name='heart' style={styles.iconUnlike}/>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={touchLike}>
                            <FontAwesome name='heart' style={styles.iconLike}/>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={() => navigation.navigate('CommentScreen')}>
                        <Feather name='message-square' style={styles.icon}/>
                    </TouchableOpacity>
                    {!isSave ? (
                        <TouchableOpacity onPress={touchSave}>
                            <Feather name='bookmark' style={styles.iconUnSave}/>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={touchSave}>
                            <FontAwesome name='bookmark' style={styles.iconSave}/>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={() => navigation.navigate('PlaceScreen')}>
                        <Feather name='map' style={styles.icon}/>
                    </TouchableOpacity>
                </View>                
            </View>
    );
};

export default DetailPost;