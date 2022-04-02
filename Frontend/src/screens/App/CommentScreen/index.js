import React from 'react'
import {Text, View, Image, StyleSheet, TextInput} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import {Comment} from '../../../components/index'

function CommentScreen({navigation: {goBack}}) {
    return (
        <View> 
            <View>
                <TouchableOpacity 
                    style={{marginBottom: -27, marginTop: 10, marginLeft: 10}}
                    onPress={() => goBack()}    
                >
                    <Feather name="chevron-left" style={{fontSize: 32}}/>                    
                </TouchableOpacity>          
                <View style={styles.container2}>                               
                    <Text style={styles.title}>Bài viết của Minh Hiếu</Text>
                </View>
            </View>
            <View style={{paddingBottom: 165, marginTop: 10}}>
                <ScrollView>                          
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
                        image={require('../../../assets/img/ava5.png')}
                        content="Mình ăn gà sốt ngũ vị loại nhỏ(2 đùi) giá ở menu 60k nhưng tính bill 139k :))))"
                    />
                    <Comment
                        author="Duy Khang"
                        image={require('../../../assets/img/ava6.png')}
                        content="Lẩu tok nên từ 3 người trở lên. Có quầy chọn salad và cơm trộn free. Nước 15k refill không giới hạn. Quán phục vụ nhiệt tình."
                    />
                    <Comment
                        author="Nguyễn Khang"
                        image={require('../../../assets/img/ava7.png')}
                        content="Mình đến ăn tiệm rất nhiều lần và cũng đặt cơm rất nhiều lần. Hôm nay mình thật thất vọng, nó ko giống như mọi khi mình ăn, đặt mề gà sốt ngũ vị mà ko thấy miếng sốt nào luôn. Cơm thì khác xưa quá, hồi trước để trong hộp nhựa trong, có trứng, có kim chi, có rong biển, nay thì chẳng thấy đâu. Chắc mình sẻ ko mua của quán nữa."
                    />
                    <Comment
                        author="Phạm Ân"
                        image={require('../../../assets/img/ava8.png')}
                        content="Món ăn ngon, giá cả ổn. Đã đến rất nhiều lần nhưng mỗi lần phục vụ đều không chuyên nghiệp, mua 1 con tính tiền 1 con nhưng về tới nhà mở ra là nửa con, còn gọi nhà hàng thì không giải quyết. Đặt shiper giao đồ ăn cũng mắc tình trạng tương tự. Quản lý nói chuyện kém văn hóa, gây khó chịu cho khách hàng"
                    />
                    <Comment
                        author="Đoàn Duy"
                        image={require('../../../assets/img/ava9.png')}
                        content="2 người order 2 phần gà sốt ngũ vị 1/2 con, mỗi người 1 phần ăn khá ngon, ướp thấm vị, không quá khô, có ít xà lách và cá chua ăn kèm. Không gian quán cũng được, không quá xuất sắc, món lên không phải chờ lâu. Nhân viên phục vụ tuỳ lúc, có lúc khá nhanh và nhiệt tình. Quán cũng dễ tìm. Menu cũng có nhiều món nữa nhưng chưa kịp thử. Giá không đắt so với chất lượng nên cũng là nơi đáng để quay lại."
                    />                       
                    <Comment
                        author="Tấn Thông"
                        image={require('../../../assets/img/ava10.png')}
                        content="Gà ngon, tẩm ướp vừa phải. Không gian cũng rộng rãi, thoáng mát. Duy chỉ có 1đ trừ là quán xem lại nhân viên phục vụ ạ :)))). Chị làm 1 mình thì cực thật nma khá khó chịu vs khách."
                    />
                    <Comment
                        author="Minh Huy"
                        image={require('../../../assets/img/ava11.png')}
                        content="Gà bên trong mềm, không bị khô, bên ngoài da giòn và đặc biệt có sốt ăn kèm tuyệt vời, hợp khẩu vị nhiều người và nhất là những ai thích ăn gà"
                    />
                </ScrollView>
            </View>
            <View style={styles.bottonTab}>
                <TextInput
                    placeholder='Nhập bình luận của bạn'
                    style={styles.textInput}
                />
                <TouchableOpacity>
                    <Feather name='send' style={{fontSize: 32, marginLeft: 10}}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CommentScreen;

const styles = StyleSheet.create({
    bottonTab: {
        flexDirection: 'row',
      backgroundColor: 'white',
      width: 390,
      height: 70,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      position: 'absolute',
      bottom: 50,
      flex: 1,
      borderRadius: 8,
        shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,

            elevation: 4,
    },
    textInput: {
        borderWidth: 0.5,
        borderColor: '#c4c4c4',
        borderRadius: 8,
        width: 320
    },
    container2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: null
    },
    title: {
        color: '#00B060',
        fontSize: 16,
        fontWeight: 'bold',
    }
})