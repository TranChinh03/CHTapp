import { Text, View, StyleSheet, SafeAreaView, ImageBackground, TextInput, TouchableOpacity, FlatList, ScrollView, Image} from 'react-native'
import React, { Component } from 'react'
import { IMG_AUTHBACKGROUND, IMG_COURSEBACKGROUND, IMG_CPP, IMG_CPPBACKGROUND } from '../src/assets/img'
import CUSTOM_COLORS from '../src/constants/colors'
import scale from '../src/constants/responsive'
import CustomButton from '../src/components/button'
import TextBox from '../src/components/textBox'
import BottomTab from '../src/components/bottomTab'
import CourseItem from '../src/components/courseItem'
import StarRating from 'react-native-star-rating-widget';
import { IC_GLOBAL, IC_INFORMATION, IC_NEXT } from '../src/assets/icons'
import LessonBox from '../src/components/lessonBox'
import { IMG_LECTURERAVA } from '../src/assets/img'
import Evaluation from '../src/components/evaluation'
import BackButton from '../src/components/backButton'
import { IC_LeftArrow } from '../src/assets/iconsvg'

export class CourseDetailScreen extends Component {
  constructor(props) {
    super(props)
    this.state ={
      currentPage: 'InProgress',
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
            <View style={styles.container1}>
                <ImageBackground style={styles.image} source = {IMG_CPPBACKGROUND} resizeMode = 'stretch'>
                </ImageBackground>
            </View>
            <View style={styles.container2}>
                <Text style={styles.title}>C++ for Beginners 2023</Text>
                <Text style={styles.subTitle}>The complete C++ Programing Course for Beginners, this course teaches you the fundamentals of a programing language. After completed, you will be able to move from the basics to more advanced course.</Text>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.ratingNum}>4.6</Text>
                    <View style={styles.rating}>
                        <StarRating
                        onChange={() => {}}
                        maxStars={5}
                        starSize={15}
                        rating={4.6}
                        starStyle={styles.star}
                        />
                    </View>
                    <Text style={styles.viewerNum}>362 học viên</Text>
                </View>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.normalText}>Create by </Text>
                    <Text style={[styles.normalText, styles.authorName]}>Hau Nguyen</Text>
                </View>
                <View style={styles.horizontalContainer}>
                    <View style={styles.iconContainer}>
                        <Image source={IC_INFORMATION} />
                    </View>
                    <Text style={[styles.normalText, {marginLeft: scale(7, 'w')}]}>Latest update 15/01/2023</Text>
                </View>
                <View style={styles.horizontalContainer}>
                    <View style={styles.iconContainer}>
                        <Image source={IC_GLOBAL} />
                    </View>
                    <Text style={[styles.normalText, {marginLeft: scale(7, 'w')}]}>English</Text>
                </View>
                <Text style={styles.categoryText}>Lessons</Text>
                <View style={styles.lessonContainer}>
                    <View style={styles.horizontalContainer}>
                        <Text style={[styles.normalText2, {fontWeight: '500'}]}>Chapter 1: </Text>
                        <Text style={styles.normalText2}>First C++ Program</Text>
                    </View>
                    <View>
                        <LessonBox/>
                        <LessonBox/>
                    </View>
                    <View style={styles.horizontalContainer}>
                        <Text style={[styles.normalText2, {fontWeight: '500'}]}>Chapter 2: </Text>
                        <Text style={styles.normalText2}>Variables and Data Types</Text>
                    </View>
                    <View>
                        <LessonBox/>
                        <LessonBox/>
                        <LessonBox/>
                        <LessonBox/>
                    </View>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.textButton}>See more</Text>
                    </TouchableOpacity>
                </View>
                <Text style={[styles.categoryText, {marginTop: scale(50, 'h')}]}>Lecturer</Text>
                <View style={[styles.horizontalContainer, {height:scale(80,'h')}]}>
                    <Image style={styles.avaImage} source={IMG_LECTURERAVA}/>
                    <View style = {styles.infoLecturer}>
                        <Text style={[styles.normalText, {fontWeight: '500'}]}>Hau Nguyen</Text>
                        <Text style={styles.infoText}>0857123456</Text>
                        <Text style={styles.infoText}>haunguyen@gmail.com</Text>
                    </View>
                    <View style = {styles.infoCourse}>
                        <Text style={styles.numCourse}>12</Text>
                        <Text style={[styles.infoText, {textAlign: 'center'}]}>Courses</Text>
                    </View>
                </View>
                <Text style={[styles.categoryText, {marginTop: scale(20, 'h')}]}>Reviews</Text>
                <Text style={[styles.categoryText, {marginTop: scale(-5, 'h'), color: CUSTOM_COLORS.yellow}]}>4.6</Text>
                <View>
                    <CusProgressBar percent = '56%' rating='5'/>
                    <CusProgressBar percent = '29%' rating='4'/>
                    <CusProgressBar percent = '10%' rating='3'/>
                    <CusProgressBar percent = '3%' rating='2'/>
                    <CusProgressBar percent = '3%' rating='1'/>
                </View>

                <View style={styles.evaluationContainer}>
                    <Evaluation name= 'Minh Chinh Tran' rating = '5' date = '01/04/2023' comment="Great!"/>
                    <Evaluation name= 'Xuan Thao Vo' rating = '5' date = '05/04/2023' comment="This course helps me a lot!"/>
                    <Evaluation name= 'Nhu Phi Vo' rating = '5' date = '05/04/2023' comment="I really like this course and Mr.Hau"/>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.textButton}>See more</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
        <TouchableOpacity style={styles.fixedButton}>
                <Text style={styles.start}>Start</Text>
                <Image style={styles.iconNext} source={IC_NEXT}/>
            </TouchableOpacity>
      </SafeAreaView>
    )
  }
}

export default CourseDetailScreen

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: CUSTOM_COLORS.white,
    },
    container1: {
        height: scale(254, 'h'),
        width: '100%'
    },

    container2: {
        height: '100%',
        marginHorizontal: scale(20, 'w'),
    },
    image: {
        flex:1,
    },
    title: {
        color: CUSTOM_COLORS.black,
        fontSize: scale(36, 'w'),
        fontWeight: '500',
    }, 
    subTitle: {
        color: CUSTOM_COLORS.black,
        fontSize: scale(13, 'w'),
    },
    horizontalContainer: {
        flexDirection: 'row',
        marginTop: scale(10,'h'),
        alignItems: 'center',
    },
    ratingNum: {
        fontSize: scale(16, 'w'),
        fontWeight: 'bold',
        color: CUSTOM_COLORS.black,
    },
    rating: {
        marginLeft: scale(10, 'w'),
    },
    star: {
        marginHorizontal: 0,
    },
    viewerNum:{
        fontSize: scale(10, 'w'),
        color: CUSTOM_COLORS.black,
        position: 'absolute',
        right: 0,
        alignSelf: 'center',
    },
    normalText: {
        color: CUSTOM_COLORS.black,
        fontSize: scale(13, 'w'),
    },
    authorName: {
        fontWeight: 'bold',
    },
    iconContainer: {
        height: scale(20, 'w'),
        width: scale(20, 'h'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryText: {
        fontSize: scale(24, 'w'),
        color: CUSTOM_COLORS.black,
        fontWeight: '500',
        marginTop: scale(10, 'h'),
    },
    normalText2 : {
        color: CUSTOM_COLORS.black,
        fontSize: scale(16, 'w'),
    },
    lessonContainer: {
        height: scale(580, 'h'),
    },

    buttonContainer: {
        width: scale(154, 'w'),
        height: scale(40, 'h'),
        marginTop: scale(30, 'h'),
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: CUSTOM_COLORS.FrenchViolet,
        borderRadius: scale(16,'w'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        color:CUSTOM_COLORS.FrenchViolet,
        fontSize: scale(16,'w'),
        fontWeight: '500',
    },
    avaImage: {
        borderWidth: 1,
        borderRadius: scale(50, 'w'),
        alignSelf: 'center',
        height: scale(60, 'w'),
        width: scale(60, 'w'),
        marginLeft: scale(10, 'w'),
    },
    infoLecturer: {
        width: scale(180 ,'w'),
        height: '100%',
        marginLeft: scale(10, 'w'),
        justifyContent: 'center',
        borderRightWidth: 2,
        borderRightColor: CUSTOM_COLORS.black,
    },
    infoText: {
        fontSize: scale(12, 'w'),
        fontWeight: '300',
        color: CUSTOM_COLORS.black,
    },
    infoCourse: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    numCourse: {
        fontSize: scale(20, 'w'),
        fontWeight: '600',
        color: CUSTOM_COLORS.black,
        textAlign: 'center',
    },
    evaluationContainer: {
        height: scale(500, 'h'),
    },
    fixedButton: {
        position: 'absolute',
        width: scale(295 , 'w'),
        height: scale(55, 'h'),
        backgroundColor: CUSTOM_COLORS.PictionBlue,
        borderRadius: scale(16, 'w'),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        bottom: scale(90, 'h'),
        flexDirection:'row',
        elevation: 7,
    },
    start: {
        fontSize: scale(16, 'w'),
        fontWeight: '500',
        color: CUSTOM_COLORS.white,
    },
    iconNext: {
        position: 'absolute',
        right: scale(20 ,'w'),
    },

})