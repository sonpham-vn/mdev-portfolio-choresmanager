import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import OnboardingScreen from './OnboardingScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import HomeScreen from './HomeScreen';
import MainScreen from './MainScreen';
import ProductScreen from './ProductScreen';
import MapScreen from './Booking/MapScreen';
import MatchingScreen from './Booking/MatchingScreen';
import PaymentScreen from './Booking/PaymentScreen';
import ConfirmationScreen from './Booking/ConfirmationScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name='OnboardingScreen' component={OnboardingScreen} />
        <RootStack.Screen name='SignInScreen' component={SignInScreen} />
        <RootStack.Screen name='SignUpScreen' component={SignUpScreen} />
        <RootStack.Screen name='MainScreen' component={MainScreen} />
        <RootStack.Screen name='ProductScreen' component={ProductScreen} />
        <RootStack.Screen name='MapScreen' component={MapScreen} />
        <RootStack.Screen name='MatchingScreen' component={MatchingScreen} />
        <RootStack.Screen name='PaymentScreen' component={PaymentScreen} />
        <RootStack.Screen name='ConfirmationScreen' component={ConfirmationScreen} />

    </RootStack.Navigator>
);

export default RootStackScreen;