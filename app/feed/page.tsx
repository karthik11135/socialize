import Feed from '@/components/feed/Feed';
import { getAllPostsAction } from '@/actions/postActions';

import { auth } from '@clerk/nextjs/server';

// export const dynamic = 'force-dynamic';

const page = async () => {
  const { userId } = await auth();

  if (!userId) {
    return <p>First login</p>
  }

  const posts = await getAllPostsAction();

  return (
    <div>
      <Feed posts={posts} />
    </div>
  );
};

export default page;
