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
  color: string;
} & TDateCommon;

export type TTag = {
  id: string;
  slug: string;
  name: string;
  color: string;
} & TDateCommon;

export type TImage = {
  url: string;
  width: number;
  height: number;
};

export type TimageOption = {
  fontColor: string;
};

export type TArticle = {
  id: string;
  image: TImage;
  title: string;
  excerpt: string;
  body: string;
  category: TCategory;
  tags: TTag[];
  imageOption: TimageOption | null;
} & TDateCommon;

export type TNote = {
  id: string;
  title: string;
  body: string;
  tags: TTag[];
} & TDateCommon;

export type TProfile = {
  name: string;
  fullName: string;
  description: string;
  pr: string;
  githubAccountName: string;
  zennAccountName: string;
  qiitaAccountName: string;
  laprasAccountName: string;
  twitterAccountName: string;
  image: TImage;
};

export type TDonations = {
  amazon: string;
  crypto: string;
};

export type TConfig = {
  perPage: number;
  host: string;
  apiHost: string;
  siteTitle: string;
  siteDescription: string;
  siteKeywords: string[];
  siteImage: TImage;
  profile: TProfile;
  donations: TDonations;
} & TDateCommon;

export type TResources = 'article' | 'note';

// @refs: https://github.com/lapras-inc/public-api-schema#typescript-type
export type TLaprasActivity = {
  title: string;
  url: string;
  date: string;
  type:
    | 'github'
    | 'speaker_deck'
    | 'qiita'
    | 'zenn'
    | 'note'
    | 'teratail'
    | 'blog'
    | 'connpass';
};

export type TLaprasActivities = TLaprasActivity[];
