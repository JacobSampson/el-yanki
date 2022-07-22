import styled from 'styled-components';

export interface QuoteProps {
  text: string;
  author?: string;
}

const Content = styled.div`
  color: ${({ theme }) => theme.palette.secondary.contrastText};
  background-color: ${({ theme }) => theme.palette.secondary.main};
  border-radius: 0.5rem;
  padding: 2rem;
  position: relative;
`;

const Container = styled.div`
  position: relative;

  &::before {
    content: '';
    width: 2rem;
    height: 100%;
    display: block;
    background-color: #6cace4;
    position: absolute;
    left: -0.75rem;
    bottom: -0.75rem;
    border-radius: 0.5rem;
  }
`;

const Text = styled.blockquote`
  padding: 0.5rem 0 1rem 0;
  margin: 0;
  font-size: 1.25rem;
  font-weight: 300;
  font-style: italic;
`;

const Author = styled.cite``;

const Quote = ({ text, author, ...props }: QuoteProps) => (
  <Container {...props}>
    <Content>
      <Text>{text}</Text>
      <Author>{author}</Author>
    </Content>
  </Container>
);

export default Quote;
