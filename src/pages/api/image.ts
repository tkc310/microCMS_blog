import type { NextApiRequest, NextApiResponse } from 'next';
import probe from 'probe-image-size';

type TReturn = {
  width: string;
  height: string;
  type: string;
};

const getSize = async (url): Promise<TReturn> => {
  const data = await probe(url);

  return {
    width: data.width,
    height: data.height,
    type: data.type,
  };
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { url: _url } = req.query;
  const url = _url as string;
  const data = await getSize(url);

  res.status(200).json({ ...data });
};
