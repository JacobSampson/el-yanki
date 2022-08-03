import styled from 'styled-components';

import { Language } from '../../lib/core/types';
import Update from '../../components/Update';
import Waves from '../../components/Waves';
import { Update as UpdateModel } from '../../lib/core/models/update';
import useLocalization, { plural, ucc } from '../../lib/client/hooks/useLocalization';
import PrismicService from '../../lib/core/services/prismic';
import { ResourceService } from '../../lib/core/services/firebase';
import useComments from '../../lib/client/hooks/useComments';
import { useLanguageContext } from '../../lib/client/contexts/LanguageContext';
import { formatDate } from '../../lib/core/utils';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  gap: 2rem;
  padding-bottom: 3rem;
  color: ${({ theme }) => theme.palette.secondary.contrastText};
  padding-bottom: 15rem;

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

  &:first-of-type {
    margin-top: -20vw;
  }
`;

const StyledWaves = styled(Waves)`
  background-color: #6cace4;
`;

const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.palette.secondary.main};
  height: 0px;
`;

const UpdatesPage: React.FC<UpdatesPageProps> = ({ updates }) => {
  const l = useLocalization();
  const { addComment } = useComments();
  const { language } = useLanguageContext();

  return (
    <Container>
      <StyledWaves colors={['#FFB81C', '#6CACE4']}>
        <Title>{l('update', ucc, plural)}</Title>
      </StyledWaves>
      {updates.map(({ id, title, body, updateTimestamp, comments = [] }) => (
        <StyledUpdate
          key={`${title}-${updateTimestamp}`}
          title={title}
          updateTimestamp={formatDate(updateTimestamp, language)}
          onCreate={body => addComment({ updateId: id, language, body })}
          body={body}
          comments={comments}
        />
      ))}
    </Container>
  );
};

export async function getServerSideProps({ query }: { query: { lang: Language } }) {
  const [updates, userComments] = await Promise.all([
    PrismicService.updates({ language: query.lang }),
    new ResourceService().fetchComments({ language: query.lang }),
  ]);

  return {
    props: {
      updates: updates.map(({ id, comments, ...rest }) => {
        return {
          ...rest,
          id,
          comments: [
            ...((comments || []) as { body: string }[]).map(({ body }) => ({
              isAdmin: true,
              body,
            })),
            ...(userComments || [])
              .filter(({ updateId }) => updateId === id)
              .map(({ postedAt, ...rest }) => ({
                isAdmin: false,
                updateTimestamp: postedAt.toString(),
                ...rest,
              }))
              .sort((c1, c2) => c1.updateTimestamp.localeCompare(c2.updateTimestamp))
              .reverse(),
          ],
        };
      }),
    },
  };
}

export default UpdatesPage;
