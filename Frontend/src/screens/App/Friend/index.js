import React, { useEffect, useState } from 'react'
import {Text, View, Image, Button, TouchableOpacity} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import {styles} from '../Account/style'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import auth from '@react-native-firebase/auth';

import Place from './place';
import Post from './post';
import Store from './store';
import Follower from './follower';
import Following from './following';

function Friend(props) { 
    const navigation = useNavigation();
    const [user, setUser] = useState(null);

    const [isPress, setIsPress] = useState(false);

    const [isModalVisible, setModalVisible] = useState(false);
    const [isFollowerVisible, setFollowerVisible] = useState(false);
    const [isFollowingVisible, setFollowingVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const toggleFollower = () => {
        setFollowerVisible(!isFollowerVisible);
    };
    const toggleFollowing = () => {
        setFollowingVisible(!isFollowingVisible);
    };

    const Touch = () => {
        setIsPress(!isPress);
    }

    const [state, setState] = useState({
        activeIndex: 1,
    });  
    
    const selectTab = ( index ) => {
        setState({
            activeIndex: index,
        })
    }
    
    const renderTabContent = () => {
        if( state.activeIndex == 1 ) {
            return(
                <View style={{marginTop: 10, alignItems: 'center'}}>
                    <Post/>
                </View>
            )
        }
        else if( state.activeIndex == 2 ) {
            return(
                <View style={{marginTop: 10, alignItems: 'center'}}>
                    <Place/>
                </View>
            )
        }
        else if( state.activeIndex == 3 ) {
            return(
                <View style={{marginTop: 10, alignItems: 'center'}}>
                    <Store/>
                </View>
            )
        }
    }

    const onLogOut = () => {
        auth().signOut();
    }

    useEffect(() => {
        const {currentUser, posts} = props;
        console.log({currentUser, posts})
    })

    const {currentUser, posts} = props;
    console.log({currentUser, posts})

    return (
        <View>
            <TouchableOpacity style={{marginTop: 20, marginBottom: -40, marginLeft: 10}} onPress={() => navigation.goBack()}>
                <Feather name="chevron-left" size={24}/>
            </TouchableOpacity>                          
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>        
                <Text style={styles.title}>Phước Trung</Text>
            </View>
            <ScrollView style={{marginBottom: 45}}>
                    <Image source={require('../../../assets/img/ava2.png')} style={styles.ava}/>
                    <Text style={styles.username}>@trungkenbi</Text>
                    <View style={styles.container2}>
                        <TouchableOpacity onPress={toggleFollowing}>
                            <View style={styles.countContain}>
                                <Text style={styles.count}>10</Text>
                                <Text>Đang theo dõi</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.countContain}>
                            <Text style={styles.count}>10</Text>
                            <Text>Bài viết</Text>
                        </View>
                        <TouchableOpacity onPress={toggleFollower}>
                            <View style={styles.countContain}>
                                <Text style={styles.count}>10</Text>
                                <Text>Người theo dõi</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.username}>
                        Food Reviewer {'\n'}
                        #2000 
                    </Text>
                    <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 10}}>
                        {!isPress ? (
                            <TouchableOpacity onPress={Touch} style={{borderWidth: 0.5, borderColor: 'red', width: 180, height: 30, alignItems: 'center', borderRadius: 8, marginRight: 5}}>
                                <Text style={{fontSize: 14, marginTop: 4}}>Huỷ theo dõi</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={Touch} style={{width: 180, height: 30, alignItems: 'center', borderRadius: 8, backgroundColor: '#00b060', marginRight: 5}}>
                                <Text style={{fontSize: 14, marginTop: 4, color: 'white'}}>Theo dõi</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={() => navigation.navigate('Chat')} style={{width: 180, height: 30, alignItems: 'center', borderRadius: 8, backgroundColor: '#00b060', marginLeft: 5}}>
                            <Text style={{fontSize: 14, marginTop: 4, color: 'white'}}>Nhắn tin</Text>
                        </TouchableOpacity>
                    </View> 
                    
                    <View style={{marginTop: 20}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                            <TouchableOpacity
                                onPress={() => selectTab(1)} 
                                style={[state.activeIndex == 1 ? { borderBottomWidth: 2, borderBottomColor: 'black', alignItems: 'center', width: 40} : { borderBottomWidth: 0, alignItems: 'center'}]}
                            >
                                <Feather 
                                    name="grid" 
                                    size={32} 
                                    style={[state.activeIndex == 1 ? styles.buttonTabActive : styles.buttonTabInActive]}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => selectTab(2)} 
                                style={[state.activeIndex == 2 ? { borderBottomWidth: 2, borderBottomColor: 'black', alignItems: 'center', width: 40} : { borderBottomWidth: 0, alignItems: 'center'}]}
                            >
                                <Feather 
                                    name="map" 
                                    size={32} 
                                    style={[state.activeIndex == 2 ? styles.buttonTabActive : styles.buttonTabInActive]}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => selectTab(3)} 
                                style={[state.activeIndex == 3 ? { borderBottomWidth: 2, borderBottomColor: 'black', alignItems: 'center', width: 40} : { borderBottomWidth: 0, alignItems: 'center'}]}
                            >
                                <Feather 
                                    name="bookmark" 
                                    size={32} 
                                    style={[state.activeIndex == 3 ? styles.buttonTabActive : styles.buttonTabInActive]}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {renderTabContent()}
                </ScrollView>
                <Modal isVisible={isModalVisible} animationIn='slideInUp' animationInTiming={500} style={{marginTop: 450}}>
                    <View style={{ backgroundColor: 'white', width: 410, borderRadius: 8, height: 360, marginLeft: -20, paddingHorizontal: 20}}>
                        <TouchableOpacity onPress={toggleModal} style={{padding: 10, borderRadius: 8, marginLeft: 325, marginTop: 5}}>
                            <Feather name="x" size={28}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{borderBottomWidth: 0.5, borderBottomColor: 'grey', flexDirection: 'row', paddingVertical: 10}}>
                            <Feather name="settings" size={32}/>
                            <Text style={{marginTop: 6, marginLeft: 15, fontSize: 16, fontWeight: 'bold'}}>Cài đặt</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{borderBottomWidth: 0.5, borderBottomColor: 'grey', flexDirection: 'row', paddingVertical: 10}}>
                            <Feather name="key" size={32}/>
                            <Text style={{marginTop: 6, marginLeft: 15, fontSize: 16, fontWeight: 'bold'}}>Đổi mật khẩu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onLogOut} style={{borderBottomWidth: 0.5, borderBottomColor: 'grey', flexDirection: 'row', paddingVertical: 10}}>
                            <Feather name="log-out" size={32}/>
                            <Text style={{marginTop: 6, marginLeft: 15, fontSize: 16, fontWeight: 'bold'}}>Đăng xuất</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Modal isVisible={isFollowerVisible} animationIn='slideInUp' animationInTiming={500}>
                    <View style={{ backgroundColor: 'white', width: 400, borderRadius: 8, height: 700, marginLeft: -15, paddingHorizontal: 10}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 16, marginTop: 15, marginLeft: 10, width: 320}}>Người đang theo dõi bạn</Text>
                            <TouchableOpacity onPress={toggleFollower} style={{padding: 10, borderRadius: 8, marginTop: 2}}>
                                <Feather name="x" size={28}/>
                            </TouchableOpacity>
                        </View>
                        <Follower/>
                    </View>
                </Modal>
                <Modal isVisible={isFollowingVisible} animationIn='slideInUp' animationInTiming={500}>
                    <View style={{ backgroundColor: 'white', width: 400, borderRadius: 8, height: 700, marginLeft: -15, paddingHorizontal: 10}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 16, marginTop: 15, marginLeft: 10, width: 320}}>Bạn đang theo dõi</Text>
                            <TouchableOpacity onPress={toggleFollowing} style={{padding: 10, borderRadius: 8,marginTop: 2}}>
                                <Feather name="x" size={28}/>
                            </TouchableOpacity>
                        </View>
                        <Following/>
                    </View>
                </Modal>
        </View>
        
    );
};

export default Friend;