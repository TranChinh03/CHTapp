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
import React, {Component} from 'react';
import {
  IMG_AUTHBACKGROUND,
  IMG_AVT,
  IMG_COURSEBACKGROUND,
  IMG_TODOBG,
} from '../src/assets/img';
import CUSTOM_COLORS from '../src/constants/colors';
import scale from '../src/constants/responsive';
import CustomButton from '../src/components/button';
import TextBox from '../src/components/textBox';
import BottomTab from '../src/components/bottomTab';
import CourseItem from '../src/components/courseItem';
import {`[Calendar](#calendar), [CalendarList](#calendarlist), [Agenda](#agenda)`} from 'react-native-calendars';

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

var titles = ['Python', 'SQL', 'Java', 'Ruby', 'Go', 'C#', 'C++'];

const renderDate = (data, containerStyle, layoutStyle, textStyle) => {
  return (
    <FlatList
      horizontal
      style={styles.dateList}
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <View></View>}
    />
  );
};

export class TodoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'Blank',
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={IMG_COURSEBACKGROUND}
          resizeMode="cover">
          <View
            style={{
              flex: 2,
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <View style={styles.containerGreeting}>
              <View style={styles.containerAvt}>
                <Image style={styles.avt} source={IMG_AVT} />
              </View>
              <Text style={styles.textGreeting}>Welcome, Nhu Huynh!</Text>
            </View>
          </View>
          <View style={{flex: 10, backgroundColor: 'transparent'}}>
            <View style={styles.containerCalendar}>
              <Calendar></Calendar>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'red',
  },
  image: {
    height: '100%',
  },
  containerGreeting: {
    backgroundColor: 'rgba(94, 96, 206, 0.5)',
    height: '50%',
    width: '80%',
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 0.3,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  textGreeting: {
    color: 'white',
    alignSelf: 'center',
    marginLeft: scale(10, 'w'),
    fontSize: scale(18, 'w'),
  },
  containerAvt: {
    height: scale(40, 'w'),
    width: scale(40, 'w'),
    borderRadius: scale(40 / 2, 'w'),
    backgroundColor: 'red',
    alignSelf: 'center',
    marginLeft: scale(10, 'w'),
  },
  avt: {
    height: scale(40, 'w'),
    width: scale(40, 'w'),
    borderRadius: scale(40 / 2, 'w'),
  },
  containerCalendar: {
    width: '90%',
    height: '40%',
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  dateList: {
    alignSelf: 'center',
  },
});
