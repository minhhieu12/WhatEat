import React, { useState } from 'react'
import {Text, View, Image} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import {styles} from './style'
import {PickPlace, PostForYou} from '../../../components/index'
import { useNavigation } from '@react-navigation/native';

function SearchResult() {
    const navigation = useNavigation();
    
    return (
        <View>                          
            <View style={{height: 50, flexDirection: 'row', alignItems: 'center',}}>
                <TouchableOpacity 
                    style={{marginBottom: 0, marginTop: 0, marginLeft: 10}}
                    onPress={() => navigation.goBack()}
                >
                    <Feather name="chevron-left" style={{fontSize: 32}}/>                    
                </TouchableOpacity>          
                <View style={styles.container2}>                               
                    <Text style={styles.title}>Kết quả tìm kiếm cho: Chicken Plus</Text>
                </View>
            </View>            
            <View style={styles.container}>
                <ScrollView>
                    <View>
                        <Text style={styles.text}>Địa điểm</Text>
                        <PickPlace
                            image={require('../../../assets/img/sample.png')}
                            title='Chicken Plus - Thủ Dầu Một'
                            address='356 Đường 30/4, P. Chánh Nghĩa, Thành Phố Thủ Dầu Một, Bình Dương'
                            phone='0346489037'
                        />
                        <PickPlace
                            image={require('../../../assets/img/cp2.png')}
                            title='Chicken Plus - Dĩ An'
                            address='104 Đường GS1, P. Đông Hoà, Thị Xã Dĩ An, Bình Dương'
                            phone='0346489037'
                        />
                        <PickPlace
                            image={require('../../../assets/img/cp3.png')}
                            title='Chicken Plus - Huỳnh Văn Luỹ'
                            address='230 Huỳnh Văn Lũy, P. Phú Lợi, Thành Phố Thủ Dầu Một, Bình Dương'
                            phone='0346489037'
                        />
                        <Text style={{fontWeight: 'bold', textAlign: 'center', marginVertical: 5}}>Xem thêm</Text>
                    </View>
                    <View>
                        <Text style={styles.text}>Bài viết</Text>
                        <PostForYou
                            image={require('../../../assets/img/cp4.png')}
                            title='Chicken Plus - Thủ Dầu Một'
                            place='356 Đường 30/4, P. Chánh Nghĩa, Thành Phố Thủ Dầu Một, Bình Dương'
                            author='Minh Hiếu'
                            numLike='10'
                            numComment='10'
                        />
                        <PostForYou
                            image={require('../../../assets/img/cp3.png')}
                            title='Chicken Plus - Huỳnh Văn Luỹ'
                            place='230 Huỳnh Văn Lũy, P. Phú Lợi, Thành Phố Thủ Dầu Một, Bình Dương'
                            author='Minh Nghĩa'
                            numLike='10'
                            numComment='10'
                        />
                        <PostForYou
                            image={require('../../../assets/img/cp2.png')}
                            title='Chicken Plus - Dĩ An'
                            place='104 Đường GS1, P. Đông Hoà, Thị Xã Dĩ An, Bình Dương'
                            author='Phước trung'
                            numLike='10'
                            numComment='10'
                        />
                        <Text style={{fontWeight: 'bold', textAlign: 'center', marginTop: 10, bottom: 10}}>Xem thêm</Text>
                    </View>
                </ScrollView>
            </View>               
        </View>
    );
};

export default SearchResult;