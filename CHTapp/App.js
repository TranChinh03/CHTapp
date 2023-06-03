import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import LoadingScreen from './screens/LoadingScreen';
import SearchBar from './src/components/searchBar';
import textBox from './src/components/textBox';
import VerifyCodeScreen from './screens/VerifyCodeScreen';
import CustomButton from './src/components/button';
import TextBox from './src/components/textBox';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import IntroScreen from './screens/IntroScreen';
import SwitchButton from './src/components/switch';
import BottomTab from './src/components/bottomTab';
import CourseScreen from './screens/CourseScreen';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  return (
    // <SearchBar placeholder='Find Course...'/>
    // textBox("Enter Text", true),
    // <VerifyCodeScreen/>
    // <CustomButton textButton='Confirm'/>
    // <TextBox text="abc" placeholder="Enter..." secureTextEntry={true}></TextBox>
    // <ForgotPasswordScreen/>
    // <LoginScreen/>
    // <SignUpScreen/>
    // <IntroScreen/>
    // <SwitchButton />
    // <CourseScreen />
    <HomeScreen />
  );
}
