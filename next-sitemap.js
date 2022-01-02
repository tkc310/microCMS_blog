const { NEXT_PUBLIC_HOST } = process.env;

module.exports = {
  siteUrl: NEXT_PUBLIC_HOST,
  generateRobotsTxt: true,
  exclude: ['/sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [`${NEXT_PUBLIC_HOST}/sitemap.xml`],
  },
};
