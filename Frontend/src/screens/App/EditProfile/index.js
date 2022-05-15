import React, {useState, useEffect} from 'react'
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import {styles} from '../EditProfile/style'
import {PickPlace} from '../../../components/index'
import { useNavigation, useRoute } from '@react-navigation/native';
import {RadioButton} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage'
import ImagePicker from 'react-native-image-crop-picker';
import storage, { firebase } from '@react-native-firebase/storage';
import { localhost } from '../../../localhost'

function EditProfile(){
    const navigation = useNavigation();

    const route = useRoute();

    var value = {}
    value = route.params;
    console.log(value)

    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);
    const [image, setImage] = useState([]);
    const [email, setEmail] = useState(null);
    const [fullname, setFullname] = useState(null);
    const [username, setUsername] = useState(null);
    const [bio, setBio] = useState(null);

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    useEffect(async () => {
        await setUserId(await AsyncStorage.getItem('_userId'));
        await setToken(await AsyncStorage.getItem('_token'));
        if(value != null){
            setFullname(value.userName)
            setUsername(value.userUserName)
            setEmail(value.userEmail)
            setBio(value.userBio)
        }
    }, [userId])

    let imageDownload = []

    const imagePick = async () => {
        let imageList = []; 

        ImagePicker.openPicker({
            multiple: true,
            mediaType: 'photo',
            maxFiles: 10,
            includeExif: false
        }).then(response => {
            console.log('Respone: ', response)
            response.map(image => {
                imageList.push({
                    path: image.path
                })
            })
            console.log("Image List: ", imageList)
            setImage(imageList);
        }).catch(e => console.log('Error: ', e.message))
    }

    const makeid = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    useEffect(() => {
        if(image.length > 0) {
            let imageUpload = []
        
            for(var i=0; i<image.length; i++){
                let imageName = 'whateat_' + makeid(6);
                imageUpload.push({
                    imageName: imageName,
                    imageUri: image[i].path
                })
            }
            console.log(imageUpload)

            imageUpload.map(async upload => {
                await firebase
                    .storage()
                    .ref('/what-eat/' + upload.imageName)
                    .putFile(upload.imageUri)
                    .then((snapshot) => {
                        console.log(`${upload.imageName} has been successfully uploaded.`);
                        Alert.alert('Tải ảnh lên', 'Tải ảnh lên thành công!')
                    })
                    .catch((e) => console.log('uploading image error => ', e));
                
                let imageRef = firebase.storage().ref('/what-eat/' + upload.imageName);
                imageRef
                    .getDownloadURL()
                    .then((url) => {
                        imageDownload.push(url)
                        console.log('Image download: ', imageDownload)
                    })
                    .catch((e) => console.log('getting downloadURL of image error => ', e));
            })
        }
    }) 

    const editProfile = () => {
        if(imageDownload.length == 0){
            fetch(`http://${localhost}/EditProfile`, {
                method: 'POST',
                headers: {
                    'author': token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: userId,
                    fullName: fullname,
                    userName: username,
                    email: email,
                    bio: bio,
                    image: value.userImage
                })
            })
            .then((response) => response.json())
            .then((json) => {
                if(!json.isError){
                    Alert.alert('Thành công', 'Chỉnh sửa thông tin thành công')
                    navigation.navigate('Account')
                } else {
                    Alert.alert('Không thành công', json.message)
                }
            })
            .catch((err) => {
                Alert.alert('Lỗi', 'Có lỗi xảy ra');
                console.log(err);
            })
            
            return 0;
        } else {
            fetch(`http://${localhost}/EditProfile`, {
                method: 'POST',
                headers: {
                    'author': token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: userId,
                    fullName: fullname,
                    userName: username,
                    email: email,
                    bio: bio,
                    image: imageDownload[0]
                })
            })
            .then((response) => response.json())
            .then((json) => {
                if(!json.isError){
                    Alert.alert('Thành công', 'Chỉnh sửa thông tin thành công')
                    navigation.navigate('Account')
                } else {
                    Alert.alert('Không thành công', json.message)
                }
            })
            .catch((err) => {
                Alert.alert('Lỗi', 'Có lỗi xảy ra');
                console.log(err);
            })

            return 0;
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.container1}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="chevron-left" size={32}/>
                </TouchableOpacity>
                <Text style={styles.title}>Thông tin cá nhân</Text>
            </View>
            <ScrollView>
                <View style={{justifyContent: 'center'}}>
                    <View style={{alignItems: 'center'}}>
                        {
                            image.length == 0
                            ?
                            <Image
                                source={{uri: value.userImage}}
                                style={styles.image}
                            />
                            :
                            image.map((img, index) => {
                                return(
                                    <Image
                                        key={index}
                                        source={{uri: img.path}}
                                        style={styles.image}
                                    />
                                )
                            })
                        }
                        <TouchableOpacity style={styles.button} onPress={imagePick}>
                            <Feather name="image" size={28}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'column', alignContent: 'center', marginHorizontal: 30, marginVertical: 10}}>
                        <Text style={{marginBottom: 5, marginTop: 10, marginLeft: -10}}>Họ và tên</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                value={fullname}
                                placeholder="Họ và tên"
                                onChangeText={fullname => setFullname(fullname)}
                                style={{width: 275}}
                            />
                        </View>
                        <Text style={{marginBottom: 5, marginTop: 10, marginLeft: -10}}>Tên tài khoản</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                value={username}
                                placeholder="Tên tài khoản"
                                onChangeText={username => setUsername(username)}
                                style={{width: 275}}
                            />
                        </View>
                        <Text style={{marginBottom: 5, marginTop: 10, marginLeft: -10}}>Email</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                value={email}
                                placeholder="Email"
                                onChangeText={email => setEmail(email)}
                                style={{width: 275}}
                            />
                        </View>
                        <Text style={{marginBottom: 5, marginTop: 10, marginLeft: -10}}>Tiểu sử</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                value={bio}
                                placeholder="Tiểu sử"
                                onChangeText={bio => setBio(bio)}
                                style={{width: 275}}
                            />
                        </View>

                        <TouchableOpacity style={styles.buttonGreen} onPress={editProfile}>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>CẬP NHẬT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
};

export default EditProfile;