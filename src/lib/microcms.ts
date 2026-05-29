export type Blog = {
  id: string;
  title: string;
  content: string;
  eyecatch?: {
    url: string;
    height: number;
    width: number;
  };
  category?: {
    id: string;
    name: string;
  };
  publishedAt: string;
  revisedAt: string;
  createdAt: string;
  updatedAt: string;
};
