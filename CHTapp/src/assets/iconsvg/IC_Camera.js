import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 17 17"
    {...props}>
    <Path
      fill="#5390D9"
      d="M12.75 4.25c-.432 0-.829-.248-1.027-.63l-.51-1.028c-.326-.644-1.176-1.175-1.898-1.175H7.693c-.73 0-1.58.53-1.906 1.175l-.51 1.027c-.198.383-.595.63-1.027.63a2.658 2.658 0 0 0-2.656 2.827l.368 5.85c.085 1.46.871 2.657 2.826 2.657h7.424c1.955 0 2.734-1.197 2.826-2.656l.368-5.85A2.658 2.658 0 0 0 12.75 4.25Zm-5.312.885h2.125c.29 0 .53.241.53.532 0 .29-.24.53-.53.53H7.438a.535.535 0 0 1-.532-.53c0-.29.241-.532.532-.532Zm1.062 7.7a2.396 2.396 0 0 1-2.394-2.394A2.391 2.391 0 0 1 8.5 8.046a2.391 2.391 0 0 1 2.394 2.395A2.396 2.396 0 0 1 8.5 12.835Z"
    />
  </Svg>
);
export default SvgComponent;