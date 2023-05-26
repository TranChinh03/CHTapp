
import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import LoadingScreen from './screens/LoadingScreen'
import SearchBar from './src/components/searchBar'
import textBox from './src/components/textBox'
import VerifyCodeScreen from './screens/VerifyCodeScreen'
import CustomButton from './src/components/button'
import TextBox from './src/components/textBox'

export default function App() {
  return (
      // <SearchBar placeholder='Find Course...'/>
      // textBox("Enter Text", true),
      <VerifyCodeScreen/>
      // <CustomButton textButton='Confirm'/>
      // <TextBox text="abc" placeholder="Enter..." secureTextEntry={true}></TextBox>
  )
}

