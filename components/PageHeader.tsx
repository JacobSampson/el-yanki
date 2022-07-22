import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import useLocalization from '../lib/client/hooks/useLocalization';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  height: 3rem;
  padding: 2.5rem 0;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.palette.secondary.contrastText};
  grid-gap: 1rem;
  user-select: none;
  margin-left: -3rem;
`;

const StyledNavOpen = styled.div`
  width: 2rem;
  height: 100%;
  color: ${({ theme }) => theme.palette.secondary.contrastText};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 900;
  margin: -0.25rem 1em 0 0;
  transition: 0.25s ease-in-out;
  user-select: none;

  &:hover {
    cursor: pointer;
    opacity: 50%;
  }
`;

const StyledLinks = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% - 1.75rem);
  right: 2.75rem;
  width: 20rem;
  margin: 0;
  transition: 0.25s ease-in-out;
  border-radius: 1rem 0rem 1rem 1rem;
  box-shadow: 2px 2px 19px rgb(0 0 0 / 23%);
  overflow: hidden;
  transform-origin: 0 0;
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transform: scaleY(${({ isOpen }) => (isOpen ? '1' : '0')});

  @media (max-width: ${({ theme }) => theme.screen.xsmall}) {
    width: 100%;
    right: 0;
    top: calc(100% - 0rem);
    border-top-right-radius: 1rem;
  }
`;

const StyledLink = styled.div`
  color: ${({ theme }) => theme.palette.secondary.main};
  padding: 2rem;
  font-weight: 600;
  font-size: 1.25rem;
  user-select: none;
  transition: 0.25s ease-in-out;

  &:hover {
    cursor: pointer;
    filter: brightness(120%);
  }
`;

const StyledLogo = styled(Image)`
  cursor: pointer;
`;

const PageHeader = ({ ...props }) => {
  const { palette } = useTheme();
  const l = useLocalization();

  const [isOpen, setIsOpen] = useState(false);
  const navButtonRef = useRef<any>();

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (!isOpen || !navButtonRef?.current || event.target === navButtonRef.current) return;

      setIsOpen(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [navButtonRef, isOpen]);

  return (
    <Container {...props}>
      <Logo>
        <Link href="/">
          <StyledLogo src="/logo.svg" alt="el yanki" width={223} height={46}></StyledLogo>
        </Link>
      </Logo>

      <nav>
        <StyledNavOpen ref={navButtonRef} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '✕' : '='}
        </StyledNavOpen>
        <StyledLinks isOpen={isOpen}>
          <Link href="/">
            <StyledLink style={{ backgroundColor: palette.primary.main }}>{l('Home')}</StyledLink>
          </Link>
          <Link href="/updates">
            <StyledLink style={{ backgroundColor: palette.accent.light }}>
              {l('Updates')}
            </StyledLink>
          </Link>
        </StyledLinks>
      </nav>
    </Container>
  );
};

export default PageHeader;
