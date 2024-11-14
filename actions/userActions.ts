'use server';
import prisma from '@/lib/db';
import { clerkClient } from '@clerk/nextjs/server';

export const fetchAllUsersAction = async () => {
  try {
    const users = (await clerkClient()).users
    return users;
  } catch (err) {
    return null;
  }
};
