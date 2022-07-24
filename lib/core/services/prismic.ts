import * as prismic from '@prismicio/client';
import { Report } from '../models/report';
import { Language, Topic } from '../types';

const PRISMIC_ACCESS_TOKEN = process.env.PRISMIC_ACCESS_TOKEN!;
const PRISMIC_ENDPOINT = process.env.PRISMIC_ENDPOINT!;

const TIMESTAMP_FORMAT = 'yyyy-MM-DDTHH:mm:ss';

const client = prismic.createClient(PRISMIC_ENDPOINT, {
  accessToken: PRISMIC_ACCESS_TOKEN,
});

class PrismicService {
  static async updates({ language }: { language: Language }) {
    return await client.getAllByType('update', { lang: language });
  }

  static async landing({ language }: { language: Language }) {
    const { data } = await client.getSingle('landing', { lang: language });

    return {
      title: data.title[0].text,
      subTitle: data.subtitle[0].text,
      quoteText: data.quotetext[0].text,
      quoteAuthor: data.quoteauthor[0].text,
      profile: data.profile.url,
    };
  }

  static async reports({ language }: { language: Language }): Promise<Partial<Report>[]> {
    const reports = await client.getAllByType('post', {
      graphQuery: `
        {
          post {
            title
            summary
            topicnumber
            islocked
            cover
            summary
          }
        }
      `,
      ...(language ? { lang: language } : {}),
    });

    if (!reports?.length) return [];

    try {
      return reports
        .map(({ uid, last_publication_date: updateTimestamp, data }) => ({
          uid: uid || '',
          title: data.title[0].text,
          reportNumber: +data.topicnumber,
          isLocked: data.islocked,
          summary: data.summary[0]?.length ? data.summary[0].text : null,
          cover: data.cover.url,
          updateTimestamp,
        }))
        .sort((a, b) => a.reportNumber - b.reportNumber);
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  static async report({ language, reportId }: { language: Language; reportId: string }) {
    const { data } = await client.getByUID('post', reportId, language ? { lang: language } : {});

    return {
      title: data.title[0].text,
      body: data.body,
    };
  }
}

export default PrismicService;
