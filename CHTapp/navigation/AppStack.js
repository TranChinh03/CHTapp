import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CourseScreen from '../screens/CourseScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import IntroScreen from '../screens/IntroScreen';
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import VerifyCodeScreen from '../screens/VerifyCodeScreen';
import { useNavigation } from '@react-navigation/native';


import {View, StyleSheet} from 'react-native';
import CUSTOM_COLORS from '../src/constants/colors'
import {
  IC_Book,
  IC_Home,
  IC_Profile,
  IC_Schedule,
} from '../src/assets/iconsvg';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import scale from '../src/constants/responsive'

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator 
    screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
            position: 'absolute',
            backgroundColor: CUSTOM_COLORS.white,
            height: scale(75, 'h'),
            borderTopLeftRadius: scale(15, 'w'),
            borderTopRightRadius: scale(15 , 'w'),
            ...styles.shadow
        },
    }}>
        <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options = {{
            tabBarIcon: ({focused}) => (
                <View>
                    <IC_Home
                    fill = {focused ? CUSTOM_COLORS.primary : CUSTOM_COLORS.lightGray}
                    fill2 = {focused ? CUSTOM_COLORS.primary : 'transparent'} ></IC_Home>
                </View>
            ),
        }}/>
        <Tab.Screen 
        name="Course" 
        component={CourseScreen}
        options = {{
            tabBarIcon: ({focused}) => (
                <View>
                    <IC_Book
                    fill = {focused ? CUSTOM_COLORS.primary : CUSTOM_COLORS.lightGray}
                    fill2 = {focused ? CUSTOM_COLORS.primary : 'transparent'} ></IC_Book>
                </View>
            ),
        }}
        />
        <Tab.Screen 
        name="Todo" 
        component={CourseScreen}
        options = {{
            tabBarIcon: ({focused}) => (
                <View>
                    <IC_Schedule
                    fill = {focused ? CUSTOM_COLORS.primary : CUSTOM_COLORS.lightGray}
                    fill2 = {focused ? CUSTOM_COLORS.primary : 'transparent'} ></IC_Schedule>
                </View>
            ),
        }}
        />
        <Tab.Screen 
        name="Profile" 
        component={CourseScreen}
        options = {{
            tabBarIcon: ({focused}) => (
                <View>
                    <IC_Profile
                    fill = {focused ? CUSTOM_COLORS.primary : CUSTOM_COLORS.lightGray}
                    fill2 = {focused ? CUSTOM_COLORS.primary : 'transparent'} ></IC_Profile>
                </View>
            ),
        }}
        />
    </Tab.Navigator>
  )
}

const Stack = createNativeStackNavigator();
export default function AppStack() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      initialRouteName="Loading"
      options={{headerShown: false}}>
      <Stack.Screen
        name="Loading"
        component={LoadingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Intro"
        component={IntroScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VerifyCode"
        component={VerifyCodeScreen}
        options={{headerShown: false}}
      >
      </Stack.Screen> 
      <Stack.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{headerShown: false}}
      >
      </Stack.Screen>
    </Stack.Navigator>
  );
}


const styles = StyleSheet.create({
  shadow: {
    shadowColor: CUSTOM_COLORS.DarkGray,
    shadowOffset: { width: 5, height: 10},
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 10,
  }
})