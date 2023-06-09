import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CourseScreen from '../screens/CourseScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import IntroScreen from '../screens/IntroScreen';
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import VerifyCodeScreen from '../screens/VerifyCodeScreen';
import {useNavigation} from '@react-navigation/native';

import {View, StyleSheet} from 'react-native';
import CUSTOM_COLORS from '../src/constants/colors';
import {IC_Book, IC_Home, IC_Profile, IC_Schedule} from '../src/assets/iconsvg';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import scale from '../src/constants/responsive';
import CourseDetailScreen from '../screens/CourseDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileEditScreen from '../screens/ProfileEditScreen';
import LessonDetailScreen from '../screens/LessonDetailScreen';
import TodoScreen from '../screens/TodoScreen';
import {firebase} from '../configs/FirebaseConfig';
import AddCourseScreen from '../screens/AddCourseScreen';
import AddChapterScreen from '../screens/AddChapterScreen';
import AddLessonScreen from '../screens/AddLessonScreen';
import AllCourseScreen from '../screens/AllCourseScreen';
import AddOptionScreen from '../screens/AddOptionScreen';
import EditCourseScreen from '../screens/EditCourseScreen';
import MeetingScreen from '../screens/MeetingScreen';
import CreateMeeting from '../screens/CreateMeeting';
import SettingScreen from '../screens/SettingScreen';

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
          borderTopRightRadius: scale(15, 'w'),
          ...styles.shadow,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <IC_Home
                fill={focused ? CUSTOM_COLORS.primary : CUSTOM_COLORS.lightGray}
                fill2={
                  focused ? CUSTOM_COLORS.primary : 'transparent'
                }></IC_Home>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="CourseStack"
        component={CourseStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <IC_Book
                fill={focused ? CUSTOM_COLORS.primary : CUSTOM_COLORS.lightGray}
                fill2={
                  focused ? CUSTOM_COLORS.primary : 'transparent'
                }></IC_Book>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MeetingStack"
        component={MeetingStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <IC_Schedule
                fill={focused ? CUSTOM_COLORS.primary : CUSTOM_COLORS.lightGray}
                fill2={
                  focused ? CUSTOM_COLORS.primary : 'transparent'
                }></IC_Schedule>
            </View>
          ),
        }}
      />
      {/* <Tab.Screen
        name="Todo"
        component={TodoScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <IC_Schedule
                fill={focused ? CUSTOM_COLORS.primary : CUSTOM_COLORS.lightGray}
                fill2={
                  focused ? CUSTOM_COLORS.primary : 'transparent'
                }></IC_Schedule>
            </View>
          ),
        }}
      /> */}
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <IC_Profile
                fill={focused ? CUSTOM_COLORS.primary : CUSTOM_COLORS.lightGray}
                fill2={
                  focused ? CUSTOM_COLORS.primary : 'transparent'
                }></IC_Profile>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

const CourseStack = () => {
  return (
    <Stack.Navigator initialRouteName="Course">
      <Stack.Screen
        name="Course"
        component={CourseScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AllCourse"
        component={AllCourseScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CourseDetail"
        component={CourseDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LessonDetail"
        component={LessonDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddCourse"
        component={AddCourseScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddChapterScreen"
        component={AddChapterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddLessonScreen"
        component={AddLessonScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="AddOption"
        component={AddOptionScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="EditCourse"
        component={EditCourseScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={SettingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEditScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const MeetingStack = () => {
  return (
    <Stack.Navigator initialRouteName="YourMeeting">
      <Stack.Screen
        name="YourMeeting"
        component={MeetingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateMeeting"
        component={CreateMeeting}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default function AppStack() {
  const navigation = useNavigation();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subcriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subcriber;
  }, []);

  if (initializing) return null;

  if (!user) {
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
          options={{headerShown: false}}></Stack.Screen>
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      options={{headerShown: false}}>
      {/* <Stack.Screen
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
      </Stack.Screen>  */}
      <Stack.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{headerShown: false}}></Stack.Screen>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: CUSTOM_COLORS.DarkGray,
    shadowOffset: {width: 5, height: 10},
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 10,
  },
});