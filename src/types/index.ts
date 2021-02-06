export type TCategory = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

export type TArticle = {
  id: string;
  title: string;
  body: string;
  category: TCategory;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};
