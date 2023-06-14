import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {Component} from 'react';
import {IMG_AUTHBACKGROUND, IMG_COURSEBACKGROUND} from '../src/assets/img';
import CUSTOM_COLORS from '../src/constants/colors';
import scale from '../src/constants/responsive';
import CustomButton from '../src/components/button';
import TextBox from '../src/components/textBox';
import BottomTab from '../src/components/bottomTab';
import CourseItem from '../src/components/courseItem';

var courses = [
  {
    id: '1',
    language: 'C++',
    title: 'C++ for Beginners 2023',
    author: 'Hau Nguyen',
    rating: '5',
    view: '320',
  },
  {
    id: '2',
    language: 'JavaScript',
    title: 'JavaScript for Beginners 2023',
    author: 'Hau Nguyen',
    rating: '5',
    view: '320',
  },
  {
    id: '3',
    language: 'C++',
    title: 'C++ for Beginners 2023',
    author: 'Hau Nguyen',
    rating: '5',
    view: '320',
  },
  {
    id: '4',
    language: 'JavaScript',
    title: 'JavaScript for Beginners 2023',
    author: 'Hau Nguyen',
    rating: '5',
    view: '320',
  },
  {
    id: '5',
    language: 'JavaScript',
    title: 'JavaScript for Beginners 2023',
    author: 'Hau Nguyen',
    rating: '5',
    view: '320',
  },
  {
    id: '6',
    language: 'C++',
    title: 'C++ for Beginners 2023',
    author: 'Hau Nguyen',
    rating: '5',
    view: '320',
  },
  {
    id: '7',
    language: 'C++',
    title: 'C++ for Beginners 2023',
    author: 'Hau Nguyen',
    rating: '5',
    view: '320',
  },
  {
    id: '8',
    language: 'C++',
    title: 'C++ for Beginners 2023',
    author: 'Hau Nguyen',
    rating: '5',
    view: '320',
  },
];

export class CourseScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'InProgress',
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={IMG_COURSEBACKGROUND}
          resizeMode="cover">
          <View style={styles.container1}>
            <Text style={styles.text}>Hi, Nhu Huynh!</Text>
            <Text style={styles.subText}>
              Set your target and keep trying until you reach it
            </Text>
          </View>
          <View style={styles.container2}>
            <View style={styles.navigateButton}>
              <TouchableOpacity
                onPress={() => this.setState({currentPage: 'InProgress'})}
                style={
                  this.state.currentPage === 'InProgress'
                    ? styles.selectedButton1
                    : styles.button1
                }>
                <Text
                  style={
                    this.state.currentPage === 'InProgress'
                      ? styles.selectedButtonText1
                      : styles.buttonText1
                  }>
                  In Progress
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({currentPage: 'Completed'})}
                style={
                  this.state.currentPage === 'Completed'
                    ? styles.selectedButton1
                    : styles.button1
                }>
                <Text
                  style={
                    this.state.currentPage === 'Completed'
                      ? styles.selectedButtonText1
                      : styles.buttonText1
                  }>
                  Completed
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({currentPage: 'Favorite'})}
                style={
                  this.state.currentPage === 'Favorite'
                    ? styles.selectedButton1
                    : styles.button1
                }>
                <Text
                  style={
                    this.state.currentPage === 'Favorite'
                      ? styles.selectedButtonText1
                      : styles.buttonText1
                  }>
                  Favorite
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.courseContainer}>
              <FlatList
                numColumns={2}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                data={courses}
                renderItem={({item, index}) => {
                  return (
                    <CourseItem
                      onPress={() =>
                        this.props.navigation.navigate('CourseDetail')
                      }
                      language={item.language}
                      title={item.title}
                      author={item.author}
                      rating={item.rating}
                      view={item.view}
                    />
                  );
                }}
                ItemSeparatorComponent={() => (
                  <View style={{height: scale(20, 'h')}} />
                )}
                showsVerticalScrollIndicator={false}></FlatList>
            </View>
          </View>
          {/* <View style={styles.container3}>
                <BottomTab/>
            </View> */}
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default CourseScreen;

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
});
