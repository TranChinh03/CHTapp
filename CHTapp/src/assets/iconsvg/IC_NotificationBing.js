import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';
import {memo} from 'react';

const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={23}
    height={23}
    fill="none"
    {...props}>
    <Path
      fill="none"
      stroke={props.fill} // Use the desired color for the border
      strokeWidth={2} // Adjust the border thickness as needed
      d="M 11.5 6.17163 V 9.36288 M 11.5192 1.91663 C 7.99252 1.91663 5.13669 4.77246 5.13669 8.29913 V 10.3116 C 5.13669 10.9633 4.86836 11.9408 4.53294 12.4966 L 3.31586 14.5283 C 2.56836 15.7837 3.08586 17.1829 4.46586 17.6429 C 9.04792 19.1666 14 19.1666 18.5821 17.6429 C 18.8845 17.542 19.1603 17.3745 19.3892 17.1527 C 19.6181 16.931 19.7943 16.6606 19.9047 16.3616 C 20.0151 16.0626 20.0569 15.7426 20.027 15.4253 C 19.9971 15.108 19.8964 14.8014 19.7321 14.5283 L 18.515 12.4966 C 18.1796 11.9408 17.9113 10.9537 17.9113 10.3116 V 8.29913 C 17.9017 4.79163 15.0267 1.91663 11.5192 1.91663 Z"
    />
    <Path
      fill="none"
      stroke={props.fill}
      strokeWidth={2}
      d="M 14.6913 18.0359 C 14.6913 19.7896 13.2538 21.2271 11.5 21.2271 C 10.6279 21.2271 9.82294 20.863 9.24794 20.288 C 8.67294 19.713 8.30878 18.908 8.30878 18.0359"
    />
    <Circle cx={10.5} cy={24.5} r={2.5} fill="none" stroke={props.fill2} />
  </Svg>
);

const Memo = memo(SvgComponent);
export default Memo;
