import { MutableRefObject } from 'react';
import styled from 'styled-components';

export interface WaveProps {
  fill?: string;
  innerRef?: any | MutableRefObject<HTMLElement>;
  reverse?: boolean;
  style?: React.CSSProperties;
}

const Svg = styled.svg.attrs({
  version: '1.1',
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
})``;

const Wave = ({ fill, innerRef, reverse, ...props }: WaveProps) => (
  <div ref={innerRef} {...props}>
    <Svg viewBox="-7 0 1123.28 286.13" preserveAspectRatio="xMaxYMin">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M-7 234.849V-7.20024e-05L1116.28 -0.000184536V212.617C1090.02 225.699 1055.33 237.639 1011.02 244.499C909.976 260.14 852.402 225.137 810.878 199.892C797.977 192.049 786.625 185.148 776 180.999C739.794 166.863 666.5 158.938 609 180.999C560.782 199.499 491.481 188.999 405.911 172.499C356.307 162.935 329.753 180.084 288.677 206.612C258.894 225.847 221.477 250.012 162.103 272.499C81.9421 302.859 26.7788 279.078 -7 234.849Z"
        fill={fill || 'currentColor'}
      ></path>
    </Svg>
  </div>
);

export default Wave;
