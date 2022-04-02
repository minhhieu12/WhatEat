import React, {useState} from 'react'
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import {styles} from '../EditProfile/style'
import {PickPlace} from '../../../components/index'
import { useNavigation } from '@react-navigation/native';

function EditProfile(){
    const navigation = useNavigation();

    const [avatar, setAvatar] = useState('');
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');

    return(
        <View style={styles.container}>
            <View style={styles.container1}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="chevron-left" size={32}/>
                </TouchableOpacity>
                <Text style={styles.title}>Thông tin cá nhân</Text>
                <TouchableOpacity>
                    <Feather name="save" size={32}/>
                </TouchableOpacity>
            </View>
            <View style={{justifyContent: 'center'}}>
                <ScrollView>
                    <View style={{alignItems: 'center'}}>
                        <Image
                            source={require('../../../assets/img/ava.png')}
                            style={styles.image}
                        />
                        <TouchableOpacity style={styles.button}>
                            <Feather name="image" size={28}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textInputContainer}>
                        <Feather name="user" size={28} style={styles.icon}/>
                        <TextInput 
                            placeholder="Họ và tên" 
                            style={styles.textInput}
                            value={fullname}
                            onChangeText={setFullname}
                            value='Minh Hiếu'
                        />
                    </View>
                    <View style={styles.textInputContainer}>
                        <Feather name="user" size={28} style={styles.icon}/>
                        <TextInput 
                            placeholder="Tên tài khoản"  
                            style={styles.textInput}
                            value={username}
                            onChangeText={setUsername}
                            value='@hieutm'
                        />
                    </View>
                    <View style={styles.textInputContainer}>
                        <Feather name="tag" size={28} style={styles.icon}/>
                        <TextInput 
                            placeholder="Tiểu sử" 
                            style={styles.textInput}
                            multiline
                            numberOfLines={2}
                            value={description}
                            onChangeText={setDescription}
                            value='Food Reviewer #20000812'
                        />
                    </View>
                </ScrollView>
            </View>
        </View>
    )
};

export default EditProfile;