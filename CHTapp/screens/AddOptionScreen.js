import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
  } from 'react-native';
  import React, {Component, useState, useEffect} from 'react';
  import {IMG_AUTHBACKGROUND, IMG_COURSEBACKGROUND} from '../src/assets/img';
  import CUSTOM_COLORS from '../src/constants/colors';
  import scale from '../src/constants/responsive';
  import CustomButton from '../src/components/button';
  import TextBox from '../src/components/textBox';
  import BottomTab from '../src/components/bottomTab';
  import CourseItem from '../src/components/courseItem';
  import {useNavigation} from '@react-navigation/native';
  import {firebase} from '../configs/FirebaseConfig';
  
  
  const AddOptionScreen = () => {
    const [currentPage, setCurrentPage] = useState('In Progress');
    const [inProgress, setInProgress] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const [name, setName] = useState('');
  
    const navigation = useNavigation();
  
    useEffect(() => {
        firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .get()
          .then(snapshot => {
            if (snapshot.exists) {
              setName(snapshot.data());
            } else {
              console.log('User does not exist');
            }
          });
      }, []);

  

    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={IMG_COURSEBACKGROUND}
          resizeMode="cover">
          <View style={styles.container1}>
            <Text style={styles.text}>Hi, {name.name}!</Text>
            <Text style={styles.subText}>
              Set your target and keep trying until you reach it
            </Text>
          </View>
          <View style={styles.container2}>
            <TouchableOpacity             
            onPress={() => navigation.navigate('AddCourse', {
                txtHeader: 'Add course',
              })}>
                <Text>Add Course</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('AddChapterScreen', {
                txtHeader: 'Add chapter',
              })}>
                <Text>Add Chapter</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('AddLessonScreen')}>
                <Text>Add Lesson</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.container3}>
              <BottomTab/>
          </View> */}
          {/* <TouchableOpacity
            style={styles.fixedButton}
            onPress={() =>
              navigation.navigate('AddCourse', {
                txtHeader: 'Add course',
              })
            }>
            <Text style={styles.start}>+</Text>
          </TouchableOpacity> */}
        </ImageBackground>
      </SafeAreaView>
    );
  };
  
  export default AddOptionScreen;
  
  const styles = StyleSheet.create({
    container: {
      height: '100%',
    },
    image: {
      flex: 1,
    },
    container1: {
      flex: 1,
    },
  
    container2: {
      flex: 4,
      backgroundColor: CUSTOM_COLORS.white,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    container3: {
      flex: 0.5,
      backgroundColor: CUSTOM_COLORS.white,
    },
    text: {
      color: CUSTOM_COLORS.white,
      fontSize: scale(20, 'w'),
      fontWeight: '500',
      marginTop: scale(44, 'h'),
      marginLeft: scale(18, 'w'),
    },
    subText: {
      color: CUSTOM_COLORS.white,
      fontSize: scale(14, 'w'),
      marginLeft: scale(18, 'w'),
    },
    navigateButton: {
      marginHorizontal: scale(18, 'w'),
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    button1: {
      height: scale(36, 'h'),
      width: scale(100, 'w'),
      backgroundColor: CUSTOM_COLORS.white,
      borderRadius: scale(10, 'w'),
      marginTop: scale(-22, 'h'),
      justifyContent: 'center',
    },
    buttonText1: {
      color: CUSTOM_COLORS.PictionBlue,
      alignSelf: 'center',
      fontSize: scale(13, 'w'),
      fontWeight: '500',
    },
    selectedButton1: {
      height: scale(36, 'h'),
      width: scale(100, 'w'),
      backgroundColor: CUSTOM_COLORS.PictionBlue,
      borderRadius: scale(10, 'w'),
      marginTop: scale(-6, 'h'),
      justifyContent: 'center',
      elevation: 10,
      shadowColor: CUSTOM_COLORS.DarkGray,
    },
    selectedButtonText1: {
      color: CUSTOM_COLORS.white,
      alignSelf: 'center',
      fontSize: scale(13, 'w'),
      fontWeight: '500',
    },
    courseContainer: {
      marginTop: scale(20, 'h'),
      flex: 1,
      marginHorizontal: scale(20, 'w'),
    },
    fixedButton: {
      position: 'absolute',
      width: scale(70, 'w'),
      height: scale(70, 'w'),
      borderRadius: scale(70 / 2, 'w'),
      backgroundColor: CUSTOM_COLORS.PictionBlue,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-end',
      bottom: scale(100, 'h'),
      right: scale(35, 'w'),
      flexDirection: 'row',
      elevation: 7,
    },
    start: {
      fontSize: scale(40, 'w'),
      fontWeight: '300',
      color: CUSTOM_COLORS.white,
    },
  });
  