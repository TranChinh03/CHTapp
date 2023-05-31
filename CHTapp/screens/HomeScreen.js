import {Text, StyleSheet, View, SafeAreaView} from 'react-native';
import React, {Component} from 'react';

import BottomTab from '../src/components/bottomTab';
import BackButton from '../src/components/backButton';
import Switch from '../src/components/switch';
import {IC_LeftArrow} from '../src/assets/iconsvg';

export default class HomeScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <BackButton type={1} />
        </View>
        <View style={styles.contentContainer}>
          <Switch />
        </View>
        <View style={styles.bottomTabContainer}>
          <BottomTab />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'black',
  },
  headerContainer: {
    flex: 1.2,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 13,
    backgroundColor: 'violet',
  },
  bottomTabContainer: {
    flex: 1.5,
  },
});
