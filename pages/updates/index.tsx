import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';

import Layout from '../../layouts/Landing';
import PrismicService from '../../lib/core/services/prismic';
import { Language } from '../../lib/core/types';
import Update from '../../components/Update';

const Container = styled.main``;

export type Update = {
  title: string;
};

export interface UpdatesPageProps {
  updates: Update[];
}

const UpdatesPage: React.FC<UpdatesPageProps> = ({ updates }: { updates: any[] }) => {
  console.log('updates', updates);
  return (
    <Layout>
      <Container>
        {updates.map(update => (
          <Update
            key={update.data.title[0].text}
            title={update.data.title[0].text}
            body={update.data.body}
          />
        ))}
      </Container>
    </Layout>
  );
};

export async function getServerSideProps({ query }: { query: { lang: Language } }) {
  const updates = await PrismicService.updates({ language: query.lang });
  console.log('u', updates);
  return {
    props: {
      updates,
    },
  };
}

export default UpdatesPage;
