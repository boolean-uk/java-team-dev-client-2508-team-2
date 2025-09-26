import { useEffect, useState } from 'react';
import Post from '../post';
import { getPosts } from '../../service/apiClient';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <>
      {posts.map((post) => {
        return (
          <Post
            key={post?.id}
            name={`${post?.user?.profile?.firstName} ${post?.user?.profile?.lastName}`}
            date={new Date(post.createdAt).toLocaleString('en-GB', {
              dateStyle: 'medium',
              timeStyle: 'short'
            })}
            content={post.content}
            comments={post.comments}
          />
        );
      })}
    </>
  );
};

export default Posts;
