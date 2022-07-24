import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import useLocalization, { plural } from '../lib/client/hooks/useLocalization';

export interface ProfileProps {
  title: string;
  subTitle: string;
  profile: string;
  quoteText: string;
  quoteAuthor: string;
}

const Container = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  grid-gap: 3rem;
  margin: 0 5rem;
  justify-content: center;
  flex-basis: inherit;
`;

const Title = styled.h3`
  width: 100%;
  font-size: 2rem;
  font-weight: normal;
  border-bottom: 0.2rem solid ${({ theme }) => theme.palette.secondary.contrastText};
  padding-bottom: 0.5rem;
  color: ${({ theme }) => theme.palette.secondary.contrastText};
  margin-bottom: 1rem;
`;

const SubTitle = styled.h4`
  color: ${({ theme }) => theme.palette.secondary.main};
  background-color: ${({ theme }) => theme.palette.secondary.contrastText};
  width: fit-content;
  padding: 0.25rem 0.75rem;
  margin: 0;
  font-size: 1rem;
`;

const Links = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
  grid-gap: 0.5rem;
`;

const StyledLink = styled.div`
  color: ${({ theme }) => theme.palette.secondary.main};
  background-color: #b9d6f0;
  opacity: 1;
  width: fit-content;
  padding: 0.25rem 0.75rem;
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  user-select: none;
  cursor: pointer;
  transition: 0.125s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

const StyledImage = styled.div`
  position: relative;
  flex-basis: 1;
  min-width: 10rem;

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: ${({ theme }) => theme.palette.secondary.contrastText};
    opacity: 0.4;
    transform: translate(1rem, 1rem);
  }
`;

const About = styled.div`
  display: flex;
  flex-direction: column;
  align-items: inherit;
`;

const Details = styled.div`
  text-align: left;
  flex-grow: 1;
`;

const Profile: React.FC<ProfileProps> = ({
  title,
  subTitle,
  profile,
  quoteText,
  quoteAuthor,
  ...props
}) => {
  const l = useLocalization();

  return (
    <Container {...props}>
      <StyledImage>
        <Image src={profile} alt={title} width={300} height={400} />
      </StyledImage>
      <Details>
        <Title>{title}</Title>
        <About>
          <SubTitle>{subTitle}</SubTitle>
        </About>
        <Links>
          <Link href="updates">
            <StyledLink>{l('update', plural)}</StyledLink>
          </Link>
          <Link href="#reports">
            <StyledLink>{l('report', plural)}</StyledLink>
          </Link>
        </Links>
      </Details>
    </Container>
  );
};

export default Profile;
