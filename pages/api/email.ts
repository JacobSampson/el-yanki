import { NextApiRequest, NextApiResponse } from 'next';
import { ResourceService } from '../../lib/core/services/firebase';

const subscribeEmail = async (request: NextApiRequest, response: NextApiResponse) => {
  const { email } = request.body;
  console.log('request', email);

  try {
    const result = await new ResourceService().subscribeEmail({ email });
    response.status(200).json(result);
  } catch (e) {
    console.log('[err]', e);
  }

  response.status(500).json({});
};

export default subscribeEmail;
