import React, { useEffect } from 'react'
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
} from './screens';

import AppStack from './navigation/appStack';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from './redux/actions/index';
import { PROPERTY_TYPES } from '@babel/types';

const Stack = createStackNavigator();

const Main = () => {
    useEffect(() => {
        fetchUser();
    })

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
            </Stack.Navigator>
        </NavigationContainer>
    )
};

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)

export default connect(null, mapDispatchProps)(Main);