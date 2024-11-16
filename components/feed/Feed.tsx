import { getAllPostsAction } from '@/actions/postActions';
import Post from '../posts/Post';

export const revalidate = 300;

interface feedProps {
  id: number;
  postContent: string;
  userId: string;
  likes: number;
  picture: string | null;
  _count: {
      comments: number;
  };
}

const Feed = async ({posts}:{posts: feedProps[] | null}) => {

  return (
    <div className="grid grid-cols-3 m-10 gap-5">
      {posts?.map((post) => {
        return (
          <Post
            postId={post.id}
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
