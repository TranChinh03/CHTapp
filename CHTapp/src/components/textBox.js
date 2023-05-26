import React, { Component } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

class TextBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      placeholder: props.placeholder,
      secureTextEntry: props.secureTextEntry || false,
    }
  }

  handleTextChange = (text) => {
    this.setState({ text });
  };

  render() {

    const { text, placeholder, secureTextEntry } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={this.handleTextChange}
          value={text}
          placeholder={placeholder}
          secureTextEntry= {secureTextEntry}
        />
      </View>
    );
};
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#BEBAB3',
    padding: 10,
    borderRadius: 12,
  },
})

export default TextBox;