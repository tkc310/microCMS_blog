import fetchConfig from '@/utils/fetchConfig';
import { Feed } from 'feed';

type TArgs = {
  type: 'xml' | 'json' | 'atom';
};

const generateRssFeed = async ({ type }: TArgs): Promise<string> => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const config = await fetchConfig();
  const url = `${config.apiHost}articles`;
  const res = await fetch(url, key);
  const data = await res.json();
  const { contents: articles } = data;
  const year = new Date().getFullYear();

  const feed = new Feed({
    title: config.siteTitle,
    description: config.siteDescription,
    id: config.host,
    link: config.host,
    language: 'ja',
    image: config.siteImage.url,
    favicon: `${config.host}favicon.ico`,
    copyright: `All rights reserved ${year}, ${config.profile.name}`,
    updated: new Date(),
    feedLinks: {
      rss2: `${config.host}rss/feed.xml`,
      json: `${config.host}rss/feed.json`,
      atom: `${config.host}rss/atom.xml`,
    },
    author: {
      name: config.profile.fullName,
    },
  });

  articles.forEach((item) => {
    feed.addItem({
      title: item.title,
      description: item.excerpt,
      id: `${config.host}articles/${item.id}`,
      link: `${config.host}articles/${item.id}`,
      image: item.image.url,
      date: new Date(item.updatedAt),
    });
  });

  const METHOD_MAP = {
    xml: 'rss2',
    atom: 'atom1',
    json: 'json1',
  };

  return feed[METHOD_MAP[type]]();
};

export default generateRssFeed;
