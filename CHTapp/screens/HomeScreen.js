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
import React, {Component} from 'react';
import {IC_NotificationBing} from '../src/assets/iconsvg';
import {IC_VIEW_MORE} from '../src/assets/icons';
import {IMG_DECORHOMESCREEN} from '../src/assets/img';
import CUSTOM_COLORS from '../src/constants/colors';
import scale from '../src/constants/responsive';
import CustomButton from '../src/components/button';
import TextBox from '../src/components/textBox';
import BottomTab from '../src/components/bottomTab';
import CourseItem from '../src/components/courseItem';
import SearchBar from '../src/components/searchBar';

var titles = ['Python', 'SQL', 'Java', 'Ruby', 'Go', 'C#', 'C++'];

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

const renderTitles = (data, containerStyle, layoutStyle, textStyle) => {
  return (
    <FlatList
      horizontal
      style={styles.titleList}
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(item, index) => index.toString()}
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

const renderCourses = (data, category) => {
  return (
    <View>
      <View style={styles.titlePartCourses}>
        <Text style={styles.categoryName}>{category}</Text>
        <TouchableOpacity style={styles.loadAllPart}>
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
            language={item.language}
            title={item.title}
            author={item.author}
            rating={item.rating}
            view={item.view}
            style={{marginRight: scale(20, 'w')}}
          />
        )}
      />
    </View>
  );
};

export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'InProgress',
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.introPart}>
          <View style={styles.introText}>
            <Text style={styles.helloUser}>Hi, Nhu Huynh!</Text>
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

          {renderCourses(courses, 'MY COURSES')}
          {renderCourses(courses, 'POPULAR')}
          {renderCourses(courses, 'NEW')}
          {renderCourses(courses, 'FAVORITE')}

          <View style={styles.footerContent}>
            <Text style={styles.cht}>CHT</Text>
            <Text style={styles.explainCHT}>
              Courses - Homework - Technical
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default HomeScreen;

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
});
