import Feed from '@/components/feed/Feed';
import { getAllPostsAction } from '@/actions/postActions';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

const page = async () => {
  const { userId } = await auth();

  if (!userId) {
    return <p className="text-center text-lg">First login</p>;
  }
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
