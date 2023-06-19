import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TextBox,
  Button,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {Component, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import scale from '../src/constants/responsive';
import {assets} from '../react-native.config';
import {IMG_BG1, IMG_CPP, IMG_TODOBG1} from '../src/assets/img';
import BackButton from '../src/components/backButton';
import ListItemCustom from '../src/components/ListItemCustom';
import CUSTOM_FONTS from '../src/constants/fonts';
import CUSTOM_SIZES from '../src/constants/size';
import CUSTOM_COLORS from '../src/constants/colors';
import DropDownPicker from 'react-native-dropdown-picker';
import {SpeedDial} from '@rneui/themed';
import LessonBox from '../src/components/lessonBox';
import LessonBoxAdd from '../src/components/LessonBoxAdd';
import {useNavigation} from '@react-navigation/native';
import BtnTick from '../src/components/BtnTick';
import {IC_RightArrow} from '../src/assets/iconsvg';
import LessonBox2 from '../src/components/LessonBox2';
import BtnDelete from '../src/components/BtnDelete';

var lesson = [
  {
    id: '1',
    title: 'C++ for Beginners 2023',
    time: '30m20s',
  },
  {
    id: '2',
    title: 'C# for Beginners 2023',
    time: '30m20s',
  },
  {
    id: '3',
    title: 'Python for Beginners 2023',
    time: '30m20s',
  },
  {
    id: '4',
    title: 'JavaScript for Beginners 2023',
    time: '30m20s',
  },
  {
    id: '5',
    title: 'React Native for Beginners 2023',
    time: '30m20s',
  },
];

export default class AddChapterScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={styles.vwImg}
          source={IMG_BG1}
          resizeMode="cover">
          <View style={styles.vwTitle}>
            <BackButton onPress={() => this.props.navigation.goBack()} />
            <Text style={styles.txtHeader}>Add course - Chapter</Text>
          </View>
        </ImageBackground>
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.txtTiltle}>Title</Text>
            <TextInput multiline style={styles.txtInput1} />
            <Text style={styles.txtTiltle}>Lesson</Text>
            <TouchableOpacity
              style={styles.conAddLesson}
              onPress={() => this.props.navigation.navigate('AddLessonScreen')}>
              <Text style={styles.txtInput}>Add Lesson</Text>
              <View style={styles.btnArrow}>
                <IC_RightArrow style={{alignSelf: 'center'}} />
              </View>
            </TouchableOpacity>
            <View
              style={{
                width: scale(320, 'w'),
                alignSelf: 'center',
                marginBottom: scale(15, 'h'),
                flexDirection: 'row',
              }}>
              <FlatList
                scrollEnabled={false}
                numColumns={1}
                data={lesson}
                renderItem={({item, index}) => {
                  return <LessonBox2 title={item.title} time={item.time} />;
                }}
              />
              <FlatList
                style={{marginTop: scale(10, 'h'), marginLeft: scale(5, 'h')}}
                scrollEnabled={false}
                numColumns={1}
                data={lesson}
                renderItem={({item, index}) => {
                  return <BtnDelete />;
                }}
              />
            </View>
          </ScrollView>
          <BtnTick />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  header: {
    flex: 1,
    backgroundColor: 'orange',
    borderBottomLeftRadius: scale(15, 'w'),
    borderBottomRightRadius: scale(15, 'w'),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  content: {
    flex: 5,
    //backgroundColor: 'pink',
  },
  flLesson: {
    marginVertical: scale(15, 'h'),
    //backgroundColor: 'red',
    alignItems: 'center',
  },
  vwImg: {
    flex: 1.3,
    //height: '20%',
    justifyContent: 'center',
  },
  vwTitle: {
    height: '50%',
    width: '85%',
    borderColor: 'white',
    backgroundColor: 'rgba(94, 96, 206, 0.5)',
    alignSelf: 'center',
    borderRadius: scale(15, 'w'),
    borderWidth: scale(0.2, 'w'),
    flexDirection: 'row',
    //justifyContent: 'center',
    alignContent: 'center',
  },
  txtHeader: {
    fontFamily: CUSTOM_FONTS.medium,
    fontSize: CUSTOM_SIZES.large,
    color: 'white',
    alignSelf: 'center',
    marginLeft: scale(15, 'w'),
  },
  txtTiltle: {
    fontSize: CUSTOM_SIZES.large,
    fontFamily: CUSTOM_FONTS.medium,
    color: CUSTOM_COLORS.usBlue,
    marginLeft: scale(30, 'w'),
    marginTop: scale(50, 'h'),
    marginBottom: scale(10, 'h'),
  },
  txtInput: {
    //numberOfLines: 2,
    color: CUSTOM_COLORS.usBlue,
    fontSize: CUSTOM_SIZES.large,
    padding: scale(15, 'w'),
  },
  txtInput1: {
    height: scale(85, 'h'),
    width: scale(320, 'w'),
    borderColor: CUSTOM_COLORS.usBlue,
    borderWidth: scale(0.75, 'w'),
    borderRadius: scale(15, 'w'),
    alignSelf: 'center',
    justifyContent: 'flex-start',
    //numberOfLines: 2,
    textAlignVertical: 'top',
    color: CUSTOM_COLORS.usBlue,
    fontSize: CUSTOM_SIZES.large,
    padding: scale(15, 'w'),
  },

  conAddLesson: {
    height: scale(60, 'h'),
    width: scale(320, 'w'),
    borderColor: CUSTOM_COLORS.usBlue,
    borderWidth: scale(0.75, 'w'),
    borderRadius: scale(15, 'w'),
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  btnArrow: {
    height: scale(36, 'h'),
    width: scale(36, 'h'),
    borderRadius: scale(36 / 2, 'h'),
    backgroundColor: CUSTOM_COLORS.usBlue,
    alignSelf: 'center',
    marginRight: scale(15, 'w'),
    justifyContent: 'center',
  },
});
