import styled from 'styled-components';

const Svg = styled.svg.attrs({
  version: '1.1',
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
})``;

const Wave = ({ ...props }) => (
  <Svg {...props} width="1110" height="728" viewBox={'0 0 100 100'} fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M-7 634.72C30.9414 695.689 88.6636 747.314 162.103 719.5C221.477 697.013 258.894 672.848 288.677 653.613C329.753 627.085 356.307 609.935 405.911 619.5C411.094 620.499 416.127 621.477 421.021 622.427C496.923 637.166 539.224 645.379 584.522 628C625.949 600.833 728.964 605.364 765.17 619.5C775.949 623.708 788.102 631.242 802.188 639.973C846.674 667.549 910.431 707.07 1011.02 691.5C1055.33 684.64 1090.02 672.7 1116.28 659.618V0H-7V634.72Z"
      fill="currentColor"
    />
  </Svg>
);

export default Wave;