import SidebarItems from './SidebarItems';
import { storeUserIdAction } from '@/actions/userActions';
import { auth } from '@clerk/nextjs/server';

const SidebarWrapper = async ({ children }: { children: React.ReactNode }) => {

  const { userId } = await auth();

  if (userId) {
    try {
      await storeUserIdAction(userId);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="grid grid-cols-12">
      <SidebarItems />
      <div className="col-span-10 overflow-scroll h-[94vh]">{children}</div>
    </div>
  );
};

export default SidebarWrapper;
