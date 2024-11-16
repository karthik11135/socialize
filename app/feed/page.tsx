import Feed from '@/components/feed/Feed';
import { getAllPostsAction } from '@/actions/postActions';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic'

const page = async () => {
  const posts = await getAllPostsAction();
  console.log(posts)
  if (!posts) {
    redirect('/');
  }

  return (
    <div>
      <Feed posts={posts?.reverse()} />
    </div>
  );
};

export default page;
