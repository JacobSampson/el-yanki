import styled from 'styled-components';

const Container = styled.section`
  // font-family: Railway;
`;

export interface TopicOverviewProps {
  title: string;
  subTitle: string;
  description: string;
  isLocked?: boolean;
  children?: React.ReactNode;
  style: React.CSSProperties;
}

const Title = styled.h3``;

const SubTitle = styled.h4`
  // background-color: ${({ theme }) => theme.palette.primary.main};

  $::after {
    content: '→';
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(-100%);
    color: black;
  }
`;

const Description = styled.p``;

const Availability = styled.p<{ isLocked: boolean }>``;

const TopicOverview: React.FC<TopicOverviewProps> = ({
  isLocked = false,
  title,
  subTitle,
  description,
  children,
  ...props
}) => {
  return (
    <Container {...props}>
      <Title>{title}</Title>
      <SubTitle>{subTitle}</SubTitle>
      <Description>{description}</Description>
      <Availability isLocked={isLocked}>available</Availability>
      {children}
    </Container>
  );
};

export default TopicOverview;
