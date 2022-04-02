import React from 'react'
import {Text, View, Image, TextInput} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import {styles} from '../Notify/style'
import {NotiComment, NotiFollow, NotiLike} from '../../../components/index'

function Notify({navigation}) {
    return (
        <View>   
            <View style={styles.container2}>                               
                <Text style={styles.title}>Thông báo</Text>
            </View>
            <View style={{marginTop: 10,}}>
            <ScrollView style={{height: 690, bottom: 7}}>
                    <Text style={styles.timeNew}>Hôm nay</Text>
                    <NotiLike
                        imageUser={require('../../../assets/img/ava2.png')}
                        username="Phước Trung, Minh Nghĩa, Thành Đạt"
                        imagePost={require('../../../assets/img/sample2.png')}
                    />
                    <NotiComment
                        imageUser={require('../../../assets/img/ava2.png')}
                        username="Phước Trung, Minh Nghĩa, Thành Đạt"
                        imagePost={require('../../../assets/img/sample2.png')}
                    />
                    <NotiFollow
                        imageUser={require('../../../assets/img/ava3.png')}
                        username="Thành Đạt"
                    />
                    <Text style={styles.timeOld}>Tuần trước</Text>
                    <NotiLike
                        imageUser={require('../../../assets/img/ava4.png')}
                        username="Minh Nghĩa"
                        imagePost={require('../../../assets/img/sample4.png')}
                    />
                    <NotiComment
                        imageUser={require('../../../assets/img/ava2.png')}
                        username="Phước Trung, Minh Nghĩa"
                        imagePost={require('../../../assets/img/sample3.png')}
                    />
                    <NotiFollow
                        imageUser={require('../../../assets/img/ava4.png')}
                        username="Minh Nghĩa"
                    />
                    <Text style={styles.timeOld}>Tháng trước</Text>
                    <NotiLike
                        imageUser={require('../../../assets/img/ava4.png')}
                        username="Minh Nghĩa, Phước Trung, Thành Đạt"
                        imagePost={require('../../../assets/img/migia3.png')}
                    />
            </ScrollView> 
            </View>            
        </View>
    );
};

export default Notify;