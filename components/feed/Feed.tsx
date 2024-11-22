import { getAllPostsAction } from '@/actions/postActions';
import Post from '../posts/Post';

export const revalidate = 300;

interface feedProps {
  id: number;
  postContent: string;
  userId: string;
  username: string;
  picture: string | null;
  user: {
    profilePic: string;
  };
  _count: {
    comments: number;
    likes: number;
    reposts: number;
  };
}

const Feed = async ({ posts }: { posts: feedProps[] | null }) => {
  return (
    <div className="grid grid-cols-3 m-10 gap-5">
      {posts?.map((post) => {
        return (
          <Post
            postInfo={post}
            // profilePic={post.user.profilePic}
            // postId={post.id}
            // username={post.username}
            // likes={post._count.likes}
            // content={post.postContent}
            // picture={post.picture}
            // comments={post._count.comments}
          />
        );
      })}
    </div>
  );
};

export default Feed;
