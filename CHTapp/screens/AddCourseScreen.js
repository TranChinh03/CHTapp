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
import {firebase} from '../configs/FirebaseConfig';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {uploadBytes, getStorage, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
// import RNFS from 'react-native-fs'

const AddCourseScreen = ({route}) => {
  const {txtHeader} = route.params;
  const navigation = useNavigation();
  const [shouldShow, setShouldShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState('');
  const [programLanguage, setProgramLanguage] = useState([
    {label: 'Python', value: 'python'},
    {label: 'Java', value: 'java'},
    {label: 'Ruby', value: 'ruby'},
    {label: 'C#', value: 'c#'},
    {label: 'C++', value: 'c++'},
    {label: 'JavaScript', value: 'javascript'},
  ]);

  const [items, setItems] = useState([
    {label: 'English', value: 'english'},
    {label: 'VietNamese', value: 'vietnamese'},
  ]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('');

  const [myProgramLanguage, setMyProgramLanguage] = useState('');

  const [name, setName] = useState('');

  const [imageUri, setImageUri] = useState(null);

  const handleButtonPress = async () => {
    const options = {
      mediaType: 'photo',
      // includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };

    await launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImageUri(response.assets[0]);
      }
    });
  };

  const handleUpload = async () => {
    if (imageUri) {
      try {
        // const reference = firebase.storage().ref(`images/${Date.now()}.jpg`);
        // const task = reference.putFile(imageUri);

        // task.on('state_changed', (snapshot) => {
        //   console.log(
        //     `${(snapshot.bytesTransferred / snapshot.totalBytes) * 100}% completed`
        //   );
        // });

        // await task;
        // const url = await reference.getDownloadURL();
        // console.log('Image uploaded to Firebase storage:', url);
        // // return url;
        console.log(imageUri);
        const reference = firebase.storage().ref('images/' + imageUri.fileName);
        const uploadTask = uploadBytesResumable(reference, imageUri);

        uploadTask.on(
          'state_changed',
          snapshot => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          error => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
              case 'storage/canceled':
                // User canceled the upload
                break;

              // ...

              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
              console.log('File available at', downloadURL);
            });
          },
        );
      } catch (error) {
        Alert.alert(error.message);
      }
    }
  };

  async function uriToBlob(uri) {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  }

  // const handleUpload = async () => {
  //   console.log('imageUri', imageUri)
  //   if (imageUri) {
  //     try {
  //       const reference = firebase.storage().ref(`images/${Date.now()}.jpg`);
  //       // Convert imageUri to a Blob object if necessary
  //       const imageBlob = await uriToBlob(imageUri) // convert imageUri to a Blob object
  //       console.log('imageBlob', imageBlob)
  //       let snapshot;
  //       try {
  //         snapshot = await reference.uploadBytes(imageBlob);
  //       } catch (error) {
  //         console.log('Error uploading image:', error);
  //       }
  //       console.log('snapshot', snapshot)
  //       const url = await snapshot.ref.getDownloadURL();
  //       console.log('Image uploaded to Firebase storage:', url);
  //       return url;
  //     } catch (error) {
  //       Alert.alert(error.message);
  //     }
  //   }
  // };

  const renderItem = ({item}) => {
    if (item.type === 'content1') {
      return (
        <View>
          <Text style={styles.txtTiltle}>Thumbnail</Text>
          <View style={styles.vwThumnail}>
            <TouchableOpacity
              style={styles.btnThumnail}
              onPress={handleButtonPress}>
              <IC_Camera style={styles.icCamera} />
              <Text style={styles.txtThumnail}>Upload from your device</Text>
            </TouchableOpacity>
            <View style={styles.currentThumnail}>
              {/* <Image
                    style={styles.imgThumnail}
                    source={IMG_CPP}
                    resizeMode="cover"
                  /> */}
              {imageUri && (
                <Image
                  source={{uri: imageUri.uri}}
                  style={styles.imgThumnail}
                />
              )}
            </View>
          </View>
          <Text style={styles.txtTiltle}>Title</Text>
          <TextInput
            multiline
            style={styles.txtInput}
            onChangeText={myTitle => setTitle(myTitle)}></TextInput>
          <Text style={styles.txtTiltle}>Description</Text>
          <TextInput
            multiline
            style={styles.txtInput2}
            onChangeText={myDescription =>
              setDescription(myDescription)
            }></TextInput>
          <Text style={styles.txtTiltle}>Program Language</Text>
        </View>
      );
    } else if (item.type === 'dropdown') {
      return (
        <View>
          <View style={styles.conDropDown}>
            <DropDownPicker
              style={styles.dropDown}
              textStyle={styles.txtDropDown}
              dropDownDirection="TOP"
              dropDownContainerStyle={styles.condropdown2}
              open={open}
              value={value}
              items={programLanguage}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setProgramLanguage}
              multiple={false}
              // mode="BADGE"
              // badgeDotColors={['#e76f51', '#00b4d8']}
              onChangeValue={myProgramLanguage =>
                setMyProgramLanguage(myProgramLanguage)
              }
            />
          </View>
          <Text style={styles.txtTiltle}>Language</Text>
          <View style={styles.conDropDown}>
            <DropDownPicker
              style={styles.dropDown}
              textStyle={styles.txtDropDown}
              dropDownDirection="TOP"
              dropDownContainerStyle={styles.condropdown2}
              open={open1}
              value={value1}
              items={items}
              setOpen={setOpen1}
              setValue={setValue1}
              setItems={setItems}
              multiple={false}
              mode="BADGE"
              badgeDotColors={['#e76f51', '#00b4d8']}
              onChangeValue={myLanguage => setLanguage(myLanguage)}
            />
          </View>
        </View>
      );
    } else {
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
          <View style={styles.space}>
            <View style={[styles.space]}></View>
          </View>
        </View>
      );
    }
  };

  const data = [
    {id: 'content1', type: 'content1'},
    {id: 'dropdown', type: 'dropdown'},
    {id: 'content2', type: 'content2'},
  ];

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

  const now = firebase.firestore.Timestamp.now();

  const addCourse = async () => {
    try {
      const imageUrl = await handleUpload();

      console.log('imageUrl', imageUrl);

      // Add a new course document to the 'courses' collection
      await firebase.firestore().collection('courses').add({
        author: name.email,
        description: description,
        title: title,
        language: language,
        programLanguage: myProgramLanguage,
        rate: '0',
        numofAttendants: '0',
        openDate: now,
        lastUpdate: now,
        image: imageUrl,
      });

      Alert.alert('Add Course Successfully!');
      navigation.navigate('Course');
    } catch (error) {
      console.log('Error adding course:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.vwImg} source={IMG_BG1} resizeMode="cover">
        <View style={styles.vwTitle}>
          <BackButton onPress={() => navigation.goBack()} />
          <Text style={styles.txtHeader}>{txtHeader}</Text>
        </View>
      </ImageBackground>
      <View style={styles.content}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}></FlatList>
      </View>

      <BtnTick
        onPress={() => {
          handleUpload();
        }}
      />
    </SafeAreaView>
  );
};

export default AddCourseScreen;

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
});
