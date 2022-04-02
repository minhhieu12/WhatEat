import React, {useState} from 'react'
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import {styles} from '../PickPlaceScreen/style'
import {PickPlace} from '../../../components/index'

function PickPlaceScreen(){
    return(
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Nhập địa điểm bạn cần tìm"
                    style={styles.textInput}
                />
                <TouchableOpacity>
                    <Feather name="search" size={28} style={styles.icon}/>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Text 
                    style={{
                        fontWeight: 'bold', 
                        marginHorizontal: 15, 
                        marginTop: 15, 
                        marginBottom: 5, 
                        fontSize: 14
                        }}
                >Địa điểm bạn đã đến</Text>
                <TouchableOpacity>
                    <Feather name='trash' size={16} style={{marginTop: 15, marginLeft: 200}}/>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.container2}>
                <PickPlace
                    title="Chicken Plus"
                    address="356 Đường 30/4, P. Chánh Nghĩa, Thành Phố Thủ Dầu Một, Bình Dương"
                    phone="0346489037"
                    image={require('../../../assets/img/sample.png')}
                />
                <PickPlace
                    title="Cơm Tấm 68"
                    address="309 Thích Quảng Đức, P. Phú Cường, Thị xã Thủ Dầu Một, Bình Dương"
                    phone="0346489037"
                    image={require('../../../assets/img/sample2.png')}
                />
                <PickPlace
                    title="Bánh tráng trộn Gánh Hàng Rong"
                    address="113/108B Đường 30 Tháng 4, P. Phú Hòa, Thị xã Thủ Dầu Một, Bình Dương"
                    phone="0346489037"
                    image={require('../../../assets/img/sample3.png')}
                />
                <PickPlace
                    title="Phúc Long Nguyễn Đình Chiểu Bình Dương"
                    address="44 Nguyễn Đình Chiểu, P. Phú Cường, Thị xã Thủ Dầu Một, Bình Dương"
                    phone="0346489037"
                    image={require('../../../assets/img/sample4.png')}
                />
            </ScrollView>
        </View>
    )
};

export default PickPlaceScreen;