/* eslint-disable no-param-reassign */
import { serialize, CookieSerializeOptions } from 'cookie';
import { NextApiResponse } from 'next';

type TArgs = {
  res: NextApiResponse;
  name: string;
  value: unknown;
  options?: CookieSerializeOptions;
};

const setCookie = ({
  res,
  name,
  value,
  options = {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
  },
}: TArgs) => {
  const stringValue =
    typeof value === 'object' ? `j:${JSON.stringify(value)}` : String(value);

  const headerOptions = options;
  if (options.maxAge) {
    headerOptions.expires = new Date(Date.now() + options.maxAge);
    headerOptions.maxAge /= 1000;
  }

  const cookie = serialize(name, stringValue, headerOptions);
  res.setHeader('Set-Cookie', cookie);
};

export default setCookie;
