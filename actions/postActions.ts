'use server';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';
import { getUserNameFromClerkId } from './userActions';
import { auth } from '@clerk/nextjs/server';

cloudinary.config({
  cloud_name: 'dyglifgei',
  api_key: '936352583434641',
  api_secret: '_pI9cbdc2udRlaChOGyoS0ZmA4I',
});

export const getAllPostsAction = async () => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
      include: {
        user: {
          select: {
            profilePic: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
            reposts: true,
          },
        },
      },
    });

    return posts;
  } catch (err) {
    return null;
  }
};

export const revalidatePosts = () => {
  revalidatePath('/feed');
  return;
};

export const addCommentAction = async (
  userId: string,
  postId: number,
  comment: string
) => {
  try {
    const res = await prisma.comment.create({
      data: {
        userId: userId,
        commentContent: comment,
        postId: postId,
      },
    });
    if (res) {
      revalidatePath(`/${postId}`);
      return { ok: true };
    }
  } catch (err) {
    return null;
  }
  return null;
};

export const addPostAction = async (
  userId: string,
  data: { image?: any; postContent: string }
) => {
  const username = await getUserNameFromClerkId(userId);

  try {
    if (!JSON.parse(data.image)) {
      await prisma.post.create({
        data: {
          postContent: data.postContent,
          picture: '',
          userId: userId,
          username,
        },
      });
      revalidatePath('/feed');
      return { ok: true, status: 200 };
    }

    cloudinary.uploader
      .upload_stream(
        {
          folder: 'postImages',
          eager: [{ effect: 'upscale' }, { width: '4.0', crop: 'scale' }],
        },
        async (err, res) => {
          if (!err) {
            await prisma.post.create({
              data: {
                postContent: data.postContent,
                picture: res ? res.url : '',
                userId: userId,
                username,
              },
            });
            revalidatePath('/feed');
            return { ok: true, status: 200 };
          } else {
            console.log(err);
          }
        }
      )
      .end(Buffer.from(JSON.parse(data.image).data));
  } catch (err) {
    return { status: 400, ok: false };
  }
  return { status: 400, ok: false };
};

export const getPostByIdAction = async (postId: number) => {
  try {
    const postById = prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: {
          select: {
            profilePic: true,
          },
        },
        comments: {
          select: {
            commentContent: true,
            userId: true,
          },
        },
        _count: {
          select: {
            likes: true,
            reposts: true,
            comments: true,
          },
        },
      },
    });

    return postById;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getAllPostsForUser = async (userId: string) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: {
          select: {
            profilePic: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
            reposts: true,
          },
        },
      },
    });

    return posts;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const deletePostByIdAction = async (postId: number) => {
  try {
    const { userId } = await auth();
    if (!userId) return null;

    return prisma.$transaction(async (tx) => {
      const deleteRepostedPost = await tx.rePosts.deleteMany({
        where: {
          repostId: postId,
          userId: userId,
        },
      });

      const res = await tx.post.deleteMany({
        where: {
          id: postId,
        },
      });

      if (res && deleteRepostedPost) {
        console.log('deleted');
        revalidatePath(`/profile`);
        return { ok: true };
      }
      return { ok: false };
    });
  } catch (err) {
    return null;
  }
};

export const getLikedPostsAction = async (userId: string) => {
  const postIdObjs = await prisma.likes.findMany({
    where: {
      userId: userId,
    },
    select: {
      postId: true,
    },
  });

  const postIds: number[] = [];
  if (postIdObjs) {
    postIdObjs.forEach((obj) => {
      postIds.push(obj.postId);
    });
  }

  const posts = await prisma.post.findMany({
    where: {
      id: {
        in: postIds,
      },
    },
    include: {
      user: {
        select: {
          profilePic: true,
        },
      },
      _count: {
        select: {
          comments: true,
          likes: true,
          reposts: true,
        },
      },
    },
  });

  return posts;
};

export const searchPostsAction = async (str: string) => {
  console.log('reached searching')
  const posts = await prisma.post.findMany({
    where: {
      postContent: {
        contains: str,
      },
    },
    include: {
      user: {
        select: {
          profilePic: true,
        },
      },
      _count: {
        select: {
          comments: true,
          likes: true,
          reposts: true,
        },
      },
    },
  });

  return posts
  console.log(posts);
};
