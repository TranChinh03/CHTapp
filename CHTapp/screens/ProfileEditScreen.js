import { Text, StyleSheet, View, SafeAreaView, ImageBackground, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { IMG_PROFILEBACKGROUND, IMG_AVT } from '../src/assets/img'
import { IC_EDIT_PRO5 } from '../src/assets/icons'
import CUSTOM_COLORS from '../src/constants/colors'
import scale from '../src/constants/responsive'
import CourseAttendedBox from '../src/components/courseAttendedBox'
import CourseCompletedBox from '../src/components/courseCompletedBox'
import TextInputBox from '../src/components/textInputBox'
import { IC_Tick } from '../src/assets/iconsvg'
import BackButton from '../src/components/backButton'


export default class ProfileEditScreen extends Component {
  render() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.bgContainer}>
                <ImageBackground style={styles.background} source={IMG_PROFILEBACKGROUND}/>
                <View style={{justifyContent: 'center', position:'absolute', top:scale(20, 'h'), width:'100%'}}>
                    <BackButton/>
                    <View style={styles.screenTitleContainer}>
                        <Text style={styles.screenTitle}>Edit Profile</Text>
                    </View>
                    <TouchableOpacity style={styles.whiteCircle}>
                        <IC_Tick></IC_Tick>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.contentContainer}>
              <View style={styles.avtContainer}>
                <View style={styles.avtFrame}>
                    <Image style={styles.avt} source={IMG_AVT}/>
                </View>

              </View>

              <View style={styles.nameContainer}>
                <View style={styles.nameFrame}>
                    <Text style={styles.name}>Nhu Huynh</Text>
                    <Image style={styles.icEdit} source={IC_EDIT_PRO5}/>
                </View>
                <View style={styles.subNameContainer}>
                    <Text style={styles.subName}>Hyu</Text>
                </View>
              </View>

              <ScrollView style={styles.content}>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <View style={styles.contentRow}>
                        <CourseAttendedBox courses = '7'/>
                    </View>
                    <View style={styles.contentRow}>
                        <CourseCompletedBox courses = '5'/>
                    </View>
                </View>

                <View style={{display: 'flex', flexDirection: 'row'}}>
                <View style={styles.contentRow}>
                        <TextInputBox label = 'Last name' text = 'Nguyen'/>
                    </View>
                    <View style={styles.contentRow}>
                        <TextInputBox label = 'First name' text = 'Nhu Huynh'/>
                    </View>
                </View>

                <View style={{display: 'flex', flexDirection: 'row'}}>
                <View style={styles.contentRow}>
                        <TextInputBox label = 'Date of birth' text = '12/12/2003'/>
                    </View>
                    <View style={styles.contentRow}>
                        <TextInputBox label = 'Job' text = 'Student'/>
                    </View>
                </View>

                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <TextInputBox label = 'Email' text = 'hyunn@gmail.com'/>
                </View>

                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <TextInputBox label = 'Phone' text = '012345678'/>
                </View>
                <View style={{height: scale(100, 'h')}}/>
              </ScrollView>



            </View>
        </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'black',
        height: '100%',
        display: 'flex',
    },
    bgContainer: {
        flex: 0.25,
    },
    background: {
        height: '120%',
    },
    contentContainer: {
        flex: 0.75,
        backgroundColor: CUSTOM_COLORS.white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        display: 'flex'   
    },
    avtContainer: {
        flex: 0.2,
    },
    avtFrame: {
        backgroundColor: CUSTOM_COLORS.white,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: scale(163, 'w'),
        height: scale(163, 'w'),
        borderRadius: scale(163/2, 'w'),
        top: -scale(163/2, 'w'),
        overflow: 'hidden',
    },
    avt: {
        width: scale(163-5, 'w'),
        height: scale(163-5, 'w'),
        borderRadius: scale((163-5)/2, 'w'),
    },
    nameContainer: {
        flex: 0.2,
        display: 'flex',
    },
    nameFrame: {
        flex: 0.7,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontSize: scale(40, 'w'),
        color: CUSTOM_COLORS.black,
        alignSelf: 'center',
    },
    icEdit: {
        marginLeft: scale(5, 'w'),
    },
    subNameContainer: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subName: {
        fontSize: scale(20, 'w'),
        color: CUSTOM_COLORS.black,
        fontWeight: 'light',
        alignSelf: 'center',
    },
    content: {
        //backgroundColor: 'pink',
        flex: 9.25,
        padding: scale(20, 'w')
    },
    contentRow: {
        flex: 0.5, 
        alignItems: 'center',
        justifyContent: 'center',
    },
    whiteCircle: {
        height: scale(42, 'w'),
        width: scale(42, 'w'),
        borderRadius: scale(42/2, 'w'),
        backgroundColor: CUSTOM_COLORS.white,
        position: 'absolute',
        right: scale(20, 'w'),
        //top: scale(20, 'w'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    screenTitleContainer: {
        backgroundColor: CUSTOM_COLORS.white,
        alignSelf: 'center',
        position: 'absolute',
        //top: scale(32.5, 'w'),
        height: scale(25, 'w'),
        width: scale(130, 'w'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scale(50, 'w'),
    },
    screenTitle: {
        fontSize: scale(13, 'w'),
        color: CUSTOM_COLORS.stateBlue,
        fontWeight: "bold",
    },
})