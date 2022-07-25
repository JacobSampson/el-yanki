import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useLanguageContext } from '../lib/client/contexts/LanguageContext';
import { useEffect } from 'react';

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
  border-radius: 0.5rem;

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
  padding: 0 1.5rem 0 1.5rem;

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

const Knob = styled.div<{ selector?: boolean; atStart: boolean }>`
  position: absolute;
  width: calc(50%);
  height: calc(100%);
  background-color: ${({ selector }) => (selector ? '#ffb81c' : 'white')};
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
  const router = useRouter();

  const { query, route } = router;

  useEffect(() => {
    if (query.lang === language || (language === 'en-us' && !query.lang)) {
      return;
    }

    if (language === 'en-us') {
      router.push(route);
      return;
    }

    router.push({ pathname: route, query: { lang: language } });
  }, [router, query, route, language]);

  return (
    <Container onClick={toggle} {...props}>
      <Knob selector atStart={language === 'en-us'} />
      <Knob atStart={language !== 'en-us'} />
      <Gutter active={language === 'en-us'}>English</Gutter>
      <Gutter active={language === 'en-us'}>Espa&ntilde;ol</Gutter>
    </Container>
  );
};

export default LanguageToggle;
