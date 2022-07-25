import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import useLocalization from '../lib/client/hooks/useLocalization';

const Container = styled.section<{ isLocked: boolean }>`
  position: relative;
  display: grid;
  ${({ isLocked }) =>
    isLocked &&
    `
    opacity: 0.5;
    user-select: none;
    pointer-events: none;
  `}
`;

export interface ReportOverviewProps {
  reportId: string;
  title: string;
  subTitle: string;
  description: string;
  updateTimestamp: string;
  cover?: string;
  isLocked?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const Title = styled.h3`
  width: 100%;
  font-size: 2rem;
  font-weight: normal;
  border-bottom: 0.2rem solid ${({ theme }) => theme.palette.secondary.contrastText};
  padding-bottom: 0.5rem;
  color: ${({ theme }) => theme.palette.secondary.contrastText};
  align-items: inherit;
  display: flex;
  flex-direction: column;
`;

const SubTitle = styled.h4`
  color: ${({ theme }) => theme.palette.secondary.main};
  background-color: ${({ theme }) => theme.palette.secondary.contrastText};
  width: fit-content;
  padding: 0.25rem 0.75rem;
  margin: 0;
  font-size: 1rem;

  /* &::after {
    content: '→';
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(-100%);
    color: black;
  } */
`;

const Description = styled.p``;

const StyledImage = styled.div`
  top: 0;
  position: absolute;
  opacity: 0.4;
  display: flex;
  flex-direction: column;
  align-items: inherit;
`;

const About = styled.div`
  display: flex;
  flex-direction: column;
  align-items: inherit;
`;

const Availability = styled.p<{ isLocked: boolean }>`
  background-color: rgba(255, 255, 255, 0.38);
  height: 2rem;
  margin: 0;
  color: ${({ theme }) => theme.palette.secondary.contrastText};
  padding: 0.25rem 0.75rem;
  font-size: 1rem;
  width: fit-content;
  cursor: pointer;
  user-select: none;
  transition: 0.125s ease-in-out;

  &:hover {
    padding: 0.25rem 1.5rem;
  }
`;

const ReportOverview: React.FC<ReportOverviewProps> = ({
  isLocked = false,
  reportId,
  title,
  subTitle,
  description,
  cover,
  updateTimestamp,
  children,
  ...props
}) => {
  const l = useLocalization();
  return (
    <Container isLocked={!!isLocked} {...props}>
      {cover && (
        <StyledImage>
          <Image src={cover} alt={title} width={200} height={200} />
        </StyledImage>
      )}
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
      <About>
        <SubTitle>{subTitle}</SubTitle>
        <Link href={`reports/[reportId]`} as={`reports/${reportId}`}>
          <Availability isLocked={isLocked}>{isLocked ? l('locked') : l('view')}</Availability>
        </Link>
      </About>
      {children}
    </Container>
  );
};

export default ReportOverview;
