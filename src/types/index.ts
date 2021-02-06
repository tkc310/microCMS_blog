export type TDateCommon = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

export type TCategory = {
  id: string;
  name: string;
} & TDateCommon;

export type TArticle = {
  id: string;
  title: string;
  body: string;
  category: TCategory;
} & TDateCommon;

export type TConfig = {
  perPage: number;
} & TDateCommon;
