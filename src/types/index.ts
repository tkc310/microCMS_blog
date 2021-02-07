export type TDateCommon = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

export type TCategory = {
  id: string;
  slug: string;
  name: string;
} & TDateCommon;

export type TTag = {
  id: string;
  slug: string;
  name: string;
} & TDateCommon;

export type TArticle = {
  id: string;
  title: string;
  body: string;
  category: TCategory;
  tags: TTag[];
} & TDateCommon;

export type TProfile = {
  name: string;
  githubAccountName: string;
  twitterAccountName: string;
};

export type TConfig = {
  perPage: number;
  host: string;
  apiHost: string;
  siteTitle: string;
  siteDescription: string;
  siteKeywords: string[];
  siteImageUrl: string;
  profile: TProfile;
} & TDateCommon;
