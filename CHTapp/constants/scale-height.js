import {Dimensions} from 'react-native';
const designWidth = 414;

function scaleHeight(number) {
  let scaleNumber;
  const currentDeviceHeight = Dimensions.get('window').height;
  scaleNumber = number / (designWidth * currentDeviceHeight);
  return scaleNumber;
}

export default scaleHeight;