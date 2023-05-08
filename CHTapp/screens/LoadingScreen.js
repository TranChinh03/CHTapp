import { Text, View, StyleSheet, SafeAreaView, ImageBackground } from 'react-native'
import React, { Component } from 'react'


export class LoadingScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../src/assets/img/Loading.png')} resizeMode='cover' style={styles.image}>
            <Text 
                style={[styles.text , styles.title]}
            >CHT</Text>
            <Text style={[styles.text, styles.subTitle]}>Course - Homework - Technical</Text>
        </ImageBackground>
      </SafeAreaView>
    )
  }
}

export default LoadingScreen

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        color: '#ffffff',
    },
    title: {
        fontSize: 75,
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: 16,
    }
})