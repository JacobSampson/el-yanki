import { RichText } from 'prismic-reactjs';
import styled from 'styled-components';
import { useLanguageContext } from '../lib/client/contexts/LanguageContext';

const Container = styled.div`
  width: 11rem;
  color: ${({ theme }) => theme.palette.secondary.main};
  height: 2rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  grid-gap: 0rem;

  &:hover {
    cursor: pointer;
  }
`;

const Gutter = styled.div<{ active: boolean }>`
  position: relative;
  pointer-events: none;
  width: 50%;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 0 1rem 0 1rem;

  &::after {
    content: '';
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 0.5rem;
    background-color: ${({ theme }) => theme.palette.secondary.main};
    transform: skew(-14deg) translateX(100%);
  }
`;

const Knob = styled.div<{ atStart: boolean }>`
  position: absolute;
  width: calc(50%);
  height: calc(100%);
  background-color: #ffb81c;
  transform: skew(-14deg);

  ${({ atStart }) => !atStart && 'right: 0'};

  transition: ease-in-out 0.125s;

  &:hover {
    transform: scale(0.9, 0.9) skew(-14deg) translateX(0.125rem);
  }
`;

export interface LanguageToggleProps {}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ ...props }) => {
  const { language, toggle } = useLanguageContext();

  const handleClick = () => {
    console.log('Clicked!', language, toggle);
    toggle();
  };

  return (
    <Container onClick={handleClick} {...props}>
      <Knob atStart={language === 'us-en'} />
      <Gutter active={language === 'us-en'}>English</Gutter>
      <Gutter active={language === 'us-en'}>Espa&ntilde;ol</Gutter>
    </Container>
  );
};

export default LanguageToggle;
