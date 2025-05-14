
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Blog } from '@/lib/microcms';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

type BlogCardProps = {
  blog: Blog;
};

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        {blog.eyecatch ? (
          <img
            src={`${blog.eyecatch.url}?w=400&h=200&fit=crop`}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
      </div>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg font-bold line-clamp-2">{blog.title}</CardTitle>
        {blog.category && (
          <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
            {blog.category.name}
          </span>
        )}
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <CardDescription className="line-clamp-3">
          {blog.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0 text-sm text-muted-foreground">
        {format(new Date(blog.publishedAt), 'yyyy年MM月dd日', { locale: ja })}
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
