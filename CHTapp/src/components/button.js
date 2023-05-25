import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import scale from '../constants/responsive';
import {Card} from 'react-native-paper';

export default function button() {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.buttonLayout}>
        <Text style={styles.textInside}>Enter password</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: scale(60, 'h'),
    width: scale(304, 'w'),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonLayout: {
    color: '#6930C3',
    height: scale(60, 'h'),
    width: scale(304, 'w'),
    borderRadius: scale(12, 'w'),
    backgroundColor: '#6930C3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInside: {
    color: 'white',
    fontSize: '20',
    fontWeight: 'bold',
  },
});
