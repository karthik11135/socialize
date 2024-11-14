import SidebarItems from './SidebarItems';

const SidebarWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-12">
      <SidebarItems />
      <div className="col-span-10 overflow-scroll h-screen">{children}</div>
    </div>
  );
};

export default SidebarWrapper;
