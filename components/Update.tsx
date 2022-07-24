import { RichText } from 'prismic-reactjs';
import styled from 'styled-components';

const Container = styled.section`
  position: relative;
  padding: 2rem;
  background-color: ${({ theme }) => theme.palette.secondary.main};
  color: ${({ theme }) => theme.palette.secondary.contrastText};
  border-radius: 0.5rem;

  box-shadow: 0.5rem 0.5rem 0 #0a316144;
  overflow-x: hidden;
  margin: 1rem;

  img {
    max-width: 100%;
    margin-top: 1rem;
    border-radius: 0.5em;
  }
`;

export interface UpdateProps {
  title: string;
  body: any;
}

const Update: React.FC<UpdateProps> = ({ title, body, ...props }) => {
  return (
    <Container {...props}>
      <h1>{title}</h1>
      {RichText.render(body)}
    </Container>
  );
};

export default Update;
