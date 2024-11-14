import { PrismaClient } from '@prisma/client';
import { getCldImageUrl } from 'next-cloudinary';
const prisma = new PrismaClient();

const populateDB = async () => {
  for (let i = 1; i <= 4; i++) {
    await prisma.user.upsert({
      where: { id: i },
      update: {},
      create: {
        userId: '' + i,
      },
    });
  }

  const url = getCldImageUrl({
    width: 200,
    height: 200,
    src: 'cld-sample-5',
  });

  for (let i = 1; i <= 3; i++) {
    await prisma.post.upsert({
      where: { id: i },
      update: {},
      create: {
        postContent: 'hi there this is' + i + 'here',
        userId: '' + i,
        picture: i === 2 ? url : '',
      },
    });
  }

  for (let i = 1; i <= 3; i++) {
    await prisma.comment.upsert({
      where: { id: i },
      update: {},
      create: {
        commentContent: 'This is a comment from someone',
        postId: i,
        userId: i + '',
      },
    });
  }

  await prisma.comment.create({
    data: {
      userId: "2", 
      commentContent: "Hey there this is a comment from number 2", 
      postId: 2,
    }
  })
};

populateDB()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });
