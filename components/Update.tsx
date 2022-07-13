import { RichText } from 'prismic-reactjs';
import styled from 'styled-components';

const Container = styled.section`
  padding: 2rem;
`;

export interface UpdateProps {
  title: string;
  body: any;
}

const Update: React.FC<UpdateProps> = ({ title, body, ...props }) => {
  console.log(title, body);
  return (
    <Container>
      <h2>{title}</h2>
      {RichText.render(body)}
    </Container>
  );
};

export default Update;
