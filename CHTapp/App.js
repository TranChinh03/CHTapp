import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import LoadingScreen from './screens/LoadingScreen'
import SearchBar from './src/components/searchBar'

export default function App() {
  return (
      <SearchBar placeholder='Find Course...'/>
  )
}