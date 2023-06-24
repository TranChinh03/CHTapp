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
  Alert,
} from 'react-native';
import React, {Component, useState, useEffect} from 'react';
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
import BtnDelete from '../src/components/BtnDelete';
import BtnTick from '../src/components/BtnTick';
import {firebase} from '../configs/FirebaseConfig'
import ItemPdf from '../src/components/ItemPdf';
import DocumentPicker from 'react-native-document-picker';

var titles = [
  'Python.pdf',
  'SQL.pdf',
  'Java.pdf',
  'Ruby.pdf',
  'Go.pdf',
  'C#.pdf',
  'C++.pdf',
];

const AddLessonScreen = () => {
  const navigation = useNavigation();
  const [shouldShow, setShouldShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState('');
  const [chapter, setChapter] = useState([]);


  const [course, setCourse] = useState([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [myChapter, setMyChapter] = useState('');

  const [myCourse, setMyCourse] = useState('');

  const [name, setName] = useState('')

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

  useEffect(() => {
    const fetchData = async () => {
      // Check if name.email is defined
      if (name.email) {
        // Fetch data from Firestore and filter the results
        const querySnapshot = await firebase.firestore()
          .collection('courses')
          .where('author', '==', name.email)
          .get();
  
        // Update the state with the new data
        let index = 0;
        querySnapshot.forEach(documentSnapshot => {
          const fieldValue = documentSnapshot.get('title');
          setCourse(prevData => [
            ...prevData,
            {label: fieldValue, value: index.toString()},
          ]);
          index++;
        });
      }
    };
  
    fetchData();
  }, [name.email]);

  const chapterList = async (curCourse) => {
    if (curCourse) {
      // Fetch data from Firestore and filter the results
      const querySnapshot = await firebase.firestore()
        .collection('chapters')
        .where('courseAuthor', '==', name.email)
        .where('courseTitle', '==', curCourse)
        .get();

      // Update the state with the new data
      let index = 0;
      querySnapshot.forEach(documentSnapshot => {
        const fieldValue = documentSnapshot.get('title');
        setChapter(prevData => [
          ...prevData,
          {label: fieldValue, value: index.toString()},
        ]);
        index++;
      });
    }
  }

  const [fileName, setFileName] = useState(null)

  async function uploadFile() {
    try {
      // Select a file using the document picker
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      // setFileName (file.name)
  
      // Create a FormData object and append the file
      const data = new FormData();
      data.append('file', {
        uri: file.uri,
        type: file.type,
        name: file.name,
      });
  
      // Upload the file to your server using a POST request
      const response = await fetch('<URL>', {
        method: 'POST',
        body: data,
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        throw err;
      }
    }
  }

  const renderItem = ({item}) => {
    if(item.type ==='content1'){
      return  (
        <View>
          <Text style={styles.txtTiltle}>Title</Text>
          <TextInput multiline style={styles.txtInput} onChangeText={(myTitle) => setTitle(myTitle)}></TextInput>
        </View>
      )
    }
    else if(item.type === 'dropdown')
    {
      return (
        <View>
          <Text style={styles.txtTiltle}>Course</Text>
          <View style={styles.conDropDown}>
            <DropDownPicker
              style={styles.dropDown}
              textStyle={styles.txtDropDown}
              dropDownDirection="TOP"
              dropDownContainerStyle={styles.condropdown2}
              open={open1}
              value={value1}
              items={course}
              setOpen={setOpen1}
              setValue={setValue1}
              setItems={setCourse}
              multiple={false}
              mode="BADGE"
              badgeDotColors={['#e76f51', '#00b4d8']}
              onChangeValue={(value) => {
                setChapter([])
                // Find the selected item
                const selectedItem = course.find(item => item.value === value);
                // Set the myCourse state to the label of the selected item
                if (selectedItem) {
                  setMyCourse(selectedItem.label);
                  chapterList(selectedItem.label)
                }
              }}
            />
          </View>

          <Text style={styles.txtTiltle}>Chapter</Text>
          <View style={styles.conDropDown}>
            <DropDownPicker
              style={styles.dropDown}
              textStyle={styles.txtDropDown}
              dropDownDirection="TOP"
              dropDownContainerStyle={styles.condropdown2}
              open={open}
              value={value}
              items={chapter}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setChapter}
              multiple={false}
              dropDownMaxHeight={200}
              listMode='SCROLLVIEW'
              scrollViewProps={{nestedScrollEnabled: true}}
              // mode="BADGE"
              // badgeDotColors={['#e76f51', '#00b4d8']}
              onChangeValue={(mychapter) => setMyChapter(mychapter) }
            />
          </View>
          
        </View>
      )
    }
    else {
      return (
        <View>
          {/* <Text style={styles.txtTiltle}>Chapter</Text> */}
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
          {/* <View style={styles.conSpeedDial}>
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
                  onPress={() =>
                    navigation.navigate('AddChapterScreen', {
                      txtHeader: 'Add Chapter',
                    })
                  }>
                  <Text style={styles.txtSDAction}>Chapter</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.spAction}
                  onPress={() => navigation.navigate('AddLessonScreen')}>
                  <Text style={styles.txtSDAction}>Lesson</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View> */}
          {/* <View
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
                return <LessonBoxAdd title={item.title} time={item.time} />;
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
          </View> */}
          <Text style={styles.txtTiltle}>Material</Text>
            <View style={{marginLeft: scale(15, 'w'), flexDirection: 'row'}}>
              <TouchableOpacity style={styles.btnBorder}>
                <Text style={styles.txtDelete}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.fixedButton}
                onPress = {uploadFile}
              >
            <Text style={styles.start}>+</Text>
          </TouchableOpacity>
              <FlatList
                horizontal
                numColumns={1}
                data={titles}
                renderItem={({item, index}) => {
                  return <ItemPdf title={item} />;
                }}
              />
              {/* <View>
                {fileName && (
                  <ItemPdf title={fileName}/>
                )}
              </View> */}
            </View>
            <Text style={styles.txtTiltle}>Test</Text>
            <View style={{marginLeft: scale(15, 'w'), flexDirection: 'row'}}>
              <TouchableOpacity style={styles.btnBorder}>
                <Text style={styles.txtDelete}>-</Text>
              </TouchableOpacity>
              <FlatList
                horizontal
                numColumns={1}
                data={titles}
                renderItem={({item, index}) => {
                  return <ItemPdf title={item} />;
                }}
              />
            </View>
            <View style={{marginBottom: scale(30, 'h')}}></View>
          {/* <View style={styles.space}>
            <View style={[styles.space]}></View>
         </View> */}
        </View>
      )
    }
  }

  const data = [
    { id: 'content1', type: 'content1' },
    { id: 'dropdown', type: 'dropdown' },
    { id: 'content2', type: 'content2' },
  ];

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

  const now = firebase.firestore.Timestamp.now()

  const addChapter = () => {
    firebase
    .firestore()
    .collection('chapters')
    .add ({
      courseAuthor: name.email,
      courseTitle: myCourse,
      number: myChapter,
      title: title,
    })
    .then(() => {
      Alert.alert('Add Chapter Successfully!')
      navigation.navigate('Course')
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.vwImg} source={IMG_BG1} resizeMode="cover">
        <View style={styles.vwTitle}>
          <BackButton onPress={() => navigation.goBack()} />
          <Text style={styles.txtHeader}>Add Lesson</Text>
        </View>
      </ImageBackground>
      <View style={styles.content}>
        <FlatList 
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}>
          
        </FlatList>
      </View>

      <BtnTick onPress={() => {
        addChapter()
      }} />
    </SafeAreaView>
  );
}

export default AddLessonScreen;

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
    //alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
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
  space: {
    height: scale(200, 'h'),
    // backgroundColor: 'pink',
  },

  fixedButton: {
    width: scale(40, 'w'),
    height: scale(40, 'w'),
    borderRadius: scale(70 / 2, 'w'),
    backgroundColor: CUSTOM_COLORS.PictionBlue,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 7,
  },
  start: {
    fontSize: scale(30, 'w'),
    fontWeight: '300',
    color: CUSTOM_COLORS.white,
  },
});
