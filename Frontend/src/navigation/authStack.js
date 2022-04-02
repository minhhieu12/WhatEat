import React from 'react';
import {Login} from '../screens'
import {Regist} from '../screens'
import {Home} from '../screens'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const authStack = () => {
    return(
        <Stack.Navigator initialRouteName="AuthStack">
            <Stack.Screen
                name="Login"
                component={Login}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Regist"
                component={Regist}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Home"
                component={Home}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
};

export default authStack;