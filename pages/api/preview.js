import fetch from 'node-fetch';

export default async (req, res) => {
  if (!req.query.slug) {
    return res.status(404).end();
  }
  const content = await fetch(
    `https://tkc310.microcms.io/api/v1/articles/${req.query.slug}?fields=id&draftKey=${req.query.draftKey}`,
    { headers: { 'X-API-KEY': process.env.apiKey || '' } }
  )
  .then(res => res.json()).catch(error => null);

  if (!content) {
    return res.status(401).json({ message: 'Invalid slug' });
  }

  res.setPreviewData({
    slug: content.id,
    draftKey: req.query.draftKey,
  });
  res.writeHead(307, { Location: `/${content.id}` });
  res.end('Preview mode enabled');
};
