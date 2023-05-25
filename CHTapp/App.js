import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import LoadingScreen from './screens/LoadingScreen'
import SearchBar from './src/components/searchBar'
import textBox from './src/components/textBox'

export default function App() {
  return (
      // <SearchBar placeholder='Find Course...'/>
      textBox("Enter Text", true)
  )
}