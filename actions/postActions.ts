'use server';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';
import { getUserNameFromClerkId } from './userActions';

cloudinary.config({
  cloud_name: 'dyglifgei',
  api_key: '936352583434641',
  api_secret: '_pI9cbdc2udRlaChOGyoS0ZmA4I',
});

export const getAllPostsAction = async () => {
  console.log('entered the action. ');
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
          }
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });

    console.log(posts);
    return posts;
  } catch (err) {
    return null;
  }
};

export const revalidatePosts = () => {
  revalidatePath('/feed');
  return;
};

export const likePostAction = async (postId: number, userId: string) => {
  try {
    const likeExists = await prisma.likes.findMany({
      where: {
        postId: postId,
        userId: userId,
      },
    });

    if (likeExists.length > 0) return null;

    console.log('creating like');
    await prisma.likes.create({
      data: {
        postId,
        userId,
      },
    });


    return { ok: true };
  } catch (err) {
    return null;
  }
};

export const isLikedAction = async (postId: number, userId: string) => {
  try {
    const likeExists = await prisma.likes.findMany({
      where: {
        postId: postId,
        userId: userId,
      },
    });
    console.log('likeExists', likeExists);
    if (likeExists.length > 0) return { ok: true };
    return { ok: false };
  } catch (err) {
    return null;
  }
};

export const removeLikeAction = async (postId: number, userId: string) => {
  try {
    await prisma.likes.deleteMany({
      where: {
        postId,
        userId,
      },
    });

    return { ok: true };
  } catch (err) {
    return null;
  }
};

export const addCommentAction = async (
  userId: string,
  postId: number,
  comment: string
) => {
  try {
    console.log(userId, postId, comment);
    await prisma.comment.create({
      data: {
        userId: userId,
        commentContent: comment,
        postId: postId,
      },
    });

    revalidatePath(`/${postId}`);
  } catch (err) {
    return null;
  }
};

export const addPostAction = async (
  userId: string,
  data: { image?: any; postContent: string }
) => {
  console.log(data, 'adding');

  const username = await getUserNameFromClerkId(userId);

  try {
    if (!JSON.parse(data.image)) {
      console.log('i came heree');
      await prisma.post.create({
        data: {
          postContent: data.postContent,
          picture: '',
          userId: userId,
          username,
        },
      });
      revalidatePath('/feed');
      console.log('successfully added');
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
          }
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
