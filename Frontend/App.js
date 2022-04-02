import React, { useEffect, useState } from 'react'
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

import Main from './src/Main';

import AuthStack from './src/navigation/authStack';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './src/redux/reducers'
import thunk from 'redux-thunk'

const Stack = createStackNavigator();

const store = createStore(rootReducer, applyMiddleware(thunk))

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState();

  useEffect(() => {
    auth()
    .onAuthStateChanged((user) => {
      if(!user){
        setLoaded(true),
        setLoggedIn(false)
      }
      else{
        setLoaded(false),
        setLoggedIn(true)
      }
    })
  })

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
  }
  else{
    return (
      <Provider store={store}>
        <Main/>
      </Provider>
    );
  }
};

export default App;