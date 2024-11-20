'use server';
import prisma from '@/lib/db';
import { clerkClient } from '@clerk/nextjs/server';
import { clerkClientSDK } from '@/lib/clerkClient';

export const fetchAllUsersAction = async () => {
  try {
    const users = (await clerkClient()).users;
    return users;
  } catch (err) {
    return null;
  }
};

export const storeUserIdAction = async (userId: string) => {
  try {
    const isPresent = await prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });

    if (isPresent) return;

    await prisma.user.create({
      data: {
        userId: userId,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getUserNameFromClerkId = async(userId: string) => {
  const userNamefromId = await clerkClientSDK.users.getUser(userId);
  if(userNamefromId.username) {
    return userNamefromId.username
  }
  return ""
}