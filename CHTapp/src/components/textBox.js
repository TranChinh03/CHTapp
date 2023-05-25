import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

const textBox = (placeholder, isPassword) => {
  const [text, setText] = useState('');

  const handleTextChange = (newText) => {
    setText(newText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={handleTextChange}
        value={text}
        placeholder={placeholder}
        secureTextEntry= {isPassword}
      />
    </View>
  );
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

export default textBox;