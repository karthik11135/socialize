import Feed from '@/components/feed/Feed';
import { getAllPostsAction } from '@/actions/postActions';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

const page = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect('/')
  }

  const posts = await getAllPostsAction();

  if (!posts) {
    redirect('/');
  }

  return (
    <div>
      <Feed posts={posts} />
    </div>
  );
};

export default page;
