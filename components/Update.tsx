import { RichText } from 'prismic-reactjs';
import styled from 'styled-components';

const Container = styled.section`
  padding: 2rem;
  background-color: ${({ theme }) => theme.palette.secondary.main};
  color: ${({ theme }) => theme.palette.secondary.contrastText};
  border-radius: 0.5rem;

  box-shadow: 0.5rem 0.5rem 0 #0a316144;
`;

export interface UpdateProps {
  title: string;
  body: any;
}

const Update: React.FC<UpdateProps> = ({ title, body, ...props }) => {
  console.log(title, body);
  return (
    <Container {...props}>
      <h2>{title}</h2>
      {RichText.render(body)}
    </Container>
  );
};

export default Update;
