import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import {IC_VIEW_MORE} from '../src/assets/icons';
import {IMG_DECORHOMESCREEN} from '../src/assets/img';
import CUSTOM_COLORS from '../src/constants/colors';
import scale from '../src/constants/responsive';
import CustomButton from '../src/components/button';
import TextBox from '../src/components/textBox';
import BottomTab from '../src/components/bottomTab';
import CourseItem from '../src/components/courseItem';
import SearchBar from '../src/components/searchBar';
import { IC_Notification, IC_NotificationBing } from '../src/assets/iconsvg';
import {firebase} from '../configs/FirebaseConfig'
import { ListItem } from '@rneui/base';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import CourseDetailScreen from './CourseDetailScreen';
import CourseCompletedBox from '../src/components/courseCompletedBox';

var titles = ['Python', 'SQL', 'Java', 'Ruby', 'Go', 'C#', 'C++'];

// const navigation = useNavigation();

const renderTitles = (data, containerStyle, layoutStyle, textStyle) => {
  return (
    <FlatList
      horizontal
      style={styles.titleList}
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={item => item.toString()}
      renderItem={({item}) => (
        <CustomButton
          textButton={item}
          containerStyle={containerStyle}
          layoutStyle={layoutStyle}
          textStyle={textStyle}
        />
      )}
    />
  );
};



const HomeScreen = () => {

  const [name, setName] = useState('')
  const [myCourse, setMyCourse] = useState([]);
  const [popularCourse, setPopularCourse] = useState([]);
  const [newCourse, setNewCourse] = useState([]);
  const [favoriteCourse, setFavoriteCourse] = useState([]);


  const renderCourses = (data, category) => {
    const navigation = useNavigation();
    return (
      <View>
        <View style={styles.titlePartCourses}>
          <Text style={styles.categoryName}>{category}</Text>
          <TouchableOpacity style={styles.loadAllPart}
          onPress = {() => category === 'MY COURSES' ? navigation.navigate('CourseStack', {screen : 'Course'}) : 
          category === 'POPULAR' ? null : null}>
            <Text style={styles.loadAll}>View All </Text>
            <Image source={IC_VIEW_MORE} />
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.coursesList}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <CourseItem
              key = {item.key}
              language={item.programLanguage}
              title={item.title}
              author={item.name}
              rating={item.rate}
              view={item.numofAttendants}
              style={{marginRight: scale(20, 'w')}}
              onPress = {() => navigation.navigate('CourseStack', {screen : 'CourseDetail', params: {item: item}})}
            />
          )}
        />
      </View>
    );
  };
  
  async function joinedMyCourse(curEmail) {
    const courseRef = firebase.firestore().collection('courses');
    const courseSnapshot = await courseRef.get();
    const courseData = courseSnapshot.docs.map(doc => ({id: doc.id , ...doc.data()}));
  
    const authorRef = firebase.firestore().collection('users');
    const authorSnapshot = await authorRef.get();
    const authorData = authorSnapshot.docs.map(doc => doc.data());
  
    const studyRef = firebase.firestore().collection('study');
    const studySnapshot = await studyRef.get();
    const studyData = studySnapshot.docs.map(doc => ({id: doc.id , ...doc.data()}));
  
    const joinedData = studyData
    .filter(firstItem => firstItem.student === curEmail)
    .map(firstItem => {
      const  secondItem = courseData.find(item => item.author === firstItem.courseAuthor && item.title === firstItem.courseTitle);
  
      const thirdItem = authorData.find(item => item.email === secondItem.author)
  
      return {...firstItem, ...secondItem, ...thirdItem};
    })
  
    return joinedData;
  }
  
  
  async function joinedCourse() {
    const courseRef = firebase.firestore().collection('courses');
    const courseSnapshot = await courseRef.get();
    const courseData = courseSnapshot.docs.map(doc => ({id: doc.id , ...doc.data()}));
  
    const authorRef = firebase.firestore().collection('users');
    const authorSnapshot = await authorRef.get();
    const authorData = authorSnapshot.docs.map(doc => doc.data());
  
    const studyRef = firebase.firestore().collection('study');
    const studySnapshot = await studyRef.get();
    const studyData = studySnapshot.docs.map(doc => ({id: doc.id , ...doc.data()}));
  
    const joinedData = studyData
    .map(firstItem => {
      const  secondItem = courseData.find(item => item.author === firstItem.courseAuthor && item.title === firstItem.courseTitle);
  
      const thirdItem = authorData.find(item => item.email === secondItem.author)
  
      return {...firstItem, ...secondItem, ...thirdItem};
    })
  
    return joinedData;
  }

  useEffect(() => {
    firebase.firestore().collection('users')
    .doc(firebase.auth().currentUser.uid).get()
    .then((snapshot) => {
      if(snapshot.exists)
      {
        setName(snapshot.data())
      }
      else {
        console.log('User does not exist')
      }
    })
  }, [])

  // useEffect(() => {
  //   const unsubcribe = firebase.firestore()
  //   .collection('courses')
  //   .onSnapshot(querySnapshot => {
  //     const myCourse = querySnapshot.docs.map(doc => doc.data());
  //     setMyCourse(myCourse);
  //   });
    
  //   return () => unsubcribe();
  // }, []);

  useEffect(() => {
    async function getData() {
      const myCourse = (await joinedMyCourse(name.email)).slice(0, 5);
      setMyCourse(myCourse);
    }

    getData();
  }, [name.email]);

  useEffect(() => {
    async function getData() {
      const popularCourse = (await joinedCourse()).sort((a, b) => a.numofAttendants - b.numofAttendants).slice(0, 5);
      setPopularCourse(popularCourse);
    }

    getData();
  }, [name.email]);

  useEffect(() => {
    async function getData() {
      const newCourse = (await joinedCourse()).sort((a, b) => a.openDate - b.openDate).slice(0,5);
      setNewCourse(newCourse);
    }

    getData();
  }, []);

  // useEffect(() => {
  //   async function getData() {
  //     const favoriteCourse = (await joinedMyCourse(name.email)).sort((a, b) => a.openDate - b.openDate);
  //     setNewCourse(newCourse);
  //   }

  //   getData();
  // });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.introPart}>
        <View style={styles.introText}>
          <Text style={styles.helloUser}>Hi, {name.name}</Text>
          <Text style={styles.slogan}>
            Choose the course that's right for you
          </Text>
        </View>
        <TouchableOpacity>
          <IC_NotificationBing
              style={styles.icNotification}
              fill={CUSTOM_COLORS.primary}
            />
        </TouchableOpacity>
      </View>

      <View style={styles.searchPart}>
        <SearchBar />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={IMG_DECORHOMESCREEN}
          resizeMode="cover"
          style={styles.decorImage}
        />

        {renderTitles(
          titles,
          styles.containerStyle,
          styles.layoutStyle,
          styles.textStyle,
        )}

        {renderCourses(myCourse, 'MY COURSES')}
        {renderCourses(popularCourse, 'POPULAR')}
        {renderCourses(newCourse, 'NEW')}
        {/* {renderCourses(courses, 'FAVORITE')} */}

        <View style={styles.footerContent}>
          <Text style={styles.cht}>CHT</Text>
          <Text style={styles.explainCHT}>
            Courses - Homework - Technical
          </Text>
        </View>

        <View style={styles.space}>
          <View style={[styles.space]}></View>
         </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    marginTop: scale(20, 'h'),
    marginLeft: scale(20, 'w'),
  },
  introPart: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: scale(5, 'h'),
    justifyContent: 'space-between',
  },
  helloUser: {
    fontWeight: '700',
    fontSize: scale(20, 'w'),
    color: CUSTOM_COLORS.black,
  },
  slogan: {
    fontSize: scale(13, 'w'),
    color: CUSTOM_COLORS.black,
  },
  icNotification: {
    marginRight: scale(15, 'w'),
  },
  searchPart: {
    marginTop: scale(20, 'h'),
  },
  decorImage: {
    width: scale(325, 'w'),
    marginTop: scale(20, 'h'),
    borderRadius: 20,
  },
  titleList: {
    marginTop: scale('40', 'h'),
  },
  containerStyle: {
    height: scale(40, 'h'),
    width: scale(100, 'w'),
    marginRight: scale(15, 'w'),
    borderRadius: scale(15, 'w'),
  },
  layoutStyle: {
    height: scale(40, 'h'),
    width: scale(100, 'w'),
    borderRadius: scale(15, 'w'),
  },
  textStyle: {
    fontSize: scale(14, 'w'),
    fontWeight: '400',
  },
  titlePartCourses: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: scale(25, 'h'),
    marginBottom: scale(5, 'h'),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: scale(25, 'w'),
    fontWeight: '700',
    color: CUSTOM_COLORS.black,
  },
  loadAllPart: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: scale(12, 'w'),
    alignItems: 'center',
    color: CUSTOM_COLORS.black,
  },
  loadAll: {
    marginRight: scale(5, 'w'),
    color: CUSTOM_COLORS.gray,
    opacity: 0.6,
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cht: {
    color: CUSTOM_COLORS.stateBlue,
    fontSize: scale(30, 'w'),
    fontWeight: '900',
  },
  explainCHT: {
    color: CUSTOM_COLORS.stateBlue,
    fontSize: scale(12, 'w'),
    fontStyle: 'italic',
  },
  space: {
    height: scale(200, 'h'),
    // backgroundColor: 'pink',
  },
});

