import React, { useEffect, useState } from 'react'
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { 
    DetailPost, 
    CommentScreen, 
    Post, 
    Place, 
    Store, 
    Food, 
    PlaceScreen, 
    PickPlaceScreen, 
    EditProfile, 
    Friend, 
    Chat,
    SearchResult,
    EditPost,
    ChangePassword
} from '../screens';
import AsyncStorage from '@react-native-async-storage/async-storage'
import global from '../global';

import AppStack from './appStack';
import AuthStack from './authStack'

const Stack = createStackNavigator();

const checkLogin = (token) => {
    
}

const Main = (props) => {
    useEffect(async () => {
        const token = await AsyncStorage.getItem('_token');
        const userId = await AsyncStorage.getItem('_userId');
        console.log('userId: ' + userId)
        console.log('token: ' + token)
        if(token != null){
            setLoggedIn(true);
        } else {
            setLoggedIn(false); 
        }
    })

    const [loaded, setLoaded] = useState(false);
    const [loggedIn, setLoggedIn] = useState();

    if(!loggedIn){
        return(
            <NavigationContainer>
              <Stack.Navigator initialRouteName="AuthStack" screenOptions={{headerShown: false}}>
                <Stack.Screen
                  name="AuthStack"
                  component={AuthStack}
                />
              </Stack.Navigator>
            </NavigationContainer>
        )
    } else {
        return(
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="AppStack" screenOptions={{headerShown: false}}>
                        <Stack.Screen
                            name="AppStack"
                            component={AppStack}
                        />
                        <Stack.Screen
                            name="DetailPost"
                            component={DetailPost}
                        />
                        <Stack.Screen
                            name="CommentScreen"
                            component={CommentScreen}
                        />
                        <Stack.Screen
                            name="Food"
                            component={Food}
                        />
                        <Stack.Screen
                            name="PlaceScreen"
                            component={PlaceScreen}
                        />
                        <Stack.Screen
                            name="PickPlaceScreen"
                            component={PickPlaceScreen}
                        />
                        <Stack.Screen
                            name="EditProfile"
                            component={EditProfile}
                        />
                        <Stack.Screen
                            name="Friend"
                            component={Friend}
                        />
                        <Stack.Screen
                            name="Chat"
                            component={Chat}
                        />
                        <Stack.Screen
                            name="SearchResult"
                            component={SearchResult}
                        />
                        <Stack.Screen
                            name="EditPost"
                            component={EditPost}
                        />
                        <Stack.Screen
                            name="ChangePassword"
                            component={ChangePassword}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
        )
    }
};

export default Main;