import { Text, View, StyleSheet, SafeAreaView, ImageBackground, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { Component } from 'react'
import { IMG_AUTHBACKGROUND } from '../src/assets/img'
import CUSTOM_COLORS from '../src/constants/colors'
import scale from '../src/constants/responsive'
import CustomButton from '../src/components/button'
import TextBox from '../src/components/textBox'
import { IC_FACEBOOK, IC_GOOGLE } from '../src/assets/icons'
import BackButton from '../src/components/backButton'

export class LoginScreen extends Component {

  state = {
    email: '',
    password: '',
  }

  checkInfo = (email, password) => {
    if(email === '' || password === '')
        return false;
    return true;
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={IMG_AUTHBACKGROUND} resizeMode='cover' style={styles.image}>
           <View style={styles.container1}>
                <BackButton onPress={() => this.props.navigation.goBack()}/>
                <Text style={styles.text1}>CHT</Text>
                <Text style={styles.subtext1}>Course - Homework - Technical</Text>
           </View>
           <View style={styles.container2}>
                <Text style={styles.text2}>Log in</Text>
                <Text style={styles.subtext2}>Login to your account</Text>
                <View style={styles.subContainer2}>
                    <View style={styles.textInputContainer}>
                        <TextBox text= {this.state.email}
                        placeholder="Email"
                        onChangeText = {(email) => this.setState({email: email})}></TextBox>
                        <TextBox text= {this.state.password} 
                        placeholder="Password" 
                        secureTextEntry={true}
                        onChangeText = {(password) => this.setState({password: password})}></TextBox>
                    </View>
                    <TouchableOpacity style={styles.buttonContainer} 
                    onPress = {() => this.props.navigation.navigate('ForgotPassword')}>
                        <Text style={styles.textButton}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
           </View>
                
           <View style={styles.container3}>
                <CustomButton textButton="Log in" 
                onPress={() => {
                this.checkInfo(this.state.email, this.state.password) ? 
                this.props.navigation.navigate('HomeTabs') : 
                Alert.alert('You need to fill full the information to Login!')
                }}></CustomButton>
                <Text style={[styles.textButton, styles.subText3]}>- Or log in with -</Text>
                <View style={styles.subContainer3}>
                    <TouchableOpacity style={styles.iconContainer}>
                        <Image style={styles.icon} source={IC_GOOGLE}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer}>
                        <Image style={styles.icon} source={IC_FACEBOOK}></Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomContainer}>
                    <Text style={styles.bottomText}>New to CHT? </Text>
                    <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('SignUp')}>
                        <Text style={[styles.bottomText, styles.addBottomText]}>Sign up</Text>
                    </TouchableOpacity>
                </View>
           </View>
        </ImageBackground>
      </SafeAreaView>
    )
  }
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    image: {
        flex: 1,
    },
    container1: {
        flex:1,
        alignItems: 'center'
    },

    container2: {
        flex: 1,
    },

    container3: {
        flex:1,
        alignItems: 'center',
    },

    text1: {
        color: CUSTOM_COLORS.white,
        fontSize: scale(75, 'w'),
        marginTop: scale(40, 'h'),
        fontWeight:'bold'
    },
    subtext1: {
        color: CUSTOM_COLORS.white,
        fontSize: scale(16, 'w'),
    },
    text2: {
        color: CUSTOM_COLORS.black,
        fontSize: scale(40, 'w'),
        fontWeight: '500',
        marginLeft: scale(25, 'w'),
        marginTop: scale(-10, 'h'),
    },
    subtext2: {
        fontSize: scale(14, 'w'),
        marginTop: scale(20, 'h'),
        marginHorizontal: scale(40, 'w'),
        color: CUSTOM_COLORS.black,
    },

    subContainer2: {
        alignSelf: 'center',
        marginTop: scale(10, 'h'),
        height: scale(137, 'h'),
    },

    textInputContainer: {
        height: scale(110, 'h'),
        justifyContent: 'space-between',
    },

    buttonContainer: {
        position: 'absolute',
        right: 0,
        bottom: 0,
    },

    textButton: {
        fontSize: scale(14,'w'),
        color: CUSTOM_COLORS.black,
    },

    subText3: {
        marginTop: scale(25, 'w'),
    },

    subContainer3: {
        flexDirection: 'row',
        width: scale(150, 'w'),
        justifyContent: 'space-between',
        marginTop: scale(20, 'h'),
    },

    iconContainer: {
        height: scale(48, 'h'),
        width: scale(65, 'w'),
        borderWidth: 1,
        borderColor: CUSTOM_COLORS.gray,
        borderRadius: scale(15, 'w'),
        alignItems: 'center',
        justifyContent: 'center',
    },

    icon: {
        height: scale(24, 'h'),
        width: scale(24, 'w'),
    },


    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: scale(20,'h'),
        alignSelf: 'center'
    },
    bottomText: {
        fontSize: scale(16,'w'),
        color: CUSTOM_COLORS.usBlue,
    },
    addBottomText: {
        fontWeight: 'bold'
    }
})