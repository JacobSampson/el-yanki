import * as prismic from '@prismicio/client';
import { Language, Topic } from '../types';

const PRISMIC_ACCESS_TOKEN = process.env.PRISMIC_ACCESS_TOKEN!;
const PRISMIC_ENDPOINT = process.env.PRISMIC_ENDPOINT!;

const client = prismic.createClient(PRISMIC_ENDPOINT, {
  accessToken: PRISMIC_ACCESS_TOKEN,
});

class PrismicService {
  static async updates({ language }: { language: Language }) {
    return await client.getAllByType('update', { lang: language });
  }

  static async report({ topic }: { language: Language; topic: Topic }) {
    return await client.getAllByType(topic);
  }
}

export default PrismicService;
