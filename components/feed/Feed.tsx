import { getAllPostsAction } from '@/actions/postActions';
import Post from '../posts/Post';

const Feed = async () => {
  const posts = await getAllPostsAction();
  console.log(posts);

  return (
    <div className="grid grid-cols-3 m-10 gap-5">
      {posts?.map((post) => {
        return (
          <Post
            username={'karthik'}
            likes={post.likes}
            content={post.postContent}
            picture={post.picture}
            comments={post._count.comments}
          />
        );
      })}
         {posts?.map((post) => {
        return (
          <Post
            username={'karthik'}
            likes={post.likes}
            content={post.postContent}
            picture={post.picture}
            comments={post._count.comments}
          />
        );
      })}
    </div>
  );
};

export default Feed;
