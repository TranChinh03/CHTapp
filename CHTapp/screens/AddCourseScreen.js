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
import {IC_Camera} from '../src/assets/iconsvg';
import DropDownPicker from 'react-native-dropdown-picker';
import {SpeedDial} from '@rneui/themed';
import LessonBox from '../src/components/lessonBox';
import LessonBoxAdd from '../src/components/LessonBoxAdd';
import {useNavigation} from '@react-navigation/native';

var lesson = [
  {
    id: '1',
    title: 'C++ for Beginners 2023',
    time: '10 AM - 11AM',
  },
  {
    id: '2',
    title: 'C# for Beginners 2023',
    time: '20 PM - 21 PM',
  },
  {
    id: '3',
    title: 'Python for Beginners 2023',
    time: '20 PM - 21 PM',
  },
  {
    id: '4',
    title: 'JavaScript for Beginners 2023',
    time: '20 PM - 21 PM',
  },
  {
    id: '5',
    title: 'React Native for Beginners 2023',
    time: '20 PM - 21 PM',
  },
];

export default function AddCourseScreen() {
  const navigation = useNavigation();
  const [shouldShow, setShouldShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(['vietnamese', 'english']);
  const [items, setItems] = useState([
    {label: 'English', value: 'english'},
    {label: 'VietNamese', value: 'vietnamese'},
  ]);
  const [openSpeedDial, setOpenSpeedDial] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.vwImg} source={IMG_BG1} resizeMode="cover">
        <View style={styles.vwTitle}>
          <BackButton onPress={() => navigation.goBack()} />
          <Text style={styles.txtHeader}>Add course</Text>
        </View>
      </ImageBackground>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.txtTiltle}>Thumbnail</Text>
          <View style={styles.vwThumnail}>
            <TouchableOpacity style={styles.btnThumnail}>
              <IC_Camera style={styles.icCamera} />
              <Text style={styles.txtThumnail}>Upload from your device</Text>
            </TouchableOpacity>
            <View style={styles.currentThumnail}>
              {/* <Image
                    style={styles.imgThumnail}
                    source={IMG_CPP}
                    resizeMode="cover"
                  /> */}
            </View>
          </View>
          <Text style={styles.txtTiltle}>Title</Text>
          <TextInput multiline style={styles.txtInput}></TextInput>
          <Text style={styles.txtTiltle}>Description</Text>
          <TextInput multiline style={styles.txtInput2}></TextInput>
          <Text style={styles.txtTiltle}>Language</Text>
          <View style={styles.conDropDown}>
            <DropDownPicker
              style={styles.dropDown}
              textStyle={styles.txtDropDown}
              dropDownContainerStyle={styles.condropdown2}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              multiple={true}
              mode="BADGE"
              badgeDotColors={['#e76f51', '#00b4d8']}
            />
          </View>
          <Text style={styles.txtTiltle}>Lesson</Text>
          {/* <View style={styles.conSpeedDial}>
            <SpeedDial
              DropDownPicker="left"
              flexDirection="right"
              color={CUSTOM_COLORS.usBlue}
              style={styles.btnSd}
              isOpen={openSpeedDial}
              icon={{name: 'edit', color: '#fff'}}
              openIcon={{name: 'close', color: '#fff'}}
              onOpen={() => setOpenSpeedDial(!openSpeedDial)}
              onClose={() => setOpenSpeedDial(!openSpeedDial)}>
              <SpeedDial.Action
                color={CUSTOM_COLORS.usBlue}
                icon={{name: 'add', color: '#fff'}}
                title="Chapter"

                //onPress={() => console.log('Add Something')}
              />
              <SpeedDial.Action
                color={CUSTOM_COLORS.usBlue}
                icon={{name: 'delete', color: '#fff'}}
                title="Lesson"
                //onPress={() => console.log('Delete Something')}
              />
            </SpeedDial>
          </View> */}
          <View style={styles.conSpeedDial}>
            <TouchableOpacity
              style={styles.btnSD}
              onPress={() => setShouldShow(!shouldShow)}>
              <Text style={styles.txtSD}>+</Text>
            </TouchableOpacity>
            {shouldShow ? (
              <View
                style={{
                  height: '100%',
                  justifyContent: 'space-between',
                  backfaceVisibility: 'hidden',
                }}>
                <TouchableOpacity
                  style={styles.spAction}
                  onPress={() => navigation.navigate('AddChapterScreen')}>
                  <Text style={styles.txtSDAction}>Chapter</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.spAction}
                  onPress={() => navigation.navigate('AddLessonScreen')}>
                  <Text style={styles.txtSDAction}>Lesson</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          <View style={styles.flLesson}>
            <FlatList
              scrollEnabled={false}
              numColumns={1}
              data={lesson}
              renderItem={({item, index}) => {
                return (
                  <LessonBoxAdd
                  // type={true}
                  // title={item.title}
                  // time={item.time}
                  />
                );
              }}></FlatList>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
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
  txtInput2: {
    height: scale(115, 'h'),
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
  btnThumnail: {
    width: scale(150, 'w'),
    backgroundColor: 'rgba(83, 144, 217, 0.2)',
    borderRadius: scale(15, 'w'),
    justifyContent: 'center',
  },
  vwThumnail: {
    height: scale(100, 'h'),
    width: '90%',
    alignSelf: 'center',
    //backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  currentThumnail: {
    width: scale(150, 'w'),
    height: scale(100, 'h'),
    borderColor: 'rgba(83, 144, 217, 0.2)',
    borderWidth: 1,
    borderRadius: scale(15, 'w'),
  },
  imgThumnail: {
    width: scale(150, 'w'),
    height: scale(100, 'h'),
    borderRadius: scale(15, 'w'),
  },
  icCamera: {
    alignSelf: 'center',
  },
  txtThumnail: {
    color: CUSTOM_COLORS.usBlue,
    fontSize: CUSTOM_SIZES.xSmall,
    marginTop: scale(5, 'h'),
    alignSelf: 'center',
  },
  conDropDown: {
    height: scale(45, 'h'),
    width: scale(320, 'w'),
    //backgroundColor: 'yellow',
    alignSelf: 'center',
    //marginLeft: scale(15, 'w'),
  },
  dropDown: {
    borderColor: CUSTOM_COLORS.usBlue,
    //color: CUSTOM_COLORS.usBlue,
    //width: '80%',
    borderRadius: scale(15, 'w'),
  },
  txtDropDown: {
    color: CUSTOM_COLORS.usBlue,
    fontSize: CUSTOM_SIZES.medium,
    fontFamily: CUSTOM_FONTS.regular,
    backgroundColor: 'transparent',
  },
  condropdown2: {
    borderColor: CUSTOM_COLORS.usBlue,
    fontSize: CUSTOM_SIZES.medium,
    fontFamily: CUSTOM_FONTS.regular,
  },
  btnSd: {
    color: CUSTOM_COLORS.usBlue,
    alignSelf: 'flex-start',
    marginLeft: 5,
  },
  conSpeedDial: {
    height: scale(100, 'h'),
    width: scale(320, 'h'),
    //backgroundColor: 'yellow',
    alignSelf: 'center',
    //justifyContent: 'center',
    flexDirection: 'row',
  },
  btnSD: {
    height: scale(65, 'h'),
    width: scale(65, 'w'),
    borderRadius: scale(65 / 2, 'w'),
    backgroundColor: CUSTOM_COLORS.usBlue,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  txtSD: {
    color: 'white',
    fontSize: CUSTOM_SIZES.xxLarge,
  },
  txtSDAction: {
    color: 'white',
    fontSize: CUSTOM_SIZES.large,
    alignSelf: 'center',
  },
  spAction: {
    height: scale(45, 'h'),
    width: scale(150, 'h'),
    borderRadius: scale(45 / 3, 'h'),
    marginLeft: scale(15, 'w'),
    backgroundColor: CUSTOM_COLORS.PictionBlue,
    justifyContent: 'center',
  },
});
