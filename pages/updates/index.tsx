import styled from 'styled-components';

import { Language } from '../../lib/core/types';
import Update from '../../components/Update';
import Waves from '../../components/Waves';
import { Update as UpdateModel } from '../../lib/core/models/update';
import useLocalization, { plural, ucc } from '../../lib/client/hooks/useLocalization';
import PrismicService from '../../lib/core/services/prismic';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  gap: 2rem;
  padding-bottom: 3rem;
  color: ${({ theme }) => theme.palette.secondary.contrastText};

  & > * {
    width: 100%;
  }
`;

export interface UpdatesPageProps {
  updates: UpdateModel[];
}

const StyledUpdate = styled(Update)`
  max-width: 50rem;
  width: calc(100% - 4rem);
`;

const StyledWaves = styled(Waves)`
  background-color: #6cace4;
`;

const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

const UpdatesPage: React.FC<UpdatesPageProps> = ({ updates }: { updates: any[] }) => {
  const l = useLocalization();
  return (
    <Container>
      <StyledWaves colors={['#FFB81C', '#6CACE4']}>
        <Title>{l('update', ucc, plural)}</Title>
      </StyledWaves>
      {updates.map(({ title, body, updateTimestamp }) => (
        <StyledUpdate
          key={`${title}-${updateTimestamp}`}
          title={title}
          updateTimestamp={updateTimestamp}
          body={body}
        />
      ))}
    </Container>
  );
};

export async function getServerSideProps({ query }: { query: { lang: Language } }) {
  const updates = await PrismicService.updates({ language: query.lang });

  return {
    props: {
      updates,
    },
  };
}

export default UpdatesPage;
