// 'use client';

import SidebarItems from './SidebarItems';
import { storeUserIdAction } from '@/actions/userActions';
import { auth } from '@clerk/nextjs/server';

const SidebarWrapper = async ({ children }: { children: React.ReactNode }) => {
  // const { userId } = useAuth();

  // console.log(userId)

  // if(!userId) {
  //   return null
  // }

  const { userId } = await auth();

  if (userId) {
    try {
      await storeUserIdAction(userId);
    } catch (err) {
      console.log(err);
    }
  }

  // const handleUserIdStorage = async (userId: string) => {
  //   if (userId !== null) await storeUserIdAction(userId);
  // };

  // useEffect(() => {
  //   if (userId) {
  //     console.log('sent req to db')
  //     handleUserIdStorage(userId);
  //   }

  //   return () => {

  //   }
  // }, []);

  return (
    <div className="grid grid-cols-12">
      <SidebarItems />
      <div className="col-span-10 overflow-scroll h-[94vh]">{children}</div>
    </div>
  );
};

export default SidebarWrapper;
