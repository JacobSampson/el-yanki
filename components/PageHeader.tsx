import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styled, { useTheme } from 'styled-components';

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
  padding-bottom: 20%;
  transform-origin: 0 0;
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transform: scaleY(${({ isOpen }) => (isOpen ? '1' : '0')});
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

const PageHeader = ({ ...props }) => {
  const { palette } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container {...props}>
      <Logo>
        <Link href="/">
          <Image src="/logo.svg" alt="el yanki" width={223} height={46}></Image>
        </Link>
      </Logo>

      <nav>
        <StyledNavOpen onClick={() => setIsOpen(!isOpen)}>{isOpen ? '▼' : '='}</StyledNavOpen>
        <StyledLinks isOpen={isOpen}>
          <Link href="/">
            <StyledLink style={{ backgroundColor: palette.primary.main }}>Home</StyledLink>
          </Link>
          <Link href="/">
            <StyledLink style={{ backgroundColor: palette.accent.medium }}>Posts</StyledLink>
          </Link>
          <Link href="/updates">
            <StyledLink style={{ backgroundColor: palette.accent.light }}>Updates</StyledLink>
          </Link>
        </StyledLinks>
      </nav>
    </Container>
  );
};

export default PageHeader;
