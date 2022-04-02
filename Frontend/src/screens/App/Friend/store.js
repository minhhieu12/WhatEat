import React from 'react'
import {Text, View} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import PostStored from '../../../components/postStored';
import { useNavigation } from '@react-navigation/native';

function Store() {
    const navigation = useNavigation();
    
    return (
        <View>
            <View style={{flexDirection: 'row', marginTop: 4, flex: 1, flexWrap: 'wrap', marginLeft: 1}}>
                <PostStored 
                    author="Minh Nghĩa"
                    title="Gà Bia Lulu"
                    image={require('../../../assets/img/sample8.png')}
                    rate="4.5"
                    onPress={() => navigation.navigate('DetailPost')}
                />
                <PostStored 
                    author="Phước Trung"
                    title="Trà Sữa Heekcaa Original"
                    image={require('../../../assets/img/sample9.png')}
                    rate="4.5"
                />
                <PostStored 
                    author="Thành Đạt"
                    title="Kem Dairy Queen"
                    image={require('../../../assets/img/sample10.png')}
                    rate="4.5"
                />
            </View>
        </View>
    );
};

export default Store;