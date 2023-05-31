import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {IC_LeftArrow} from '../assets/iconsvg';
import scale from '../constants/responsive';
import CUSTOM_COLORS from '../constants/colors';

export default class backButton extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.container}>
        <IC_LeftArrow style={styles.iconBack} type={this.props.type} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    verticalAlign: 'center',
    //alignSelf: 'center',
    //backgroundColor: 'red',
    height: '100%',
    justifyContent: 'center',
  },
  iconBack: {
    //alignSelf: 'center',
    marginLeft: scale(20, 'w'),
  },
});
