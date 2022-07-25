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

  img {
    max-width: 100%;
    margin-top: 1rem;
    border-radius: 0.5em;
  }
`;

const Date = styled.div`
  position: absolute;
  right: 1.5rem;
  top: 1rem;
  opacity: 0.5;
`;

export interface UpdateProps {
  title: string;
  updateTimestamp: string;
  body: any;
}

const Update: React.FC<UpdateProps> = ({ title, updateTimestamp, body, ...props }) => {
  const date = updateTimestamp.split('T')[0];
  return (
    <Container {...props}>
      <h1>{title}</h1>
      <Date>{date}</Date>
      {RichText.render(body)}
    </Container>
  );
};

export default Update;
