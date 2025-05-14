
import { createClient } from 'microcms-js-sdk';

// microCMSクライアントの作成
export const client = createClient({
  serviceDomain: import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN || '',
  apiKey: import.meta.env.VITE_MICROCMS_API_KEY || '',
});

// ブログ記事の型定義
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

// ブログ記事一覧を取得する関数
export const getBlogs = async (queries?: object) => {
  return await client.get<{ contents: Blog[] }>({
    endpoint: 'blogs',
    queries,
  });
};

// 特定のブログ記事を取得する関数
export const getBlogDetail = async (contentId: string, queries?: object) => {
  return await client.get<Blog>({
    endpoint: 'blogs',
    contentId,
    queries,
  });
};
